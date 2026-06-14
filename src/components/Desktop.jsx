import { useState, useEffect } from 'react'
import Window from './Window'
import DesktopBackground from './DesktopBackground'

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA
// ─────────────────────────────────────────────────────────────────────────────

const MONO = "'Share Tech Mono', monospace"
const SANS = "'DM Sans', sans-serif"

const FOLDERS = [
  { id: 'about',    label: 'about.me',  color: '#00c840' },
  { id: 'projects', label: 'projects/', color: '#00a030' },
  { id: 'skills',   label: 'skills.sh', color: '#009028' },
  { id: 'contact',  label: 'contact/',  color: '#00b838' },
]

const RESUME_FILE = { label: 'resume.pdf', color: '#00c8a0', href: '/Alyan_Akram_Resume.pdf' }

// ── Primitives ────────────────────────────────────────────────────────────────

const PromptLine = ({ path }) => (
  <p className="text-[11px] mb-5 tracking-[0.5px]" style={{ color: '#1a5a1a', fontFamily: MONO }}>
    <span style={{ color: '#00c840' }}>alyan@0xAA</span><span style={{ color: '#1a5a1a' }}>:</span><span style={{ color: '#3a8aff' }}>~</span><span style={{ color: '#aaa' }}>$</span>{' '}
    <span style={{ color: '#ccc' }}>{path}</span>
  </p>
)

const SectionTitle = ({ children }) => (
  <h2
    className="text-[13px] mb-5 tracking-[3px] uppercase"
    style={{
      color: '#00ff55',
      fontFamily: MONO,
      borderBottom: '1px solid rgba(0,255,85,0.1)',
      paddingBottom: '10px',
    }}
  >
    {children}
  </h2>
)

const Body = ({ children }) => (
  <p className="text-[14px] leading-[1.85] mb-3.5" style={{ fontFamily: SANS, color: '#7ab87a', fontWeight: 400 }}>
    {children}
  </p>
)

const Highlight = ({ children }) => (
  <span style={{ color: '#00e855', fontWeight: 600 }}>{children}</span>
)

const Tag = ({ children }) => (
  <span
    className="text-[10px] px-2 py-0.5 rounded-sm tracking-[0.5px]"
    style={{
      fontFamily: MONO,
      color: '#00b838',
      border: '1px solid rgba(0,184,56,0.25)',
      background: 'rgba(0,184,56,0.06)',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
)

const TagRow = ({ tags }) => (
  <div className="flex flex-wrap gap-1.5 mt-3">
    {tags.map(t => <Tag key={t}>{t}</Tag>)}
  </div>
)

const Divider = () => (
  <div style={{ height: 1, background: 'rgba(0,200,64,0.07)', margin: '18px 0' }} />
)

const ProjectCard = ({ title, desc, tags, link }) => (
  <div
    className="rounded p-4 mb-3 transition-all duration-200 cursor-default"
    style={{ border: '1px solid rgba(0,200,64,0.12)', background: 'rgba(0,200,64,0.025)' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,64,0.3)'; e.currentTarget.style.background = 'rgba(0,200,64,0.05)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,200,64,0.12)'; e.currentTarget.style.background = 'rgba(0,200,64,0.025)' }}
  >
    <div className="flex items-start justify-between gap-2 mb-2">
      <div className="text-[12px] tracking-[0.8px]" style={{ fontFamily: MONO, color: '#00ff55' }}>
        ▸ {title}
      </div>
      {link && (
        <a href={link} target="_blank" rel="noreferrer"
          className="text-[10px] tracking-[0.5px] no-underline flex-shrink-0"
          style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.4)', border: '1px solid rgba(0,200,64,0.15)', padding: '1px 6px', borderRadius: 2 }}
          onMouseEnter={e => e.currentTarget.style.color = '#00c840'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,200,64,0.4)'}
        >↗ visit</a>
      )}
    </div>
    <div className="text-[13px] leading-[1.65]" style={{ fontFamily: SANS, color: '#5a8a5a' }}>{desc}</div>
    <TagRow tags={tags} />
  </div>
)

const SkillSection = ({ label, tags }) => (
  <div className="mb-5">
    <p className="text-[10px] mb-2.5 tracking-[2.5px]" style={{ color: 'rgba(0,255,85,0.5)', fontFamily: MONO }}>{label}</p>
    <TagRow tags={tags} />
  </div>
)

const ContactLink = ({ label, text, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-3 py-3 no-underline group"
    style={{ borderBottom: '1px solid rgba(0,200,64,0.08)' }}
  >
    <span className="text-[10px] w-[70px] tracking-[1.5px] flex-shrink-0" style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.35)' }}>{label}</span>
    <span
      className="text-[13px] transition-colors duration-150"
      style={{ fontFamily: SANS, color: '#5a9a5a' }}
      onMouseEnter={e => e.currentTarget.style.color = '#00e855'}
      onMouseLeave={e => e.currentTarget.style.color = '#5a9a5a'}
    >
      {text}
    </span>
    <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.4)' }}>↗</span>
  </a>
)

// ── Window body content ───────────────────────────────────────────────────────
const WINDOW_CONTENT = {
  about: {
    title: '~/about.me',
    body: (
      <>
        <PromptLine path="cat about.me" />
        <SectionTitle>ALYAN AKRAM</SectionTitle>
        <Body>
          <Highlight>23-year-old software engineer</Highlight> from Lahore, Pakistan. I build AI-powered SaaS platforms, full-stack web and mobile apps, multiplayer game systems, and scalable backend APIs — across the full lifecycle from architecture to deployment.
        </Body>
        <Body>
          Currently building a <Highlight>software agency</Highlight> targeting international clients who need production-grade software without the bloat. Still in the works — but the work isn't stopping.
        </Body>
        <Body>
          Background in cybersecurity, embedded systems, and aerospace tech. Graduated with a <Highlight>Triple Distinction*</Highlight> in BTEC IT — highest achievable grade.
        </Body>
        <Divider />
        <TagRow tags={['Python', 'FastAPI', 'React', 'React Native', 'TypeScript', 'C++', 'AI/ML', 'SaaS', 'Game Dev', 'Cybersecurity']} />
      </>
    ),
  },
  projects: {
    title: '~/projects/',
    body: (
      <>
        <PromptLine path="ls -la projects/" />
        <SectionTitle>PROJECTS</SectionTitle>
        <ProjectCard
          title="StealthWriter — AI Detection &amp; Humanisation SaaS"
          desc="Full-stack SaaS platform for AI content detection and text humanisation. Shipped as both a web app and an Android app. FastAPI backend with Supabase auth, JWT security, and tiered subscriptions via Stripe (web) and RevenueCat / Google Play Billing (mobile). Managed the full EAS build and Google Play deployment pipeline."
          tags={['Python', 'FastAPI', 'React', 'React Native', 'Expo SDK 54', 'Supabase', 'Stripe', 'RevenueCat', 'Google Play']}
        />
        <ProjectCard
          title="Multiplayer FPS Prototype — Unreal Engine 5"
          desc="Tactical multiplayer FPS inspired by Valorant and CS:GO. Built replicated weapon systems, economy logic, utility mechanics, and real-time multiplayer architecture using Unreal Engine 5 networking and replication."
          tags={['C++', 'Unreal Engine 5', 'Multiplayer Networking', 'Game Dev']}
        />
        <ProjectCard
          title="2D Game Engine — Systems Programming"
          desc="Built a 2D engine from scratch in C++ and SDL2. Implemented the rendering pipeline, object management, game loop architecture, and low-level systems programming fundamentals."
          tags={['C++', 'SDL2', 'Systems Programming']}
        />
        <ProjectCard
          title="QuickKeys — Luxury Car Dealership Site"
          desc="Client project. Clean, responsive dealership website built in React and Tailwind CSS. Focused on premium UI and fast load times."
          tags={['React', 'Tailwind CSS', 'Vercel']}
        />
        <ProjectCard
          title="0xAA Portfolio"
          desc="This site. Terminal boot screen → retro Linux desktop. Because a boring portfolio is a missed pitch."
          tags={['React', 'Three.js', 'Vite', 'Vercel']}
        />
      </>
    ),
  },
  skills: {
    title: '~/skills.sh',
    body: (
      <>
        <PromptLine path="bash skills.sh" />
        <SectionTitle>SKILLS</SectionTitle>
        <SkillSection label="LANGUAGES"  tags={['Python', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Rust']} />
        <SkillSection label="FRONTEND"   tags={['React', 'React Native', 'Expo SDK 54', 'Vite', 'Tailwind CSS v4', 'Responsive UI']} />
        <SkillSection label="BACKEND"    tags={['FastAPI', 'REST APIs', 'JWT Auth', 'Supabase', 'PostgreSQL', 'Stripe']} />
        <SkillSection label="AI / ML"    tags={['LLM Integration', 'AI Detection', 'Humanisation', 'Hugging Face', 'AI API Pipelines']} />
        <SkillSection label="GAME DEV"   tags={['Unreal Engine 5', 'Multiplayer Replication', 'Gameplay Systems', 'SDL2', 'Godot 4']} />
        <SkillSection label="DEVOPS"     tags={['Git', 'Docker', 'Linux', 'Vercel', 'Render', 'EAS Build', 'CI/CD', 'Google Play']} />
        <SkillSection label="MONETISATION" tags={['RevenueCat', 'Stripe', 'Google Play Billing', 'Subscription Tiers', 'In-App Purchases']} />
        <SkillSection label="INTERESTS"  tags={['Cybersecurity', 'Embedded Systems', 'Aerospace Tech', 'SaaS']} />
      </>
    ),
  },
  contact: {
    title: '~/contact/',
    body: (
      <>
        <PromptLine path="ls contact/" />
        <SectionTitle>CONTACT</SectionTitle>
        <Body>
          Open to <Highlight>freelance work</Highlight>, contracts, and interesting problems. International clients welcome. Available immediately — remote or on-site.
        </Body>
        <Divider />
        <div className="mt-1">
          <ContactLink label="EMAIL"    text="alyanakram333@gmail.com"    href="mailto:alyanakram333@gmail.com" />
          <ContactLink label="PHONE"    text="+92 315 443 5572"           href="tel:+923154435572" />
          <ContactLink label="GITHUB"   text="github.com/AlyanAkram"      href="https://github.com/AlyanAkram" />
          <ContactLink label="LINKEDIN" text="linkedin.com/in/alyanakram" href="https://linkedin.com/in/alyanakram" />
        </div>
      </>
    ),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Folder icon — terminal file style
// ─────────────────────────────────────────────────────────────────────────────

function FolderSVG({ color }) {
  return (
    <svg viewBox="0 0 52 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="26" cy="40" rx="18" ry="2.5" fill="rgba(0,0,0,0.5)" />
      <path d="M4 14 L4 36 Q4 38 6 38 L46 38 Q48 38 48 36 L48 14 Z" fill={color + '22'} />
      <path d="M4 10 Q4 8 6 8 L20 8 L23 12 L48 12 L48 16 L4 16 Z" fill={color + '66'} />
      <path d="M4 16 L4 36 Q4 38 6 38 L46 38 Q48 38 48 36 L48 16 Z" fill={color + 'bb'} />
      <path d="M4 16 L48 16" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <path d="M8 18 L44 18 L44 22 Q26 26 8 22 Z" fill="rgba(255,255,255,0.04)" />
    </svg>
  )
}

function FolderIcon({ folder, selected, onClick, onDoubleClick }) {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center gap-1.5 w-[84px] cursor-pointer px-2 py-2 rounded select-none transition-all duration-150"
      style={{
        border:     selected ? '1px solid rgba(0,200,64,0.3)' : '1px solid transparent',
        background: selected ? 'rgba(0,200,64,0.08)' : 'transparent',
      }}
    >
      <div
        className="w-[48px] h-[38px] transition-transform duration-200"
        style={{
          filter:    'drop-shadow(0 4px 10px rgba(0,0,0,0.7))',
          transform: selected ? 'translateY(-2px) scale(1.06)' : '',
        }}
      >
        <FolderSVG color={folder.color} />
      </div>
      <span
        className="text-[10px] text-center leading-snug tracking-[0.4px]"
        style={{ fontFamily: MONO, color: '#00b838', textShadow: '0 0 6px rgba(0,184,56,0.35)' }}
      >
        {folder.label}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop
// ─────────────────────────────────────────────────────────────────────────────


// PDF file icon component
function FileSVG({ color }) {
  return (
    <svg viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="22" cy="50" rx="14" ry="2" fill="rgba(0,0,0,0.45)" />
      <rect x="4" y="2" width="36" height="46" rx="2" fill={color + '18'} stroke={color + '55'} strokeWidth="1" />
      <path d="M28 2 L40 14 L28 14 Z" fill={color + '33'} />
      <path d="M28 2 L28 14 L40 14" stroke={color + '66'} strokeWidth="1" fill="none" />
      <text x="22" y="30" textAnchor="middle" fontSize="9" fontWeight="bold" fill={color} fontFamily="monospace" opacity="0.9">PDF</text>
      <line x1="10" y1="36" x2="34" y2="36" stroke={color + '33'} strokeWidth="1" />
      <line x1="10" y1="40" x2="28" y2="40" stroke={color + '22'} strokeWidth="1" />
    </svg>
  )
}

function ResumeIcon({ file }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={file.href}
      download
      className="flex flex-col items-center gap-1.5 w-[84px] px-2 py-2 rounded select-none transition-all duration-150 no-underline"
      style={{
        border:     hovered ? '1px solid rgba(0,200,160,0.3)' : '1px solid transparent',
        background: hovered ? 'rgba(0,200,160,0.07)' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-[38px] h-[46px] transition-transform duration-200"
        style={{
          filter:    'drop-shadow(0 4px 10px rgba(0,0,0,0.7))',
          transform: hovered ? 'translateY(-2px) scale(1.06)' : '',
        }}
      >
        <FileSVG color={file.color} />
      </div>
      <span
        className="text-[10px] text-center leading-snug tracking-[0.4px]"
        style={{ fontFamily: MONO, color: file.color, textShadow: `0 0 6px ${file.color}55` }}
      >
        {file.label}
      </span>
    </a>
  )
}

export default function Desktop() {
  const [selected,   setSelected]   = useState(null)
  const [openFolder, setOpenFolder] = useState(null)
  const [time,       setTime]       = useState('')
  const [date,       setDate]       = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      setDate(now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  function closeWindow() { setOpenFolder(null); setSelected(null) }

  const content = openFolder ? WINDOW_CONTENT[openFolder] : null

  return (
    <div className="fixed inset-0 overflow-hidden">

      {/* ── Background ──────────────────────────────────────────────────── */}
      <DesktopBackground />

      {/* ── Desktop hint (show on first load) ───────────────────────────── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-[10px] tracking-[2px] pointer-events-none"
        style={{
          top: 16,
          fontFamily: MONO,
          color: 'rgba(0,200,64,0.18)',
          zIndex: 10,
        }}
      >
        DOUBLE-CLICK TO OPEN
      </div>

      {/* ── Folder icons ────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bottom-11 flex flex-col flex-wrap content-start gap-1.5 p-6 pt-10"
        style={{ zIndex: 10 }}
        onClick={e => { if (e.target === e.currentTarget) closeWindow() }}
      >
        {FOLDERS.map(f => (
          <FolderIcon
            key={f.id}
            folder={f}
            selected={selected === f.id}
            onClick={() => setSelected(f.id)}
            onDoubleClick={() => { setSelected(f.id); setOpenFolder(f.id) }}
          />
        ))}
        <ResumeIcon file={RESUME_FILE} />
      </div>

      {/* ── Window ──────────────────────────────────────────────────────── */}
      {openFolder && content && (
        <div className="absolute" style={{ inset: 0, bottom: 44, zIndex: 20, pointerEvents: 'none' }}>
          <Window title={content.title} onClose={closeWindow}>
            {content.body}
          </Window>
        </div>
      )}

      {/* ── Taskbar ─────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-11 flex items-center px-4 gap-3"
        style={{
          background:     'rgba(2,8,2,0.96)',
          backdropFilter: 'blur(16px)',
          borderTop:      '1px solid rgba(0,200,64,0.1)',
          zIndex:         50,
        }}
      >
        {/* Logo/brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div style={{ width: 6, height: 6, borderRadius: 1, background: '#00c840', boxShadow: '0 0 6px rgba(0,200,64,0.8)' }} />
          <span className="text-[13px] tracking-[1.5px]" style={{ fontFamily: MONO, color: '#00c840' }}>0xAA</span>
        </div>

        <div className="w-px h-4" style={{ background: 'rgba(0,200,64,0.15)' }} />

        {/* Status */}
        <span className="text-[10px] tracking-[1.5px]" style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.35)' }}>
          {openFolder ? `~/${openFolder}` : 'IDLE'}
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Date + Time */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.5px]" style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.3)' }}>
            {date}
          </span>
          <div className="w-px h-3" style={{ background: 'rgba(0,200,64,0.12)' }} />
          <span className="text-[11px] tracking-[1px]" style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.55)' }}>
            {time}
          </span>
        </div>
      </div>
    </div>
  )
}