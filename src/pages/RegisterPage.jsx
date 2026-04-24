import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/mathcom_logo.png'

export default function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-4 md:p-margin">
        <div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant overflow-hidden flex flex-col md:flex-row">
          {/* Left Branding Panel */}
          <div
            className="hidden md:flex flex-col justify-between w-1/3 bg-on-surface text-surface-container-lowest p-8 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 0% 0%, var(--color-primary-container) 0%, transparent 70%)',
              }}
            ></div>
            <div className="z-10">
              <h2 className="font-h2 text-h2 mb-2 italic flex items-center gap-2">
                <img src={logo} alt="MathCom Logo" className="h-16 w-auto" />
                MathCom Sport Unity
              </h2>
              <p className="font-body-md text-body-md text-surface-variant">
                Join the legacy. Unleash your potential.
              </p>
            </div>
          </div>

          {/* Form Panel */}
          <div className="w-full md:w-2/3 p-6 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="font-h2 text-h2 text-on-surface mb-2">Student Verification</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Please enter your Chulalongkorn University details to begin.
              </p>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault()
                navigate('/teams')
              }}
            >
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface uppercase mb-2">
                  Student ID
                </label>
                <div className="relative">
                  <input
                    className="block w-full px-3 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="e.g. 643XXXXX21"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface uppercase mb-2">
                    First Name
                  </label>
                  <input
                    className="block w-full px-3 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface uppercase mb-2">
                    Last Name
                  </label>
                  <input
                    className="block w-full px-3 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-caps text-label-caps text-on-surface uppercase mb-2">
                  Food Allergies
                </label>
                <textarea
                  className="block w-full px-3 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                  rows={3}
                  placeholder="e.g. ถั่ว, อาหารทะเล, นม (ถ้าไม่มีให้เว้นว่าง)"
                />
              </div>

              <div className="pt-6 mt-6 border-t border-surface-variant flex items-center justify-between">
                <Link
                  to="/"
                  className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
                >
                  Cancel
                </Link>
                <button
                  className="bg-primary text-on-primary font-h3 text-sm px-8 py-3 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm flex items-center gap-2"
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
