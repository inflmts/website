import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', 'src/main.js'],
  theme: {
    extend: {
      spacing: {
        '160': '40rem'
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Barlow', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
