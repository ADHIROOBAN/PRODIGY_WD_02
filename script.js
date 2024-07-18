let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    laps = [];
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        laps.push(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
        lapsContainer.appendChild(lapElement);
    }
});
