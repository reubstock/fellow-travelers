const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, '..', 'data', 'fellow_travelers.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    country TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    joined_year INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    country TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT,
    host_name TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    caption TEXT,
    location TEXT,
    year INTEGER,
    filename TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const memberCount = db.prepare('SELECT COUNT(*) as c FROM members').get().c;
if (memberCount === 0) {
  const ins = db.prepare(`
    INSERT INTO members (name, location, country, bio, joined_year)
    VALUES (?, ?, ?, ?, ?)
  `);
  [
    ['James Whitmore', 'London', 'United Kingdom', 'Avid sailor and whisky connoisseur. Has visited 72 countries.', 2026],
    ['Rafael Souza', 'São Paulo', 'Brazil', 'Mountaineer and coffee farmer. Summited Kilimanjaro twice.', 2026],
    ['Kenji Nakamura', 'Tokyo', 'Japan', 'Motorcycle traveler who rode from Tokyo to Istanbul.', 2026],
    ['Matteo Romano', 'Milan', 'Italy', 'Architecture photographer and amateur chef.', 2026],
    ['Samuel Osei', 'Accra', 'Ghana', 'Wildlife conservationist and bush pilot.', 2026],
    ['Lars Eriksson', 'Stockholm', 'Sweden', 'Ice climber and polar expedition veteran.', 2026],
    ['Diego Morales', 'Buenos Aires', 'Argentina', 'Tango teacher by night, fly fisherman by day.', 2026],
    ['Arjun Mehta', 'Mumbai', 'India', 'Historian of the Silk Road and endurance cyclist.', 2026],
  ].forEach(m => ins.run(...m));
}

const eventCount = db.prepare('SELECT COUNT(*) as c FROM events').get().c;
if (eventCount === 0) {
  const ins = db.prepare(`
    INSERT INTO events (title, description, location, country, date, time, host_name)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  [
    ['Midsummer Gathering', 'Annual midsummer celebration on the Stockholm archipelago. Sailing, sauna, and open fires.', 'Stockholm', 'Sweden', '2026-06-20', '18:00', 'Lars Eriksson'],
    ['Tokyo Chapter Dinner', 'Formal dinner at a traditional kappo restaurant in Ginza. Dress code: smart.', 'Tokyo', 'Japan', '2026-07-12', '19:30', 'Kenji Nakamura'],
    ['Patagonia Trek', 'Five-day guided trek through Torres del Paine. Limited to 12 members.', 'Patagonia', 'Argentina', '2026-09-05', '07:00', 'Diego Morales'],
    ['Accra Harvest Festival', 'A celebration of harvest season with local food, drumming, and a dawn hike.', 'Accra', 'Ghana', '2026-10-18', '10:00', 'Samuel Osei'],
    ['London Winter Symposium', 'Annual meeting with guest speakers, awards, and a black-tie dinner at the Travellers Club.', 'London', 'United Kingdom', '2026-12-05', '18:30', 'James Whitmore'],
  ].forEach(e => ins.run(...e));
}

module.exports = db;
