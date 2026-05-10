import { useEffect, useRef } from 'react'

// Boot sequence lines — edit freely
const LINES = [
  { text: 'ALYAN AKRAM SYSTEMS v0xAA', cls: 'bright', delay: 0 },
  { text: '─────────────────────────────────────────', cls: 'dim', delay: 0 },
  { text: 'POST check...', cls: '', delay: 0 },
  { text: '  [OK] CPU: Intel i9 × 24 cores', cls: 'dim', delay: 0 },
  { text: '  [OK] RAM: 32GB DDR5', cls: 'dim', delay: 0 },
  { text: '  [OK] GPU: RTX 4060 — for training models obviously', cls: 'dim', delay: 0 },
  { text: '', cls: '', delay: 0 },
  { text: 'Loading kernel modules...', cls: '', delay: 0 },
  { text: '  [OK] python3.xx ................... loaded', cls: 'dim', delay: 0 },
  { text: '  [OK] fastapi / uvicorn ............ loaded', cls: 'dim', delay: 0 },
  { text: '  [OK] react + vite ................. loaded', cls: 'dim', delay: 0 },
  { text: '  [OK] tailwindcss .................. loaded', cls: 'dim', delay: 0 },
  { text: '', cls: '', delay: 0 },
  { text: 'Mounting filesystems...', cls: '', delay: 0 },
  { text: '  /dev/projects → /home/aa/work ........ done', cls: 'dim', delay: 0 },
  { text: '  /dev/skills   → /usr/share/aa ........ done', cls: 'dim', delay: 0 },
  { text: '', cls: '', delay: 0 },
  { text: 'Network interfaces:', cls: '', delay: 0 },
  { text: '  eth0  192.168.0.1  ■ ONLINE', cls: 'dim', delay: 0 },
  { text: '  tun0  vpn0         ■ SECURE', cls: 'dim', delay: 0 },
  { text: '', cls: '', delay: 0 },
  { text: '⚠  WARNING: coffee.service — low caffeine detected', cls: 'warn', delay: 0 },
  { text: '', cls: '', delay: 0 },
  { text: 'Starting desktop environment...', cls: 'bright', delay: 0 },
  { text: '__PROGRESS__', cls: '', delay: 0 },
  { text: '', cls: '', delay: 0 },
  { text: '✓ BOOT COMPLETE — Welcome, visitor.', cls: 'bright', delay: 0 },
]

// Char-by-char typing speed (ms)
const CHAR_SPEED = 0.1

export default function Terminal({ onDone }) {
  const outputRef = useRef(null)
  const doneRef = useRef(false)

  useEffect(() => {
    const out = outputRef.current
    if (!out) return

    let cancelled = false

    async function sleep(ms) {
      return new Promise(r => setTimeout(r, ms))
    }

    async function typeText(el, text) {
      for (const ch of text) {
        if (cancelled) return
        el.textContent += ch
        await sleep(CHAR_SPEED + Math.random() * 2) // add some random variance to make it feel more natural
      }
    }

    async function runProgress(container) {
      const wrap = document.createElement('div')
      wrap.innerHTML = `<span style="color:#1e6a1e">[ </span><span id="pbar" style="color:#00c840">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</span><span style="color:#1e6a1e"> ]</span>`
      container.appendChild(wrap)
      const bar = wrap.querySelector('#pbar')
      await new Promise(r => {
        let i = 0
        const iv = setInterval(() => {
          if (cancelled) { clearInterval(iv); r(); return }
          i++
          bar.textContent = '█'.repeat(i) + '░'.repeat(30 - i)
          if (i >= 30) { clearInterval(iv); r() }
        }, 30)
      })
    }

    async function run() {
      let prevDelay = 0
      for (const line of LINES) {
        if (cancelled) return
        const wait = line.delay - prevDelay
        await sleep(wait)
        prevDelay = line.delay

        if (line.text === '__PROGRESS__') {
          await runProgress(out)
          continue
        }

        const span = document.createElement('span')
        span.style.display = 'block'

        // apply class styling inline so we don't need a stylesheet
        if (line.cls === 'bright') {
          span.style.color = '#00ff55'
          span.style.fontWeight = 'bold'
          span.style.textShadow = '0 0 10px rgba(0,255,85,0.5)'
        } else if (line.cls === 'dim') {
          span.style.color = '#1e6a1e'
        } else if (line.cls === 'warn') {
          span.style.color = '#b8a000'
        } else if (line.cls === 'err') {
          span.style.color = '#cc2200'
        } else {
          span.style.color = '#00c840'
        }

        out.appendChild(span)
        await typeText(span, line.text)
      }

      if (!cancelled && !doneRef.current) {
        doneRef.current = true
        await sleep(1000)
        onDone()
      }
    }

    run()
    return () => { cancelled = true }
  }, [onDone])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]">
      {/* scanlines overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)',
        }}
      />

      {/* CRT frame */}
      <div
        className="relative z-20 w-full max-w-[700px] mx-4 rounded-lg p-8 overflow-hidden"
        style={{
          background: '#020f02',
          border: '2px solid #1a3a1a',
          boxShadow: '0 0 60px rgba(0,255,70,0.08), inset 0 0 80px rgba(0,0,0,0.6)',
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 mb-6 pb-3" style={{ borderBottom: '1px solid #0d2a0d' }}>
          <div className="w-2.5 h-2.5 rounded-full bg-[#3a1a1a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a1a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1a3a1a]" />
          <span className="ml-auto text-[11px] text-[#2a6a2a] tracking-[2px]">BIOS v3.9.1 — 0xAA</span>
        </div>

        {/* output area */}
        <div
          ref={outputRef}
          className="text-[13px] leading-[1.7] min-h-[280px]"
          style={{
            color: '#00c840',
            textShadow: '0 0 8px rgba(0,200,64,0.5)',
          }}
        />

        {/* blinking cursor appended via JS after last line */}
      </div>
    </div>
  )
}