import { useEffect, useState } from 'react'

const ARCADE = "'Press Start 2P', monospace"

export default function ComingSoonExperience({ onExit }) {
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 600)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: '#0a0410' }}
    >
      {/* scanlines */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)',
          zIndex: 2,
        }}
      />
      {/* glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ width: 480, height: 480, background: 'radial-gradient(circle, rgba(255,0,200,0.18) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 text-center">
        <p
          className="text-[10px] md:text-[12px] tracking-[4px] mb-8"
          style={{ fontFamily: ARCADE, color: '#ff2ea6', textShadow: '0 0 12px rgba(255,46,166,0.6)' }}
        >
          LEVEL 0 — LOCKED
        </p>

        <h1
          className="text-[22px] md:text-[36px] leading-[1.6] mb-8"
          style={{ fontFamily: ARCADE, color: '#4fffb0', textShadow: '0 0 14px rgba(79,255,176,0.5)' }}
        >
          GAME MODE
          <br />
          COMING SOON
        </h1>

        <p
          className="text-[10px] md:text-[11px] max-w-[420px] mx-auto leading-[2] mb-10"
          style={{ fontFamily: ARCADE, color: 'rgba(255,255,255,0.5)' }}
        >
          THIS EXPERIENCE IS UNDER CONSTRUCTION.
          <br />
          CHECK BACK LATER, PLAYER ONE.
        </p>

        <p
          className="text-[12px] mb-10"
          style={{
            fontFamily: ARCADE,
            color: '#ffe14d',
            opacity: blink ? 1 : 0,
            transition: 'opacity 0.1s',
          }}
        >
          PRESS ANY BUTTON TO GO BACK
        </p>

        <button
          onClick={onExit}
          className="text-[11px] px-6 py-3 cursor-pointer"
          style={{
            fontFamily: ARCADE,
            color: '#0a0410',
            background: '#4fffb0',
            border: 'none',
            boxShadow: '0 0 0 2px #0a0410, 0 0 0 4px #4fffb0',
          }}
        >
          ← PROFILES
        </button>
      </div>
    </div>
  )
}
