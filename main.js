

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
let paused = true;
let cycleCount = 0;
let cycles = 0;





//countdown timer logic


let startMinutes = 25;   
let time = startMinutes * 60;
let countdown;



function updateTimer() {
    if(time < 60){
        const seconds = time;
        timerDisplay.innerText = `00:${seconds < 10 ? '0' : ''}${seconds}`;
        time--;
    }else {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    time--;
    }

    if (time < 0) {
        clearInterval(countdown);
        while(cycleCount <= cycles){

            if(isWorkPhase){
                changeTime(breakTimeInput.valueAsNumber);
                countLogic();
                isWorkPhase = false;
                isBreakPhase = true;
                return;
            }
            if(isBreakPhase){
                changeTime(workTimeInput.valueAsNumber);
                countLogic();
                isWorkPhase = true;
                isBreakPhase = false;
                cycleCount++;
                return;
            }

        }
        clearInterval(countdown);
        timerDisplay.innerText = "Time's up!";
        isWorkPhase  = false;
        isBreakPhase = false;
    }
}
    

function changeTime(duration) {
    startMinutes = duration || 25;
    time = Math.round(startMinutes * 60);
    console.log("duration in changeTime: " + duration);
    console.log("time in changeTime: " + time);
}


function countLogic(){
    console.log("time in countLogic: " + time);
    updateTimer(); 
    countdown = setInterval(updateTimer, 1000);
    cycleCount++;
}




//event listeners


//start of cycle
startBtn.addEventListener('click', (e) => {
    if(isWorkPhase || isBreakPhase) return;
    cycles = cyclesNumberInput.valueAsNumber;
    changeTime(workTimeInput.valueAsNumber);
    countLogic();
    isWorkPhase = true;
});

//reset cycles
stopBtn.addEventListener('click', (e) => {
    clearInterval(countdown);
    timerDisplay.innerText = "25:00";
    isWorkPhase  = false;
    isBreakPhase = false;
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