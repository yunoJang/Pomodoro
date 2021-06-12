import './js/greeting.js';
import './js/clock.js'
import {show as showSetting} from './js/setting.js';
import {show as showPomodoro} from './js/pomodoro.js';
import './js/timer.js';


function init() {
    const time = localStorage.getItem('time');
    
    if(time === null) {
        showSetting();
    } else {
        showPomodoro();
    }
}

init();