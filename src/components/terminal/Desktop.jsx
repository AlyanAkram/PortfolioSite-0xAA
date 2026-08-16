import { useState, useEffect } from 'react'
import Window from './Window'
import DesktopBackground from './DesktopBackground'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import { PROFILE } from '../../data/profileData'

const MONO = "'Share Tech Mono', monospace"

const FOLDERS = [
  { id: 'about',    label: 'about.me',  color: '#00c840' },
  { id: 'projects', label: 'projects/', color: '#00a030' },
  { id: 'skills',   label: 'skills.sh', color: '#009028' },
  { id: 'contact',  label: 'contact/',  color: '#00b838' },
]

const RESUME_FILE = { label: 'resume.pdf', color: '#00c8a0', href: PROFILE.resume }

const WINDOW_CONTENT = {
  about:    { title: '~/about.me',  body: <About /> },
  projects: { title: '~/projects/', body: <Projects /> },
  skills:   { title: '~/skills.sh', body: <Skills /> },
  contact:  { title: '~/contact/',  body: <Contact /> },
}

// ── Folder icon — terminal file style ──────────────────────────────────────
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

// ── Resume file icon ────────────────────────────────────────────────────────
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

// ── Desktop ──────────────────────────────────────────────────────────────────
export default function Desktop({ onExit }) {
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
      <DesktopBackground />

      <div
        className="absolute left-1/2 -translate-x-1/2 text-[10px] tracking-[2px] pointer-events-none"
        style={{ top: 16, fontFamily: MONO, color: 'rgba(0,200,64,0.18)', zIndex: 10 }}
      >
        DOUBLE-CLICK TO OPEN
      </div>

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
        <div className="flex items-center gap-2 flex-shrink-0">
          <div style={{ width: 6, height: 6, borderRadius: 1, background: '#00c840', boxShadow: '0 0 6px rgba(0,200,64,0.8)' }} />
          <span className="text-[13px] tracking-[1.5px]" style={{ fontFamily: MONO, color: '#00c840' }}>{PROFILE.handle}</span>
        </div>

        <div className="w-px h-4" style={{ background: 'rgba(0,200,64,0.15)' }} />

        <span className="text-[10px] tracking-[1.5px]" style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.35)' }}>
          {openFolder ? `~/${openFolder}` : 'IDLE'}
        </span>

        <div className="flex-1" />

        {onExit && (
          <button
            onClick={onExit}
            className="text-[10px] tracking-[1.5px] px-2 py-1 rounded-sm border-none cursor-pointer"
            style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.45)', background: 'rgba(0,200,64,0.06)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#00e855'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,200,64,0.45)'}
          >
            ← PROFILES
          </button>
        )}

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
