/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        crimson: ['"Crimson Pro"', 'Georgia', 'serif'],
      },
      colors: {
        void: '#05080f',
        panel: '#0d111c',
        border: '#1e2a3a',
        gold: '#c9a84c',
        'gold-dim': '#8a6f2c',
      },
    },
  },
  plugins: [],
}
