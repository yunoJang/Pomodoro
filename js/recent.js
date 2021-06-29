import {setTime, onSubmit} from './setting.js';

const recent = document.querySelector('#recent');
const toggle = recent.querySelector('#toggle');
const list = recent.querySelector('#setting-list');

const SETTING_LS = 'recent-setting';
const EMOJI = {'working':'✍🏻', 'resting':'🛌', 'goalCount':'🚩'};

let recentSettings = [];

function onClickRecentSet(e) {
    const list = e.target.closest('li');
    const id = list.dataset.id;

    setTime(recentSettings[id]);
    onSubmit(e);
}

function paintContent(content,key,value) {
    const div = document.createElement('div');

    const spanEmoji = document.createElement('span');
    spanEmoji.textContent = EMOJI[key];

    const spanTime = document.createElement('span');
    spanTime.textContent = value;

    if(key == 'working' || key == 'resting') {
        spanTime.textContent += 'M';
    }

    div.append(spanEmoji,spanTime);
    content.append(div);
}

function paintSettings() {
    const createList = (set,i)=> {
        const li = document.createElement('li');
        li.dataset.id = i;
        li.addEventListener('click', onClickRecentSet);

        const h1 = document.createElement('h1');
        h1.textContent = `#${Number(i)+1}`;
    
        const content = document.createElement('div');
        content.classList.add('setting-content');
        
        for(const [key,value] of Object.entries(set)) {
            paintContent(content,key,value);
        }
    
        li.append(h1,content);
        list.append(li);
    }

    if(recentSettings.length > 0) {
        recentSettings.forEach(createList);
        list.classList.remove('empty');
    }
    else {
        list.hidden = true;
        list.textContent = 'no recent setting';
        list.classList.add('empty');
    }
}

function clearSettings() {
    list.innerHTML = '';
}

function loadSetting() {
    const settings = JSON.parse(localStorage.getItem(SETTING_LS)) ?? [];
    recentSettings = settings;

    clearSettings();
    paintSettings();
}

function onClickToggle() {
    list.hidden = !list.hidden;
}


export function init() {
    loadSetting();

    toggle.addEventListener('click', onClickToggle);
}
