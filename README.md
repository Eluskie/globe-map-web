# globe-map-web

React web demo: toggle between a Mapbox street map and a 3D globe with clickable tags.

Default view starts at **Akazienstraße 10, Berlin**.

## Setup

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
# Add your Mapbox public token to .env
npm run dev
```

Open `http://localhost:5173`.

## Controls

- **Zoom to globe** — zoom out to a 3D Earth
- **Back to map** — return to the last map area
- **Click a tag** — fly to that location

## Stack

Vite, React, TypeScript, Mapbox GL, react-map-gl

## Env

```bash
VITE_MAPBOX_TOKEN=pk.your_mapbox_public_token_here
```

Use a public token restricted to your domains in the Mapbox dashboard.
