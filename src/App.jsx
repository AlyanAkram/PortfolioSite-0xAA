import { useState } from 'react'
import ProfileSelect from './pages/ProfileSelect'
import TerminalExperience from './pages/TerminalExperience'
import BasicExperience from './pages/BasicExperience'
import ComingSoonExperience from './pages/ComingSoonExperience'

// screen: 'profiles' | 'terminal' | 'basic' | 'game'
function App() {
  const [screen, setScreen] = useState('profiles')

  const goToProfiles = () => setScreen('profiles')

  if (screen === 'terminal') return <TerminalExperience onExit={goToProfiles} />
  if (screen === 'basic') return <BasicExperience onExit={goToProfiles} />
  if (screen === 'game') return <ComingSoonExperience onExit={goToProfiles} />

  return <ProfileSelect onSelect={setScreen} />
}

export default App
