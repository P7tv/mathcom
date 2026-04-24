import { Link, useLocation } from 'react-router-dom'

import logo from '../assets/mathcom_logo.png'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/register', label: 'Register' },
  { path: '/teams', label: 'Teams' },
  { path: '/games', label: 'Games' },
  { path: '/leaderboard', label: 'Leaderboard' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="sticky top-0 w-full z-50 flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto bg-white border-b border-zinc-200 shadow-sm">
      <div className="flex items-center gap-8">
        <Link
          className="flex items-center gap-2 text-2xl font-black italic text-[#E7308C] dark:text-[#E7308C]"
          to="/"
        >
          <img src={logo} alt="MathCom Logo" className="h-8 w-auto" />
          MathCom Sport Unity
        </Link>

        <div className="hidden md:flex gap-6 font-['Space_Grotesk'] uppercase tracking-wider text-sm font-bold items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-200 active:scale-95 px-2 py-1 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 ${location.pathname === link.path
                  ? 'text-[#E7308C] border-b-2 border-[#E7308C] pb-1'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-[#E7308C]'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-zinc-600 dark:text-zinc-400 hover:text-[#E7308C] transition-colors active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-zinc-600 dark:text-zinc-400 hover:text-[#E7308C] transition-colors active:scale-95">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
        <button className="bg-[#E7308C] text-white px-4 py-2 rounded font-bold uppercase text-sm tracking-wide hover:bg-pink-600 transition-colors active:scale-95">
          Sign In
        </button>
      </div>
    </nav>
  )
}
