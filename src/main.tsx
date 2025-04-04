// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import ThemeProviderWrapper from './components/ThemeProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/700.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <Router>
        <App />
      </Router>
    </ThemeProviderWrapper>
  </StrictMode>,
)
