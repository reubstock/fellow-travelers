const fs   = require('fs');
const path = require('path');

const IS_VERCEL = !!process.env.VERCEL;
const DATA_DIR  = path.join(__dirname, '..', 'data');

// ── Seed data (used when no persisted file exists) ──────────────────────────

const SEED_MEMBERS = [
  { id: 1, name: 'James Whitmore',  location: 'London',       country: 'United Kingdom', bio: 'Avid sailor and whisky connoisseur. Has visited 72 countries.',         avatar_url: null, joined_year: 2026 },
  { id: 2, name: 'Rafael Souza',    location: 'São Paulo',    country: 'Brazil',         bio: 'Mountaineer and coffee farmer. Summited Kilimanjaro twice.',            avatar_url: null, joined_year: 2026 },
  { id: 3, name: 'Kenji Nakamura',  location: 'Tokyo',        country: 'Japan',          bio: 'Motorcycle traveler who rode from Tokyo to Istanbul.',                  avatar_url: null, joined_year: 2026 },
  { id: 4, name: 'Matteo Romano',   location: 'Milan',        country: 'Italy',          bio: 'Architecture photographer and amateur chef.',                           avatar_url: null, joined_year: 2026 },
  { id: 5, name: 'Samuel Osei',     location: 'Accra',        country: 'Ghana',          bio: 'Wildlife conservationist and bush pilot.',                              avatar_url: null, joined_year: 2026 },
  { id: 6, name: 'Lars Eriksson',   location: 'Stockholm',    country: 'Sweden',         bio: 'Ice climber and polar expedition veteran.',                             avatar_url: null, joined_year: 2026 },
  { id: 7, name: 'Diego Morales',   location: 'Buenos Aires', country: 'Argentina',      bio: 'Tango teacher by night, fly fisherman by day.',                         avatar_url: null, joined_year: 2026 },
  { id: 8, name: 'Arjun Mehta',     location: 'Mumbai',       country: 'India',          bio: 'Historian of the Silk Road and endurance cyclist.',                     avatar_url: null, joined_year: 2026 },
  { id: 9, name: 'Reuben Steiger',  location: 'Princeton',    country: 'United States',  bio: 'Getting stronger with each weakness shared.',                          avatar_url: null, joined_year: 2026 },
];

const SEED_EVENTS = [
  { id: 1, title: 'SF Dinner — June',        description: 'Monthly dinner at a member\'s home in San Francisco.',       location: 'San Francisco', country: 'United States', date: '2026-06-20', time: '18:00', host_name: 'Reuben Steiger' },
  { id: 2, title: 'SF Dinner — July',        description: 'Monthly dinner at a member\'s home in San Francisco.',       location: 'San Francisco', country: 'United States', date: '2026-07-12', time: '18:00', host_name: 'Reuben Steiger' },
  { id: 3, title: 'SF Dinner — August',      description: 'Monthly dinner at a member\'s home in San Francisco.',       location: 'San Francisco', country: 'United States', date: '2026-08-15', time: '18:00', host_name: 'Reuben Steiger' },
  { id: 4, title: 'Princeton Dinner',        description: 'Dinner at a member\'s home in Princeton, NJ.',               location: 'Princeton',     country: 'United States', date: '2026-10-18', time: '18:30', host_name: 'Reuben Steiger' },
  { id: 5, title: 'Princeton Winter Dinner', description: 'End of year gathering at a member\'s home in Princeton, NJ.',location: 'Princeton',     country: 'United States', date: '2026-12-05', time: '18:30', host_name: 'Reuben Steiger' },
];

const SEED_GROUPS = [];

// ── File helpers ─────────────────────────────────────────────────────────────

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function loadCollection(name, seed) {
  if (IS_VERCEL) return [...seed];
  try {
    if (fs.existsSync(filePath(name))) {
      return JSON.parse(fs.readFileSync(filePath(name), 'utf8'));
    }
  } catch (e) {
    console.error(`[store] Could not load ${name}.json:`, e.message);
  }
  return [...seed];
}

function persist(name, data) {
  if (IS_VERCEL) return; // Vercel filesystem is read-only
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(`[store] Could not save ${name}.json:`, e.message);
  }
}

// ── Load collections ─────────────────────────────────────────────────────────

const members = loadCollection('members', SEED_MEMBERS);
const events  = loadCollection('events',  SEED_EVENTS);
const groups  = loadCollection('groups',  SEED_GROUPS);

// Derive next IDs from loaded data
let nextMemberId = members.reduce((max, m) => Math.max(max, m.id), 0) + 1;
let nextEventId  = events.reduce((max, e) => Math.max(max, e.id),  0) + 1;
let nextGroupId  = groups.reduce((max, g) => Math.max(max, g.id),  0) + 1;

const today = () => new Date().toISOString().split('T')[0];

// ── Store API ─────────────────────────────────────────────────────────────────

module.exports = {
  members: {
    all: () => [...members].sort((a, b) => a.joined_year - b.joined_year),
    get: (id) => members.find(m => m.id === parseInt(id)) || null,
    insert({ name, location, country, bio, avatar_url, joined_year }) {
      const m = {
        id: nextMemberId++, name, location, country,
        bio: bio || null, avatar_url: avatar_url || null,
        joined_year: joined_year ? parseInt(joined_year) : null,
      };
      members.push(m);
      persist('members', members);
      return m;
    },
  },

  groups: {
    all: () => [...groups],
    get: (id) => groups.find(g => g.id === parseInt(id)) || null,
    insert({ group_name, description, town, photo_url, founder_id, founder_name }) {
      const g = {
        id: nextGroupId++, group_name,
        description: description || null,
        town: town || null,
        photo_url: photo_url || null,
        founder_id: founder_id || null,
        founder_name: founder_name || null,
        created_at: new Date().toISOString(),
      };
      groups.push(g);
      persist('groups', groups);
      return g;
    },
  },

  events: {
    all: () => [...events].sort((a, b) => a.date.localeCompare(b.date)),
    upcoming: () => events.filter(e => e.date >= today()).sort((a, b) => a.date.localeCompare(b.date)),
    get: (id) => events.find(e => e.id === parseInt(id)) || null,
    insert({ title, description, location, country, date, time, host_name }) {
      const e = {
        id: nextEventId++, title, description: description || null,
        location, country, date, time: time || null, host_name: host_name || null,
      };
      events.push(e);
      persist('events', events);
      return e;
    },
  },
};
