const board = document.querySelector('#board')
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
let time = 0;
let score = 0;
let decreaseTimeInterval;
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    createRandomCircle();
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        if (time >= 1) {
            createRandomCircle();
        }
    }
})

function startGame() {
    decreaseTimeInterval = setInterval(decreaseTime, 1000);
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
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
    clearInterval(decreaseTimeInterval);
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<div>
        <h1>Score: <span class="primary">${score}</span></h1>
        <button class="play-again btn">Play again</button>
        </div>
        `;
    const playAgainButton = document.querySelector('.play-again');
    playAgainButton.addEventListener('click', beginNewGame);
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 50);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `linear-gradient(60deg, ${getRandomColor()[0]} 0%, ${getRandomColor()[1]} 100%)`;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    let [one, two, three, four, five, six] = [
        getRandomNumber(0, 9),
        getRandomNumber(0, 9),
        getRandomNumber(0, 9),
        getRandomNumber(0, 9),
        getRandomNumber(0, 9),
        getRandomNumber(0, 9),
    ]
    return [`#${one}${three}${five}${two}${four}${six}`, `#${one}${three}${five}${two}${four}${six}`]
}

function beginNewGame() {
    timeEl.parentNode.classList.remove('hide');
    board.innerHTML = '';
    screens[0].classList.remove('up');
    screens[1].classList.remove('up');
    score = 0;
}