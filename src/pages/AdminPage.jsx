import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, TEAMS } from '../context/AuthContext'
import CosmicBackground from '../components/GeometricBackground'

export default function AdminPage() {
  const navigate = useNavigate()
  const { isAdmin, adminLogin, adminLogout, allRegistrations, fetchAllRegistrations, assignTeam, randomAssignTeams } = useAuth()
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [filter, setFilter] = useState('all') // all, unassigned, red, blue, yellow, green
  const [majorFilter, setMajorFilter] = useState('all')
  const [isRandomizing, setIsRandomizing] = useState(false)

  useEffect(() => {
    if (isAdmin) fetchAllRegistrations()
  }, [isAdmin])

  const handleAdminLogin = (e) => {
    e.preventDefault()
    if (adminLogin(password)) { setAuthError('') }
    else setAuthError('รหัสผ่านไม่ถูกต้อง')
  }

  const handleAssignTeam = async (studentId, teamId) => {
    await assignTeam(studentId, teamId)
  }

  const handleRandomAssign = async () => {
    setIsRandomizing(true)
    await randomAssignTeams()
    setIsRandomizing(false)
  }

  const handleExportCSV = () => {
    const headers = ['รหัสนักศึกษา', 'ชื่อ', 'นามสกุล', 'ชื่อเล่น', 'สาขา', 'ชั้นปี', 'ทีม', 'อาหารที่แพ้', 'โรคประจำตัว']
    const rows = allRegistrations.map(r => [r.studentId, r.firstName, r.lastName, r.nickname, r.major, r.year, r.team || 'ยังไม่จัดทีม', r.foodAllergies || '-', r.medicalInfo || '-'])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'registrations.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  // Admin Login Screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-on-background flex items-center justify-center p-6 relative overflow-hidden">
        <CosmicBackground />
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <img src="/assets/mystic-eye.png" alt="" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2 gold-text">Admin Panel</h2>
            <p className="text-on-surface/40 text-sm">กรอกรหัสผ่านเพื่อเข้าจัดการระบบ</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border-primary/10">
            {authError && <div className="mb-4 p-3 bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary text-sm">{authError}</div>}
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="รหัสผ่าน Admin" className="w-full px-5 py-3.5 bg-surface/50 border border-white/5 rounded-xl text-on-surface placeholder-on-surface/20 focus:border-primary/50 transition-all outline-none" />
              <button type="submit" className="w-full btn-primary py-4 text-lg">เข้าสู่ระบบ Admin</button>
            </form>
          </div>
          <div className="mt-4 text-center"><button onClick={() => navigate('/')} className="text-on-surface/30 text-xs">← กลับหน้าหลัก</button></div>
        </div>
      </div>
    )
  }

  // Filter registrations
  const filtered = allRegistrations.filter(r => {
    if (filter === 'unassigned') return !r.teamId
    if (filter !== 'all') return r.teamId === filter
    return true
  }).filter(r => {
    if (majorFilter === 'all') return true
    return r.major === majorFilter
  })

  const teamCounts = TEAMS.reduce((acc, t) => {
    acc[t.id] = allRegistrations.filter(r => r.teamId === t.id).length
    return acc
  }, {})
  const unassignedCount = allRegistrations.filter(r => !r.teamId).length

  return (
    <div className="min-h-screen bg-background text-on-background relative">
      <CosmicBackground />
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src="/assets/mystic-eye.png" alt="" className="w-8 h-8" />
            <h1 className="font-h1 text-2xl font-bold gold-text">Admin Panel</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')} className="text-on-surface/40 hover:text-on-surface text-sm">หน้าหลัก</button>
            <button onClick={adminLogout} className="text-tertiary hover:text-tertiary/80 text-sm font-bold">ออกจาก Admin</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl font-bold gold-text">{allRegistrations.length}</div>
            <div className="text-[10px] text-on-surface/40 uppercase font-bold">ลงทะเบียนทั้งหมด</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-on-surface/60">{unassignedCount}</div>
            <div className="text-[10px] text-on-surface/40 uppercase font-bold">ยังไม่จัดทีม</div>
          </div>
          {TEAMS.map(t => (
            <div key={t.id} className="glass-panel p-4 rounded-xl text-center" style={{ borderColor: t.color + '30' }}>
              <div className="text-2xl font-bold" style={{ color: t.color }}>{teamCounts[t.id] || 0}</div>
              <div className="text-[10px] text-on-surface/40 uppercase font-bold">{t.name}</div>
            </div>
          ))}
        </div>

        {/* Score Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="glass-panel p-6 rounded-2xl border-primary/10">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><span className="text-primary">🏆</span> จัดการคะแนนทีม</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEAMS.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <span>{t.icon}</span>
                    <span className="font-bold text-xs" style={{ color: t.color }}>{t.name}</span>
                  </div>
                  <input 
                    type="number" 
                    defaultValue={0}
                    onBlur={async (e) => {
                      const newScore = parseInt(e.target.value)
                      await supabase.from('team_scores').update({ score: newScore, updated_at: new Date().toISOString() }).eq('team_id', t.id)
                    }}
                    className="w-20 bg-background border border-white/10 rounded px-2 py-1 text-right font-mono text-sm outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-on-surface/30 italic">* กรอกคะแนนแล้วคลิกออกนอกช่องเพื่อบันทึก</p>
          </div>

          {/* Quick Actions เดิม */}
          <div className="glass-panel p-6 rounded-2xl border-primary/10">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><span>⚙️</span> จัดการระบบ</h2>
            <div className="grid grid-cols-1 gap-3">
              <button onClick={handleRandomAssign} disabled={isRandomizing || unassignedCount === 0} className="w-full btn-primary py-3 text-sm disabled:opacity-30">
                {isRandomizing ? '🎲 กำลังสุ่ม...' : `🎲 สุ่มจัดทีม (${unassignedCount} คน)`}
              </button>
              <button onClick={handleExportCSV} className="w-full btn-secondary py-3 text-sm">📥 Export CSV รายชื่อ</button>
              <button onClick={fetchAllRegistrations} className="w-full btn-secondary py-3 text-sm">🔄 รีเฟรชข้อมูล</button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[{ id: 'all', label: 'ทั้งหมด' }, { id: 'unassigned', label: 'ยังไม่จัดทีม' }, ...TEAMS.map(t => ({ id: t.id, label: t.name }))].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f.id ? 'bg-primary text-on-primary' : 'bg-white/5 text-on-surface/50 hover:bg-white/10'}`}>
              {f.label}
            </button>
          ))}
          <span className="text-on-surface/20 mx-2">|</span>
          {['all', 'วิทยาการคอมพิวเตอร์', 'คณิตศาสตร์'].map(m => (
            <button key={m} onClick={() => setMajorFilter(m)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${majorFilter === m ? 'bg-secondary text-on-secondary' : 'bg-white/5 text-on-surface/50 hover:bg-white/10'}`}>
              {m === 'all' ? 'ทุกสาขา' : m}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-on-surface/40 font-bold text-xs uppercase">#</th>
                  <th className="text-left p-4 text-on-surface/40 font-bold text-xs uppercase">รหัส</th>
                  <th className="text-left p-4 text-on-surface/40 font-bold text-xs uppercase">ชื่อ</th>
                  <th className="text-left p-4 text-on-surface/40 font-bold text-xs uppercase">ชื่อเล่น</th>
                  <th className="text-left p-4 text-on-surface/40 font-bold text-xs uppercase">สาขา</th>
                  <th className="text-left p-4 text-on-surface/40 font-bold text-xs uppercase">ปี</th>
                  <th className="text-left p-4 text-on-surface/40 font-bold text-xs uppercase">ทีม</th>
                  <th className="text-left p-4 text-on-surface/40 font-bold text-xs uppercase">ยศ Admin</th>
                  <th className="text-left p-4 text-on-surface/40 font-bold text-xs uppercase">จัดทีม</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="9" className="p-8 text-center text-on-surface/30">ยังไม่มีข้อมูลการลงทะเบียน</td></tr>
                ) : filtered.map((reg, i) => {
                  const t = reg.teamId ? TEAMS.find(x => x.id === reg.teamId) : null
                  return (
                    <tr key={reg.studentId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-on-surface/30 font-mono text-xs">{i + 1}</td>
                      <td className="p-4 font-mono text-xs">{reg.studentId}</td>
                      <td className="p-4 font-bold">{reg.firstName} {reg.lastName}</td>
                      <td className="p-4 text-on-surface/60">{reg.nickname || '-'}</td>
                      <td className="p-4 text-on-surface/60 text-xs">{reg.major}</td>
                      <td className="p-4 text-on-surface/60">{reg.year}</td>
                      <td className="p-4">
                        {t ? <span className={`team-badge ${t.badgeClass}`}>{t.icon} {t.name}</span> : <span className="text-on-surface/30 text-xs">—</span>}
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => toggleAdmin(reg.studentId, !reg.isAdmin)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${reg.isAdmin ? 'bg-primary text-on-primary' : 'bg-white/5 text-on-surface/30 hover:bg-white/10'}`}
                        >
                          {reg.isAdmin ? '✦ ADMIN' : 'USER'}
                        </button>
                      </td>
                      <td className="p-4">
                        <select value={reg.teamId || ''} onChange={e => handleAssignTeam(reg.studentId, e.target.value)} className="bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none cursor-pointer">
                          <option value="">ไม่มีทีม</option>
                          {TEAMS.map(tt => <option key={tt.id} value={tt.id}>{tt.icon} {tt.name}</option>)}
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
