const express = require('express');
const router  = express.Router();
const store   = require('../store');

// GET /api/deeds
router.get('/', (req, res) => {
  res.json(store.deeds.all());
});

// POST /api/deeds
router.post('/', (req, res) => {
  const { title, description, location, country, author } = req.body;
  if (!title || !location || !country) {
    return res.status(400).json({ error: 'title, location and country are required' });
  }
  const deed = store.deeds.insert({ title, description, location, country, author });
  res.status(201).json(deed);
});

module.exports = router;
