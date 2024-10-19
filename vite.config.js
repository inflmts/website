import tailwindcss from 'tailwindcss';
import icon from './lib/icon.js';
import template from './lib/template.js';

/** @type {import('vite').UserConfig} */
export default {
  appType: 'mpa',
  plugins: [
    template(),
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
        'index.html',
        '404.html'
      ]
    }
  }
};
