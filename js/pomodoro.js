import {stop as stopTimer, init as initTimer, play as playTimer, pause as pauseTimer} from './timer.js';
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

function stop() {
    timerProgress = 0;
    clearInterval(intervalId);
    
    stopTimer();

    pomodoro.hidden = true;
    showSetting();
}

function restartTimer() {
    timerProgress = 0;
    stopTimer();

    if(isWorking) {
        initTimer(workingTime,isWorking);
    } 
    else {
        initTimer(restingTime,isWorking);
    }

    playTimer();
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

    playTimer();
}

function pause() {
    clearInterval(intervalId);
    isPlay = false;

    pauseTimer();
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

    initTimer(workingTime,isWorking);
    play();
}

export function show() {
    pomodoro.hidden = false;
}
