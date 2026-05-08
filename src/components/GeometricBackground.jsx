import React, { useMemo } from 'react'

const FLOAT_ITEMS = [
  { src: '/assets/star-8pt.png', size: 'w-8 h-8', className: 'animate-twinkle' },
  { src: '/assets/star-8pt.png', size: 'w-6 h-6', className: 'animate-twinkle' },
  { src: '/assets/star-8pt.png', size: 'w-5 h-5', className: 'animate-twinkle' },
  { src: '/assets/star-8pt.png', size: 'w-4 h-4', className: 'animate-twinkle' },
  { src: '/assets/compass-rose.png', size: 'w-10 h-10', className: 'animate-spin-slow opacity-[0.06]' },
  { src: '/assets/star-8pt.png', size: 'w-7 h-7', className: 'animate-twinkle' },
  { src: '/assets/star-8pt.png', size: 'w-3 h-3', className: 'animate-twinkle' },
  { src: '/assets/compass-rose.png', size: 'w-8 h-8', className: 'animate-spin-slow opacity-[0.04]' },
]

export default function CosmicBackground() {
  // Use useMemo so positions don't change on re-render
  const positions = useMemo(() => 
    FLOAT_ITEMS.map(() => ({
      top: `${5 + Math.random() * 85}%`,
      left: `${5 + Math.random() * 85}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${3 + Math.random() * 5}s`,
    })), []
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Background Gradient Orbs */}
      <div className="glow-orb w-[700px] h-[700px] bg-primary top-[-200px] left-[-200px]" />
      <div className="glow-orb w-[500px] h-[500px] bg-secondary bottom-[-150px] right-[-150px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-tertiary top-1/3 right-1/4 opacity-[0.06]" />

      {/* Grid Pattern */}
      <div className="cosmic-grid" />

      {/* Constellation Background */}
      <img 
        src="/assets/constellation.png" 
        alt="" 
        className="absolute top-[10%] right-[5%] w-64 h-64 opacity-[0.04]"
        style={{ animation: 'constellation-fade 8s ease-in-out infinite' }}
      />
      <img 
        src="/assets/constellation.png" 
        alt="" 
        className="absolute bottom-[15%] left-[8%] w-48 h-48 opacity-[0.03] rotate-45"
        style={{ animation: 'constellation-fade 12s ease-in-out infinite' }}
      />

      {/* Floating Stars & Elements */}
      {FLOAT_ITEMS.map((item, i) => (
        <img
          key={i}
          src={item.src}
          alt=""
          className={`absolute ${item.size} ${item.className}`}
          style={{
            top: positions[i].top,
            left: positions[i].left,
            animationDelay: positions[i].animationDelay,
            animationDuration: positions[i].animationDuration,
          }}
        />
      ))}

      {/* Dot Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <pattern id="dotPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="1" fill="#C8A43E" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>
    </div>
  )
}
