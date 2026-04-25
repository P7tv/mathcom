import { useEffect, useRef } from 'react'

export default function Starfield() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    // Generate random stars
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div')
      star.className = `star ${Math.random() > 0.7 ? 'large' : Math.random() > 0.5 ? 'small' : ''}`

      const left = Math.random() * width
      const top = Math.random() * height
      const delay = Math.random() * 3

      star.style.left = `${left}px`
      star.style.top = `${top}px`
      star.style.animationDelay = `${delay}s`

      container.appendChild(star)
    }

    // Handle window resize
    const handleResize = () => {
      // Clear and regenerate on resize if needed
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <div ref={containerRef} className="starfield" />
}
