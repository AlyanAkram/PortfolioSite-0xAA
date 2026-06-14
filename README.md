# 0xAA — Portfolio

> A retro Linux desktop OS built in React. Boot sequence, terminal, draggable windows, 3D card — the whole thing.

**Live:** [your-domain.vercel.app](https://your-domain.vercel.app)

---

## What it is

A portfolio site that pretends to be a Linux boot environment. When you land on it, a systemd-style terminal boot sequence plays out line by line, then fades into a desktop with folder icons. Double-clicking a folder opens a window with the content inside. There's a 3D card in the background that tracks your cursor.

No frameworks beyond React. No component libraries. Everything styled by hand.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| 3D Background | Three.js · `@react-three/fiber` · `@react-three/drei` |
| Fonts | Share Tech Mono · DM Sans (Google Fonts) |
| Deployment | Vercel |

---

## Structure

```
src/
├── pages/
│   └── Landing.jsx          # State machine: terminal → transition → desktop
├── components/
│   ├── Terminal.jsx          # Boot sequence, types line by line
│   ├── Desktop.jsx           # Icons, window manager, taskbar, all content
│   ├── Window.jsx            # Reusable window with Linux-style controls
│   └── DesktopBackground.jsx # Three.js 3D card + cursor tracking
└── App.jsx

public/
└── Alyan_Akram_Resume.pdf   # Served at /Alyan_Akram_Resume.pdf
```

---

## How it works

**Boot sequence (`Terminal.jsx`)**
Lines are typed character-by-character using a simple async loop with `setTimeout`. Each line has a configurable `pause_after` so section breaks feel deliberate. Coloured badge prefixes (`[  OK  ]`, `[ WARN ]`, etc.) are split into separate spans and typed independently so the colour lands before the message.

**Desktop (`Desktop.jsx`)**
Folder icons live in a flex-column layout on the left. Single click selects, double-click opens a window. All portfolio content (About, Projects, Skills, Contact) lives in a `WINDOW_CONTENT` map — edit that object to update anything.

**Window (`Window.jsx`)**
Absolute-positioned, centred. Linux-style flat square controls on the right: minimize collapses the body, maximize goes full-screen minus the taskbar. The parent wrapper uses `pointerEvents: none` so icons behind the window stay clickable; the window itself re-enables pointer events with `pointerEvents: auto`.

**3D Background (`DesktopBackground.jsx`)**
A GLB model (ace of spades card) rendered via React Three Fiber. Mouse position is tracked in a ref (not state, to avoid re-renders) and lerped each frame for smooth rotation. Wrapped in `<Float>` for idle animation.

---

## Getting started

```bash
git clone https://github.com/AlyanAkram/portfolio
cd portfolio
npm install
npm run dev
```

Then open `http://localhost:5173`.

---

## Updating content

All portfolio text lives in the `WINDOW_CONTENT` object inside `Desktop.jsx`. Each key maps to a folder:

```js
const WINDOW_CONTENT = {
  about:    { title: '~/about.me',   body: <> ... </> },
  projects: { title: '~/projects/',  body: <> ... </> },
  skills:   { title: '~/skills.sh',  body: <> ... </> },
  contact:  { title: '~/contact/',   body: <> ... </> },
}
```

To update the boot sequence, edit the `LINES` array in `Terminal.jsx`. Each entry takes a `text`, `cls` (controls colour), and optional `pause_after` in milliseconds.

To swap the resume, replace `public/Alyan_Akram_Resume.pdf` and update `RESUME_FILE.href` in `Desktop.jsx` if the filename changes.

---

## Deploying to Vercel

```bash
npm run build
```

Or connect the repo to Vercel — it auto-detects Vite. The `vercel.json` in the root handles SPA routing so direct URLs don't 404.

---

## License

MIT — use it, fork it, make it yours.