const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

const hit = new Audio('sound.mp3');
const select = new Audio('button.mp3');

const colors = [
  '#E41AF0',
  '#F0C026',
  '#e42c2c',
  '#7BF026',
  '#0224F0',
  '#d2b1ff',
  '#F05B26',
  '#690EF0',
  '#F0E926',
  '#02F0BE',
];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  select.currentTime = 0;
  select.play();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  // Делегирование событий
  if (event.target.classList.contains('time-btn')) {
    // console.log(event.target);
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    select.currentTime = 0;
    select.play();
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    hit.currentTime = 0;
    hit.play();
    event.target.remove('circle');
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
    newBtn();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `
  <h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 70);
  //Деструктуризация:
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = getRandomColor();
  circle.style.boxShadow = `0 0 2px #1e1e1e, 0 0 5px #fff`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function newBtn() {
  const again = document.createElement('button');
  const textAgainBtn = document.createTextNode('Еще раз');
  again.appendChild(textAgainBtn);
  again.classList.add('again-btn');

  board.append(again);

  again.addEventListener('click', (event) => {
    event.target = select.play();
    setTimeout(function (event) {
      event.target = location.reload();
    }, 200);
  });
}
