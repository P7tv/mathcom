import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const TEAMS = [
  { id: 1, name: 'Thunder Dragons', icon: '⚡', color: '#FF6B9D' },
  { id: 2, name: 'Phoenix Strikers', icon: '🔥', color: '#FF9F43' },
  { id: 3, name: 'Titan Guardians', icon: '💪', color: '#A29BFE' },
  { id: 4, name: 'Shadow Wolves', icon: '🌙', color: '#2C3E50' },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!studentId || !password) {
      setError('Please fill in all fields')
      return
    }

    if (login(studentId, password)) {
      navigate('/dashboard')
    } else {
      setError('Invalid credentials. Try any Student ID and password.')
    }
  }

  return (
    <div
      className="min-h-screen bg-background text-on-background flex items-center justify-center p-4"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)
        `,
      }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Teams */}
        <div className="hidden md:flex flex-col justify-center space-y-8">
          <div>
            <h1 className="font-h1 text-5xl font-bold text-primary mb-4">
              CU Sport
              <br />
              <span className="text-secondary">Unity</span>
            </h1>
            <p className="text-on-surface text-lg">
              Join the ultimate inter-faculty sports competition
            </p>
          </div>

          {/* Elite Teams (Static) */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-on-surface-variant italic">Elite Cosmic Teams:</p>
            <div className="grid grid-cols-2 gap-3">
              {TEAMS.map((team) => (
                <div
                  key={team.id}
                  className="p-4 rounded-lg border border-outline/20 bg-surface/20 transition-all hover:bg-surface/30"
                  style={{
                    borderColor: `${team.color}40`,
                  }}
                >
                  <div className="text-3xl mb-2">{team.icon}</div>
                  <div className="text-sm font-semibold text-on-surface">{team.name}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-on-surface-variant/60 italic">
              ✦ Teams are automatically assigned to students by the Cosmic Oracle ✦
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline/20">
            <div>
              <div className="text-2xl font-bold text-secondary">4</div>
              <div className="text-xs text-on-surface-variant">Teams</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-tertiary">120+</div>
              <div className="text-xs text-on-surface-variant">Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-xs text-on-surface-variant">Matches</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="backdrop-blur-lg bg-surface/40 border border-outline/20 rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
            <p className="text-on-surface-variant text-sm mb-8">Sign in to compete with your team</p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Student ID */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your student ID"
                  className="w-full px-4 py-3 bg-surface/50 border border-outline/30 rounded-lg text-on-surface placeholder-on-surface/40 focus:border-primary focus:bg-surface/80 transition-colors outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-surface/50 border border-outline/30 rounded-lg text-on-surface placeholder-on-surface/40 focus:border-primary focus:bg-surface/80 transition-colors outline-none"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-on-surface-variant cursor-pointer">
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all active:scale-95"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-outline/20"></div>
              <span className="text-xs text-on-surface-variant">OR</span>
              <div className="flex-1 h-px bg-outline/20"></div>
            </div>

            {/* Register Link */}
            <div className="text-center text-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link to="/register" className="text-secondary hover:text-tertiary font-semibold transition-colors">
                Register here
              </Link>
            </div>
          </div>

          {/* Demo Hint */}
          <p className="text-center text-xs text-on-surface-variant mt-6 px-4">
            💡 For demo: use any Student ID and any password
          </p>
        </div>
      </div>
    </div>
  )
}
