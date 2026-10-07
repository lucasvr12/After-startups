/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          purple: '#B600A8',
          violet: '#7621B0',
          orange: '#BE4C00',
          dark: '#18011F',
        },
        // Paleta "Obsidian Kinetic" del diseño de Stitch
        obsidian: '#070708',
        raised: '#111114',
        glass: 'rgba(15, 15, 19, 0.82)',
        'container-lowest': '#0e0e10',
        'container-low': '#1c1b1d',
        'container-high': '#2a2a2c',
        'container-highest': '#353437',
        primary: '#fda9ff',
        'primary-container': '#c026d3',
        secondary: '#4edea3',
        'secondary-container': '#00a572',
        'on-secondary': '#003824',
        crisp: '#FFFFFF',
        muted: '#94A3B8',
        'on-surface': '#e5e1e4',
        'on-surface-variant': '#d7c0d3',
        'outline-variant': '#524151',
        crimson: '#EF4444',
        subtle: 'rgba(255, 255, 255, 0.08)',
        highlight: 'rgba(192, 38, 211, 0.45)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        label: ['"Space Grotesk"', 'sans-serif'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        'float-slow': { '0%, 100%': { transform: 'translateY(0) scale(1)' }, '50%': { transform: 'translateY(-18px) scale(1.05)' } },
        'float-rev': { '0%, 100%': { transform: 'translateY(0) scale(1)' }, '50%': { transform: 'translateY(16px) scale(0.96)' } },
        orb: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1) translate(0, 0)' },
          '50%': { opacity: '0.65', transform: 'scale(1.15) translate(20px, -20px)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float-slow 7s ease-in-out infinite',
        'float-rev': 'float-rev 8s ease-in-out infinite',
        orb: 'orb 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
