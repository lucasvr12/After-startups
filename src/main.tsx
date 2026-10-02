import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PrivacyPage from './PrivacyPage.tsx'

const isPrivacy = window.location.pathname.replace(/\/$/, '') === '/aviso-de-privacidad'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPrivacy ? <PrivacyPage /> : <App />}
  </StrictMode>,
)
