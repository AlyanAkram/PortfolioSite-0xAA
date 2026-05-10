import { useState } from 'react'

/*
  Window.jsx — reusable retro OS window
  ──────────────────────────────────────
  Props:
    title      string          e.g. '~/about.me'
    onClose    () => void      called when red dot clicked
    children   ReactNode       window body content

  Maximize / restore: green dot
  Minimize (hide body, shrink to titlebar): yellow dot
*/

const MONO = "'Share Tech Mono', monospace"

export default function Window({ title, onClose, children }) {
  const [maximized, setMaximized] = useState(false)
  const [minimized, setMinimized] = useState(false)

  // ── geometry ────────────────────────────────────────────────────────────────
  const windowStyle = maximized
    ? {
        // full screen minus taskbar
        top: 0,
        left: 0,
        right: 0,
        bottom: 44,           // taskbar height
        width: '100%',
        maxHeight: 'none',
        transform: 'none',
        borderRadius: 0,
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
      }
    : {
        top: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(600px, 92vw)',
        maxHeight: 'calc(100vh - 120px)',
        borderRadius: 8,
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
      }

  return (
    <div
      className="absolute flex flex-col overflow-hidden"
      style={{
        ...windowStyle,
        background: 'rgba(5,12,5,0.97)',
        border: '1px solid rgba(0,200,64,0.25)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,200,64,0.06)',
        zIndex: 30,
        pointerEvents: 'auto',   // re-enable — parent wrapper has pointerEvents none
      }}
    >
      {/* ── titlebar ─────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-3.5 flex-shrink-0"
        style={{
          height: 36,
          background: 'rgba(0,30,0,0.85)',
          borderBottom: '1px solid rgba(0,200,64,0.15)',
        }}
      >
        {/* red — close */}
        <TrafficDot
          color="#ff5f56"
          hoverColor="#ff3028"
          icon="✕"
          onClick={onClose}
          title="Close"
        />

        {/* yellow — minimize / restore */}
        <TrafficDot
          color="#ffbd2e"
          hoverColor="#e0a000"
          icon="−"
          onClick={() => setMinimized(m => !m)}
          title={minimized ? 'Restore' : 'Minimize'}
        />

        {/* green — maximize / restore */}
        <TrafficDot
          color="#27c93f"
          hoverColor="#1aaa30"
          icon={maximized ? '⤡' : '⤢'}
          onClick={() => {
            setMaximized(m => !m)
            if (minimized) setMinimized(false)   // restore if was minimized
          }}
          title={maximized ? 'Restore' : 'Maximize'}
        />

        {/* title */}
        <span
          className="ml-2 text-[12px] tracking-[1px] truncate"
          style={{ fontFamily: MONO, color: '#2a7a2a' }}
        >
          {title}
        </span>

        {/* right badge: maximized indicator */}
        {maximized && (
          <span
            className="ml-auto text-[10px] tracking-[1.5px] px-2 py-0.5 rounded-sm"
            style={{
              fontFamily: MONO,
              color: '#00c840',
              border: '1px solid rgba(0,200,64,0.25)',
              background: 'rgba(0,200,64,0.08)',
            }}
          >
            FULL
          </span>
        )}
      </div>

      {/* ── body — hidden when minimized ─────────────────────────────────── */}
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

// ── Traffic light dot ─────────────────────────────────────────────────────────
function TrafficDot({ color, hoverColor, icon, onClick, title: tip }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      title={tip}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center rounded-full transition-colors duration-100 cursor-pointer border-none outline-none"
      style={{
        width: 12,
        height: 12,
        background: hovered ? hoverColor : color,
        padding: 0,
        flexShrink: 0,
      }}
    >
      {hovered && (
        <span
          style={{
            fontSize: 8,
            color: 'rgba(0,0,0,0.6)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {icon}
        </span>
      )}
    </button>
  )
}