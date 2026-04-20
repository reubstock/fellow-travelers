# Fellow Travelers — Project Guide

## What This Is
A website for Fellow Travelers, a men's dinner club that meets globally. Members gather in each other's homes around the world. The tone is bold, adventurous, and fraternal — think explorers, not networking events.

## Running Locally
```bash
npm install
npm start        # runs on http://localhost:3000
npm run dev      # same, with nodemon auto-restart
```
The server seeds members and events on first run. To reset the database, delete `data/fellow_travelers.db` and restart.

## Tech Stack
- **Backend**: Node.js + Express (`server/index.js`)
- **Database**: In-memory JS store (`server/store.js`) — NOT SQLite
- **Frontend**: Vanilla HTML/CSS/JS, no framework
- **Deployment**: Vercel (`vercel.json` routes all traffic through Express)

## IMPORTANT: No SQLite
`node:sqlite` (DatabaseSync) was removed because Vercel's serverless runtime does not support it. All data lives in `server/store.js` as seeded JavaScript arrays. `server/db.js` still exists but is no longer imported by anything — do not re-introduce it.

## File Structure
```
public/
  index.html       — Homepage (hero, events preview, members preview)
  events.html      — "Find Others" page (Leaflet map + event listings)
  members.html     — "Start a Group" page (member directory)
  about.html       — About page (origin story, timeline, membership form)
  css/styles.css   — All styles (dark gold theme)
  js/nav.js        — Active nav link + mobile hamburger toggle
  images/
    hero-map.webp  — Antique sea-monsters map (hero background, 22% opacity)
    hero-train.png — Sepia train illustration (homepage banner)
    logo.png       — Blue-navy woodcut illustration (not currently in nav)

server/
  index.js         — Express app, static file serving, API route mounting
  store.js         — In-memory data store with seeded members and events
  routes/
    members.js     — GET /api/members, GET /api/members/:id, POST /api/members
    events.js      — GET /api/events(?upcoming=true), POST /api/events
```

## Design System
- **Colors**: `--bg: #0d1117`, `--gold: #c9a84c`, `--gold-light: #e8c870`, `--muted: #8b949e`
- **Fonts**: Georgia (serif body), Arial (labels/nav/meta)
- **Theme**: Dark background, gold accents throughout

## Nav Links (all 4 pages)
Home | Find Others (`/events.html`) | Start a Group (`/members.html`) | About (`/about.html`)

## Map (Find Others page)
Uses Leaflet.js with CartoDB Voyager tiles (full color, blue oceans). Events are geocoded via Nominatim with a 1.1s rate-limit delay between requests. Gold dot markers with dark-themed popups.

## Deployment
- **Repo**: https://github.com/reubstock/fellow-travelers
- **Live site**: https://fellow-travelers-eta.vercel.app
- Vercel auto-deploys on push to `main`
- `vercel.json` routes all requests through `server/index.js`
- Node 22 is pinned in `package.json` (`"engines": { "node": "22.x" }`)
- Data does not persist across Vercel cold starts — seeded data is always available

## Content Notes
- The club's fictional backstory runs from 30 BCE (cave in Tsvat) through 2025 (first dinner in SF)
- The tone is playful and mythological — Satoshi Nakamoto and WeWork are referenced in the timeline
- "Membership is earned, not bought" — no dues mentioned anywhere
- The membership application form on About is cosmetic (shows success message, no backend submission)
