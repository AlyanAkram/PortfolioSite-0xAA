import { useState, useEffect } from 'react'

// ── Folder 3-D SVG ────────────────────────────────────────────────────────────
function FolderSVG({ color }) {
  return (
    <svg viewBox="0 0 52 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* shadow */}
      <ellipse cx="26" cy="40" rx="18" ry="2.5" fill="rgba(0,0,0,0.5)" />
      {/* back depth face */}
      <path d="M4 14 L4 36 Q4 38 6 38 L46 38 Q48 38 48 36 L48 14 Z" fill={color + '33'} />
      {/* back tab */}
      <path d="M4 10 Q4 8 6 8 L20 8 L23 12 L48 12 L48 16 L4 16 Z" fill={color + '88'} />
      {/* body */}
      <path d="M4 16 L4 36 Q4 38 6 38 L46 38 Q48 38 48 36 L48 16 Z" fill={color + 'cc'} />
      {/* top edge highlight */}
      <path d="M4 16 L48 16" stroke={color} strokeWidth="0.8" opacity="0.6" />
      {/* shine */}
      <path d="M8 18 L44 18 L44 22 Q26 26 8 22 Z" fill="rgba(255,255,255,0.06)" />
    </svg>
  )
}

// ── Folder icon ───────────────────────────────────────────────────────────────
function FolderIcon({ folder, selected, onClick, onDoubleClick }) {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center gap-2 w-[90px] cursor-pointer px-2 py-2.5 rounded-md transition-all duration-150 select-none"
      style={{
        border: selected
          ? '1px solid rgba(0,200,64,0.35)'
          : '1px solid transparent',
        background: selected
          ? 'rgba(0,200,64,0.10)'
          : 'transparent',
      }}
    >
      {/* 3D folder */}
      <div
        className="w-[52px] h-[42px] transition-transform duration-200"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
          transform: selected ? 'translateY(-3px) scale(1.05)' : '',
        }}
      >
        <FolderSVG color={folder.color} />
      </div>

      <span
        className="text-[11px] text-center leading-snug tracking-[0.5px]"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          color: '#00c840',
          textShadow: '0 0 8px rgba(0,200,64,0.4)',
        }}
      >
        {folder.label}
      </span>
    </div>
  )
}

// ── Window ────────────────────────────────────────────────────────────────────
function Window({ folder, content, onClose }) {
  if (!folder) return null

  return (
    <div
      className="absolute top-[60px] left-1/2 -translate-x-1/2 flex flex-col rounded-lg overflow-hidden"
      style={{
        width: 'min(580px, 90vw)',
        maxHeight: 'calc(100vh - 120px)',
        background: 'rgba(5,12,5,0.97)',
        border: '1px solid rgba(0,200,64,0.25)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,200,64,0.05)',
        zIndex: 30,
      }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-2 px-3.5 py-2.5 flex-shrink-0"
        style={{ background: 'rgba(0,30,0,0.8)', borderBottom: '1px solid rgba(0,200,64,0.15)' }}
      >
        <button
          onClick={onClose}
          className="w-[10px] h-[10px] rounded-full bg-[#ff5f56] hover:opacity-70 transition-opacity"
        />
        <div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
        <div className="w-[10px] h-[10px] rounded-full bg-[#27c93f]" />
        <span
          className="ml-2 text-[12px] tracking-[1px]"
          style={{ fontFamily: "'Share Tech Mono', monospace", color: '#2a7a2a' }}
        >
          {content.title}
        </span>
      </div>

      {/* body */}
      <div className="overflow-y-auto flex-1 px-8 py-7" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
        {content.body}
      </div>
    </div>
  )
}

// ── Window body components ────────────────────────────────────────────────────
const PromptLine = ({ path }) => (
  <p className="text-[12px] mb-5 tracking-[0.5px]" style={{ color: '#1a5a1a' }}>
    <span style={{ color: '#00c840' }}>root@0xAA</span>:~$ {path}
  </p>
)

const SectionTitle = ({ children }) => (
  <h2
    className="text-[16px] mb-4 tracking-[2px]"
    style={{ color: '#00ff55', textShadow: '0 0 10px rgba(0,255,85,0.4)', fontFamily: "'Share Tech Mono', monospace" }}
  >
    {children}
  </h2>
)

const Body = ({ children }) => (
  <p className="text-[14px] leading-[1.8] mb-3" style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a9a4a' }}>
    {children}
  </p>
)

const Tag = ({ children }) => (
  <span
    className="text-[11px] px-2.5 py-1 rounded-sm tracking-[0.5px]"
    style={{
      fontFamily: "'Share Tech Mono', monospace",
      color: '#00c840',
      border: '1px solid rgba(0,200,64,0.3)',
      background: 'rgba(0,200,64,0.05)',
    }}
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
    className="rounded-md p-4 mb-3 transition-all duration-200"
    style={{
      border: '1px solid rgba(0,200,64,0.15)',
      background: 'rgba(0,200,64,0.03)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(0,200,64,0.35)'
      e.currentTarget.style.background = 'rgba(0,200,64,0.06)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(0,200,64,0.15)'
      e.currentTarget.style.background = 'rgba(0,200,64,0.03)'
    }}
  >
    <div
      className="text-[13px] mb-1.5 tracking-[1px]"
      style={{ fontFamily: "'Share Tech Mono', monospace", color: '#00ff55' }}
    >
      ⬡ {title}
    </div>
    <div className="text-[13px] leading-[1.6]" style={{ fontFamily: "'DM Sans', sans-serif", color: '#3a8a3a' }}>
      {desc}
    </div>
    <TagRow tags={tags} />
  </div>
)

const SkillSection = ({ label, tags }) => (
  <div className="mb-4">
    <p className="text-[12px] mb-2 tracking-[1px]" style={{ color: '#00ff55' }}>{label}</p>
    <TagRow tags={tags} />
  </div>
)

const ContactLink = ({ label, text, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2.5 py-3 no-underline transition-colors duration-150 group"
    style={{ borderBottom: '1px solid rgba(0,200,64,0.1)' }}
  >
    <span
      className="text-[11px] w-[70px] tracking-[1px]"
      style={{ fontFamily: "'Share Tech Mono', monospace", color: '#1a5a1a' }}
    >
      {label}
    </span>
    <span
      className="text-[13px] group-hover:text-[#00ff55] transition-colors duration-150"
      style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a9a4a' }}
    >
      {text}
    </span>
  </a>
)

// ── Folder / window data ──────────────────────────────────────────────────────
// Edit this to customise your portfolio content
const FOLDERS = [
  { id: 'about',    label: 'about.me',  color: '#00c840' },
  { id: 'projects', label: 'projects/', color: '#00a030' },
  { id: 'skills',   label: 'skills.sh', color: '#009028' },
  { id: 'contact',  label: 'contact/',  color: '#00b838' },
]

const WINDOW_CONTENT = {
  about: {
    title: '~/about.me',
    body: (
      <>
        <PromptLine path="cat about.me" />
        <SectionTitle>ALYAN AKRAM</SectionTitle>
        <Body>
          22-year-old software engineer &amp; AI builder from Lahore, Pakistan. I design and ship
          AI-powered SaaS products, custom backends, and full-stack web apps that actually work.
        </Body>
        <Body>
          Currently running <span style={{ color: '#00ff55' }}>Pulsark</span> — a software agency
          targeting international startups that want production-grade AI tooling without the bloat.
        </Body>
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
        <ProjectCard
          title="Pulsark — pulsark.dev"
          desc="Software agency landing page. React + Tailwind 4 + Vite. Custom animated ticker, project carousel with pause-on-hover, SPA routing via Vercel."
          tags={['React', 'Tailwind 4', 'Vite', 'Vercel']}
        />
        <ProjectCard
          title="AI SaaS Backend"
          desc="FastAPI backend with OpenAI integration, async task queues, and Postgres. Built for a startup client. Sub-100ms p95 response time."
          tags={['FastAPI', 'PostgreSQL', 'OpenAI']}
        />
        <ProjectCard
          title="0xAA Portfolio"
          desc="This site. Terminal boot screen → retro OS desktop. React single-file component. Because a boring portfolio is a missed pitch."
          tags={['React', 'CSS', 'Vercel']}
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

// ── Desktop ───────────────────────────────────────────────────────────────────
export default function Desktop() {
  const [selected, setSelected] = useState(null)
  const [openFolder, setOpenFolder] = useState(null)
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  function handleIconClick(id) {
    setSelected(id)
  }

  function handleIconDoubleClick(id) {
    setSelected(id)
    setOpenFolder(id)
  }

  function closeWindow() {
    setOpenFolder(null)
    setSelected(null)
  }

  function handleDesktopClick(e) {
    // close if clicking the bare desktop (not a folder or window)
    if (e.target === e.currentTarget) {
      closeWindow()
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* background grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,180,60,0.04) 0%, transparent 70%),' +
            'radial-gradient(ellipse 30% 30% at 20% 80%, rgba(0,100,30,0.05) 0%, transparent 60%),' +
            '#0a0a0a',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,200,64,0.03) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(0,200,64,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* icons area */}
      <div
        className="absolute inset-0 bottom-11 flex flex-col flex-wrap content-start gap-2 p-8"
        onClick={handleDesktopClick}
      >
        {FOLDERS.map(f => (
          <FolderIcon
            key={f.id}
            folder={f}
            selected={selected === f.id}
            onClick={() => handleIconClick(f.id)}
            onDoubleClick={() => handleIconDoubleClick(f.id)}
          />
        ))}
      </div>

      {/* window */}
      {openFolder && (
        <Window
          folder={openFolder}
          content={WINDOW_CONTENT[openFolder]}
          onClose={closeWindow}
        />
      )}

      {/* taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-11 flex items-center px-5 gap-4"
        style={{
          background: 'rgba(5,15,5,0.92)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(0,200,64,0.15)',
          zIndex: 50,
        }}
      >
        <span
          className="text-[14px] tracking-[1px] mr-2"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: '#00c840',
            textShadow: '0 0 10px rgba(0,200,64,0.5)',
          }}
        >
          0xAA
        </span>

        <div className="w-px h-5 bg-[rgba(0,200,64,0.2)]" />

        <span
          className="text-[11px] tracking-[2px]"
          style={{ fontFamily: "'Share Tech Mono', monospace", color: '#1a5a1a' }}
        >
          {openFolder ? `READING ~/\u200b${openFolder}` : 'SYSTEM READY'}
        </span>

        <span
          className="ml-auto text-[12px] tracking-[1px]"
          style={{ fontFamily: "'Share Tech Mono', monospace", color: '#2a7a2a' }}
        >
          {time}
        </span>
      </div>
    </div>
  )
}