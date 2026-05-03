import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/mathcom_logo.png'

const navLinks = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/games', label: 'Games' },
  { path: '/leaderboard', label: 'Leaderboard' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const team = user?.team ? {
    name: user.team,
    icon: user.teamIcon || '🏅',
    color: user.teamColor || '#FF6B9D',
  } : null

  return (
    <nav
      className="sticky top-0 w-full z-50 flex justify-between items-center px-8 py-4 border-b shadow-lg backdrop-blur-lg"
      style={{
        backgroundColor: 'rgba(26, 31, 58, 0.8)',
        borderColor: 'rgba(0, 212, 255, 0.2)',
      }}
    >
      <div className="flex items-center gap-8">
        <Link className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" to="/dashboard">
          <img src={logo} alt="MathCom Logo" className="h-8 w-auto drop-shadow-lg" />
          <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent font-h2 text-[24px]">
            CU Sport Unity
          </span>
        </Link>

        <div className="hidden md:flex gap-6 uppercase tracking-wider text-sm font-semibold items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-200 active:scale-95 px-3 py-2 rounded-lg ${
                location.pathname === link.path
                  ? 'bg-primary text-white font-bold shadow-lg'
                  : 'text-on-surface-variant hover:text-primary hover:bg-primary/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Team Badge */}
        {user && team && (
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-surface/50 border border-outline/30 rounded-lg">
            <span className="text-2xl">{team.icon}</span>
            <div className="text-sm">
              <div className="text-xs text-on-surface-variant">Your Team</div>
              <div className="font-semibold text-on-surface">{team.name.split(' ')[0]}</div>
            </div>
          </div>
        )}

        <button className="text-on-surface-variant hover:text-primary transition-colors active:scale-95 p-2 rounded-lg hover:bg-primary/10">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-on-surface">{user.name || user.studentId}</div>
              <div className="text-xs text-on-surface-variant">{user.studentId}</div>
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="px-6 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg font-bold text-sm transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-sm tracking-wide hover:shadow-lg transition-all active:scale-95"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}
