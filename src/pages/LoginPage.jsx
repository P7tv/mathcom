import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, TEAMS } from '../context/AuthContext'
import CosmicBackground from '../components/GeometricBackground'

export default function LoginPage() {
  const navigate = useNavigate()
  const { checkStatus } = useAuth()
  const [studentId, setStudentId] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!studentId) { setError('กรุณากรอกรหัสนักศึกษา'); return }
    setIsLoading(true)
    try {
      const result = await checkStatus(studentId)
      if (result.success) navigate('/dashboard')
      else setError(result.error || 'ไม่พบข้อมูล')
    } catch { setError('เกิดข้อผิดพลาด') }
    finally { setIsLoading(false) }
  }

  return (
    <div className="min-h-screen bg-background text-on-background flex items-center justify-center p-6 relative overflow-hidden">
      <CosmicBackground />
      <img src="/assets/banknote-gold.png" alt="" className="absolute top-[10%] right-[5%] w-40 opacity-10 animate-float-slow pointer-events-none" />
      <img src="/assets/banknote-silver.png" alt="" className="absolute bottom-[10%] left-[5%] w-36 opacity-8 animate-float-medium pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
            <img src="/assets/all-seeing-eye.png" alt="" className="w-10 h-10" />
            <span className="font-h1 text-2xl font-bold tracking-tight gold-text">MATHCOM</span>
          </Link>
          <h2 className="text-3xl font-bold mb-2">เช็คสถานะการลงทะเบียน</h2>
          <p className="text-on-surface/40 text-sm">กรอกรหัสนักศึกษาเพื่อดูสถานะทีมของคุณ</p>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-3xl border-primary/10 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary text-sm font-semibold flex items-center gap-3">
              <span className="text-xl">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-on-surface/50 uppercase tracking-widest mb-2 ml-1">รหัสนักศึกษา</label>
              <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="เช่น 64XXXXXXXX" className="w-full px-5 py-3.5 bg-surface/50 border border-white/5 rounded-xl text-on-surface placeholder-on-surface/20 focus:border-primary/50 focus:bg-surface/80 transition-all outline-none font-mono" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2">
              {isLoading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />กำลังตรวจสอบ...</>) : '✦ เช็คสถานะ'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-on-surface/40 text-sm mb-4">ยังไม่ได้ลงทะเบียน?</p>
            <Link to="/register" className="text-primary hover:text-primary/80 font-bold transition-colors">ลงทะเบียนเข้าร่วมกีฬาสี →</Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-on-surface/30 hover:text-on-surface/60 transition-colors text-xs">← กลับหน้าหลัก</Link>
        </div>
      </div>
    </div>
  )
}
