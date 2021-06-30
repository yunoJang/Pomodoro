import {init as initGreeting} from './greeting.js';
import {init as initRecent} from './recent.js';
import {show as showPomodoro, init as initPomodoro} from './pomodoro.js';

const setting = document.querySelector('#setting-container');
const form = document.querySelector('#setting-form'),
    working = form.querySelector('#working'),
    resting = form.querySelector('#resting'),
    goal = form.querySelector('#goal');
const timeResult = document.querySelector('#time-result'),
    total = timeResult.querySelector('#total-time'),
    end = timeResult.querySelector('#end-time');

const RECENT_SETTING_LS = 'recent-setting';

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

    localStorage.setItem('current-setting',JSON.stringify(time));
}

function indexOfObject(arr,find) {
    arrLoop:
    for (const index in arr) {
        const object = arr[index];

        for (const [key,value] of Object.entries(object)) {
            // not same
            if (find[key] != value) continue arrLoop;
        } 
        // all same
        return index;
    }

    return -1;
}

function saveSetting() {
    const now = {
        working : working.value,
        resting : resting.value,
        goalCount : goal.value,
    }

    const settings = JSON.parse(localStorage.getItem(RECENT_SETTING_LS)) ?? [];
    const index = indexOfObject(settings,now);

    // included in settings
    if (index != -1) {
        settings.splice(index,1);
        settings.unshift(now);
    }
    // not included in settings
    else {
        if(settings.length > 2) settings.pop();
        settings.unshift(now);
    }

    localStorage.setItem(RECENT_SETTING_LS,JSON.stringify(settings));
}

export function onSubmit(e) {
    e.preventDefault();

    saveTime();
    saveSetting();

    hide();

    initPomodoro();
    showPomodoro();
}

export function setTime(setting) {
    working.value = setting.working;
    resting.value = setting.resting;
    goal.value = setting.goalCount;
}

export function show() {
    initGreeting();
    initRecent();

    renderResult();
    setting.hidden = false;
}

export function hide() {
    setting.hidden = true;
}

form.addEventListener('submit',onSubmit);
working.addEventListener('input',onInput)
resting.addEventListener('input',onInput)
goal.addEventListener('input', onInputGoal)

renderResult();