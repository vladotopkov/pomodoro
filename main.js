

// getButtons

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const timerDisplay = document.getElementById("timer-display");


//Get user input values

let workTime = document.getElementById('work-time');
let breakTime = document.getElementById('break-time');
let cyclesNumber = document.getElementById('cycles');



//add bindings to track current state

let isRunning = false;
let stopped = true;
let paused = true;
let cycleCount = 0;






//countdown timer logic


let startMinutes = 25;   
let time = startMinutes * 60;
let countdown;



function updateTimer() {

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    time--;

    if (time < 0) {
        clearInterval(countdown);
        timerDisplay.innerText = "Time's up!";
    }
}
    

function changeTime(duration) {
    console.log(duration);
    startMinutes = duration || 25;
    time = startMinutes * 60;
    console.log(time);
}






//event listeners

startBtn.addEventListener('click', (e) => {
    if(isRunning) return;
    changeTime(workTime.valueAsNumber);
    updateTimer(); // Initial call to display immediately
    countdown = setInterval(updateTimer, 1000);
    isRunning = true;
});


stopBtn.addEventListener('click', (e) => {
    clearInterval(countdown);
    timerDisplay.innerText = "25:00";
    isRunning = false;
});












// setInterval(() => {
//     timerDisplay
// }, 1000);


// setTimeout(function() {
//     console.log('hello');
//     console.log('hella');
// }, 2000);


// setInterval(function() {
//     console.log('hello');
//     console.log('hella');
// }, 2000);