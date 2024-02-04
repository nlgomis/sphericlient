/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }, 
      colors: {
        'spheri-violet': '#bb86fc',
        'spheri-violet-button': '#c395fd',
        'spheri-black': '#212121',
        'spheri-black-black': '#101014',
        'spheri-black-black-black': '#111111',
        'spheri-grey': '#2f2f2f',
        'spheri-medium-grey': '#444444',
        'spheri-light-grey': '#aaaaaa',
        'spheri-violet-hover': '#332e3d',

      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require("daisyui"),
    require('@tailwindcss/aspect-ratio'),

  ],}
  