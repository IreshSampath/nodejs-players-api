// Import the Express framework
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// In-memory "database" for demonstration purposes.
// In a real application, this would be a connection to a database like MongoDB, PostgreSQL, etc.
let players = [
    { id: 1, name: 'Alice', score: 1200 },
    { id: 2, name: 'Bob', score: 950 },
    { id: 3, name: 'Charlie', score: 1500 }
];
let nextId = 4;

// --- API Endpoints ---

// GET /api/players - Fetches all players
app.get('/api/players', (req, res) => {
    console.log('GET request received for all players.');
    res.json(players); // Send the players array as a JSON response
});

// GET /api/players/:id - Fetches a single player by their ID
app.get('/api/players/:id', (req, res) => {
    const playerId = parseInt(req.params.id, 10);
    console.log(`GET request received for player ID: ${playerId}`);
    const player = players.find(p => p.id === playerId);

    if (player) {
        res.json(player);
    } else {
        res.status(404).send('Player not found'); // Send a 404 Not Found error if the ID doesn't exist
    }
});

// POST /api/players - Creates a new player
app.post('/api/players', (req, res) => {
    const { name, score } = req.body;
    console.log(`POST request received to create player: ${name}`);

    // Basic validation
    if (!name || typeof score !== 'number') {
        return res.status(400).send('Invalid data. Please provide a name and a numeric score.');
    }

    const newPlayer = {
        id: nextId++,
        name: name,
        score: score
    };

    players.push(newPlayer);
    res.status(201).json(newPlayer); // Respond with the newly created player and a 201 Created status
});


// Start the server and listen for incoming connections
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Available endpoints:');
    console.log('  GET /api/players');
    console.log('  GET /api/players/:id');
    console.log('  POST /api/players');
});