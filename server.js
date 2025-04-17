const path = require('path');
const express = require('express');
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

// API: Get current vote counts
app.get('/votes', (req, res) => {
    res.json(votes);
});

// API: Get a vote summary string
app.get('/votes/summary', (req, res) => {
    const summary = `Votes: ${votes.party1} - ${votes.party2} - ${votes.party3} - ${votes.party4}`;
    res.send(summary);
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

// Fallback route: send index.html for any unmatched GET request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
