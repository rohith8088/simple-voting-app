const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let votes = {
    party1: 0,
    party2: 0,
    party3: 0,
    party4: 0
};

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// API: Get current vote counts
app.get('/votes', (req, res) => {
    res.json(votes);
});

// API: Vote for a specific party
app.post('/vote/:party', (req, res) => {
    const party = req.params.party;
    if (votes.hasOwnProperty(party)) {
        votes[party]++;
        res.status(200).json({ message: 'Vote counted' });
    } else {
        res.status(400).json({ message: 'Invalid party' });
    }
});

// Fallback route for all other GET requests, serve the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
