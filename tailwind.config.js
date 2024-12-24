import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', 'src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
