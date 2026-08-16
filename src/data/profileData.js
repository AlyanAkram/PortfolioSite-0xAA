// ─────────────────────────────────────────────────────────────────────────
// profileData.js
// Single source of truth for portfolio content. Every experience (Terminal,
// Basic, Game) reads from this file so copy only needs to be updated once.
// ─────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Alyan Akram",
  handle: "0xAA",
  role: "Self-Taught Full-Stack Engineer & Founder",
  location: "Lahore, Pakistan",
  status: "Available for freelance & full-time roles",
  resume: "/Alyan_Akram_Resume.pdf",
};

export const ABOUT = {
  headline: "I like building things that actually work.",
  paragraphs: [
    "I'm a software engineer and product builder from Lahore, Pakistan. I came into software through building rather than a traditional computer science path, and I've spent the last few years turning ideas into working products — from SaaS platforms and mobile apps to automation systems, developer tools, and game prototypes.",
    "I built StealthWriter from the ground up and took it from an idea to a live product with web and Android applications, payments, authentication, AI pipelines, and production infrastructure. Alongside it, I’m building Fenroe — a software studio focused on custom business systems and AI-powered automation — while also working as a frontend engineer on a React Native employment platform.",
    "My strongest trait is breadth: I enjoy understanding how the whole thing fits together. I can move from a React interface to a FastAPI backend, from a database schema to a deployment pipeline, or from high-level product logic down into C++ and Rust. I'm now deliberately strengthening the computer science fundamentals behind that practical experience — algorithms, data structures, operating systems, networking, and system design.",
  ],
  stack: [
    "Python",
    "FastAPI",
    "React",
    "React Native",
    "JavaScript",
    "PostgreSQL",
    "Supabase",
    "Docker",
    "C++",
    "Rust",
    "AI/ML",
    "SaaS",
  ],
};

export const PROJECTS = [
  {
    title: "StealthWriter",
    subtitle: "AI Detection & Text-Humanization SaaS",
    desc: "Full-stack SaaS platform for AI content detection and text humanization, live since August 2025. Shipped as both a web app and an Android app. FastAPI backend with Supabase auth and Postgres, tiered subscriptions via Stripe on web and RevenueCat / Google Play Billing on mobile. Manages the full EAS build and Play Store deployment pipeline solo.",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "React Native",
      "Expo SDK 54",
      "Supabase",
      "Stripe",
      "RevenueCat",
    ],
    link: "https://stealthwriter.app",
  },
  {
    title: "Fenroe",
    subtitle: "Solo Software Agency",
    desc: "Software agency built and branded from the ground up — positioning, visual identity, and voice — focused on internal business systems and AI automation tooling for international clients who need production-grade software without the bloat.",
    tags: ["Branding", "Systems Design", "AI Automation", "Client Delivery"],
    link: null,
  },
  {
    title: "YouTube Automation Pipeline",
    subtitle: "Modular Content-Production Toolkit",
    desc: "A modular Python system for narrative video channels: two-voice Piper TTS with emotion presets, procedural sound-effect synthesis via numpy DSP, Ken-Burns clip rendering with ffmpeg, clause-level caption timing, and a static-image assembler using the ffmpeg concat demuxer. Locked visual styles across two channel formats.",
    tags: ["Python", "ffmpeg", "TTS", "DSP", "Automation"],
    link: null,
  },
  {
    title: "Pulsark Studio",
    subtitle: "Rust Desktop IDE",
    desc: "A code editor built from scratch in Rust with egui. Syntax highlighting via syntect with a hash-based highlight cache, a Find overlay module, and gutter-aligned line numbers, built against a seven-phase roadmap covering editor core, terminal subsystem, LSP, and an AI layer.",
    tags: ["Rust", "egui", "Systems Programming"],
    link: null,
  },
  {
    title: "Multiplayer FPS Prototype",
    subtitle: "Unreal Engine 5",
    desc: "Tactical multiplayer FPS inspired by Valorant and CS:GO. Replicated weapon systems, round economy logic, utility mechanics, and real-time multiplayer architecture built on UE5 networking and replication.",
    tags: ["C++", "Unreal Engine 5", "Multiplayer Networking"],
    link: null,
  },
  {
    title: "2D Game Engine",
    subtitle: "Systems Programming in C++",
    desc: "A 2D engine built from scratch in C++ and SDL2 — rendering pipeline, object management, game loop architecture, and low-level systems programming fundamentals.",
    tags: ["C++", "SDL2", "Systems Programming"],
    link: null,
  },
  {
    title: "QuickKeys",
    subtitle: "Luxury Car Dealership Site",
    desc: "Client project. A clean, responsive dealership website with a full multi-page structure and animated homepage sections, focused on premium UI and fast load times.",
    tags: ["React", "Tailwind CSS", "Vercel"],
    link: null,
  },
];

export const SKILLS = [
  {
    label: "LANGUAGES",
    tags: ["Python", "C++", "JavaScript", "TypeScript", "SQL", "Rust"],
  },
  {
    label: "FRONTEND",
    tags: [
      "React",
      "React Native",
      "Expo SDK 54",
      "Vite",
      "Tailwind CSS",
      "Three.js",
    ],
  },
  {
    label: "BACKEND",
    tags: [
      "FastAPI",
      "REST APIs",
      "JWT Auth",
      "Supabase",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    label: "AI / ML",
    tags: [
      "LLM Integration",
      "AI Detection",
      "Text Humanization",
      "Hugging Face",
      "AI Pipelines",
    ],
  },
  {
    label: "GAME DEV",
    tags: ["Unreal Engine 5", "Godot 4", "SDL2", "Multiplayer Replication"],
  },
  {
    label: "AUTOMATION",
    tags: ["ffmpeg", "Piper TTS", "Procedural SFX", "Pipeline Tooling"],
  },
  {
    label: "DEVOPS",
    tags: ["Git", "Docker", "Linux", "Vercel", "EAS Build", "CI/CD"],
  },
  {
    label: "SECURITY & INTERESTS",
    tags: [
      "TryHackMe (AceA3)",
      "Cybersecurity",
      "Retro / CRT Computing",
      "Embedded Systems",
    ],
  },
];

export const CONTACT = {
  intro:
    "Open to freelance work, contracts, and full-time roles at startups and portfolio-first companies. International clients welcome, remote or on-site.",
  links: [
    {
      label: "EMAIL",
      text: "alyanakram333@gmail.com",
      href: "mailto:alyanakram333@gmail.com",
    },
    { label: "PHONE", text: "+92 315 443 5572", href: "tel:+923154435572" },
    {
      label: "GITHUB",
      text: "github.com/AlyanAkram",
      href: "https://github.com/AlyanAkram",
    },
    {
      label: "LINKEDIN",
      text: "linkedin.com/in/alyanakram",
      href: "https://linkedin.com/in/alyanakram",
    },
  ],
};

export const NOW_BUILDING = [
  "Closing CS-fundamentals gaps — Big O, data structures, system design",
  "Shipping StealthWriter v2 subscription flows",
  "Contracting as frontend engineer on a Saudi-based employment app (NDA)",
  "Rebuilding this portfolio into three experiences",
];
