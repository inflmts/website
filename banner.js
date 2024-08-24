function createSVG(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function selectRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const subtitleElement = document.getElementById('banner-subtitle');

const messages = [
  'BREAK FREE',
  'DEFY THE LIMITS', // -- Valorant
  'GET READY',
  'LOCK IN',
  'OVERCOME',
  'NO BACKING DOWN',
  'NO STOPPING NOW',
  'PREPARE FOR ANYTHING',
  'RISE',
  'SOMETHING DIFFERENT',
  'TAKE CONTROL',
  'TAKE THEM ON',
  'THE BEST IS NOT ENOUGH',
  'TURN IT UP',
  'WE\'RE BETTER' // -- Iso, 2024
];

const message = selectRandom(messages);

subtitleElement.textContent = message;

subtitleElement.addEventListener('animationend', (ev) => {
  if (ev.animationName === 'banner-subtitle-1') {
    subtitleElement.textContent = 'ZERO TO INFINITY';
    subtitleElement.style.animation = '0.5s banner-subtitle-2';
  }
});
