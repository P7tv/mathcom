/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MathCom Sports Day — Cosmic Mystical Palette
        primary: '#C8A43E',        // Celestial Gold
        'primary-light': '#E8C85A',
        secondary: '#7B6ED6',      // Mystic Purple
        tertiary: '#E85D75',       // Cosmic Rose
        accent: '#3DCFCF',         // Nebula Cyan

        background: '#0B0D1F',     // Deep Cosmic Navy
        surface: '#131636',        // Dark Nebula
        'surface-light': '#1E2252',
        'surface-lighter': '#2A2F6E',

        'on-surface': '#F0EDEF',
        'on-background': '#F0EDEF',
        'on-primary': '#0B0D1F',
        'on-secondary': '#FFFFFF',

        outline: '#2A2F6E',
        'outline-variant': '#3D4399',

        // Team Colors
        'team-red': '#E85D75',
        'team-blue': '#4A90D9',
        'team-yellow': '#E8C85A',
        'team-green': '#4ADE80',
      },
      fontFamily: {
        h1: ["Outfit", "Space Grotesk", "sans-serif"],
        h2: ["Outfit", "Space Grotesk", "sans-serif"],
        h3: ["Space Grotesk", "sans-serif"],
        'body-md': ["Inter", "sans-serif"],
        'body-lg': ["Inter", "sans-serif"],
        'mono': ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        md: '16px',
        lg: '24px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(200, 164, 62, 0.4), 0 0 40px rgba(200, 164, 62, 0.2)',
        'glow-secondary': '0 0 20px rgba(123, 110, 214, 0.3), 0 0 40px rgba(123, 110, 214, 0.15)',
        'glow-gold': '0 0 30px rgba(200, 164, 62, 0.5), 0 0 60px rgba(200, 164, 62, 0.2)',
        'neon-border': 'inset 0 0 10px rgba(200, 164, 62, 0.2), 0 0 10px rgba(200, 164, 62, 0.2)',
      },
      animation: {
        'float-slow': 'floatSlow 20s ease-in-out infinite',
        'float-medium': 'floatMedium 15s ease-in-out infinite',
        'float-fast': 'floatFast 10s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(5deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-3deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.05)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
