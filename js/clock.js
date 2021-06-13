const clockTitle = document.querySelector('.clock #title');
const am = document.querySelector('.clock #am');
const pm = document.querySelector('.clock #pm');

const ACTIVE_CLASSNAME = 'active';

export function getDate() {
    const date = new Date();

    const hours = date.getHours(),
        minute = date.getMinutes(),
          seconds = date.getSeconds();

    return {hours,minute,seconds};
}

function renderDate(){
    const {hours,minute,seconds} = getDate();

    let hours12 = hours;
    
    if(hours>12) {
        hours12 = hours - 12;
        
        am.classList.remove(ACTIVE_CLASSNAME);
        pm.classList.add(ACTIVE_CLASSNAME);
    } else {
        am.classList.add(ACTIVE_CLASSNAME);
        pm.classList.remove(ACTIVE_CLASSNAME);
    }

    const less10 = (time) => time<10;

    clockTitle.textContent = `
        ${less10(hours12) ? `0${hours12}` : hours12} :
        ${less10(minute) ? `0${minute}` : minute} :
        ${less10(seconds) ? `0${seconds}` : seconds} 
    `
}

renderDate();
setInterval(renderDate, 100);