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

let timer = new Timer();

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

function resting() {
    isWorking = false;
    paintStatus('Resting');
    restartTimer();
}

function working() {
    currentCount++;
    if(currentCount == goalCount) {
        stop();
    }else {
        isWorking = true;
        paintStatus('Working');
        restartTimer();
    }
}

function checkTimerEnd() {
    const isWorkingEnd = isWorking && timer.progressTimeSec == workingTime*60;
    const isRestingEnd = !isWorking && timer.progressTimeSec == restingTime*60;

    if (isWorkingEnd) {
        resting();
    } 
    else if(isRestingEnd) {
        working()
    }
}

function stop() {
    timer.stop();
    currentCount = 0;

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

    setInterval(checkTimerEnd,100)
    stopButton.addEventListener('click', stop);

    timer.set(workingTime,isWorking);
    timer.play();
}

export function show() {
    pomodoro.hidden = false;
}
