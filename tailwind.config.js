/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  safelist: [
    "bg-green-100",
    "bg-blue-100",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-800",
    "bg-gray-100",
    "bg-orange-100",
    "bg-yellow-100",
    "bg-red-100",
    "border-error",
    "bg-white",
    "bg-[#60a5fa]",
    "bg-[#3B82F6]",
    "bg-[#2563EB]",
    "bg-[#06B6D4]",
    "bg-[#EF4444]",
    "bg-[#F59E0B]",
    "bg-[#14B8A6]",
    "bg-[#A78BFA]"
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
      "dark", "fantasy",
      {
        brigida: {
          "primary": "#2563eb",
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

