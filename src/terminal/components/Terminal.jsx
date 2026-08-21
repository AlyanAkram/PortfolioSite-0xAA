import { useEffect, useRef } from 'react'

// Fast portfolio boot sequence
const LINES = [
  { text: '┌──────────────────────────────────────────────────────┐', cls: 'frame' },
  { text: '│  ALYAN AKRAM  ·  DEVELOPER PORTFOLIO                │', cls: 'header' },
  { text: '└──────────────────────────────────────────────────────┘', cls: 'frame' },

  { text: '', cls: '' },

  { text: '[ OK ] Initializing portfolio', cls: 'ok' },
  { text: '[ OK ] Loading projects', cls: 'ok' },
  { text: '[ OK ] Loading full-stack systems', cls: 'ok' },
  { text: '[ OK ] Loading AI experiments', cls: 'ok' },

  { text: '', cls: '' },

  { text: '[ 01 ]  Web & Mobile Development', cls: 'project' },
  { text: '[ 02 ]  AI & Automation', cls: 'project' },
  { text: '[ 03 ]  SaaS & Digital Products', cls: 'project' },

  { text: '', cls: '' },

  { text: '[ LIVE ]  stealthwriter.app', cls: 'net' },
  { text: '[ READY ]  Open to international clients', cls: 'note' },

  { text: '', cls: '' },

  { text: 'Loading portfolio...', cls: 'bright' },
  { text: '__PROGRESS__', cls: '' },

  { text: '', cls: '' },
  { text: '✓  SYSTEM READY — Welcome.', cls: 'bright' },
]

// Much faster than the original
const CHAR_SPEED = 1
const LINE_PAUSE = 12

export default function Terminal({ onDone }) {
  const outputRef = useRef(null)
  const doneRef = useRef(false)

  useEffect(() => {
    const out = outputRef.current
    if (!out) return

    let cancelled = false

    const sleep = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    async function typeText(el, text) {
      for (const ch of text) {
        if (cancelled) return
        el.textContent += ch
        await sleep(CHAR_SPEED)
      }
    }

    async function renderLine(line) {
      if (line.text === '') {
        out.appendChild(document.createElement('br'))
        return
      }

      if (line.text === '__PROGRESS__') {
        await runProgress()
        return
      }

      const span = document.createElement('span')
      span.style.display = 'block'

      switch (line.cls) {
        case 'frame':
          span.style.color = '#0d5a0d'
          break

        case 'header':
          span.style.color = '#00e850'
          span.style.fontWeight = 'bold'
          break

        case 'bright':
          span.style.color = '#00ff55'
          span.style.fontWeight = 'bold'
          span.style.textShadow = '0 0 10px rgba(0,255,85,0.5)'
          break

        case 'ok':
          span.style.color = '#2a6a2a'

          out.appendChild(span)

          const okPrefix = document.createElement('span')
          okPrefix.style.color = '#00c840'
          okPrefix.style.fontWeight = 'bold'

          const okText = document.createElement('span')
          okText.style.color = '#2a6a2a'

          span.appendChild(okPrefix)
          span.appendChild(okText)

          await typeText(okPrefix, '[ OK ] ')
          await typeText(okText, line.text.replace('[ OK ] ', ''))
          return

        case 'project':
          span.style.color = '#00b83f'
          break

        case 'net':
          span.style.color = '#00a8ff'
          break

        case 'note':
          span.style.color = '#aacc00'
          break

        default:
          span.style.color = '#00c840'
      }

      out.appendChild(span)
      await typeText(span, line.text)
    }

    async function runProgress() {
      const wrap = document.createElement('div')

      const open = document.createElement('span')
      const bar = document.createElement('span')
      const close = document.createElement('span')

      open.style.color = '#1a4a1a'
      bar.style.color = '#00c840'
      close.style.color = '#1a4a1a'

      open.textContent = '['
      bar.textContent = '░'.repeat(30)
      close.textContent = ']'

      wrap.appendChild(open)
      wrap.appendChild(bar)
      wrap.appendChild(close)

      out.appendChild(wrap)

      const total = 30

      await new Promise((resolve) => {
        let i = 0

        const interval = setInterval(() => {
          if (cancelled) {
            clearInterval(interval)
            resolve()
            return
          }

          i += 3

          bar.textContent =
            '█'.repeat(Math.min(i, total)) +
            '░'.repeat(Math.max(total - i, 0))

          if (i >= total) {
            clearInterval(interval)
            resolve()
          }
        }, 12)
      })
    }

    async function run() {
      for (const line of LINES) {
        if (cancelled) return

        await renderLine(line)

        out.scrollTop = out.scrollHeight

        await sleep(LINE_PAUSE)
      }

      if (!cancelled && !doneRef.current) {
        doneRef.current = true

        await sleep(300)
        onDone()
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [onDone])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020802]">
      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
        }}
      />

      <div
        className="relative z-20 w-full max-w-[720px] mx-4 overflow-hidden"
        style={{
          background: '#010901',
          border: '1px solid rgba(0,200,64,0.18)',
          boxShadow:
            '0 0 80px rgba(0,255,70,0.06), 0 32px 80px rgba(0,0,0,0.9)',
          fontFamily: "'Share Tech Mono', monospace",
          borderRadius: 6,
        }}
      >
        {/* Terminal titlebar */}
        <div
          className="flex items-center px-3 gap-1.5"
          style={{
            height: 32,
            background:
              'linear-gradient(180deg, rgba(0,20,0,0.95) 0%, rgba(0,14,0,0.92) 100%)',
            borderBottom: '1px solid rgba(0,200,64,0.1)',
          }}
        >
          <span style={{ color: 'rgba(0,200,64,0.4)', fontSize: 10, marginRight: 4 }}>▸</span>
          <span style={{ color: 'rgba(0,200,64,0.4)', fontSize: 10, letterSpacing: 1 }}>
            alyan@portfolio — bash — startup
          </span>

          <div className="ml-auto flex gap-1">
            {['−', '□', '✕'].map((icon, i) => (
              <div
                key={i}
                style={{
                  width: 18, height: 18, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(0,200,64,0.12)', borderRadius: 2,
                  color: i === 2 ? 'rgba(200,80,60,0.5)' : 'rgba(0,200,64,0.3)',
                  fontSize: 9, background: 'rgba(0,200,64,0.03)',
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="px-6 py-5">
          <div
            ref={outputRef}
            className="text-[12px] leading-[1.7] min-h-[300px] overflow-y-auto"
            style={{
              color: '#00c840',
              textShadow: '0 0 6px rgba(0,200,64,0.4)',
              maxHeight: '70vh',
            }}
          />
        </div>
      </div>
    </div>
  )
}
