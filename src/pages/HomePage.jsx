import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="max-w-[1280px] mx-auto px-margin w-full flex-grow">
      {/* Hero Section */}
      <section className="mt-stack-lg mb-stack-lg relative rounded-xl overflow-hidden shadow-lg border border-outline-variant h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 z-0 bg-inverse-surface/80">
            <img
              alt="stadium"
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEGMXe2Tkh7kXJMFV-jNzXyd3BtMigw86UENd6WKxw5gHCN3Rl2O_pQ1TBHasgUQ-YuDbYzfT_sI54jiGiHvyCRyGr2phqHnZJ55pfhs3j04MMG4SIXh59QONOJaWbBFVhIiVrYA7eCEAFpUwNWCP2jMURRxt26Uk8sTVGCMytbjvSmKRy9X62I7CflDCmRVwykazjCFCP0I1zAM0BL6ykm3TlBCcg4DDfGAHHJhr42uUmo7FhG_LEJ_y_QTjY8a8Oyd13Zz-2V6Lf"
            />
          </div>

          <div className="relative z-10 text-center max-w-3xl px-6">
            <span className="inline-block px-3 py-1 mb-stack-sm rounded-full bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase tracking-widest shadow-sm">
              Official Department of Mathematics and Computer Science Games
            </span>
            <h1 className="font-h1 text-h1 text-white mb-stack-md drop-shadow-md">
              Unleash The <span className="text-primary-fixed-dim italic">Unity</span>.
              <br />
              Claim The Glory.
            </h1>
            <p className="font-body-lg text-body-lg text-surface-container-low mb-stack-lg max-w-2xl mx-auto">
              The ultimate clash of MathCom's finest. Witness raw athleticism, fierce
              rivalries, and the unbreakable spirit of the department. Registration is now open
              for all official events.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-primary hover:bg-surface-tint text-on-primary font-h3 text-[18px] py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                Register Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button
                onClick={() => navigate('/games')}
                className="bg-transparent border-2 border-surface-container-highest text-white font-h3 text-[18px] py-4 px-8 rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-95"
              >
                View Schedule
              </button>
            </div>
          </div>
        </section>

        {/* Dashboard Overview */}
        <section className="mb-stack-lg">
          <div className="flex justify-between items-end mb-stack-md">
            <h2 className="font-h2 text-h2 text-on-surface">Dashboard Overview</h2>
          </div>

          <div className="bento-grid">
            {/* Top Standings Card */}
            <div className="col-span-12 md:col-span-4 bg-surface rounded-xl shadow-sm border border-surface-variant p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-h3 text-h3 text-on-surface">Top Standings</h3>
                <span className="inline-flex items-center gap-1 text-primary font-label-caps text-label-caps bg-primary/10 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">fiber_manual_record</span>{' '}
                  Live
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border-l-4 border-primary">
                  <div className="flex items-center gap-3">
                    <span className="font-stat-value text-[20px] text-on-surface w-6 text-center">
                      1
                    </span>
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-surface-variant text-sm">
                      NIG
                    </div>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                      NIGGIG
                    </span>
                  </div>
                  <span className="font-stat-value text-[20px] text-primary">124</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/leaderboard')}
                className="mt-auto w-full text-center py-2 text-primary font-body-md text-body-md font-semibold hover:bg-surface-variant rounded-lg transition-colors"
              >
                View Full Leaderboard
              </button>
            </div>

            {/* Upcoming Clashes Card */}
            <div className="col-span-12 md:col-span-8 bg-surface rounded-xl shadow-sm border border-surface-variant p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-h3 text-h3 text-on-surface">Upcoming Clashes</h3>
                <button
                  onClick={() => navigate('/games')}
                  className="text-secondary hover:text-primary transition-colors flex items-center gap-1 font-body-md text-sm"
                >
                  See all{' '}
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 relative overflow-hidden group hover:border-primary hover:shadow-md transition-all duration-200">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
                      Dodgeball • Men's
                    </span>
                    <span className="font-body-md text-sm font-semibold text-error flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>{' '}
                      18:00 Today
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="text-center flex-1">
                      <div className="w-12 h-12 mx-auto bg-surface-container-high rounded-full flex items-center justify-center mb-1 text-lg font-bold text-on-surface">
                        NIG
                      </div>
                      <span className="font-body-md text-sm text-on-surface-variant">
                        NIGGIG
                      </span>
                    </div>
                    <div className="font-stat-value text-stat-value text-outline-variant px-4">
                      VS
                    </div>
                    <div className="text-center flex-1">
                      <div className="w-12 h-12 mx-auto bg-surface-container-high rounded-full flex items-center justify-center mb-1 text-lg font-bold text-on-surface">
                        TIT
                      </div>
                      <span className="font-body-md text-sm text-on-surface-variant">
                        Titan Guardians
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </main>
  )
}
