import defaultTheme from 'tailwindcss/defaultTheme';

const tile = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 28">
  <path fill="none" stroke="white" opacity="0.2" d="M0,0 H16 L0,28 H16 Z M0,14 H16"/>
</svg>`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', 'src/main.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Barlow', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        // base64 is actually shorter than encodeURIComponent
        'tile': `url('data:image/svg+xml;base64,${btoa(tile)}')`
      }
    }
  },
  plugins: []
};
