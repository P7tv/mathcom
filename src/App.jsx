import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import LeaderboardPage from './pages/LeaderboardPage'

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
  if (!user) return <Navigate to="/check" replace />
  return children
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/check" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />

      {/* Protected Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/admin" element={<AdminPage />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
