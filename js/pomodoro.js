import {play, paintRemainTime} from './timer.js';

const pomodoro = document.querySelector('#pomodoro');

let workingTime = 0;
let restingTime = 0;
let goalCount = 0;

export function show() {
    pomodoro.hidden = false;
}

export function init() {
    const json = localStorage.getItem('time');
    const settingTime = JSON.parse(json);

    workingTime = Number(settingTime.working);
    restingTime = Number(settingTime.resting);
    goalCount = Number(settingTime.goal);

    paintRemainTime(workingTime);
    play();
}