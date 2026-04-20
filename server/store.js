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
  { id: 1, title: 'Midsummer Gathering',    description: 'Annual midsummer celebration on the Stockholm archipelago. Sailing, sauna, and open fires.', location: 'Stockholm',  country: 'Sweden',         date: '2026-06-20', time: '18:00', host_name: 'Lars Eriksson' },
  { id: 2, title: 'Tokyo Chapter Dinner',   description: 'Formal dinner at a traditional kappo restaurant in Ginza. Dress code: smart.',               location: 'Tokyo',       country: 'Japan',          date: '2026-07-12', time: '19:30', host_name: 'Kenji Nakamura' },
  { id: 3, title: 'Patagonia Trek',         description: 'Five-day guided trek through Torres del Paine. Limited to 12 members.',                       location: 'Patagonia',   country: 'Argentina',      date: '2026-09-05', time: '07:00', host_name: 'Diego Morales' },
  { id: 4, title: 'Accra Harvest Festival', description: 'A celebration of harvest season with local food, drumming, and a dawn hike.',                 location: 'Accra',       country: 'Ghana',          date: '2026-10-18', time: '10:00', host_name: 'Samuel Osei' },
  { id: 5, title: 'London Winter Symposium',description: 'Annual meeting with guest speakers, awards, and a black-tie dinner at the Travellers Club.',  location: 'London',      country: 'United Kingdom', date: '2026-12-05', time: '18:30', host_name: 'James Whitmore' },
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
