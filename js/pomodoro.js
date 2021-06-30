import Timer from './timer.js';
import {show as showSetting} from './setting.js';

const main = document.querySelector('main');
const pomodoro = document.querySelector('#pomodoro');
const status = pomodoro.querySelector('#status')
const stopButton = pomodoro.querySelector('.button-container #stop');
const count = pomodoro.querySelector('#count-display');

const POMODORO_MODE_CLASSNAME = 'pomodoro';

let workingTime = 0;
let restingTime = 0;
let goalCount = 0;
let currentCount = 0;

let isWorking = true;
let intervalId = null;

const timer = new Timer();

const beep = new Audio('audio/beep.mp3');
const endSound = new Audio('audio/end.wav');

function restartTimer() {
    timer.stop();

    if(isWorking) {
        timer.set(workingTime,isWorking);
    } 
    else {
        timer.set(restingTime,isWorking);
    }

    timer.play();
}

function paintStatus() {
    if(isWorking) {
        status.textContent = 'WORKING';
    }
    else{
        status.textContent = 'RESTING';
    } 
}

function end() {
    endSound.play();
    stop();
}

function ringBeep() {
    beep.currentTime = 5;
    beep.play();
}

function changeStatus() {
    isWorking = !isWorking;

    if(isWorking && ++currentCount == goalCount) {
        end();
        return;
    }

    ringBeep();
    paintCount();
    paintStatus();
    restartTimer();
}

function checkTimerEnd() {
    const isWorkingEnd = isWorking && timer.progressTimeSec+1 == workingTime*60;
    const isRestingEnd = !isWorking && timer.progressTimeSec+1 == restingTime*60;

    if (isWorkingEnd || isRestingEnd) {
        changeStatus();
    } 
}

function stop() {
    timer.stop();

    main.classList.remove(POMODORO_MODE_CLASSNAME);
    currentCount = 0;
    clearInterval(intervalId);
    pomodoro.hidden = true;
    showSetting();
}

function paintCount() {
    count.textContent = `${currentCount+1} / ${goalCount}`;
}

export function init() { 
    const data = localStorage.getItem('current-setting');
    const currentSetting = JSON.parse(data);

    workingTime = Number(currentSetting.working);
    restingTime = Number(currentSetting.resting);
    goalCount = Number(currentSetting.goalCount);

    main.classList.add(POMODORO_MODE_CLASSNAME);

    isWorking = true;
    paintStatus();
    paintCount();

    intervalId = setInterval(checkTimerEnd,1000)
    stopButton.addEventListener('click', stop);

    timer.set(workingTime,isWorking);
    timer.play();
}

export function show() {
    pomodoro.hidden = false;
}
