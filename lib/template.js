import ejs from 'ejs';

/** @returns {import('vite').Plugin} */
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
