import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router'
import './styles/tailwind.css'
import './styles/global.css'
import type { Nite } from './types'
import Home from './pages/Home'
import Show from './pages/Show'
import Create from './pages/Create'
import Settings from './pages/Settings'

async function init() {
  const response = await fetch(`${import.meta.env.BASE_URL}data/nites.json`)
  const text = await response.text()
  return JSON.parse(text)
}

const nites: Nite[] = await init()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home nites={nites} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/stats" element={<div>Stats</div>} />
        <Route path="/nites" element={<Show nites={nites} />} />
        <Route path="/nites/create" element={<Create nites={nites} />} />
        <Route path="/nites/:niteId" element={<div>Edit Nite</div>} />
        <Route path="/*" element={<div>Not found</div>} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
