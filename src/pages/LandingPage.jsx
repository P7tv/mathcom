import { useNavigate } from 'react-router-dom'
import Starfield from '../components/Starfield'

const TEAMS = [
  {
    id: 1,
    name: 'Thunder Dragons',
    icon: '⚡',
    color: '#FF6B9D',
    description: 'Fast, powerful, unstoppable',
  },
  {
    id: 2,
    name: 'Phoenix Strikers',
    icon: '🔥',
    color: '#FF9F43',
    description: 'Rising from the flames of victory',
  },
  {
    id: 3,
    name: 'Titan Guardians',
    icon: '💪',
    color: '#A29BFE',
    description: 'Strength meets strategy',
  },
  {
    id: 4,
    name: 'Shadow Wolves',
    icon: '🌙',
    color: '#2C3E50',
    description: 'Silent, swift, supreme',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-on-background overflow-hidden relative">
      {/* Cosmic Background */}
      <Starfield />
      <div className="nebula" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-surface/10 border-b border-outline/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-h1 text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent neon-text">
            ✦ CU Sport Unity ✦
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-on-surface hover:text-primary transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all active:scale-95 font-bold"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-4 text-center min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          {/* Cosmic Glow Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}} />
          </div>

          <div className="relative z-10">
            <div className="mb-6 text-6xl animate-bounce">✦</div>

            <h1 className="font-h1 text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="neon-primary">Battle</span>
              <br />
              <span className="neon-secondary">for Glory</span>
            </h1>

            <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
              Witness the greatest inter-faculty sports competition in the cosmos.
              Where champions rise, legends are born, and teams clash for eternal glory.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg shadow-glow-lg hover:shadow-neon transition-all active:scale-95 text-lg neon-text"
                style={{
                  boxShadow: '0 0 20px rgba(255, 107, 157, 0.6), 0 0 40px rgba(78, 205, 196, 0.3)',
                }}
              >
                🚀 Join the Battle
              </button>
              <button
                onClick={() => window.scrollTo(0, window.innerHeight)}
                className="px-8 py-4 border-2 border-outline text-on-surface font-bold rounded-lg hover:bg-outline/10 hover:shadow-glow-cyan transition-all active:scale-95 text-lg"
              >
                ✧ Explore Teams
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-surface/10 backdrop-blur-sm border-y border-outline/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center glow-card p-6 rounded-lg">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">4</div>
            <div className="text-on-surface-variant text-sm">COSMIC TEAMS</div>
          </div>
          <div className="text-center glow-card p-6 rounded-lg">
            <div className="text-5xl font-bold bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent mb-2">120+</div>
            <div className="text-on-surface-variant text-sm">STAR ATHLETES</div>
          </div>
          <div className="text-center glow-card p-6 rounded-lg">
            <div className="text-5xl font-bold bg-gradient-to-r from-tertiary to-accent bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-on-surface-variant text-sm">EPIC MATCHES</div>
          </div>
          <div className="text-center glow-card p-6 rounded-lg">
            <div className="text-5xl font-bold text-primary mb-2">∞</div>
            <div className="text-on-surface-variant text-sm">ETERNAL GLORY</div>
          </div>
        </div>
      </section>

      {/* Teams Showcase */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-h1 text-5xl font-bold text-center mb-4 neon-primary">
            ✦ CHOOSE YOUR DESTINY ✦
          </h2>
          <p className="text-center text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Four legendary teams emerge from the cosmic void, each wielding unique power.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAMS.map((team, idx) => (
              <div
                key={team.id}
                className="glow-card backdrop-blur-xl bg-surface/40 rounded-2xl p-8 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                style={{
                  borderColor: `${team.color}60`,
                  background: `linear-gradient(135deg, ${team.color}08 0%, transparent 100%), rgba(26, 31, 58, 0.4)`,
                }}
              >
                {/* Animated background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${team.color}20 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="text-7xl mb-4 text-center filter drop-shadow-lg">{team.icon}</div>
                  <h3 className="text-2xl font-bold text-on-surface mb-2 text-center" style={{ color: team.color }}>
                    {team.name}
                  </h3>
                  <p className="text-sm text-on-surface-variant text-center mb-6">
                    {team.description}
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full py-3 border-2 rounded-lg font-semibold transition-all hover:bg-current/10"
                    style={{
                      color: team.color,
                      borderColor: `${team.color}60`,
                    }}
                  >
                    ✦ Join {team.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-surface/10 backdrop-blur-sm border-y border-outline/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-h1 text-5xl font-bold text-center mb-12 neon-secondary">
            ✦ WHY COMPETE WITH US ✦
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glow-card backdrop-blur-lg bg-surface/30 rounded-2xl p-8">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-primary mb-3">COMPETE & CONQUER</h3>
              <p className="text-on-surface-variant">
                Engage in thrilling inter-faculty battles where only the strongest emerge victorious.
              </p>
            </div>

            <div className="glow-card backdrop-blur-lg bg-surface/30 rounded-2xl p-8">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-secondary mb-3">TEAM UNITY</h3>
              <p className="text-on-surface-variant">
                Build bonds with teammates and experience the power of collective greatness.
              </p>
            </div>

            <div className="glow-card backdrop-blur-lg bg-surface/30 rounded-2xl p-8">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-tertiary mb-3">TRACK ASCENDANCE</h3>
              <p className="text-on-surface-variant">
                Monitor your team's rise through real-time standings and legendary leaderboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center relative">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-h1 text-5xl font-bold mb-6">
            <span className="neon-primary">READY</span> TO <span className="neon-secondary">SOAR?</span>
          </h2>
          <p className="text-lg text-on-surface-variant mb-8">
            The cosmos awaits. Your legend begins now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-2xl transition-all active:scale-95 text-lg"
            >
              LAUNCH NOW 🚀
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 border-2 border-outline text-on-surface font-bold rounded-lg hover:bg-outline/10 transition-all active:scale-95 text-lg"
            >
              SIGN IN ✦
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline/10 py-8 px-4 bg-surface/20 text-center">
        <p className="text-on-surface-variant text-sm">
          ✦ CU Sport Unity - Where Champions Rise ✦
          <br />
          © 2026 Department of Mathematics and Computer Science
        </p>
      </footer>
    </div>
  )
}
