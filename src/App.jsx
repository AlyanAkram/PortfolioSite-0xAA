import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfileSelect from './profileselect'
import TerminalExperience from './terminal/pages/TerminalExperience'
import StandardExperience from './standard/pages/StandardExperience'
import ArcadeExperience from './arcade/pages/ArcadeExperience'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileSelect />} />
        <Route path="/terminal" element={<TerminalExperience />} />
        <Route path="/standard" element={<StandardExperience />} />
        <Route path="/arcade" element={<ArcadeExperience />} />
        <Route path="*" element={<ProfileSelect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
