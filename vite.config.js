import tailwindcss from 'tailwindcss';
import icon from './lib/icon.js';
import template from './lib/template.js';

/** @type {import('vite').UserConfig} */
export default {
  appType: 'mpa',
  plugins: [
    icon(),
    template()
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
