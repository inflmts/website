const header = document.querySelector('header');
const main = document.querySelector('main');
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu-button');

const headerClassCommon = 'fixed z-10 w-full h-16 border-b transition-all';
const headerClassTop = headerClassCommon + ' border-transparent';
const headerClassNormal = headerClassCommon + ' bg-zinc-900 border-zinc-700';

new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting)
      header.className = headerClassTop;
    else
      header.className = headerClassNormal;
  }
}).observe(document.querySelector('#top-test'));

let menuActive = false;

menuButton.addEventListener('click', () => {
  if (menuActive) {
    main.classList.remove('invisible');
    menu.classList.add('hidden');
    menuActive = false;
  } else {
    main.classList.add('invisible');
    menu.classList.remove('hidden');
    menuActive = true;
  }
});
