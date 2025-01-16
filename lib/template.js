import ejs from 'ejs';

/**
 * Returns a plugin that preprocesses HTML entry points with EJS.
 *
 * @returns {import('vite').Plugin}
 */
export default function template() {

  return {
    name: 'template',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return ejs.render(html);
      }
    }
  };

}
