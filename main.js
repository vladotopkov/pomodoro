

// getButtons

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const timerDisplay = document.getElementById("timer-display");


//Get user input values

let workTimeInput = document.getElementById('work-time');
let breakTimeInput = document.getElementById('break-time');
let cyclesNumberInput = document.getElementById('cycles');



//add bindings to track current state

let isWorkPhase = false;
let isBreakPhase = false;
let stopped = true;
let isPaused = false;
let cycleCount = 0;
let cycles = 0;

const beepSound = new Audio('sound.mp3');

function playBeep() {
    beepSound.play();
}



//countdown timer logic


let startMinutes = 6;   
let time = startMinutes * 60;
let countdown;

let breakCount = "break";
let workCount = "work";

function updateTimer() {

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    timerDisplay.innerText = `${(minutes < 10) ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    time--;
    

    if (time < 0) { //after startButton setInterval lead time to zero
        clearInterval(countdown);

        if(cycleCount < cycles){

            
            if(isWorkPhase){
                console.log(breakCount);
                cycleCount++;
                playBeep();
                changeTime(breakTimeInput.valueAsNumber);
                startCountLogic();
                isWorkPhase = false;
                isBreakPhase = true;
                return;
            }
            if(isBreakPhase){
                console.log(workCount);
                playBeep();
                changeTime(workTimeInput.valueAsNumber);
                startCountLogic();
                isWorkPhase = true;
                isBreakPhase = false;
                return;
            }

        }

        playBeep();
        timerDisplay.innerText = "Time's up!";
        isWorkPhase  = false;
        isBreakPhase = false;
        cycleCount = 0;
    }
}
    

function changeTime(duration) {
    startMinutes = duration || 25;
    time = Math.round(startMinutes * 60);
}


function startCountLogic(startImmediately = true){
    if (startImmediately) updateTimer();
    countdown = setInterval(updateTimer, 1000);
}




//event listeners

//start of cycle
startBtn.addEventListener('click', (e) => {
    startBtn.disabled = true;
    console.log(workCount);
    if(isWorkPhase || isBreakPhase) return;
    isWorkPhase = true;
    cycles = cyclesNumberInput.valueAsNumber;
    changeTime(workTimeInput.valueAsNumber);
    startCountLogic();
});

//reset cycles
stopBtn.addEventListener('click', (e) => {
    startBtn.disabled = false;
    clearInterval(countdown);
    timerDisplay.innerText = "25:00";
    isWorkPhase  = false;
    isBreakPhase = false;
    cycleCount = 0;
});


//pause
pauseBtn.addEventListener('click', () => {
    if (!isPaused) {
        clearInterval(countdown);
        isPaused = true;
    } else {
        startCountLogic(false); // resume without immediate tick
        isPaused = false;
    }
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