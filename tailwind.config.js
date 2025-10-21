/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      scale: {
        102: '1.02'
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        mrxeventos: {
          "primary": "#02a550",
          "primary-content": "#ffffff",
          "secondary": "#A78BFA",
          "secondary-content": "#ffffff",
          "accent": "#60a5fa",
          "neutral": "#1f1f1f",
          "neutral-content": "#ffffff",
          "base-content": "#ffffff",
          "base-100": "#000000",
          "base-200": "#0a0a0a",
          "base-300": "#1f1f1f",
          "info": "#38bdf8",
          "success": "#22c55e",
          "success-content": "#ffffff",
          "warning": "#facc15",
          "error": "#ef4444",
          "error-content": "#ffffff"
        }
      }
    ],
  },
}

