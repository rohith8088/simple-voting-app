const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let votes = {
    party1: 0,
    party2: 0,
    party3: 0,
    party4: 0
};

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Route to get the current vote counts in JSON
app.get('/votes', (req, res) => {
    res.json(votes);
});

// Route to get a vote summary string
app.get('/votes/summary', (req, res) => {
    const summary = `Votes: ${votes.party1} - ${votes.party2} - ${votes.party3} - ${votes.party4}`;
    res.send(summary);
});

// Route to vote for a specific party
app.post('/vote/:party', (req, res) => {
    const party = req.params.party;
    if (votes.hasOwnProperty(party)) {
        votes[party]++;
        res.status(200).json({ message: 'Vote counted' });
    } else {
        res.status(400).json({ message: 'Invalid party' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
