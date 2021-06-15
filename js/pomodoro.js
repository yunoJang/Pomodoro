import Timer from './timer.js';
import {show as showSetting} from './setting.js';

const pomodoro = document.querySelector('#pomodoro');
const status = pomodoro.querySelector('#status')
const stopButton = pomodoro.querySelector('.button-container #stop');
const controlButton = pomodoro.querySelector('.button-container #control');

let workingTime = 0;
let restingTime = 0;

let goalCount = 0;
let currentCount = 0;

let intervalId = null;

let isWorking = true;
let isPlay = true;

let timer = null;

function stop() {
    timer.stop();

    pomodoro.hidden = true;
    showSetting();
}

function restartTimer() {
    timer.stop();

    if(isWorking) {
        timer = new Timer(workingTime,isWorking);
    } 
    else {
        timer = new Timer(restingTime,isWorking);
    }

    timer.play();
}

function paintStatus() {
    if (isWorking) {
        status.textContent = 'WORKING';
    }
    else {
        status.textContent = 'RESTING';
    }
}

function changeStatus() {
    isWorking = !isWorking;

    if(isWorking) currentCount++;
    
    if(currentCount === goalCount) stop();

    paintStatus();

    restartTimer();
}

function tickSecond() {
    const isWorkingEnd = isWorking && timer.progressTimeSec === workingTime*60;
    const isRestingEnd = !isWorking && timer.progressTimeSec === restingTime*60;

    if ( isWorkingEnd || isRestingEnd ) {
        changeStatus();
    } 
}

function play() {
    intervalId = setInterval(tickSecond,1000);
    isPlay = true;

    timer.play();
}

function pause() {
    clearInterval(intervalId);
    isPlay = false;

    timer.pause();
}

function onClickControl() {
    if (isPlay) {
        pause();
    } else {
        play();
    }
}


export function init() {
    const localStorageData = localStorage.getItem('time');
    const settingTime = JSON.parse(localStorageData);
    workingTime = Number(settingTime.working);
    restingTime = Number(settingTime.resting);
    goalCount = Number(settingTime.goalCount);

    isWorking = true;
    paintStatus();

    stopButton.addEventListener('click', stop);
    controlButton.addEventListener('click', onClickControl);

    timer = new Timer(workingTime, isWorking);
    play();
}

export function show() {
    pomodoro.hidden = false;
}
