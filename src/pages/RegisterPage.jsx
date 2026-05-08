import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CosmicBackground from '../components/GeometricBackground'

const MAJORS = ['วิทยาการคอมพิวเตอร์', 'คณิตศาสตร์']


export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
    const [formData, setFormData] = useState({ studentId: '', firstName: '', lastName: '', nickname: '', major: '', year: '1', foodAllergies: '', medicalInfo: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    if (!formData.studentId || !formData.firstName || !formData.lastName || !formData.major) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบ')
      setIsLoading(false)
      return
    }
    try {
      const result = await register(formData)
      if (result.success) { 
        setSuccess(true)
        setTimeout(() => navigate('/dashboard'), 2000) 
      } else {
        console.error('Registration error:', result.error)
        setError(result.error || 'ลงทะเบียนไม่สำเร็จ กรุณาลองใหม่')
      }
    } catch (err) {
      console.error('Catch error:', err)
      setError('เกิดข้อผิดพลาด กรุณาตรวจสอบการเชื่อมต่อ')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background text-on-background flex items-center justify-center p-6 relative overflow-hidden">
        <CosmicBackground />
        <div className="text-center relative z-10">
          <img src="/assets/all-seeing-eye.png" alt="" className="w-24 h-24 mx-auto mb-6 animate-float-slow" />
          <h1 className="text-4xl font-bold mb-4 gold-text">ลงทะเบียนสำเร็จ! ✦</h1>
          <p className="text-on-surface/60 mb-2">ขอบคุณที่เข้าร่วมกีฬาสี MathCom Sports Day</p>
          <p className="text-on-surface/40 text-sm">กำลังพาไปหน้าแดชบอร์ด...</p>
          <div className="mt-6"><div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" /></div>
        </div>
      </div>
    )
  }

  const inputCls = "w-full px-5 py-3.5 bg-surface/50 border border-white/5 rounded-xl text-on-surface placeholder-on-surface/20 focus:border-primary/50 focus:bg-surface/80 transition-all outline-none"
  const labelCls = "block text-xs font-bold text-on-surface/50 uppercase tracking-widest mb-2 ml-1"

  return (
    <div className="min-h-screen bg-background text-on-background py-16 px-6 relative overflow-hidden">
      <CosmicBackground />
      <img src="/assets/moon-crater.png" alt="" className="absolute top-12 right-[5%] w-32 opacity-10 animate-float-slow pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
            <img src="/assets/all-seeing-eye.png" alt="" className="w-10 h-10" />
            <span className="font-h1 text-2xl font-bold tracking-tight gold-text">MATHCOM</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">ลงทะเบียนเข้าร่วมกีฬาสี</h1>
          <p className="text-on-surface/40 text-sm">กรอกข้อมูลด้านล่างเพื่อสมัครเข้าร่วมงาน</p>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-[2rem] border-primary/10 shadow-2xl">
          {error && <div className="mb-6 p-4 bg-tertiary/10 border border-tertiary/30 rounded-2xl text-tertiary text-sm font-semibold flex items-center gap-3"><span className="text-xl">⚠️</span> {error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelCls}>รหัสนักศึกษา <span className="text-tertiary">*</span></label>
              <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required placeholder="เช่น 64XXXXXXXX" className={`${inputCls} font-mono text-lg`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>ชื่อจริง <span className="text-tertiary">*</span></label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="ชื่อจริง" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>นามสกุล <span className="text-tertiary">*</span></label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="นามสกุล" className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>ชื่อเล่น</label>
              <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="ชื่อเล่น (ไม่บังคับ)" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>สาขาวิชา <span className="text-tertiary">*</span></label>
              <select name="major" value={formData.major} onChange={handleChange} required className={`${inputCls} appearance-none cursor-pointer`}>
                <option value="" disabled>เลือกสาขา...</option>
                {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className={labelCls}>อาหารที่แพ้</label>
                <textarea name="foodAllergies" value={formData.foodAllergies} onChange={handleChange} placeholder="เช่น ถั่ว, อาหารทะเล (ไม่บังคับ)" className={`${inputCls} resize-none h-20`} />
              </div>
              <div>
                <label className={labelCls}>โรคประจำตัว</label>
                <textarea name="medicalInfo" value={formData.medicalInfo} onChange={handleChange} placeholder="เช่น หอบหืด, ภูมิแพ้ (ไม่บังคับ)" className={`${inputCls} resize-none h-20`} />
              </div>
            </div>

            <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5">
              <Link to="/check" className="text-on-surface/40 hover:text-primary transition-colors font-bold text-sm">ลงทะเบียนแล้ว? เช็คสถานะ →</Link>
              <button type="submit" disabled={isLoading} className="btn-primary py-4 px-12 text-lg w-full md:w-auto flex items-center justify-center gap-3">
                {isLoading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />กำลังลงทะเบียน...</>) : '✦ ลงทะเบียน'}
              </button>
            </div>
          </form>
        </div>
        <div className="mt-6 text-center"><Link to="/" className="text-on-surface/30 hover:text-on-surface/60 transition-colors text-xs">← กลับหน้าหลัก</Link></div>
      </div>
    </div>
  )
}
