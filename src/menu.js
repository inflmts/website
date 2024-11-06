const main = document.querySelector('main');
const navbar = document.querySelector('#navbar');
const menu = document.querySelector('#menu');
const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');

let menuActive = false;

function openMenu() {
  if (menuActive)
    return;
  menuActive = true;
  main.classList.add('hidden');
  navbar.classList.add('hidden');
  menu.classList.remove('hidden');
}

function closeMenu() {
  if (!menuActive)
    return;
  menuActive = false;
  main.classList.remove('hidden');
  navbar.classList.remove('hidden');
  menu.classList.add('hidden');
}

menuOpenButton.addEventListener('click', openMenu);
menuCloseButton.addEventListener('click', closeMenu);
