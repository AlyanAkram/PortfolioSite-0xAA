import { useState } from 'react'

const MONO = "'Share Tech Mono', monospace"

export default function Window({ title, onClose, children }) {
  const [maximized, setMaximized] = useState(false)
  const [minimized, setMinimized] = useState(false)

  const windowStyle = maximized
    ? {
        top: 0, left: 0, right: 0, bottom: 44,
        width: '100%', maxHeight: 'none',
        transform: 'none', borderRadius: 0,
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
      }
    : {
        top: 60, left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(600px, 92vw)',
        maxHeight: 'calc(100vh - 120px)',
        borderRadius: 6,
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
      }

  return (
    <div
      className="absolute flex flex-col overflow-hidden"
      style={{
        ...windowStyle,
        background: 'rgba(5,12,5,0.97)',
        border: '1px solid rgba(0,200,64,0.22)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.85), 0 0 40px rgba(0,200,64,0.05)',
        zIndex: 30,
        pointerEvents: 'auto', // re-enable — parent wrapper has pointerEvents none
      }}
    >
      {/* ── titlebar ───────────────────────────────────────────────────── */}
      <div
        className="flex items-center px-3 flex-shrink-0"
        style={{
          height: 34,
          background: 'linear-gradient(180deg, rgba(0,22,0,0.95) 0%, rgba(0,16,0,0.92) 100%)',
          borderBottom: '1px solid rgba(0,200,64,0.12)',
        }}
      >
        {/* title — left */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span style={{ color: 'rgba(0,200,64,0.4)', fontSize: 10, fontFamily: MONO, flexShrink: 0 }}>▸</span>
          <span
            className="text-[11px] tracking-[0.8px] truncate"
            style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.5)' }}
          >
            {title}
          </span>
        </div>

        {/* Linux-style flat square controls — right side */}
        <div className="flex items-center gap-1 ml-3 flex-shrink-0">
          <WinBtn icon="−" title={minimized ? 'Restore' : 'Minimize'} onClick={() => setMinimized(m => !m)} />
          <WinBtn icon="□" title={maximized ? 'Restore' : 'Maximize'} onClick={() => { setMaximized(m => !m); if (minimized) setMinimized(false) }} />
          <WinBtn icon="✕" title="Close" onClick={onClose} isClose />
        </div>
      </div>

      {/* ── body ───────────────────────────────────────────────────────── */}
      {!minimized && (
        <div
          className="overflow-y-auto flex-1 px-8 py-7"
          style={{ fontFamily: MONO }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

function WinBtn({ icon, title: tip, onClick, isClose }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      title={tip}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center transition-all duration-100 cursor-pointer border-none outline-none rounded-sm"
      style={{
        width: 22, height: 22, padding: 0, flexShrink: 0,
        background: hovered
          ? (isClose ? 'rgba(220,60,40,0.18)' : 'rgba(0,200,64,0.12)')
          : 'rgba(0,200,64,0.04)',
        border: `1px solid ${hovered
          ? (isClose ? 'rgba(220,80,60,0.45)' : 'rgba(0,200,64,0.3)')
          : 'rgba(0,200,64,0.12)'}`,
      }}
    >
      <span style={{
        fontSize: isClose ? 9 : 11,
        color: hovered
          ? (isClose ? 'rgba(255,100,80,1)' : 'rgba(0,255,85,0.9)')
          : (isClose ? 'rgba(220,80,60,0.6)' : 'rgba(0,200,64,0.45)'),
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        fontFamily: MONO, fontWeight: isClose ? 700 : 400,
      }}>
        {icon}
      </span>
    </button>
  )
}