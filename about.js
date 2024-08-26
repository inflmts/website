const wrapper = document.getElementById('about-wrapper');
const openButton = document.getElementById('about-open-button');
const closeButton = document.getElementById('about-close-button');

let visible = false;

function show() {
  if (visible)
    return;

  visible = true;
  wrapper.style.display = null;
}

function hide() {
  if (!visible)
    return;

  visible = false;
  wrapper.style.display = 'none';
}

openButton.addEventListener('click', show);
closeButton.addEventListener('click', hide);

window.addEventListener('keydown', (ev) => {
  if (ev.code === 'Escape')
    hide();
});

wrapper.addEventListener('click', (ev) => {
  if (ev.target === wrapper)
    hide();
});

