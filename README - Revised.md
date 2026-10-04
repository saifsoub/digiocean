# digiocean — plain-language README

## What this is
A copy of DigitalOcean's sample Next.js website. It is used to try out DigitalOcean App Platform, a hosting service. It is not a custom app; the home page just says "Welcome to Your Next.js App".

## Who it's for
Seif, for testing hosting on DigitalOcean.

## What it does today
- Shows a basic sample web page (`pages/`).
- Includes DigitalOcean hosting settings (`.do/`).
- `sammy.js` is a large script from the sample. Its role is not yet confirmed.

## How to run it
You need Node.js.
```bash
npm install
npm run dev
```
Check `package.json` for the exact commands (not yet confirmed).

To host it: in the DigitalOcean control panel, create an app from this repo. **Hosting costs money while it runs**, so delete the app from DigitalOcean when you're done.

## Current status and known gaps
- Sample only; no custom features.
- The repo retirement plan in `General-Requests` lists it for archiving.
- Whether a DigitalOcean app is still running from it: not yet confirmed. If one is, it may still be costing money.

## Where things live
| Folder / file | What's in it |
|---|---|
| `pages/` | Web pages |
| `public/` | Images and static files |
| `.do/` | DigitalOcean settings |
| `next.config.js` | Website settings |
