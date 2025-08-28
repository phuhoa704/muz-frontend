/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D3F1DF',
        secondary: '#5A6C57',
        dark: '#525B44',
        muted: '#777777',
        card: "#EDF5FB"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
