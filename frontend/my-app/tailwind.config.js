// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3b82f6', // or your custom brand color
          600: '#2563eb',
        },
        accent: {
          100: '#dbeafe',
          600: '#2563eb',
          800: '#1e40af',
        },
      },
    },
  },
  plugins: [],
}
