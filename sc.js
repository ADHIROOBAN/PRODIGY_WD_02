let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume'); 
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');
const statusImage = document.getElementById('statusImage');

const staticImageSrc = 'static-image.png'; 
const gifImageSrc = 'animated-image.gif';

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
        statusImage.src = gifImageSrc;
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        statusImage.src = staticImageSrc;
        pauseButton.style.display = 'none'; 
        resumeButton.style.display = 'inline-block'; 
    }
});

resumeButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        statusImage.src = gifImageSrc;
        resumeButton.style.display = 'none'; 
        pauseButton.style.display = 'inline-block';
    }
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    laps = [];
    lapsContainer.innerHTML = '';
    statusImage.src = staticImageSrc;
    pauseButton.style.display = 'inline-block'; 
    resumeButton.style.display = 'none'; 
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        laps.push(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
        lapsContainer.appendChild(lapElement);
    }
});
