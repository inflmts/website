const subtitleElement = document.querySelector('#subtitle');
const buttonsElement = document.querySelector('#buttons');

const states = [
  {
    bodyClass: ['from-pink-500', 'to-yellow-400'],
    subtitle: 'ZERO TO INFINITY'
  },
  {
    bodyClass: ['from-indigo-700', 'to-fuchsia-500'],
    subtitle: 'IN THE FUTURE'
  },
  {
    bodyClass: ['from-green-600', 'to-lime-400'],
    subtitle: 'BREAK FREE'
  },
  {
    bodyClass: ['from-violet-500', 'to-cyan-300'],
    subtitle: 'NO HOLDING BACK'
  },
  {
    bodyClass: ['from-black', 'to-violet-800'],
    subtitle: 'SHUT IT DOWN'
  }
];

let currentIndex;

function setState(index) {
  const state = states[index];
  subtitleElement.textContent = state.subtitle;
  if (currentIndex !== undefined)
    document.body.classList.remove(...states[currentIndex].bodyClass);
  document.body.classList.add(...state.bodyClass);
  currentIndex = index;
}

function nextState() {
  setState((currentIndex + 1) % states.length);
}

function toggleAbout() {
}

setState(0);

const buttons = [
  {
    text: '?',
    handler: toggleAbout
  },
  {
    text: '\u21c4',
    handler: nextState
  }
];

for (const { text, handler } of buttons) {
  const element = document.createElement('button');
  element.className = 'size-10 border-2 border-white text-white text-2xl transition hover:text-black hover:bg-white';
  element.textContent = text;
  element.addEventListener('click', handler);
  buttonsElement.append(element);
}

//toggleAbout();

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting)
      entry.target.classList.add('bg-white/50');
    else
      entry.target.classList.remove('bg-white/50');
  }
}, {
  rootMargin: '-128px 0px -128px 0px'
});

for (const element of document.querySelectorAll('.pale')) {
  element.classList.add('transition', 'duration-500');
  observer.observe(element);
}
