/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.blade.php",
    "./src/**/*.js",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'logo-pink': '#FF66C4',
        'soft-peach': '#FFF3EB',
        'lavender-mist': '#F5F0FF',
        'sage-green': '#E0F0E5',
        'blush-pink': '#FFE8F0',
        'deep-lavender': '#D4C2FC',
        'muted-teal': '#88C9B9',
        'neutral-gray': '#F8F8F8',
        'dark-gray': '#4A4A4A'
      }
    },
  },
  plugins: [],
}

