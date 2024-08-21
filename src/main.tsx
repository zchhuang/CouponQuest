import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.tsx'
import './index.css'
import secrets from './helpers/secrets.ts'

import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={secrets.clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
