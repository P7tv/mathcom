import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAdmin } = useAuth()

  return (
    <nav className="sticky top-0 w-full z-50 backdrop-blur-xl bg-background/60 border-b border-primary/10 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link className="flex items-center gap-3 group" to="/">
          <img src="/assets/all-seeing-eye.png" alt="" className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="font-h1 text-xl font-bold tracking-tight gold-text">MATHCOM</span>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-on-surface/50">{user.nickname || user.firstName}</span>
              <span className="text-on-surface/20 font-mono text-xs">{user.studentId}</span>
            </div>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-primary hover:text-primary/80 text-sm font-bold">Admin</Link>
          )}
          {user ? (
            <button onClick={() => { logout(); navigate('/') }} className="text-on-surface/40 hover:text-tertiary transition-colors text-sm">ออกจากระบบ</button>
          ) : (
            <div className="flex gap-3">
              <button onClick={() => navigate('/leaderboard')} className="text-on-surface/60 hover:text-primary text-sm">Leaderboard</button>
              <button onClick={() => navigate('/lucky-draw')} className="text-on-surface/60 hover:text-primary text-sm">สุ่มผู้โชคดี</button>
              <button onClick={() => navigate('/check')} className="text-on-surface/60 hover:text-primary text-sm">เช็คสถานะ</button>
              <button onClick={() => navigate('/register')} className="btn-primary py-1.5 px-5 text-sm">ลงทะเบียน</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
