let startTime, updatedTime, difference, timerInterval;
let paused = false;
let storedTime = 0; // For tracking the total paused time
let lapCount = 0;   // To track lap number

const displayTimeElement = document.querySelector('.display-time');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

// Function to format the time into HH:MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start the stopwatch
function startStopwatch() {
    if (!paused) {
        startTime = new Date().getTime();
    } else {
        startTime = new Date().getTime() - storedTime;
    }

    timerInterval = setInterval(() => {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        displayTimeElement.textContent = formatTime(difference);
    }, 1000);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;  // Enable the Lap button
}

// Pause the stopwatch
function pauseStopwatch() {
    clearInterval(timerInterval);
    paused = true;
    storedTime = difference; // Save the current time when paused

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;   // Disable Lap button when paused
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    displayTimeElement.textContent = '00:00:00';
    paused = false;
    storedTime = 0;
    lapCount = 0; // Reset lap count
    lapsContainer.innerHTML = ''; // Clear laps

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

// Record the current time as a lap
function recordLap() {
    lapCount++;
    const lapTime = formatTime(difference);
    const lapElement = document.createElement('div');
    lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
}

// Event listeners for the buttons
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
