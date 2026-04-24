import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import TeamsPage from './pages/TeamsPage'
import GamesPage from './pages/GamesPage'
import LeaderboardPage from './pages/LeaderboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
    </Routes>
  )
}
