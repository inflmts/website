import tailwindcss from 'tailwindcss';
import favicon from './lib/favicon.js';
import template from './lib/template.js';

/** @type {import('vite').UserConfig} */
export default {
  appType: 'mpa',
  plugins: [
    template(),
    favicon()
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
        'index.html',
        '404.html'
      ]
    }
  }
};
