import {setTime, onSubmit} from './setting.js';

const recent = document.querySelector('#recent');
const toggle = recent.querySelector('#toggle');
const settingList = recent.querySelector('#setting-list');

const SETTING_LS = 'recent-setting';
const EMOJI = {'working':'✍🏻', 'resting':'🛌', 'goalCount':'🚩'};

let recentSettings = [];

class Setting{
    constructor(setting, index) {
        this.setting = setting;
        this.index = index;

        this.dom = document.createElement('li');
        this.dom.addEventListener('click', this.onClickSetting);

        const head = document.createElement('h1');
        head.textContent = `# ${Number(index)+1}`;
    
        const content = document.createElement('div');
        content.classList.add('setting-content');
        this.paintContent(content);
    
        this.dom.append(head,content);
    }

    onClickSetting = e=> {
        setTime(recentSettings[this.index]);
        onSubmit(e);
    }

    paintContent(content) {
        for(const [key,value] of Object.entries(this.setting)) {
            const div = document.createElement('div');
        
            const spanEmoji = document.createElement('span');
            spanEmoji.textContent = EMOJI[key];
        
            const spanValue = document.createElement('span');
            spanValue.textContent = value;
        
            if(key == 'working' || key == 'resting') {
                spanValue.textContent += '분';
            }
            else if (key == 'goalCount') {
                spanValue.textContent += '회';
            }
        
            div.append(spanEmoji,spanValue);
            content.append(div);
        }
    }

}

function paintSettingList() {
    if(recentSettings.length > 0) {
        settingList.classList.remove('empty');
        recentSettings.forEach((v, i)=> {
            const setting = new Setting(v,i);
            settingList.append(setting.dom);
        });
    }
    else {
        settingList.classList.add('empty');
        settingList.textContent = 'no recent setting';
    }
}

function clearSettingList() {
    settingList.innerHTML = '';
}

function loadSetting() {
    const data = JSON.parse(localStorage.getItem(SETTING_LS)) ?? [];
    recentSettings = data;

    clearSettingList();
    paintSettingList();
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