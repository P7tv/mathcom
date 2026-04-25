import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import TeamsPage from './pages/TeamsPage'
import GamesPage from './pages/GamesPage'
import LeaderboardPage from './pages/LeaderboardPage'

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />

      {/* Protected Routes - Dashboard & Competition */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <ProtectedRoute>
            <Layout>
              <TeamsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/games"
        element={
          <ProtectedRoute>
            <Layout>
              <GamesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Layout>
              <LeaderboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* Catch all - redirect to home */}
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
