import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/mathcom_logo.png'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    major: '',
    foodAllergies: '',
    medicalInfo: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await register(formData)

      if (result.success) {
        navigate('/teams')
      } else {
        setError(result.error || 'เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่')
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อ server ได้ กรุณาลองใหม่อีกครั้ง')
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass =
    'block w-full px-4 py-3 border border-outline border-opacity-30 rounded-lg bg-background text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none'

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-4 md:p-margin">
        <div className="w-full max-w-4xl glass-panel glow-card rounded-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Branding Panel */}
          <div
            className="hidden md:flex flex-col justify-between w-1/3 bg-surface-light text-on-surface p-8 relative overflow-hidden border-r border-outline border-opacity-30"
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none bg-starry"
            ></div>
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 0% 0%, #FF1493 0%, transparent 70%)',
              }}
            ></div>
            <div className="z-10">
              <h2 className="font-h2 text-3xl mb-4 italic flex flex-col items-start gap-4 neon-text">
                <img src={logo} alt="MathCom Logo" className="h-16 w-auto drop-shadow-[0_0_15px_rgba(255,107,157,0.8)]" />
                MathCom Sport Unity
              </h2>
              <p className="font-body-md text-on-surface opacity-80">
                Join the legacy. Unleash your potential in the cosmos.
              </p>
            </div>
          </div>

          {/* Form Panel */}
          <div className="w-full md:w-2/3 p-6 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="font-h1 text-4xl text-on-surface mb-2 neon-text">Student Verification</h1>
              <p className="font-body-md text-on-surface opacity-70">
                Please enter your Chulalongkorn University details to begin.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-body-md text-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-red-400">error</span>
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block font-mono text-sm text-secondary uppercase mb-2 tracking-wider">
                  Student ID
                </label>
                <div className="relative">
                  <input
                    className={inputClass}
                    placeholder="e.g. 643XXXXX21"
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-sm text-secondary uppercase mb-2 tracking-wider">
                    First Name
                  </label>
                  <input
                    className={inputClass}
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-sm text-secondary uppercase mb-2 tracking-wider">
                    Last Name
                  </label>
                  <input
                    className={inputClass}
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-sm text-secondary uppercase mb-2 tracking-wider">
                  Major / ชื่อสาขา
                </label>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none`}
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select your major...</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-sm text-secondary uppercase mb-2 tracking-wider">
                    Food Allergies / แพ้อาหาร
                  </label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={2}
                    name="foodAllergies"
                    value={formData.foodAllergies}
                    onChange={handleChange}
                    placeholder="e.g. ถั่ว, อาหารทะเล, นม (ถ้าไม่มีให้เว้นว่าง)"
                  />
                </div>
                <div>
                  <label className="block font-mono text-sm text-secondary uppercase mb-2 tracking-wider">
                    Medical Info / โรคประจำตัว
                  </label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={2}
                    name="medicalInfo"
                    value={formData.medicalInfo}
                    onChange={handleChange}
                    placeholder="e.g. หอบหืด, ภูมิแพ้, โรคหัวใจ (ถ้าไม่มีให้เว้นว่าง)"
                  />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-outline border-opacity-30 flex items-center justify-between">
                <Link
                  to="/"
                  className="font-body-md text-on-surface opacity-70 hover:opacity-100 hover:text-primary transition-all flex items-center gap-2"
                >
                  Cancel
                </Link>
                <button
                  className="bg-primary text-white font-h3 text-lg px-8 py-3 rounded-lg hover:bg-opacity-80 transition-all shadow-glow-pink flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      กำลังลงทะเบียน...
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
