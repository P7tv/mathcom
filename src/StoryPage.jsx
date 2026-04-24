import React from 'react';
import './StoryPage.css';

const STAMPS = [
  { id: 1, label: 'DEPARTMENT WEBSITES', icon: '🌐', color: 'teal' },
  { id: 2, label: 'WORKSHOPS', icon: '🌲', color: 'green' },
  { id: 3, label: 'RECHECK', icon: '🏔️', color: 'pink' },
  { id: 4, label: 'REDEEM', icon: '🏛️', color: 'cyan' },
  { id: 5, label: 'MERCH', icon: '🌵', color: 'orange' },
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
      {/* Navbar */}
      <nav className="story-nav">
        <div className="nav-logo">
          SCI CHULA
          <span>OPEN HOUSE</span>
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
          <h1>SCIENCE 2026<br />CHULA OPEN HOUSE</h1>
          <span className="subtitle">THE GRAND SCCU</span>
        </div>

        <div className="date-badge">
          28 - 29 March 2026 | 8.00 - 17.00
        </div>

        <div className="building-silhouette">
          {/* We'll use a CSS-based building silhouette here or a simple SVG path */}
          <svg viewBox="0 0 1000 400" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path 
              d="M0,400 L0,300 L50,300 L50,280 L100,280 L100,250 L150,250 L150,200 L200,200 L200,100 L250,100 L250,50 L300,50 L300,100 L350,100 L350,200 L400,200 L400,250 L450,250 L450,280 L500,280 L500,300 L1000,300 L1000,400 Z" 
              fill="currentColor" 
            />
          </svg>
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
          Science Chula Open House 2026
        </div>
      </footer>
    </div>
  );
};

export default StoryPage;
