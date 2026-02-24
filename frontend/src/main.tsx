import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router'
import './styles/tailwind.css'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/stats" element={<div>Stats</div>} />
        <Route path="/nites" element={<div>Nites</div>} />
        <Route path="/nites/create" element={<div>Create Nite</div>} />
        <Route path="/nites/:niteId" element={<div>Nite Details</div>} />
        <Route path="/nites/:niteId/edit" element={<div>Edit Nite</div>} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
