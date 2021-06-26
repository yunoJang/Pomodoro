import Timer from './timer.js';
import {show as showSetting} from './setting.js';

const pomodoro = document.querySelector('#pomodoro');
const status = pomodoro.querySelector('#status')
const stopButton = pomodoro.querySelector('.button-container #stop');

let workingTime = 0;
let restingTime = 0;
let goalCount = 0;
let currentCount = 0;

let isWorking = true;
let intervalId = null;

const timer = new Timer();

const beep = new Audio('/audio/beep.mp3');
const endSound = new Audio('/audio/end.wav');

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

function paintStatus(text) {
    status.textContent = `${text}`;
}

function end() {
    endSound.play();
    stop();
}

function changeStatus() {
    isWorking = !isWorking;

    if(isWorking && ++currentCount == goalCount) {
        end();
        return;
    }

    beep.currentTime = 2;
    beep.play();
    paintStatus(isWorking?'Working':'Resting');
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

    currentCount = 0;
    clearInterval(intervalId);
    pomodoro.hidden = true;
    showSetting();
}

export function init() {
    const localStorageData = localStorage.getItem('time');
    const settingTime = JSON.parse(localStorageData);

    workingTime = Number(settingTime.working);
    restingTime = Number(settingTime.resting);
    goalCount = Number(settingTime.goalCount);

    isWorking = true;
    paintStatus('Working');

    intervalId = setInterval(checkTimerEnd,1000)
    stopButton.addEventListener('click', stop);

    timer.set(workingTime,isWorking);
    timer.play();
}

export function show() {
    pomodoro.hidden = false;
}
