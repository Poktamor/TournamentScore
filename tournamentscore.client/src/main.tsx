import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { createRoot } from 'react-dom/client'
import './main.css'
import ScoreBoard from './ScoreBoard.tsx'
import ScoreBoardControl from './ScoreBoardControl.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ScoreBoard />} />
                <Route path="/ScoreBoard" element={<ScoreBoard />} />
                <Route path="/ScoreBoardControl" element={<ScoreBoardControl />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
