# Portfolio v2 — Three Experiences

Your portfolio now opens on a profile-select screen (Netflix-style) and branches
into three separate experiences. This zip contains only the `src/` folder —
drop it into your existing Vite project (same one this came from) and it
will replace the old `src/`.

## What changed

**Entry point:** `App.jsx` is now a small router with four states:
`profiles → terminal | basic | game`. Each experience gets an `onExit`
callback wired to a "← Profiles" button so you can back out.

- **Terminal** — your original boot-sequence → OS-desktop experience,
  unchanged in look and feel, just refactored.
- **Standard** — a brand-new, normal scrolling website: navbar, hero,
  about, projects, skills, contact, footer. Different type system
  (Fraunces + Inter + IBM Plex Mono) so it doesn't feel like a reskin of
  the terminal.
- **Arcade** — a "coming soon" placeholder with its own pixel/arcade
  styling. Swap this out later once you actually build the game version.

**Content is centralized.** `src/data/profileData.js` holds your bio,
project list, skills, and contact info. Every experience imports from it —
edit copy once, it updates everywhere. I refreshed the content itself too:
added Fenroe, the YouTube automation pipeline, Pulsark Studio, and a few
other things, and reworded the about/skills sections.

**Terminal sections are now modular files**, per your ask:
`components/terminal/sections/{About,Projects,Skills,Contact}.jsx`, each
pulling from `profileData.js`, plus a `primitives.jsx` with the shared
terminal-styled UI atoms (`Tag`, `ProjectCard`, `ContactLink`, etc).
`components/basic/` has the equivalent split for the Standard site.

## Setup notes

1. This assumes your existing project already has `react`, `three`,
   `@react-three/fiber`, `@react-three/drei`, and Tailwind v4 configured
   (all of which the original `Desktop.jsx`/`DesktopBackground.jsx` already
   depended on) — nothing new was added there.
2. `index.css` now pulls in Google Fonts (Share Tech Mono, DM Sans,
   Fraunces, Inter, IBM Plex Mono, Press Start 2P) via `@import url(...)`.
   If you'd rather self-host fonts, swap that line out.
3. `PROFILE.resume` in `profileData.js` still points at
   `/Alyan_Akram_Resume.pdf` — make sure that file exists in your `public/`
   folder (same as before).

## Verified

I scaffolded a throwaway Vite + React + Tailwind v4 project, dropped this
`src/` in, installed `three` / `@react-three/fiber` / `@react-three/drei`,
and ran `npm run build` — it compiles clean with no errors, and `npm run
dev` starts without issue. I did not visually screenshot every screen, so
give it a look in the browser before shipping — especially spacing and
contrast on the new Standard site and the profile-select hover states.

## Next steps / ideas

- Build out the actual Arcade/game experience to replace the placeholder.
- Consider swapping the state-based router for `react-router-dom` if you
  want real URLs per experience (`/terminal`, `/site`, `/game`) — right
  now it's all client state, so a refresh always lands back on the
  profile-select screen.
- The `AceCard` GLB model referenced in `DesktopBackground.jsx`
  (`/AS.glb`) wasn't in the uploaded archive — make sure it's still in
  your `public/` folder.
