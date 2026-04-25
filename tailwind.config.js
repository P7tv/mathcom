/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Starry Theme - Sports Competition Colors
        primary: '#FF6B9D',      // Vibrant pink/magenta
        secondary: '#4ECDC4',    // Teal/turquoise
        tertiary: '#FFE66D',     // Golden yellow
        accent: '#A29BFE',       // Purple

        background: '#0A0E27',   // Deep space blue
        surface: '#1A1F3A',      // Darker blue for cards
        'surface-light': '#252D48',

        'on-surface': '#F0F0FF', // Off-white text
        'on-background': '#F0F0FF',
        'on-primary': '#ffffff',
        'on-secondary': '#0A0E27',

        // Team Colors
        'team-dragon': '#FF6B9D',    // Thunder Dragons (pink)
        'team-phoenix': '#FF9F43',   // Phoenix Strikers (orange)
        'team-titan': '#A29BFE',     // Titan Guardians (purple)
        'team-shadow': '#2C3E50',    // Shadow Wolves (dark)

        outline: '#00D4FF',          // Cyan accents
        'outline-variant': '#00D4FF',
        'primary-container': '#FF1493',
        'on-primary-container': '#ffffff',
      },
      fontFamily: {
        h1: ["Playfair Display", "Georgia", "serif"],
        h2: ["Playfair Display", "Georgia", "serif"],
        h3: ["Playfair Display", "Georgia", "serif"],
        'body-md': ["Sarabun", "Lexend", "sans-serif"],
        'body-lg': ["Sarabun", "Lexend", "sans-serif"],
        'mono': ["Space Mono", "monospace"],
      },
      backdropBlur: {
        md: '12px',
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(255, 107, 157, 0.5), 0 0 40px rgba(255, 107, 157, 0.25)',
        'glow-cyan': '0 0 20px rgba(78, 205, 196, 0.5), 0 0 40px rgba(78, 205, 196, 0.25)',
        'glow-lg': '0 0 30px rgba(255, 107, 157, 0.8), 0 0 60px rgba(78, 205, 196, 0.4)',
        'neon': '0 0 10px rgba(255, 107, 157, 0.8), 0 0 20px rgba(255, 107, 157, 0.4), inset 0 0 20px rgba(255, 107, 157, 0.1)',
      },
      backgroundImage: {
        'starry': 'radial-gradient(2px 2px at 20% 30%, #eee, rgba(0,0,0,0)), radial-gradient(2px 2px at 60% 70%, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50% 50%, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 80% 10%, #fff, rgba(0,0,0,0))',
      },
    },
  },
  plugins: [],
}
