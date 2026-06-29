/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#142d52',
          50: '#f0f4f9',
          100: '#dce4f0',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#e4c575',
          dark: '#a8873a',
        },
        teal: {
          DEFAULT: '#1A6B72',
          light: '#2a8f98',
          dark: '#145860',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseGold: { '0%,100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' }, '50%': { boxShadow: '0 0 0 12px rgba(201,168,76,0)' } },
      },
    },
  },
  plugins: [],
}
