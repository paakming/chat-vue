/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'el-dark': '#141414',
      },
      fontFamily: {
        
      }
    },
  },
  plugins: [
  ],
}