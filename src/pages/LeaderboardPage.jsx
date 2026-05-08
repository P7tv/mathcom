import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { TEAMS } from '../context/AuthContext'
import CosmicBackground from '../components/GeometricBackground'

export default function LeaderboardPage() {
  const [scores, setScores] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchScores()
    // Realtime subscription
    const subscription = supabase
      .channel('team_scores_realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'team_scores' }, () => {
        fetchScores()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const fetchScores = async () => {
    const { data, error } = await supabase
      .from('team_scores')
      .select('*')
      .order('score', { ascending: false })

    if (!error && data) {
      const mapped = data.map(s => ({
        ...s,
        teamInfo: TEAMS.find(t => t.id === s.team_id)
      }))
      setScores(mapped)
    } else {
      // Mock data if DB fails
      const mock = TEAMS.map(t => ({
        team_id: t.id,
        score: Math.floor(Math.random() * 1000),
        teamInfo: t
      })).sort((a, b) => b.score - a.score)
      setScores(mock)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background relative pb-20">
      <CosmicBackground />
      
      <main className="max-w-4xl mx-auto px-6 pt-12 relative z-10">
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img src="/assets/jupiter.png" alt="" className="w-32 h-32 animate-float-slow" />
          </div>
          <h1 className="font-h1 text-5xl font-bold gold-text mb-4">LEADERBOARD</h1>
          <p className="text-on-surface/40 uppercase tracking-widest text-sm">9 พฤษภาคม 2026 — อาคารมหาวชิรุณหิศ</p>
        </header>

        {isLoading ? (
          <div className="flex justify-center p-20">
            <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Visual Bar Chart for Screen Sharing */}
            <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              
              <div className="flex items-end justify-around h-64 md:h-80 gap-4 pt-10">
                {scores.map((item) => {
                  const maxScore = Math.max(...scores.map(s => s.score)) || 1
                  const heightPercentage = Math.max((item.score / maxScore) * 100, 5)
                  
                  return (
                    <div key={item.team_id} className="flex flex-col items-center flex-1 group">
                      {/* Score Label */}
                      <div className="mb-4 text-xl md:text-3xl font-mono font-bold gold-text animate-bounce-subtle">
                        {item.score.toLocaleString()}
                      </div>
                      
                      {/* Bar */}
                      <div className="relative w-full max-w-[60px] md:max-w-[100px] flex flex-col justify-end">
                        <div 
                          className="w-full rounded-t-xl transition-all duration-1000 ease-out relative group-hover:brightness-125"
                          style={{ 
                            height: `${heightPercentage}%`, 
                            backgroundColor: item.teamInfo?.color,
                            boxShadow: `0 0 30px ${item.teamInfo?.color}44, inset 0 0 20px rgba(255,255,255,0.3)`
                          }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-xl" />
                        </div>
                      </div>
                      
                      {/* Team Icon & Name */}
                      <div className="mt-6 text-center">
                        <div className="text-3xl md:text-5xl mb-2">{item.teamInfo?.icon}</div>
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-tighter opacity-60" style={{ color: item.teamInfo?.color }}>
                          {item.teamInfo?.nameEn}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Existing List View */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-on-surface/30 uppercase tracking-widest px-4">อันดับคะแนนรายทีม</h2>
              {scores.map((item, index) => (
              <div 
                key={item.team_id}
                className="glass-panel p-6 rounded-2xl flex items-center justify-between border-primary/10 hover:border-primary/40 transition-all group"
                style={{ borderLeft: `6px solid ${item.teamInfo?.color}` }}
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-mono text-2xl font-bold gold-text">
                    {index + 1}
                  </div>
                  <div className="text-4xl">{item.teamInfo?.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: item.teamInfo?.color }}>{item.teamInfo?.name}</h3>
                    <p className="text-xs text-on-surface/30 uppercase font-bold tracking-tighter">{item.teamInfo?.nameEn} Team</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-4xl font-bold font-mono gold-text group-hover:scale-110 transition-transform origin-right">
                    {item.score.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-on-surface/40 uppercase font-bold">Points</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Decorative Elements */}
        <img src="/assets/star-8pt.png" alt="" className="absolute -left-20 top-40 w-16 opacity-10 animate-twinkle" />
        <img src="/assets/constellation.png" alt="" className="absolute -right-40 bottom-20 w-64 opacity-5 animate-float-medium" />
      </main>
    </div>
  )
}
