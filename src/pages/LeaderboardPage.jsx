import { useState, useEffect } from 'react'

const TEAMS = [
  { id: 1, name: 'Thunder Dragons', icon: '⚡', color: '#FF6B9D', abbr: 'TDR', score: 142 },
  { id: 2, name: 'Phoenix Strikers', icon: '🔥', color: '#FF9F43', abbr: 'PHX', score: 128 },
  { id: 3, name: 'Titan Guardians', icon: '💪', color: '#A29BFE', abbr: 'TTG', score: 115 },
  { id: 4, name: 'Shadow Wolves', icon: '🌙', color: '#6C7A89', abbr: 'SHW', score: 98 },
  { id: 5, name: 'Neon Vipers', icon: '🐍', color: '#00D4FF', abbr: 'NVP', score: 87 },
  { id: 6, name: 'Cosmic Bears', icon: '🐻', color: '#E74C3C', abbr: 'CSB', score: 74 },
  { id: 7, name: 'Solar Hawks', icon: '🦅', color: '#F39C12', abbr: 'SLH', score: 61 },
  { id: 8, name: 'Mystic Foxes', icon: '🦊', color: '#1ABC9C', abbr: 'MFX', score: 53 },
]

const MEDAL_STYLES = {
  0: {
    label: '1st',
    emoji: '🥇',
    gradient: 'from-yellow-400 via-amber-300 to-yellow-500',
    glow: '0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.3)',
    border: 'border-yellow-400/60',
    ring: 'ring-yellow-400/40',
    bg: 'rgba(255, 215, 0, 0.08)',
  },
  1: {
    label: '2nd',
    emoji: '🥈',
    gradient: 'from-gray-300 via-slate-200 to-gray-400',
    glow: '0 0 30px rgba(192, 192, 192, 0.5), 0 0 60px rgba(192, 192, 192, 0.2)',
    border: 'border-gray-300/50',
    ring: 'ring-gray-300/30',
    bg: 'rgba(192, 192, 192, 0.06)',
  },
  2: {
    label: '3rd',
    emoji: '🥉',
    gradient: 'from-amber-600 via-orange-400 to-amber-700',
    glow: '0 0 25px rgba(205, 127, 50, 0.5), 0 0 50px rgba(205, 127, 50, 0.2)',
    border: 'border-amber-500/50',
    ring: 'ring-amber-500/30',
    bg: 'rgba(205, 127, 50, 0.06)',
  },
}

// Podium heights (CSS height classes)
const PODIUM_HEIGHTS = ['h-48', 'h-36', 'h-28']

function MedalBadge({ rank }) {
  const style = MEDAL_STYLES[rank]
  return (
    <div className="relative">
      <span className="text-5xl drop-shadow-lg">{style.emoji}</span>
    </div>
  )
}

function PodiumCard({ team, rank, animDelay }) {
  const medal = MEDAL_STYLES[rank]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), animDelay)
    return () => clearTimeout(timer)
  }, [animDelay])

  // Display order: 2nd (left), 1st (center), 3rd (right)
  const orderClass = rank === 0 ? 'order-2' : rank === 1 ? 'order-1' : 'order-3'

  return (
    <div
      className={`flex flex-col items-center ${orderClass} transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
    >
      {/* Team Info Above Podium */}
      <div className="flex flex-col items-center mb-4">
        <MedalBadge rank={rank} />

        {/* Team Avatar */}
        <div
          className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl mt-3 ring-4 ${medal.ring} transition-transform hover:scale-110`}
          style={{
            backgroundColor: team.color + '20',
            border: `2px solid ${team.color}`,
            boxShadow: medal.glow,
          }}
        >
          {team.icon}
        </div>

        {/* Team Name */}
        <h3
          className="font-h2 text-lg md:text-xl mt-3 text-center text-on-surface"
          style={{ textShadow: `0 0 15px ${team.color}60` }}
        >
          {team.name}
        </h3>

        {/* Score */}
        <div
          className="font-mono text-3xl md:text-4xl font-bold mt-1"
          style={{ color: team.color }}
        >
          {team.score}
          <span className="text-sm text-on-surface/50 ml-1">pts</span>
        </div>
      </div>

      {/* Podium Block */}
      <div
        className={`w-28 md:w-36 ${PODIUM_HEIGHTS[rank]} rounded-t-xl relative overflow-hidden transition-all duration-500`}
        style={{
          background: `linear-gradient(180deg, ${team.color}40 0%, ${team.color}15 100%)`,
          borderTop: `3px solid ${team.color}`,
          borderLeft: `1px solid ${team.color}30`,
          borderRight: `1px solid ${team.color}30`,
        }}
      >
        {/* Rank number inside podium */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-h1 text-6xl md:text-7xl font-bold opacity-20"
            style={{ color: team.color }}
          >
            {rank + 1}
          </span>
        </div>

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(135deg, transparent 40%, ${team.color} 50%, transparent 60%)`,
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  )
}

function TeamRow({ team, rank, animDelay }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), animDelay)
    return () => clearTimeout(timer)
  }, [animDelay])

  return (
    <div
      className={`flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl transition-all duration-500 group cursor-default hover:scale-[1.01] ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      style={{
        backgroundColor: 'rgba(26, 31, 58, 0.5)',
        border: `1px solid ${team.color}20`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${team.color}15`
        e.currentTarget.style.borderColor = `${team.color}50`
        e.currentTarget.style.boxShadow = `0 0 20px ${team.color}20`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(26, 31, 58, 0.5)'
        e.currentTarget.style.borderColor = `${team.color}20`
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Rank */}
      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-mono text-lg md:text-xl font-bold shrink-0"
        style={{
          backgroundColor: `${team.color}15`,
          color: team.color,
          border: `1px solid ${team.color}30`,
        }}
      >
        {rank}
      </div>

      {/* Team Icon */}
      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
        style={{
          backgroundColor: `${team.color}15`,
          border: `1px solid ${team.color}30`,
        }}
      >
        {team.icon}
      </div>

      {/* Team Name */}
      <div className="flex-grow min-w-0">
        <h4 className="font-h3 text-base md:text-lg text-on-surface truncate">
          {team.name}
        </h4>
        <span className="font-mono text-xs tracking-widest" style={{ color: `${team.color}90` }}>
          {team.abbr}
        </span>
      </div>

      {/* Score */}
      <div className="text-right shrink-0">
        <div className="font-mono text-xl md:text-2xl font-bold" style={{ color: team.color }}>
          {team.score}
        </div>
        <span className="text-xs text-on-surface/40 font-mono">PTS</span>
      </div>

      {/* Progress bar */}
      <div className="hidden md:block w-32 lg:w-48 shrink-0">
        <div className="w-full h-2 rounded-full bg-surface-light overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: visible ? `${(team.score / TEAMS[0].score) * 100}%` : '0%',
              background: `linear-gradient(90deg, ${team.color}80, ${team.color})`,
              boxShadow: `0 0 8px ${team.color}50`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function LeaderboardPage() {
  const sorted = [...TEAMS].sort((a, b) => b.score - a.score)
  const top3 = sorted.slice(0, 3)
  const rest = sorted.slice(3)

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 md:px-8 py-8 md:py-12 flex flex-col gap-8 md:gap-12">
      {/* Header */}
      <header className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Live Standings
          </span>
        </div>
        <h1 className="font-h1 text-4xl md:text-5xl text-on-surface neon-text mb-3">
          Championship Leaderboard
        </h1>
        <p className="font-body-md text-on-surface/60 max-w-xl mx-auto">
          ติดตามคะแนนและอันดับของแต่ละทีมในการแข่งขันกีฬา MathCom Sport Unity
        </p>
      </header>

      {/* Podium Section */}
      <section className="relative">
        {/* Background glow */}
        <div
          className="absolute inset-0 -top-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255, 107, 157, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Trophy Icon */}
        <div className="text-center mb-6">
          <span className="text-6xl md:text-7xl drop-shadow-lg inline-block animate-bounce" style={{ animationDuration: '2s' }}>
            🏆
          </span>
        </div>

        {/* Podium */}
        <div className="flex justify-center items-end gap-3 md:gap-6 relative z-10">
          {top3.map((team, i) => (
            <PodiumCard
              key={team.id}
              team={team}
              rank={i}
              animDelay={i === 0 ? 300 : i === 1 ? 100 : 500}
            />
          ))}
        </div>

        {/* Podium base */}
        <div className="flex justify-center mt-0">
          <div
            className="w-[360px] md:w-[480px] h-3 rounded-b-xl"
            style={{
              background: 'linear-gradient(90deg, #FF9F4330, #FF6B9D40, #A29BFE30)',
              boxShadow: '0 4px 20px rgba(255, 107, 157, 0.15)',
            }}
          />
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-outline/30 to-transparent" />
        <span className="font-mono text-xs text-on-surface/40 uppercase tracking-widest">
          Other Teams
        </span>
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-outline/30 to-transparent" />
      </div>

      {/* Rest of teams list */}
      <section className="flex flex-col gap-3">
        {rest.map((team, i) => (
          <TeamRow
            key={team.id}
            team={team}
            rank={i + 4}
            animDelay={700 + i * 120}
          />
        ))}
      </section>

      {/* Footer note */}
      <div className="text-center pb-4">
        <p className="font-mono text-xs text-on-surface/30">
          คะแนนอัพเดทอัตโนมัติหลังจบการแข่งขันแต่ละรายการ
        </p>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </main>
  )
}
