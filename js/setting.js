import {hide as hideGreeting, init as initGreeting} from './greeting.js';
import {show as showPomodoro, init as initPomodoro} from './pomodoro.js';

const setting = document.querySelector('#setting');
const form = document.querySelector('#setting-form'),
    working = form.querySelector('#working'),
    resting = form.querySelector('#resting'),
    goal = form.querySelector('#goal');
const timeResult = document.querySelector('#time-result'),
    total = timeResult.querySelector('#total-time'),
    end = timeResult.querySelector('#end-time');

function renderEndTime(totalTime) {
    const endDate = new Date(Date.now()+(totalTime*60000));
    const endDay = endDate.getDate();
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();

    end.textContent = `
        ${endHours < 10 ? `0${endHours}` : endHours} :
        ${endMinutes < 10 ? `0${endMinutes}` : endMinutes}
    `;
}

function renderTotalTime(totalTime) {
    const hours = Math.floor(totalTime/60);
    const minutes = totalTime%60;

    total.textContent = `${hours}H ${minutes}M`
}

function renderResult() {
    const workingTime = Number(working.value);
    const restingTime = Number(resting.value);
    const goalCount = Number(goal.value);
    
    const totalTime = (workingTime + restingTime) * goalCount;

    renderTotalTime(totalTime);
    renderEndTime(totalTime);
}

function onInput(e) {
    const value = Number(e.target.value);

    if(!Number.isInteger(value)) {
        e.target.value = 0;
    }
    else if (value > 60) {
        e.target.value = 60;
    }
    else {
        e.target.value = value;
    }

    renderResult();
}

function onInputGoal(e) {
    const value = Number(goal.value);

    if(!Number.isInteger(value)) {
        goal.value = 0;
    } 
    else if(value >= 100) {
        goal.value = 99;
    }

    renderResult();
}

function saveTime() {
    const time = {
        working : working.value,
        resting : resting.value,
        goalCount : goal.value,
    }

    localStorage.setItem('time',JSON.stringify(time));
}

function onSubmit(e) {
    e.preventDefault();

    saveTime();

    hide();
    hideGreeting();

    initPomodoro();
    showPomodoro();
}

export function show() {
    initGreeting();
    renderResult();
    
    setting.hidden = false;
}

export function hide() {
    setting.hidden = true;
}

if (form) {
    form.addEventListener('submit',onSubmit);
}

if (timeResult) {
    renderResult();
}

if (working) {
    working.addEventListener('input',onInput)
}

if (resting) {
    resting.addEventListener('input',onInput)
}

if (goal) {
    goal.addEventListener('input', onInputGoal)
}
