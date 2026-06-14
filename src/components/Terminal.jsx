import { useEffect, useRef } from 'react'

// Boot sequence — Linux systemd-style
// pause_after: extra ms to wait after this line finishes typing
const LINES = [
  { text: '┌─────────────────────────────────────────────────────────┐', cls: 'frame' },
  { text: '│  ALYAN AKRAM SYSTEMS  ·  kernel v0xAA  ·  arch linux   │', cls: 'header' },
  { text: '└─────────────────────────────────────────────────────────┘', cls: 'frame', pause_after: 120 },
  { text: '', cls: '' },
  { text: '[    0.000000] Booting Linux kernel 6.9.0-0xAA-amd64', cls: 'dim' },
  { text: '[    0.052100]   RAM: 32GB DDR5-6000', cls: 'dim' },
  { text: '[    0.110440]   CPU: AMD Ryzen 9 7950X × 32 threads', cls: 'dim' },
  { text: '[    0.198003]   GPU: NVIDIA RTX 4060 — CUDA 12.4', cls: 'dim', pause_after: 100 },
  { text: '', cls: '' },
  { text: '[  OK  ] Started kernel modules', cls: 'ok' },
  { text: '[  OK  ] Loaded python 3.12 + fastapi 0.115', cls: 'ok' },
  { text: '[  OK  ] Loaded react 18 + vite 6 + tailwind 4', cls: 'ok' },
  { text: '[  OK  ] Loaded langchain + openai sdk', cls: 'ok' },
  { text: '[  OK  ] Loaded docker + github-actions', cls: 'ok', pause_after: 80 },
  { text: '', cls: '' },
  { text: '[  OK  ] Mounted /dev/projects  →  /home/aa/work', cls: 'ok' },
  { text: '[  OK  ] Mounted /dev/pulsark   →  /home/aa/agency', cls: 'ok', pause_after: 80 },
  { text: '', cls: '' },
  { text: '[  NET ] eth0  ↑ ONLINE   — 1Gbps', cls: 'net' },
  { text: '[  NET ] pulsark.dev  ↑ LIVE', cls: 'net', pause_after: 100 },
  { text: '', cls: '' },
  { text: '[ WARN ] coffee.service — caffeine critically low', cls: 'warn' },
  { text: '[ NOTE ] pulsark.dev — open for international clients', cls: 'note', pause_after: 140 },
  { text: '', cls: '' },
  { text: 'Starting desktop environment...', cls: 'bright', pause_after: 60 },
  { text: '__PROGRESS__', cls: '' },
  { text: '', cls: '' },
  { text: '✓  BOOT COMPLETE — Welcome, visitor.', cls: 'bright' },
]

// ms per character while typing
const CHAR_SPEED = 5
// base pause between lines (ms)
const LINE_PAUSE = 25

export default function Terminal({ onDone }) {
  const outputRef = useRef(null)
  const doneRef   = useRef(false)

  useEffect(() => {
    const out = outputRef.current
    if (!out) return
    let cancelled = false

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

    // Type text character-by-character into an already-appended element
    async function typeText(el, text) {
      for (const ch of text) {
        if (cancelled) return
        el.textContent += ch
        await sleep(CHAR_SPEED + Math.random() * 8)
      }
    }

    // Build a styled span for a line, append it, then type into it
    async function renderLine(line) {
      if (line.text === '') {
        out.appendChild(document.createElement('br'))
        return
      }

      const span = document.createElement('span')
      span.style.display = 'block'

      switch (line.cls) {
        case 'bright':
          span.style.color = '#00ff55'
          span.style.fontWeight = 'bold'
          span.style.textShadow = '0 0 10px rgba(0,255,85,0.5)'
          break
        case 'header':
          span.style.color = '#00e850'
          span.style.fontWeight = 'bold'
          break
        case 'frame':
          span.style.color = '#0d5a0d'
          break
        case 'dim':
          span.style.color = '#1e5a1e'
          break
        case 'ok':
          // split prefix from message so we can colour them separately
          span.style.color = '#2a6a2a'
          span.style.display = 'block'
          out.appendChild(span)
          // type prefix
          const okPre = document.createElement('span')
          okPre.style.color = '#00c840'
          okPre.style.fontWeight = 'bold'
          span.appendChild(okPre)
          await typeText(okPre, '[  OK  ] ')
          const okRest = document.createElement('span')
          okRest.style.color = '#2a6a2a'
          span.appendChild(okRest)
          await typeText(okRest, line.text.replace('[  OK  ] ', ''))
          return  // already appended
        case 'net':
          span.style.color = '#2a6a4a'
          out.appendChild(span)
          const netPre = document.createElement('span')
          netPre.style.color = '#00a8ff'
          netPre.style.fontWeight = 'bold'
          span.appendChild(netPre)
          await typeText(netPre, '[  NET ] ')
          const netRest = document.createElement('span')
          netRest.style.color = '#2a6a4a'
          span.appendChild(netRest)
          await typeText(netRest, line.text.replace('[  NET ] ', ''))
          return
        case 'warn':
          span.style.color = '#8a6a00'
          out.appendChild(span)
          const warnPre = document.createElement('span')
          warnPre.style.color = '#ccaa00'
          warnPre.style.fontWeight = 'bold'
          span.appendChild(warnPre)
          await typeText(warnPre, '[ WARN ] ')
          const warnRest = document.createElement('span')
          warnRest.style.color = '#8a6a00'
          span.appendChild(warnRest)
          await typeText(warnRest, line.text.replace('[ WARN ] ', ''))
          return
        case 'note':
          span.style.color = '#6a8a2a'
          out.appendChild(span)
          const notePre = document.createElement('span')
          notePre.style.color = '#aacc00'
          notePre.style.fontWeight = 'bold'
          span.appendChild(notePre)
          await typeText(notePre, '[ NOTE ] ')
          const noteRest = document.createElement('span')
          noteRest.style.color = '#6a8a2a'
          span.appendChild(noteRest)
          await typeText(noteRest, line.text.replace('[ NOTE ] ', ''))
          return
        default:
          span.style.color = '#00c840'
      }

      out.appendChild(span)
      await typeText(span, line.text)
    }

    async function runProgress() {
      const wrap = document.createElement('div')
      const open  = document.createElement('span')
      const bar   = document.createElement('span')
      const close = document.createElement('span')
      open.style.color  = '#1a4a1a'
      bar.style.color   = '#00c840'
      close.style.color = '#1a4a1a'
      open.textContent  = '['
      bar.textContent   = '░'.repeat(40)
      close.textContent = ']'
      wrap.appendChild(open); wrap.appendChild(bar); wrap.appendChild(close)
      out.appendChild(wrap)

      const total = 40
      await new Promise(r => {
        let i = 0
        const iv = setInterval(() => {
          if (cancelled) { clearInterval(iv); r(); return }
          i++
          bar.textContent = '█'.repeat(i) + '░'.repeat(total - i)
          if (i >= total) { clearInterval(iv); r() }
        }, 28)
      })
    }

    async function run() {
      for (const line of LINES) {
        if (cancelled) return

        if (line.text === '__PROGRESS__') {
          await runProgress()
        } else {
          await renderLine(line)
          // scroll to bottom
          out.scrollTop = out.scrollHeight
        }

        await sleep(LINE_PAUSE + (line.pause_after || 0))
      }

      if (!cancelled && !doneRef.current) {
        doneRef.current = true
        await sleep(900)
        onDone()
      }
    }

    run()
    return () => { cancelled = true }
  }, [onDone])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020802]">
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px)' }}
      />

      <div
        className="relative z-20 w-full max-w-[720px] mx-4 overflow-hidden"
        style={{
          background: '#010901',
          border: '1px solid rgba(0,200,64,0.18)',
          boxShadow: '0 0 80px rgba(0,255,70,0.06), 0 32px 80px rgba(0,0,0,0.9)',
          fontFamily: "'Share Tech Mono', monospace",
          borderRadius: 6,
        }}
      >
        {/* Titlebar */}
        <div
          className="flex items-center px-3 gap-1.5"
          style={{
            height: 32,
            background: 'linear-gradient(180deg, rgba(0,20,0,0.95) 0%, rgba(0,14,0,0.92) 100%)',
            borderBottom: '1px solid rgba(0,200,64,0.1)',
          }}
        >
          <span style={{ color: 'rgba(0,200,64,0.4)', fontSize: 10, marginRight: 4 }}>▸</span>
          <span style={{ color: 'rgba(0,200,64,0.4)', fontSize: 10, letterSpacing: 1 }}>alyan@0xAA — bash — BIOS boot</span>
          <div className="ml-auto flex gap-1">
            {['−','□','✕'].map((icon, i) => (
              <div key={i} style={{
                width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,200,64,0.12)', borderRadius: 2,
                color: i === 2 ? 'rgba(200,80,60,0.5)' : 'rgba(0,200,64,0.3)',
                fontSize: 9, cursor: 'default',
                background: 'rgba(0,200,64,0.03)',
              }}>{icon}</div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="px-6 py-5">
          <div
            ref={outputRef}
            className="text-[12px] leading-[1.75] min-h-[300px] overflow-y-auto"
            style={{ color: '#00c840', textShadow: '0 0 6px rgba(0,200,64,0.4)', maxHeight: '70vh' }}
          />
        </div>
      </div>
    </div>
  )
}