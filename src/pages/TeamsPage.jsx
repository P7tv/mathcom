import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, TEAM_ICONS, TEAM_COLORS } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

/* ─── Create Team Modal ─── */
function CreateTeamModal({ onClose, onCreate, isLoading }) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('⚡')
  const [color, setColor] = useState('#FF6B9D')
  const [slogan, setSlogan] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreate({ name, icon, color, slogan })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg glass-panel rounded-2xl p-6 md:p-8 z-10"
        style={{ border: `1px solid ${color}40`, boxShadow: `0 0 40px ${color}20` }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface/50 hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h2 className="font-h2 text-2xl text-on-surface mb-1 flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          สร้างทีมใหม่
        </h2>
        <p className="font-body-md text-sm text-on-surface/50 mb-6">
          ตั้งชื่อทีม เลือกไอคอนและสี แล้วชวนเพื่อนมาจอย!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Team Name */}
          <div>
            <label className="block font-mono text-xs text-secondary uppercase mb-2 tracking-wider">
              ชื่อทีม
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cosmic Panthers"
              required
              maxLength={30}
              className="block w-full px-4 py-3 border border-outline/30 rounded-lg bg-background text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
            />
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block font-mono text-xs text-secondary uppercase mb-2 tracking-wider">
              ไอคอนทีม
            </label>
            <div className="flex flex-wrap gap-2">
              {TEAM_ICONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`w-11 h-11 rounded-lg text-xl flex items-center justify-center transition-all ${
                    icon === ic
                      ? 'ring-2 ring-primary scale-110 bg-primary/20'
                      : 'bg-surface-light hover:bg-surface-light/80'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block font-mono text-xs text-secondary uppercase mb-2 tracking-wider">
              สีประจำทีม
            </label>
            <div className="flex flex-wrap gap-2">
              {TEAM_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-9 h-9 rounded-full transition-all ${
                    color === c ? 'ring-2 ring-white scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c, boxShadow: color === c ? `0 0 12px ${c}` : 'none' }}
                />
              ))}
            </div>
          </div>

          {/* Slogan */}
          <div>
            <label className="block font-mono text-xs text-secondary uppercase mb-2 tracking-wider">
              คำขวัญ (ไม่บังคับ)
            </label>
            <input
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="e.g. เราจะชนะ!"
              maxLength={60}
              className="block w-full px-4 py-3 border border-outline/30 rounded-lg bg-background text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
            />
          </div>

          {/* Preview & Submit */}
          <div className="pt-4 border-t border-outline/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
              >
                {icon}
              </div>
              <span className="font-h3 text-sm text-on-surface truncate">
                {name || 'ชื่อทีม'}
              </span>
            </div>
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="shrink-0 px-6 py-3 rounded-xl text-white font-h3 text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}40` }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  กำลังสร้าง...
                </>
              ) : (
                <>
                  สร้างทีม
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── Team Card ─── */
function TeamCard({ team, memberCount, isMyTeam, onJoin, isJoining, user }) {
  const isFull = memberCount >= team.max_members
  const isCreator = team.created_by === user?.studentId

  return (
    <div
      className={`relative group rounded-2xl p-6 md:p-8 transition-all duration-300 overflow-hidden ${
        isMyTeam ? 'ring-2' : ''
      }`}
      style={{
        backgroundColor: isMyTeam ? `${team.color}15` : 'rgba(26, 31, 58, 0.5)',
        border: `2px solid ${isMyTeam ? team.color : team.color + '25'}`,
        boxShadow: isMyTeam
          ? `0 0 30px ${team.color}30, inset 0 0 30px ${team.color}08`
          : 'none',
        ringColor: team.color,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none group-hover:opacity-15 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 80% 20%, ${team.color} 0%, transparent 60%)` }}
      />

      {/* Badges */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        {isMyTeam && (
          <span
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: team.color }}
          >
            YOUR TEAM
          </span>
        )}
        {isFull && !isMyTeam && (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
            FULL
          </span>
        )}
      </div>

      <div className="relative z-10">
        {/* Icon & Name */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${team.color}15`,
              border: `1px solid ${team.color}40`,
            }}
          >
            {team.icon}
          </div>
          <div className="min-w-0 flex-grow">
            <h3
              className="font-h2 text-xl md:text-2xl mb-1 truncate"
              style={{ color: isMyTeam ? team.color : '#F0F0FF' }}
            >
              {team.name}
            </h3>
            {team.slogan && (
              <p className="font-body-md text-xs text-on-surface/50 truncate italic">
                "{team.slogan}"
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-4">
            {/* Members */}
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-on-surface/40">group</span>
              <span className="font-mono text-sm" style={{ color: team.color }}>
                {memberCount}
              </span>
              <span className="font-mono text-xs text-on-surface/30">
                / {team.max_members}
              </span>
            </div>
            {/* Creator */}
            {isCreator && (
              <div className="flex items-center gap-1 text-on-surface/40">
                <span className="material-symbols-outlined text-[14px]">star</span>
                <span className="font-mono text-[10px] uppercase tracking-wider">Creator</span>
              </div>
            )}
          </div>

          {/* Join Button */}
          {!isMyTeam && (
            <button
              onClick={() => onJoin(team.id)}
              disabled={isFull || isJoining}
              className="px-5 py-2 rounded-xl text-white font-h3 text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              style={{
                backgroundColor: isFull ? '#4a4a4a' : team.color,
                boxShadow: !isFull ? `0 0 12px ${team.color}40` : 'none',
              }}
            >
              {isJoining ? (
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <span className="material-symbols-outlined text-[14px]">login</span>
              )}
              {isFull ? 'เต็มแล้ว' : 'จอยทีม'}
            </button>
          )}
        </div>

        {/* Member bar */}
        <div className="mt-4 w-full h-1.5 rounded-full bg-surface-light overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${(memberCount / team.max_members) * 100}%`,
              background: `linear-gradient(90deg, ${team.color}80, ${team.color})`,
              boxShadow: `0 0 6px ${team.color}50`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function TeamsPage() {
  const navigate = useNavigate()
  const { user, createTeam, joinTeam, leaveTeam } = useAuth()

  const [teams, setTeams] = useState([])
  const [memberCounts, setMemberCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [joiningTeamId, setJoiningTeamId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchTeams = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('teams')
      .select('*')
      .order('created_at', { ascending: true })

    if (fetchError) {
      console.error('Fetch teams error:', fetchError)
      return
    }

    setTeams(data || [])

    // Fetch member counts for each team
    if (data && data.length > 0) {
      const counts = {}
      for (const team of data) {
        const { count } = await supabase
          .from('registrations')
          .select('*', { count: 'exact', head: true })
          .eq('team_id', team.id)
        counts[team.id] = count || 0
      }
      setMemberCounts(counts)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  const handleCreate = async (teamData) => {
    setIsCreating(true)
    setError('')

    const result = await createTeam(teamData)

    if (result.success) {
      setShowCreateModal(false)
      setSuccess(`สร้างทีม "${teamData.name}" สำเร็จ! 🎉`)
      setTimeout(() => setSuccess(''), 4000)
      await fetchTeams()
    } else {
      setError(result.error)
    }

    setIsCreating(false)
  }

  const handleJoin = async (teamId) => {
    setJoiningTeamId(teamId)
    setError('')

    const result = await joinTeam(teamId)

    if (result.success) {
      setSuccess('จอยทีมสำเร็จ! 🎉')
      setTimeout(() => setSuccess(''), 4000)
      await fetchTeams()
    } else {
      setError(result.error)
    }

    setJoiningTeamId(null)
  }

  const handleLeave = async () => {
    setError('')
    const result = await leaveTeam()

    if (result.success) {
      setSuccess('ออกจากทีมแล้ว')
      setTimeout(() => setSuccess(''), 3000)
      await fetchTeams()
    } else {
      setError(result.error)
    }
  }

  return (
    <main className="flex-grow flex flex-col w-full max-w-[1280px] mx-auto px-6 md:px-8 pt-8 md:pt-12 pb-12 gap-8">
      {/* Header */}
      <header className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
          <span className="material-symbols-outlined text-secondary text-[16px]">groups</span>
          <span className="font-mono text-xs text-secondary uppercase tracking-widest">
            Team Hub
          </span>
        </div>
        <h1 className="font-h1 text-4xl md:text-5xl text-on-surface neon-text mb-3">
          สร้างทีม & จอยทีม
        </h1>
        <p className="font-body-md text-on-surface/60 max-w-xl mx-auto">
          {user?.name ? `สวัสดี ${user.name}!` : 'สวัสดี!'}{' '}
          {user?.team
            ? `คุณอยู่ทีม "${user.team}" อยู่แล้ว`
            : 'สร้างทีมใหม่หรือจอยทีมที่มีอยู่เพื่อเริ่มแข่งขัน!'}
        </p>
      </header>

      {/* Messages */}
      {error && (
        <div className="max-w-2xl mx-auto w-full p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-body-md text-sm flex items-center gap-3">
          <span className="material-symbols-outlined text-red-400">error</span>
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400/60 hover:text-red-400">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
      {success && (
        <div className="max-w-2xl mx-auto w-full p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-body-md text-sm flex items-center gap-3">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          {success}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 rounded-xl bg-primary text-white font-h3 text-sm transition-all hover:scale-105 active:scale-95 shadow-glow-pink flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            สร้างทีมใหม่
          </button>

          {user?.team && (
            <button
              onClick={handleLeave}
              className="px-5 py-3 rounded-xl bg-surface-light text-on-surface/60 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 border border-outline/20 font-body-md text-sm transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              ออกจากทีม
            </button>
          )}
        </div>

        <div className="font-mono text-xs text-on-surface/40">
          {teams.length} ทีม
        </div>
      </div>

      {/* Teams Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-on-surface/50">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="font-body-md">กำลังโหลดทีม...</span>
          </div>
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🏟️</span>
          <h3 className="font-h2 text-xl text-on-surface/70 mb-2">ยังไม่มีทีม</h3>
          <p className="font-body-md text-on-surface/40 mb-6">
            เป็นคนแรกที่สร้างทีมเลย!
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-3 rounded-xl bg-primary text-white font-h3 text-sm transition-all hover:scale-105 active:scale-95 shadow-glow-pink inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            สร้างทีมแรก
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              memberCount={memberCounts[team.id] || 0}
              isMyTeam={user?.teamId === team.id}
              onJoin={handleJoin}
              isJoining={joiningTeamId === team.id}
              user={user}
            />
          ))}
        </section>
      )}

      {/* Continue to Dashboard */}
      {user?.teamId && (
        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 rounded-xl bg-secondary text-on-secondary font-h3 text-sm transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            style={{ boxShadow: '0 0 20px rgba(78, 205, 196, 0.3)' }}
          >
            ไปหน้า Dashboard
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateTeamModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          isLoading={isCreating}
        />
      )}
    </main>
  )
}
