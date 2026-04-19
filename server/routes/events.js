const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const stmt = req.query.upcoming === 'true'
    ? db.prepare("SELECT * FROM events WHERE date >= date('now') ORDER BY date ASC")
    : db.prepare('SELECT * FROM events ORDER BY date ASC');
  res.json(stmt.all());
});

router.get('/:id', (req, res) => {
  const event = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
});

router.post('/', (req, res) => {
  const { title, description, location, country, date, time, host_name, image_url } = req.body;
  if (!title || !location || !country || !date) {
    return res.status(400).json({ error: 'title, location, country, and date are required' });
  }
  const result = db.prepare(`
    INSERT INTO events (title, description, location, country, date, time, host_name, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, description || null, location, country, date, time || null, host_name || null, image_url || null);
  res.status(201).json({ id: result.lastInsertRowid });
});

module.exports = router;
