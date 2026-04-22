let nextMemberId = 10;
let nextEventId = 6;

const members = [
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

const events = [
  { id: 1, title: 'SF Dinner — June',       description: 'Monthly dinner at a member\'s home in San Francisco.',                                         location: 'San Francisco', country: 'United States', date: '2026-06-20', time: '18:00', host_name: 'Reuben Steiger' },
  { id: 2, title: 'SF Dinner — July',       description: 'Monthly dinner at a member\'s home in San Francisco.',                                         location: 'San Francisco', country: 'United States', date: '2026-07-12', time: '18:00', host_name: 'Reuben Steiger' },
  { id: 3, title: 'SF Dinner — August',     description: 'Monthly dinner at a member\'s home in San Francisco.',                                         location: 'San Francisco', country: 'United States', date: '2026-08-15', time: '18:00', host_name: 'Reuben Steiger' },
  { id: 4, title: 'Princeton Dinner',       description: 'Dinner at a member\'s home in Princeton, NJ.',                                                 location: 'Princeton',     country: 'United States', date: '2026-10-18', time: '18:30', host_name: 'Reuben Steiger' },
  { id: 5, title: 'Princeton Winter Dinner',description: 'End of year gathering at a member\'s home in Princeton, NJ.',                                  location: 'Princeton',     country: 'United States', date: '2026-12-05', time: '18:30', host_name: 'Reuben Steiger' },
];

const today = () => new Date().toISOString().split('T')[0];

module.exports = {
  members: {
    all: () => [...members].sort((a, b) => a.joined_year - b.joined_year),
    get: (id) => members.find(m => m.id === parseInt(id)) || null,
    insert({ name, location, country, bio, avatar_url, joined_year }) {
      const m = { id: nextMemberId++, name, location, country,
        bio: bio || null, avatar_url: avatar_url || null,
        joined_year: joined_year ? parseInt(joined_year) : null };
      members.push(m);
      return m;
    },
  },
  events: {
    all: () => [...events].sort((a, b) => a.date.localeCompare(b.date)),
    upcoming: () => events.filter(e => e.date >= today()).sort((a, b) => a.date.localeCompare(b.date)),
    get: (id) => events.find(e => e.id === parseInt(id)) || null,
    insert({ title, description, location, country, date, time, host_name }) {
      const e = { id: nextEventId++, title, description: description || null,
        location, country, date, time: time || null, host_name: host_name || null };
      events.push(e);
      return e;
    },
  },
};
