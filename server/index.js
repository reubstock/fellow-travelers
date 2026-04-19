const express = require('express');
const path = require('path');
const fs = require('fs');

// Ensure data and uploads directories exist
['data', 'public/uploads'].forEach(dir => {
  const full = path.join(__dirname, '..', dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/members', require('./routes/members'));
app.use('/api/events', require('./routes/events'));
app.use('/api/photos', require('./routes/photos'));

// SPA fallback — serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Fellow Travelers running at http://localhost:${PORT}`));
