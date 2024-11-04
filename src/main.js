const main = document.querySelector('main');
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu-button');

let menuActive = false;

menuButton.addEventListener('click', () => {
  if (menuActive) {
    main.classList.remove('hidden');
    menu.classList.add('hidden');
    menuActive = false;
  } else {
    main.classList.add('hidden');
    menu.classList.remove('hidden');
    menuActive = true;
  }
});
