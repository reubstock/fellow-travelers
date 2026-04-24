const express = require('express');
const router = express.Router();
const store = require('../store');

router.get('/', (req, res) => {
  res.json(store.groups.all());
});

// POST /api/groups
// Body: { founder_name, town, group_name, description, photo_url }
// If founder_name doesn't match an existing member, a new member record is created.
router.post('/', (req, res) => {
  const { founder_name, town, group_name, description, photo_url } = req.body;
  if (!founder_name || !group_name) {
    return res.status(400).json({ error: 'founder_name and group_name are required' });
  }

  // Find or create the member
  let member = store.members.all().find(
    m => m.name.toLowerCase() === founder_name.trim().toLowerCase()
  );
  if (!member) {
    member = store.members.insert({
      name: founder_name.trim(),
      location: town || 'Unknown',
      country: 'Unknown',
      joined_year: new Date().getFullYear(),
    });
  }

  const group = store.groups.insert({
    group_name: group_name.trim(),
    description,
    town,
    photo_url: photo_url || null,
    founder_id: member.id,
    founder_name: member.name,
  });

  res.status(201).json(group);
});

module.exports = router;
