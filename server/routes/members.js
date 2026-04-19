const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM members ORDER BY joined_year ASC').all());
});

router.get('/:id', (req, res) => {
  const member = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

router.post('/', (req, res) => {
  const { name, location, country, bio, avatar_url, joined_year } = req.body;
  if (!name || !location || !country) {
    return res.status(400).json({ error: 'name, location, and country are required' });
  }
  const result = db.prepare(`
    INSERT INTO members (name, location, country, bio, avatar_url, joined_year)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(name, location, country, bio || null, avatar_url || null, joined_year ? parseInt(joined_year) : null);
  res.status(201).json({ id: result.lastInsertRowid });
});

module.exports = router;
