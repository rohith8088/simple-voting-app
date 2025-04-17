const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// ✅ Use OpenShift/Knative-compatible dynamic port
const PORT = process.env.PORT || 8080;

const feedbackFile = path.join(__dirname, 'feedback.json');

app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend

// Load existing feedback or initialize
const getFeedback = () => {
  if (!fs.existsSync(feedbackFile)) return [];
  const data = fs.readFileSync(feedbackFile);
  return JSON.parse(data);
};

// Save new feedback
const saveFeedback = (feedback) => {
  fs.writeFileSync(feedbackFile, JSON.stringify(feedback, null, 2));
};

app.get('/api/feedback', (req, res) => {
  res.json(getFeedback());
});

app.post('/api/feedback', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: 'Missing fields' });

  const feedback = getFeedback();
  feedback.push({ name, message, timestamp: new Date().toISOString() });
  saveFeedback(feedback);

  res.status(201).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
