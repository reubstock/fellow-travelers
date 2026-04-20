const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'docs', 'uploads'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM photos ORDER BY year DESC, created_at DESC').all());
});

router.post('/', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const { title, caption, location, year } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const result = db.prepare(`
    INSERT INTO photos (title, caption, location, year, filename)
    VALUES (?, ?, ?, ?, ?)
  `).run(title, caption || null, location || null, year ? parseInt(year) : null, req.file.filename);
  res.status(201).json({ id: result.lastInsertRowid, filename: req.file.filename });
});

router.delete('/:id', (req, res) => {
  const photo = db.prepare('SELECT * FROM photos WHERE id = ?').get(req.params.id);
  if (!photo) return res.status(404).json({ error: 'Photo not found' });
  db.prepare('DELETE FROM photos WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
