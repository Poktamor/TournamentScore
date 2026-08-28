import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import ScoreBoard from './ScoreBoard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <ScoreBoard />
  </StrictMode>,
)
