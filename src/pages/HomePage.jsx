import { useNavigate } from 'react-router-dom'
import { useAuth, TEAMS } from '../context/AuthContext'
import CosmicBackground from '../components/GeometricBackground'

export default function HomePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const team = user?.teamId ? TEAMS.find(t => t.id === user.teamId) : null

  return (
    <div className="min-h-screen bg-background relative pb-20">
      <CosmicBackground />
      <main className="max-w-4xl mx-auto px-6 pt-12 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <img src="/assets/all-seeing-eye.png" alt="" className="w-9 h-9" />
            <span className="font-h1 text-xl font-bold gold-text">MATHCOM</span>
          </div>
          <button onClick={() => { logout(); navigate('/') }} className="text-on-surface/40 hover:text-tertiary transition-colors text-sm font-medium">ออกจากระบบ</button>
        </header>

        {/* Welcome */}
        <div className="text-center mb-10">
          <h1 className="font-h1 text-3xl md:text-4xl font-bold mb-2">
            สวัสดี, <span className="gold-text">{user?.nickname || user?.firstName || 'นักกีฬา'}</span>
          </h1>
          <p className="text-on-surface/50 font-mono text-sm">{user?.studentId}</p>
        </div>

        {/* Registration Info Card */}
        <div className="glass-panel p-8 rounded-3xl border-primary/10 mb-8">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><span className="text-primary">📋</span> ข้อมูลการลงทะเบียน</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'ชื่อ-นามสกุล', value: user?.name },
              { label: 'ชื่อเล่น', value: user?.nickname || '-' },
              { label: 'สาขา', value: user?.major },
              { label: 'ชั้นปี', value: user?.year ? `ปี ${user.year}` : '-' },
              { label: 'รหัสนักศึกษา', value: user?.studentId, mono: true },
              { label: 'วันที่ลงทะเบียน', value: user?.registeredAt ? new Date(user.registeredAt).toLocaleDateString('th-TH') : 'วันนี้' },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-xl">
                <div className="text-[10px] text-on-surface/40 uppercase font-bold mb-1">{item.label}</div>
                <div className={`font-bold text-sm ${item.mono ? 'font-mono' : ''}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Status */}
        <div className="glass-panel p-8 rounded-3xl border-primary/10 text-center">
          {team ? (
            <>
              <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg" style={{ backgroundColor: team.color + '30', border: `2px solid ${team.color}` }}>
                {team.icon}
              </div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: team.color }}>{team.name}</h2>
              <p className="text-on-surface/50 text-sm mb-4">{team.nameEn} Team</p>
              <div className={`inline-block team-badge ${team.badgeClass}`}>สมาชิก{team.name}</div>
            </>
          ) : (
            <>
              <img src="/assets/saturn.png" alt="" className="w-24 h-24 mx-auto mb-6 animate-float-slow opacity-40" />
              <h2 className="text-2xl font-bold mb-3 gold-text">⏳ รอประกาศทีม</h2>
              <p className="text-on-surface/50 max-w-sm mx-auto mb-6">คุณลงทะเบียนเรียบร้อยแล้ว! ทีมงานจะจัดสรรทีมสีให้คุณเร็วๆ นี้</p>
              <div className="flex items-center justify-center gap-3 text-on-surface/30">
                {TEAMS.map(t => (
                  <div key={t.id} className="w-8 h-8 rounded-full flex items-center justify-center text-xs opacity-40" style={{ backgroundColor: t.color + '40' }}>
                    {t.icon}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Event Info */}
        <div className="glass-panel p-6 rounded-2xl border-primary/10 mt-8">
          <h3 className="font-bold mb-4 flex items-center gap-2"><span>📅</span> ข้อมูลกิจกรรม</h3>
          <div className="space-y-3 text-sm text-on-surface/60">
            <div className="flex justify-between"><span>งาน</span><span className="font-bold text-on-surface/80">MathCom Sports Day 2026</span></div>
            <div className="flex justify-between"><span>วันที่</span><span className="font-bold text-on-surface/80">9 พฤษภาคม 2026</span></div>
            <div className="flex justify-between"><span>สถานที่</span><span className="font-bold text-on-surface/80">อาคารมหาวชิรุณหิศ</span></div>
          </div>
        </div>
      </main>
    </div>
  )
}
