import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import CosmicBackground from '../components/GeometricBackground'

export default function LuckyDrawPage() {
  const { allRegistrations, fetchAllRegistrations } = useAuth()
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [winner, setWinner] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    fetchAllRegistrations()
  }, [])

  const spinWheel = () => {
    if (isSpinning || allRegistrations.length === 0) return

    const newPrizeNumber = Math.floor(Math.random() * allRegistrations.length)
    const extraSpins = 5 // รอบการหมุน
    const degreePerItem = 360 / allRegistrations.length
    const targetRotation = rotation + (extraSpins * 360) + (newPrizeNumber * degreePerItem)
    
    setRotation(targetRotation)
    setIsSpinning(true)
    setWinner(null)

    // Wait for animation to finish (5 seconds)
    setTimeout(() => {
      setIsSpinning(false)
      const actualWinnerIndex = (allRegistrations.length - (Math.floor((targetRotation % 360) / degreePerItem)) ) % allRegistrations.length
      setWinner(allRegistrations[newPrizeNumber])
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      <CosmicBackground />
      
      <main className="max-w-4xl mx-auto px-6 pt-12 relative z-10 flex flex-col items-center">
        <header className="text-center mb-12">
          <h1 className="font-h1 text-5xl font-bold gold-text mb-4 italic">LUCKY DRAW</h1>
          <p className="text-on-surface/40 uppercase tracking-widest text-sm">สุ่มผู้โชคดีจากผู้ลงทะเบียน {allRegistrations.length} คน</p>
        </header>

        {/* The Wheel */}
        <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] mb-12 group">
          {/* Pointer */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 text-4xl filter drop-shadow-lg animate-bounce">
            👇
          </div>

          {/* Wheel Container */}
          <div 
            className="w-full h-full rounded-full border-8 border-primary/20 relative overflow-hidden transition-transform duration-[5000ms] cubic-bezier(0.15, 0, 0.15, 1) shadow-[0_0_100px_rgba(232,200,90,0.1)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {allRegistrations.map((reg, i) => {
                const angle = 360 / allRegistrations.length
                const startAngle = i * angle
                const endAngle = (i + 1) * angle
                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180)
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180)
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180)
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180)
                
                const colors = ['#E8C85A', '#E85D75', '#4A90D9', '#4ADE80', '#A855F7']
                const color = colors[i % colors.length]

                return (
                  <g key={reg.studentId}>
                    <path 
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} 
                      fill={color} 
                      className="opacity-20 hover:opacity-40 transition-opacity"
                    />
                    <text 
                      x="75" y="50" 
                      transform={`rotate(${startAngle + angle/2} 50 50)`} 
                      fill="white" 
                      fontSize="2" 
                      fontWeight="bold"
                      className="pointer-events-none opacity-40"
                    >
                      {reg.nickname || reg.firstName}
                    </text>
                  </g>
                )
              })}
            </svg>
            
            {/* Center Piece */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-background rounded-full border-4 border-primary z-20 flex items-center justify-center shadow-lg">
               <img src="/assets/star-8pt.png" alt="" className="w-8 h-8 animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Spin Button */}
        <button 
          onClick={spinWheel} 
          disabled={isSpinning || allRegistrations.length === 0}
          className="btn-primary px-12 py-4 text-xl font-bold rounded-full shadow-[0_0_30px_rgba(232,200,90,0.3)] hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all"
        >
          {isSpinning ? '🚀 กำลังสุ่ม...' : '🎰 หมุนวงล้อ!'}
        </button>

        {/* Winner Announcement Overlay */}
        {winner && !isSpinning && (
          <div className="mt-12 text-center animate-fade-in">
            <h2 className="text-on-surface/40 uppercase tracking-widest text-sm mb-2">ยินดีด้วยกับผู้โชคดี!</h2>
            <div className="glass-panel p-8 rounded-[2rem] border-primary/40 bg-primary/5 shadow-[0_0_50px_rgba(232,200,90,0.2)]">
               <div className="text-6xl mb-4">🏆</div>
               <div className="text-4xl font-bold gold-text mb-2">{winner.firstName} {winner.lastName}</div>
               <div className="text-2xl text-on-surface/80">ชื่อเล่น: {winner.nickname || '-'} ({winner.studentId})</div>
               <div className="mt-4 text-primary font-bold">{winner.major} ปี {winner.year}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
