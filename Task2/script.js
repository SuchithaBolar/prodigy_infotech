let startTime, updatedTime, difference;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    difference = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    display.textContent = '00:00:00';
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = display.textContent;
        const li = document.createElement('li');
        li.textContent = lapTime;
        laps.appendChild(li);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor(difference / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);
    
    display.textContent = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
