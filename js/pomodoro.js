import Timer from './timer.js';
import {show as showSetting} from './setting.js';

const pomodoro = document.querySelector('#pomodoro');
const stopButton = pomodoro.querySelector('.button-container #stop');
const controlButton = pomodoro.querySelector('.button-container #control');
const status = pomodoro.querySelector('#status')

let workingTime = 0;
let restingTime = 0;
let goalCount = 0;

let timerProgress = 0;
let isPlay = true;
let isWorking = true;
let currentCount = 0;

let intervalId = null;

let timer = null;

function stop() {
    timerProgress = 0;
    clearInterval(intervalId);
    
    timer.stop();

    pomodoro.hidden = true;
    showSetting();
}

function restartTimer() {
    timerProgress = 0;
    timer.stop();

    if(isWorking) {
        timer = new Timer(workingTime, isWorking);
    } 
    else {
        timer = new Timer(restingTime, isWorking);
    }
}

function changeStatus() {
    isWorking = !isWorking;

    if (isWorking) {
        status.textContent = 'WORKING';

        currentCount++;
        if ( currentCount === goalCount ) {
            stop();
        }
    }
    else {
        status.textContent = 'RESTING';
    }

    restartTimer();
}

function tickSecond() {
    timerProgress++;

    const isWorkingEnd = isWorking && timerProgress === workingTime*60;
    const isRestingEnd = !isWorking && timerProgress === restingTime*60;

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
    isWorking = true;
    status.textContent = 'WORKING';
    
    const json = localStorage.getItem('time');
    const settingTime = JSON.parse(json);

    workingTime = Number(settingTime.working);
    restingTime = Number(settingTime.resting);
    goalCount = Number(settingTime.goalCount);

    stopButton.addEventListener('click', stop);
    controlButton.addEventListener('click', onClickControl);

    timer = new Timer(workingTime, isWorking);
}

export function show() {
    pomodoro.hidden = false;
}
