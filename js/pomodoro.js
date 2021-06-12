import {stop as stopTimer, init as initTimer} from './timer.js';
import {show as showSetting} from './setting.js';


const pomodoro = document.querySelector('#pomodoro');
const stopButton = document.querySelector('.button-container #stop');

let workingTime = 0;
let restingTime = 0;
let goalCount = 0;

let progressTime = 0;

function stop() {
    progressTime = 0;
    stopTimer();

    pomodoro.hidden = true;
    showSetting();
}

export function init() {
    const json = localStorage.getItem('time');
    const settingTime = JSON.parse(json);

    workingTime = Number(settingTime.working);
    restingTime = Number(settingTime.resting);
    goalCount = Number(settingTime.goal);

    stopButton.addEventListener('click', stop);

    initTimer(workingTime);
}

export function show() {
    pomodoro.hidden = false;
}
