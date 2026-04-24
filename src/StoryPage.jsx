import React, { useEffect, useRef } from 'react';
import './StoryPage.css';

const StarCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.01 + 0.005,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, s.alpha)})`;
        ctx.fill();
        
        // Add subtle glow
        if (s.alpha > 0.8) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'white';
        } else {
          ctx.shadowBlur = 0;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="star-canvas" />;
};

const STAMPS = [
  { id: 1, label: 'MATCH SCHEDULE', icon: '⚡', color: 'teal' },
  { id: 2, label: 'ATHLETE ROSTER', icon: '🛡️', color: 'green' },
  { id: 3, label: 'CHEER & SPIRIT', icon: '🔥', color: 'pink' },
  { id: 4, label: 'MOMENT GALLERY', icon: '✨', color: 'cyan' },
  { id: 5, label: 'LIVE SCOREBOARD', icon: '💎', color: 'orange' },
];

const Stamp = ({ label, icon, color, delay }) => (
  <div 
    className={`stamp ${color}`} 
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="stamp-content">
      <div className="stamp-icon">{icon}</div>
      <div className="stamp-label">{label}</div>
    </div>
  </div>
);

const StoryPage = () => {
  return (
    <div className="story-container">
      <StarCanvas />
      {/* Navbar */}
      <nav className="story-nav">
        <div className="nav-logo">
          SCI CHULA
          <span>กีฬาสานสัมพันธ์</span>
        </div>
        <button className="nav-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-title">
          <span className="subtitle">SINCE 1916</span>
          <h1>กีฬาสานสัมพันธ์<br />SCIENCE 2026</h1>
          <span className="subtitle">THE GRAND SCCU</span>
        </div>

        <div className="vs-badge">COMSCI & MATH</div>
        
        <p className="hero-description">
          ร่วมเป็นส่วนหนึ่งของการประชันฝีเท้าและสปิริตในกิจกรรมกีฬาสานสัมพันธ์ 
          ที่รวบรวมชาวคณิตศาสตร์และวิทยาการคอมพิวเตอร์เข้าด้วยกันเป็นหนึ่งเดียว
        </p>

        <div className="date-badge">
          28 - 29 March 2026 | 8.00 - 17.00
        </div>

        <div className="building-silhouette">
          {/* We'll use a CSS-based building silhouette here or a simple SVG path */}
          <svg viewBox="0 0 1000 400" preserveAspectRatio="none">
            {/* Wireframe Building Silhouette */}
            <path d="M0,350 L1000,350" />
            <path d="M200,350 L200,300 L300,300 L300,350" />
            <path d="M300,350 L300,250 L450,250 L450,350" />
            <path d="M450,350 L450,150 L550,150 L550,350" />
            <path d="M550,350 L550,250 L700,250 L700,350" />
            <path d="M700,350 L700,300 L800,300 L800,350" />
            {/* Detailed lines */}
            <path d="M450,180 L550,180" strokeOpacity="0.5" />
            <path d="M450,210 L550,210" strokeOpacity="0.5" />
            <path d="M300,280 L450,280" strokeOpacity="0.5" />
            <path d="M550,280 L700,280" strokeOpacity="0.5" />
          </svg>
        </div>

        <div className="scroll-indicator">
          <span>EXPLORE</span>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </header>

      {/* Stamps Grid */}
      <main className="stamps-grid">
        {STAMPS.map((stamp, index) => (
          <Stamp 
            key={stamp.id} 
            {...stamp} 
            delay={index * 0.1} 
          />
        ))}
      </main>

      {/* Info Section */}
      <section className="info-section">
        <h2 className="info-title">Find us here!</h2>
        
        <div className="map-container">
          <div className="map-placeholder">
            {/* Simulation of a map image or interactive map */}
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
              <img 
                src="https://www.google.com/maps/vt/pb=!1m4!1m3!1i15!2i25695!3i12485!2m3!1e0!2sm!3i633190870!3m17!2sen!3sth!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!12m1!1e1!12m4!1e10!2m2!1u1!2u2!16shttps%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fjs%2FStaticMapService.GetMapImage%3Fkey%3DAIzaSyC_Z_..." 
                alt="Map Placeholder" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2) contrast(1.1)' }}
              />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '3rem' }}>📍</div>
            </div>
          </div>
        </div>

        <div className="address-text">
          <p>
            <strong>Mahamakut Building</strong>, Faculty of Science,<br />
            Chulalongkorn University Phayathai Road, Wang Mai,<br />
            Pathumwan Bangkok 10330, Thailand
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="story-footer">
        <div className="social-links">
          <a href="#" className="social-icon">📸</a>
          <a href="#" className="social-icon">👤</a>
        </div>
        <div className="footer-text">
          กีฬาสานสัมพันธ์ Science Chula 2026
        </div>
      </footer>
    </div>
  );
};

export default StoryPage;
