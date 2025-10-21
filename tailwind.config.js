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
          "neutral": "#6b7280",
          "neutral-content": "#ffffff",
          "base-content": "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
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

