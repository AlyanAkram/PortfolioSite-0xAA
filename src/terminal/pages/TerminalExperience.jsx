import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Terminal from '../components/Terminal'
import Desktop from '../components/Desktop'

/*
  TerminalExperience.jsx
  ──────────────────────────────────────────
  State machine:
    'terminal'   → boot screen plays
    'transition' → terminal fades out, desktop fades in
    'desktop'    → OS desktop fully visible

  The Terminal component calls onDone() when boot completes.
  We then fade both layers using CSS opacity + pointer-events.
*/

export default function TerminalExperience() {
  const navigate = useNavigate()
  const onExit = () => navigate('/')
  const [phase, setPhase] = useState('terminal') // 'terminal' | 'transition' | 'desktop'

  function handleBootDone() {
    setPhase('transition')
    setTimeout(() => setPhase('desktop'), 900)
  }

  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden">
      {phase !== 'desktop' && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: phase === 'transition' ? 0 : 1 }}
        >
          <Terminal onDone={handleBootDone} />
        </div>
      )}

      {phase !== 'terminal' && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: phase === 'desktop' ? 1 : 0 }}
        >
          <Desktop onExit={onExit} />
        </div>
      )}
    </div>
  )
}
