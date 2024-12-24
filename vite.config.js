import tailwindcss from 'tailwindcss';
import icon from './lib/icon.js';

/** @type {import('vite').UserConfig} */
export default {
  appType: 'mpa',
  plugins: [
    icon()
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ]
    }
  },
  build: {
    rollupOptions: {
      input: [
        'index.html'
      ]
    }
  }
};
