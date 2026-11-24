/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#030712',
          navy: '#070d1e',
          card: '#0c152e',
          cardHover: '#131f42',
          border: 'rgba(56, 189, 248, 0.15)',
          borderHover: 'rgba(0, 245, 176, 0.4)',
          cyan: '#00f5b0',
          blue: '#00d2ff',
          electric: '#38bdf8',
          purple: '#a855f7',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 245, 176, 0.25)',
        'glow-blue': '0 0 25px rgba(0, 210, 255, 0.3)',
        'glow-lg': '0 0 50px rgba(0, 210, 255, 0.2)',
        'card-glow': '0 10px 30px -10px rgba(0, 210, 255, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
