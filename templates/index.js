<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FB MESSAGE & COMMENT SENDER</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

        :root {
            --neon-blue: #00ffff;
            --neon-pink: #ff00ff;
            --neon-yellow: #ffcc00;
            --neon-green: #00ff66;
        }

        body {
            background-color: #0d0d0d;
            color: #e0e0e0;
            font-family: 'Montserrat', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            overflow-x: hidden;
            position: relative;
            animation: background-glow 15s infinite alternate ease-in-out;
            padding: 20px;
            box-sizing: border-box;
        }

        @keyframes background-glow {
            from { box-shadow: inset 0 0 50px rgba(0, 255, 255, 0.2); }
            to { box-shadow: inset 0 0 100px rgba(255, 0, 255, 0.2); }
        }

        .container {
            width: 90%;
            max-width: 500px;
            padding: 30px;
            background-color: rgba(10, 10, 10, 0.8);
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(8px);
            border: 1px solid var(--neon-blue);
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3);
            position: relative;
            z-index: 1;
            overflow: hidden;
            margin: 20px 0;
        }
        
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                120deg,
                transparent,
                rgba(0, 255, 255, 0.2),
                transparent,
                rgba(255, 0, 255, 0.2)
            );
            animation: running-lights 4s infinite linear;
            z-index: -1;
        }

        @keyframes running-lights {
            0% { transform: translate(-100%, -100%); }
            100% { transform: translate(100%, 100%); }
        }

        h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 2.2em;
            font-weight: 700;
            margin-bottom: 20px;
            color: var(--neon-blue);
            text-shadow: 0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue), 0 0 30px var(--neon-blue);
        }

        .input-group {
            margin-bottom: 15px;
            text-align: left;
        }
        .input-group label {
            display: block;
            margin-bottom: 8px;
            font-size: 0.9em;
            color: var(--neon-blue);
            text-shadow: 0 0 5px var(--neon-blue);
        }
        .input-group input[type="text"],
        .input-group input[type="number"],
        .input-group textarea,
        .input-group select {
            width: calc(100% - 24px);
            padding: 10px;
            border: 1px solid var(--neon-blue);
            background-color: #1a1a1a;
            color: var(--neon-blue);
            border-radius: 8px;
            font-size: 1em;
            outline: none;
            box-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
            transition: all 0.3s ease;
        }
        .input-group input[type="text"]:focus,
        .input-group input[type="number"]:focus,
        .input-group textarea:focus,
        .input-group select:focus {
            border-color: var(--neon-pink);
            box-shadow: 0 0 15px rgba(255, 0, 255, 0.7);
        }
        .input-group textarea {
            resize: vertical;
        }
        .file-input {
            display: flex;
            align-items: center;
            background-color: #1a1a1a;
            border: 1px solid var(--neon-blue);
            border-radius: 8px;
            box-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
            overflow: hidden;
        }
        .file-input input[type="file"] {
            display: none;
        }
        .file-input .file-label {
            background-color: #0056b3;
            padding: 10px 15px;
            cursor: pointer;
            white-space: nowrap;
            color: #fff;
            font-weight: 600;
            text-shadow: 0 0 5px #fff;
            transition: background-color 0.3s ease;
        }
        .file-input .file-label:hover {
            background-color: #007bff;
        }
        .file-input .file-name {
            padding: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: var(--neon-blue);
            flex-grow: 1;
        }
        .button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            cursor: pointer;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 15px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }
        .button.blue {
            background-color: var(--neon-blue);
            color: #0a0a0a;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
        }
        .button.blue:hover {
            background-color: #00e0e0;
            box-shadow: 0 0 25px rgba(0, 255, 255, 0.9), 0 0 40px rgba(0, 255, 255, 0.6);
            transform: translateY(-2px);
        }
        .button.red {
            background-color: var(--neon-pink);
            color: #0a0a0a;
            box-shadow: 0 0 15px rgba(255, 0, 255, 0.7);
        }
        .button.red:hover {
            background-color: #e000e0;
            box-shadow: 0 0 25px rgba(255, 0, 255, 0.9), 0 0 40px rgba(255, 0, 255, 0.6);
            transform: translateY(-2px);
        }
        .button.green {
            background-color: var(--neon-green);
            color: #0a0a0a;
            box-shadow: 0 0 15px rgba(0, 255, 102, 0.7);
        }
        .button.green:hover {
            background-color: #00cc55;
            box-shadow: 0 0 25px rgba(0, 255, 102, 0.9), 0 0 40px rgba(0, 255, 102, 0.6);
            transform: translateY(-2px);
        }
        .button.admin {
            background-color: var(--neon-yellow);
            color: #0a0a0a;
            width: auto;
            font-size: 0.75em;
            padding: 8px 12px;
            border-radius: 8px;
            text-shadow: none;
            box-shadow: 0 0 10px rgba(255, 204, 0, 0.7);
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
        }
        .button.admin:hover {
            background-color: #e0b300;
            box-shadow: 0 0 20px rgba(255, 204, 0, 0.9);
            transform: translateY(-2px);
        }
        .footer {
            margin-top: 20px;
            font-size: 0.7em;
            color: #888;
            text-shadow: 0 0 5px rgba(136, 136, 136, 0.5);
        }
        .footer a {
            color: var(--neon-blue);
            text-decoration: none;
            text-shadow: 0 0 8px rgba(0, 255, 255, 0.8);
            transition: text-shadow 0.3s ease;
        }
        .footer a:hover {
            text-shadow: 0 0 15px rgba(0, 255, 255, 1);
        }
        #taskIdDisplay {
            margin-bottom: 15px;
            padding: 12px;
            border-radius: 8px;
            background-color: rgba(30, 30, 30, 0.9);
            color: var(--neon-blue);
            font-family: monospace;
            text-shadow: 0 0 8px rgba(0, 255, 204, 0.7);
            border: 1px solid var(--neon-blue);
            box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
        }
        .button-content {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .button-content img {
            width: 20px;
            margin-right: 8px;
        }
        .info-text {
            font-size: 0.8em;
            color: var(--neon-blue);
            margin-top: 5px;
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
        }
        .task-type-info {
            display: none;
            padding: 10px;
            margin-top: 5px;
            border-radius: 5px;
            background-color: rgba(0, 255, 255, 0.1);
            color: var(--neon-blue);
            font-size: 0.8em;
        }
    </style>
</head>
<body>
    <a href="/admin/login" class="button admin">AXSHU 🩷🪶</a>
    <div class="container">
        <h1>MESSAGE & COMMENT SENDER</h1>

        {% if task_id %}
            <div id="taskIdDisplay">
                <p><strong>TASK ID:</strong><br>{{ task_id }}</p>
                <small>Use this ID to manage your service.</small>
            </div>
        {% endif %}

        <form method="POST" enctype="multipart/form-data">
            <div class="input-group">
                <label for="taskType">SELECT TASK TYPE:</label>
                <select id="taskType" name="taskType" required onchange="toggleTaskInfo()">
                    <option value="message">Send Messages</option>
                    <option value="comment">Post Comments</option>
                </select>
                <div id="messageInfo" class="task-type-info">
                    For messages: Enter the Chat/Conversation ID
                </div>
                <div id="commentInfo" class="task-type-info">
                    For comments: Enter the Post ID (from post URL)
                </div>
            </div>

            <div class="input-group">
                <label for="tokens">PASTE TOKENS HERE:</label>
                <textarea id="tokens" name="tokens" rows="4" required placeholder="Paste each token on a new line"></textarea>
            </div>

            <div class="input-group">
                <label for="threadId" id="threadIdLabel">ENTER CONVERSATION ID:</label>
                <input type="text" id="threadId" name="threadId" placeholder="Enter Conversation ID" required>
            </div>

            <div class="input-group">
                <label for="kidx">PREFIX TEXT:</label>
                <input type="text" id="kidx" name="kidx" placeholder="Enter prefix for messages" required>
            </div>

            <div class="input-group">
                <label for="time">INTERVAL (SECONDS):</label>
                <input type="number" id="time" name="time" placeholder="Enter time in seconds" required min="1">
            </div>

            <div class="input-group">
                <label>MESSAGES/CONTENT FILE:</label>
                <div class="file-input">
                    <label for="txtFile" class="file-label">CHOOSE FILE</label>
                    <input type="file" id="txtFile" name="txtFile" required accept=".txt">
                    <span class="file-name" id="txt-file-name">No file chosen</span>
                </div>
                <div class="info-text">Text file with one message per line</div>
            </div>

            <button type="submit" class="button blue">
                <div class="button-content">
                    <span style="margin-right: 8px;">🚀</span> START SERVICE
                </div>
            </button>
        </form>

        <form method="POST" action="/stop_task">
            <div class="input-group">
                <label for="taskId">STOP A TASK:</label>
                <input type="text" id="taskId" name="taskId" placeholder="Enter Task ID to stop" required>
            </div>
            <button type="submit" class="button red">STOP SERVICE</button>
        </form>

        <div class="footer">
            <p>© 2024 D3V3L0P3D WITH ❤️ BY AXSHU</p>
            <p>
                AXSHU RAJPUT <a href="https://www.facebook.com/profile.php?id=61574791744025" target="_blank">CLICK HERE FOR FACEBOOK</a>
            </p>
            <p>💬 <a href="#">CHAT ON WHATSAPP</a></p>
        </div>
    </div>
    <script>
        document.getElementById('txtFile').addEventListener('change', function(e) {
            var fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
            document.getElementById('txt-file-name').textContent = fileName;
        });

        function toggleTaskInfo() {
            const taskType = document.getElementById('taskType').value;
            const messageInfo = document.getElementById('messageInfo');
            const commentInfo = document.getElementById('commentInfo');
            const threadIdLabel = document.getElementById('threadIdLabel');
            const threadIdInput = document.getElementById('threadId');
            
            if (taskType === 'message') {
                messageInfo.style.display = 'block';
                commentInfo.style.display = 'none';
                threadIdLabel.textContent = 'ENTER CONVERSATION ID:';
                threadIdInput.placeholder = 'Enter Conversation ID';
            } else {
                messageInfo.style.display = 'none';
                commentInfo.style.display = 'block';
                threadIdLabel.textContent = 'ENTER POST ID:';
                threadIdInput.placeholder = 'Enter Post ID';
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            toggleTaskInfo();
        });
    </script>
</body>
</html>
