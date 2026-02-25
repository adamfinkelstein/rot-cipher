# ROT-N Cipher

An interactive ROT-N (Caesar cipher) illustration built with React, Bootstrap, and Vite.

🔗 **Live demo**: https://adamfinkelstein.github.io/rot-cipher/

## Features

- Visual cipher wheel showing the rotation of letters
- Adjustable N (0–25) via slider or dropdown
- Encode / Decode toggle
- Only lowercase a–z are shifted; all other characters pass through unchanged
- Character mapping table for all 26 letters

## Tech Stack

- [React](https://react.dev/) — UI framework
- [Bootstrap](https://getbootstrap.com/) — CSS utilities
- [Vite](https://vitejs.dev/) — Build tool
- GitHub Pages — Hosting

## Local Development

```bash
npm install
npm run dev
```

## Preview build locally as it will be at Github

```bash
npm run build    # compiles to the dist/ folder
npm run preview  # serves dist/ locally, usually at http://localhost:4173
```

## Deployment

This project auto-deploys to GitHub Pages via GitHub Actions on every push to `main`.

### Setup (one-time)

1. Push this repo to GitHub (name it `rot-cipher` or update `base` in `vite.config.js`)
2. Go to **Settings → Pages** in your repo
3. Set **Source** to **GitHub Actions**
4. Push to `main` — the workflow deploys automatically
