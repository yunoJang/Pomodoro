import {setTime, onSubmit} from './setting.js';

const recent = document.querySelector('#recent');
const toggle = recent.querySelector('#toggle');
const settingList = recent.querySelector('#setting-list');

const SETTING_LS = 'recent-setting';
const EMOJI = {'working':'✍🏻', 'resting':'🛌', 'goalCount':'🚩'};

let recentSettings = [];

class Setting{
    constructor(setting, index) {
        const li = document.createElement('li');
        li.addEventListener('click', e=> {
            setTime(recentSettings[index]);
            onSubmit(e);
        });

        this.head = document.createElement('h1');
        this.head.textContent = `# ${Number(index)+1}`;
    
        this.content = document.createElement('div');
        this.content.classList.add('setting-content');
        
        for(const [key,value] of Object.entries(setting)) {
            this.paintContent(key,value);
        }
    
        li.append(this.head,this.content);

        this.appendList(li);
    }

    appendList(li) {
        settingList.append(li);
    }
    
    paintContent(key,value) {
        const div = document.createElement('div');
    
        const spanEmoji = document.createElement('span');
        spanEmoji.textContent = EMOJI[key];
    
        const spanTime = document.createElement('span');
        spanTime.textContent = value;
    
        if(key == 'working' || key == 'resting') {
            spanTime.textContent += '분';
        }
        else if (key == 'goalCount') {
            spanTime.textContent += '회';
        }
    
        div.append(spanEmoji,spanTime);
        this.content.append(div);
    }
}

function paintSettings() {
    if(recentSettings.length > 0) {
        settingList.classList.remove('empty');
        recentSettings.forEach((v, i)=> new Setting(v,i));
    }
    else {
        settingList.classList.add('empty');
        settingList.textContent = 'no recent setting';
    }
}

function clearSettings() {
    settingList.innerHTML = '';
}

function loadSetting() {
    const data = JSON.parse(localStorage.getItem(SETTING_LS)) ?? [];
    recentSettings = data;

    clearSettings();
    paintSettings();
}

function onClickToggle() {
    if (settingList.hidden) {
        settingList.classList.add('show');
        settingList.hidden = false;
    }
    else {
        settingList.classList.remove('show');
        settingList.hidden = true;
    }
}

export function init() {
    loadSetting();

    toggle.addEventListener('click', onClickToggle);
}