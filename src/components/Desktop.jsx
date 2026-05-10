import { useState, useEffect } from 'react'
import Window from './Window'
import DesktopBackground from './DesktopBackground'

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA — edit this section to customise your content
// ─────────────────────────────────────────────────────────────────────────────

const MONO = "'Share Tech Mono', monospace"
const SANS = "'DM Sans', sans-serif"

// Folder definitions
const FOLDERS = [
  { id: 'about',    label: 'about.me',  color: '#00c840' },
  { id: 'projects', label: 'projects/', color: '#00a030' },
  { id: 'skills',   label: 'skills.sh', color: '#009028' },
  { id: 'contact',  label: 'contact/',  color: '#00b838' },
]

// ── Small content primitives ──────────────────────────────────────────────────

const PromptLine = ({ path }) => (
  <p className="text-[12px] mb-5 tracking-[0.5px]" style={{ color: '#1a5a1a', fontFamily: MONO }}>
    <span style={{ color: '#00c840' }}>root@0xAA</span>:~$ {path}
  </p>
)

const SectionTitle = ({ children }) => (
  <h2
    className="text-[16px] mb-4 tracking-[2px]"
    style={{ color: '#00ff55', textShadow: '0 0 10px rgba(0,255,85,0.4)', fontFamily: MONO }}
  >
    {children}
  </h2>
)

const Body = ({ children }) => (
  <p className="text-[14px] leading-[1.8] mb-3" style={{ fontFamily: SANS, color: '#4a9a4a' }}>
    {children}
  </p>
)

const Tag = ({ children }) => (
  <span
    className="text-[11px] px-2.5 py-1 rounded-sm tracking-[0.5px]"
    style={{ fontFamily: MONO, color: '#00c840', border: '1px solid rgba(0,200,64,0.3)', background: 'rgba(0,200,64,0.05)' }}
  >
    {children}
  </span>
)

const TagRow = ({ tags }) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {tags.map(t => <Tag key={t}>{t}</Tag>)}
  </div>
)

const ProjectCard = ({ title, desc, tags }) => (
  <div
    className="rounded-md p-4 mb-3 transition-all duration-200 cursor-default"
    style={{ border: '1px solid rgba(0,200,64,0.15)', background: 'rgba(0,200,64,0.03)' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,64,0.35)'; e.currentTarget.style.background = 'rgba(0,200,64,0.06)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,200,64,0.15)'; e.currentTarget.style.background = 'rgba(0,200,64,0.03)' }}
  >
    <div className="text-[13px] mb-1.5 tracking-[1px]" style={{ fontFamily: MONO, color: '#00ff55' }}>⬡ {title}</div>
    <div className="text-[13px] leading-[1.6]" style={{ fontFamily: SANS, color: '#3a8a3a' }}>{desc}</div>
    <TagRow tags={tags} />
  </div>
)

const SkillSection = ({ label, tags }) => (
  <div className="mb-5">
    <p className="text-[11px] mb-2 tracking-[2px]" style={{ color: '#00ff55', fontFamily: MONO }}>{label}</p>
    <TagRow tags={tags} />
  </div>
)

const ContactLink = ({ label, text, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2.5 py-3 no-underline group"
    style={{ borderBottom: '1px solid rgba(0,200,64,0.1)' }}
  >
    <span className="text-[11px] w-[72px] tracking-[1px]" style={{ fontFamily: MONO, color: '#1a5a1a' }}>{label}</span>
    <span className="text-[13px] group-hover:text-[#00ff55] transition-colors duration-150" style={{ fontFamily: SANS, color: '#4a9a4a' }}>{text}</span>
  </a>
)

// Window body content — keyed by folder id
const WINDOW_CONTENT = {
  about: {
    title: '~/about.me',
    body: (
      <>
        <PromptLine path="cat about.me" />
        <SectionTitle>ALYAN AKRAM</SectionTitle>
        <Body>22-year-old software engineer &amp; AI builder from Lahore, Pakistan. I design and ship AI-powered SaaS products, custom backends, and full-stack web apps that actually work.</Body>
        <Body>Currently running <span style={{ color: '#00ff55' }}>Pulsark</span> — a software agency targeting international startups that want production-grade AI tooling without the bloat.</Body>
        <Body>I like hard problems, clean abstractions, and shipping fast.</Body>
        <TagRow tags={['Python', 'FastAPI', 'React', 'AI/ML', 'SaaS', 'Vite', 'Tailwind', 'Pulsark']} />
      </>
    ),
  },
  projects: {
    title: '~/projects/',
    body: (
      <>
        <PromptLine path="ls -la projects/" />
        <SectionTitle>PROJECTS</SectionTitle>
        <ProjectCard title="Pulsark — pulsark.dev" desc="Software agency landing page. React + Tailwind 4 + Vite. Custom animated ticker, project carousel with pause-on-hover, SPA routing via Vercel." tags={['React', 'Tailwind 4', 'Vite', 'Vercel']} />
        <ProjectCard title="AI SaaS Backend" desc="FastAPI backend with OpenAI integration, async task queues, and Postgres. Built for a startup client. Sub-100ms p95 response time." tags={['FastAPI', 'PostgreSQL', 'OpenAI']} />
        <ProjectCard title="0xAA Portfolio" desc="This site. Terminal boot screen → retro OS desktop. Because a boring portfolio is a missed pitch." tags={['React', 'CSS', 'Vercel']} />
      </>
    ),
  },
  skills: {
    title: '~/skills.sh',
    body: (
      <>
        <PromptLine path="bash skills.sh" />
        <SectionTitle>SKILLS</SectionTitle>
        <SkillSection label="BACKEND"  tags={['Python', 'FastAPI', 'Node.js', 'REST APIs', 'PostgreSQL', 'Redis']} />
        <SkillSection label="FRONTEND" tags={['React', 'Vite', 'Tailwind', 'TypeScript', 'Framer Motion']} />
        <SkillSection label="AI / ML"  tags={['OpenAI API', 'LangChain', 'RAG', 'Fine-tuning', 'Embeddings']} />
        <SkillSection label="DEVOPS"   tags={['Docker', 'Vercel', 'GitHub Actions', 'Linux']} />
      </>
    ),
  },
  contact: {
    title: '~/contact/',
    body: (
      <>
        <PromptLine path="ls contact/" />
        <SectionTitle>CONTACT</SectionTitle>
        <Body>Open to freelance projects, collaborations, and interesting problems. Ping me.</Body>
        <div className="mt-5">
          <ContactLink label="EMAIL"    text="alyan@pulsark.dev"          href="mailto:alyan@pulsark.dev" />
          <ContactLink label="GITHUB"   text="github.com/alyanakram"      href="https://github.com/alyanakram" />
          <ContactLink label="LINKEDIN" text="linkedin.com/in/alyanakram" href="https://linkedin.com/in/alyanakram" />
          <ContactLink label="AGENCY"   text="pulsark.dev"                href="https://pulsark.dev" />
        </div>
      </>
    ),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Folder icon
// ─────────────────────────────────────────────────────────────────────────────

function FolderSVG({ color }) {
  return (
    <svg viewBox="0 0 52 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="26" cy="40" rx="18" ry="2.5" fill="rgba(0,0,0,0.5)" />
      <path d="M4 14 L4 36 Q4 38 6 38 L46 38 Q48 38 48 36 L48 14 Z" fill={color + '33'} />
      <path d="M4 10 Q4 8 6 8 L20 8 L23 12 L48 12 L48 16 L4 16 Z" fill={color + '88'} />
      <path d="M4 16 L4 36 Q4 38 6 38 L46 38 Q48 38 48 36 L48 16 Z" fill={color + 'cc'} />
      <path d="M4 16 L48 16" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <path d="M8 18 L44 18 L44 22 Q26 26 8 22 Z" fill="rgba(255,255,255,0.06)" />
    </svg>
  )
}

function FolderIcon({ folder, selected, onClick, onDoubleClick }) {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center gap-2 w-[90px] cursor-pointer px-2 py-2.5 rounded-md transition-all duration-150 select-none"
      style={{
        border:     selected ? '1px solid rgba(0,200,64,0.35)' : '1px solid transparent',
        background: selected ? 'rgba(0,200,64,0.10)' : 'transparent',
      }}
    >
      <div
        className="w-[52px] h-[42px] transition-transform duration-200"
        style={{
          filter:    'drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
          transform: selected ? 'translateY(-3px) scale(1.05)' : '',
        }}
      >
        <FolderSVG color={folder.color} />
      </div>
      <span
        className="text-[11px] text-center leading-snug tracking-[0.5px]"
        style={{ fontFamily: MONO, color: '#00c840', textShadow: '0 0 8px rgba(0,200,64,0.4)' }}
      >
        {folder.label}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop
// ─────────────────────────────────────────────────────────────────────────────

export default function Desktop() {
  const [selected,   setSelected]   = useState(null)
  const [openFolder, setOpenFolder] = useState(null)
  const [time,       setTime]       = useState('')

  // live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  function closeWindow() { setOpenFolder(null); setSelected(null) }

  const content = openFolder ? WINDOW_CONTENT[openFolder] : null

  return (
    <div className="fixed inset-0 overflow-hidden">

      {/* ── 3-D cursor-reactive background ─────────────────────────────────── */}
      <DesktopBackground />

      {/* ── folder icons ────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bottom-11 flex flex-col flex-wrap content-start gap-2 p-8"
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
      </div>

      {/* ── window ──────────────────────────────────────────────────────────── */}
      {/* pointerEvents none on wrapper so icons behind the window stay clickable */}
      {openFolder && content && (
        <div className="absolute" style={{ inset: 0, bottom: 44, zIndex: 20, pointerEvents: 'none' }}>
          <Window title={content.title} onClose={closeWindow}>
            {content.body}
          </Window>
        </div>
      )}

      {/* ── taskbar ─────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-11 flex items-center px-5 gap-4"
        style={{
          background:     'rgba(4,12,4,0.94)',
          backdropFilter: 'blur(14px)',
          borderTop:      '1px solid rgba(0,200,64,0.15)',
          zIndex:         50,
        }}
      >
        <span className="text-[14px] tracking-[1px] mr-2" style={{ fontFamily: MONO, color: '#00c840', textShadow: '0 0 10px rgba(0,200,64,0.5)' }}>
          0xAA
        </span>

        <div className="w-px h-5" style={{ background: 'rgba(0,200,64,0.2)' }} />

        <span className="text-[11px] tracking-[2px]" style={{ fontFamily: MONO, color: '#1a5a1a' }}>
          {openFolder ? `READING ~/${openFolder}` : 'SYSTEM READY'}
        </span>

        <span className="ml-auto text-[12px] tracking-[1px]" style={{ fontFamily: MONO, color: '#2a7a2a' }}>
          {time}
        </span>
      </div>
    </div>
  )
}