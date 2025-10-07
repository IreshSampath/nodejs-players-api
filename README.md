# Sample Node.js Players API (Express)

A minimal REST API server built with Node.js and Express to manage players.

## Prerequisites
- Node.js (LTS recommended): [Download Node.js](https://nodejs.org/en/download)
- Optional tools:
  - Postman (GUI client) for testing POST requests
  - curl (command-line HTTP client) for quick tests in the terminal

---

## Choose your setup method

### A) Use this repository
1) Clone the repo (replace with your repo URL):
   ```bash
   git clone <your-repo-url>
   ```
2) Open a terminal in the project folder (see “Open a terminal in the folder” below).
3) Install dependencies:
   - Command Prompt (cmd):
     ```cmd
     npm install
     ```
   - PowerShell (if npm.ps1 policy blocks):
     ```powershell
     npm.cmd install
     # or
     cmd /c npm install
     ```
4) Run the server (see “Run the server”).

### B) Start from scratch (empty folder)
1) Create a new folder for the server.
2) Open a terminal in that folder (see “Open a terminal in the folder” below).
3) Initialize and install Express:
   - Command Prompt (cmd):
     ```cmd
     npm init -y
     npm install express
     ```
   - PowerShell (if npm.ps1 policy blocks):
     ```powershell
     npm.cmd init -y    # or: cmd /c npm init -y
     npm.cmd install express   # or: cmd /c npm install express
     ```
4) Create a file named `server.js` with this content:
   ```js
   const express = require('express');
   const app = express();

   app.use(express.json());

   // Sample in-memory data
   let players = [
     { id: 1, name: 'Alice', score: 1200 },
     { id: 2, name: 'Bob', score: 1500 },
     { id: 3, name: 'Charlie', score: 900 }
   ];

   // GET all players
   app.get('/api/players', (req, res) => {
     res.json(players);
   });

   // GET a single player by ID
   app.get('/api/players/:id', (req, res) => {
     const id = Number(req.params.id);
     const player = players.find(p => p.id === id);
     if (!player) {
       return res.status(404).json({ error: 'Player not found' });
     }
     res.json(player);
   });

   // POST create a new player
   app.post('/api/players', (req, res) => {
     const { name, score } = req.body || {};
     if (typeof name !== 'string' || typeof score !== 'number') {
       return res.status(400).json({ error: 'Invalid payload. Expected { name: string, score: number }' });
     }
     const newId = players.length ? Math.max(...players.map(p => p.id)) + 1 : 1;
     const player = { id: newId, name, score };
     players.push(player);
     res.status(201).json(player);
   });

   // Start server
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
     console.log('Available endpoints:');
     console.log('  GET  /api/players');
     console.log('  GET  /api/players/:id');
     console.log('  POST /api/players');
   });
   ```

---

## Open a terminal in the folder

- Using Command Prompt (cmd):
  - Open cmd and jump directly to the folder (switch drive and directory in one step):
    ```cmd
    cd /d "D:\Projects\sample-nodejs-api"
    ```
- Using PowerShell:
  - Navigate to the folder:
    ```powershell
    cd "D:\Projects\sample-nodejs-api"
    ```
  - If you’re on a different drive, you can also run:
    ```powershell
    cd /d "D:\Projects\sample-nodejs-api"
    ```
Notes:
- Keep quotes around paths that contain spaces.
- In File Explorer, you can type `cmd` or `powershell` in the address bar to open a terminal directly at that path.

---

## Run the server

```bash
node server.js
```

Expected output:
```
Server is running at http://localhost:3000
Available endpoints:
  GET /api/players
  GET /api/players/:id
  POST /api/players
```

Optional: add an npm script
```bash
npm set-script start "node server.js"
npm start
```

---

## Test the API

- In a browser (GET only):
  - All players: http://localhost:3000/api/players
  - Single player: http://localhost:3000/api/players/2

- With Postman:
  - Method: GET or POST
  - URL: http://localhost:3000/api/players
  - For POST, set Body -> raw -> JSON, and use:
    ```json
    {
      "name": "Iresh",
      "score": 1200
    }
    ```

- With curl (Command Prompt):
  - GET all:
    ```cmd
    curl http://localhost:3000/api/players
    ```
  - GET by ID:
    ```cmd
    curl http://localhost:3000/api/players/2
    ```
  - POST (escape quotes in cmd):
    ```cmd
    curl -X POST http://localhost:3000/api/players ^
      -H "Content-Type: application/json" ^
      -d "{\"name\":\"Iresh\",\"score\":1200}"
    ```

- With curl (PowerShell or Git Bash):
  ```powershell
  curl -X POST http://localhost:3000/api/players `
    -H "Content-Type: application/json" `
    -d '{ "name": "Iresh", "score": 1200 }'
  ```
  Tip: In PowerShell, backticks allow line breaks; you can also put the command on one line.

---

## Troubleshooting

- npm.ps1 cannot be loaded (PowerShell execution policy):
  - Use Command Prompt instead, or run in PowerShell:
    ```powershell
    npm.cmd install
    # or
    cmd /c npm install
    ```
  - Temporary policy bypass for this session:
    ```powershell
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    ```
  - Permanent (user scope) to allow signed scripts:
    ```powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    ```
    Then reopen PowerShell.

- ENOENT: Could not read package.json
  - You’re in a folder without `package.json`. Navigate to the correct project folder, or initialize one:
    ```bash
    npm init -y
    ```

- Cannot find module 'express'
  - Install dependencies in the project folder:
    ```bash
    npm install
    # or, minimal:
    npm install express
    ```

- Port 3000 already in use
  - Stop the other process on port 3000, or change the port in `server.js` by setting `PORT` (e.g., `set PORT=4000` on Windows, then `node server.js`).

---

## Quick check
```bash
node -v
npm -v
```

If you want, I can also add a badge, a license section, and a start script in package.json via a PR.