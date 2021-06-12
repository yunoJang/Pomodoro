const timer = document.getElementById('timer');
const lines = timer.querySelector('#lines');
const fins = timer.querySelector('#fins');
const nums = timer.querySelector('#num-container');

const control = document.querySelector('.button-container #control');

const endTime = 40;

let intervalID = null;

let isPlay = true;

function paintLines() {
    for(let i=0; i<30; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.transform = `rotate(${i*6}deg)`;

        if (i%5 == 0) {
            line.classList.add('thick')
        }

        lines.append(line);
    }
}

function paintNumber() {
    let left = 15;
    let right = 45;

    for (let i=0; i<6; i++) {
        const numBox = document.createElement('div');
        numBox.classList.add('num-box');
        numBox.style.transform = `rotate(${i*30}deg)`;

        const spanLeft = document.createElement('span');
        const spanRight = document.createElement('span');

        const leftText = left - 5*i;
        spanLeft.textContent = leftText<0 ? 60+ leftText : leftText;
        spanRight.textContent = right - (5 * i);

        spanLeft.style.transform = `rotate(${-30*i}deg)`;
        spanRight.style.transform = `rotate(${-30*i}deg)`;

        numBox.append(spanLeft,spanRight);
        nums.append(numBox);
    }
}

function paintRemainTime() {
    for (let min=0; min<endTime; min++) {
        for (let sec=0; sec<60; sec++) {
            const remainFin = document.createElement('div');
            remainFin.classList.add('fin');

            const deg = min*6+sec*0.1;
            remainFin.style.transform = `rotate(${-deg}deg)`
            
            fins.append(remainFin);
        }
    }
}

function tickSec() {
    const lastFin = fins.lastChild;
    if (lastFin) {
        lastFin.remove();
    }
}

function play() {
    intervalID = setInterval(tickSec,1000)
}

function pause() {
    clearInterval(intervalID);
}

function onClickControl() {
    if (isPlay) {
        pause();
        control.textContent = '▶';
        isPlay = false;
    } else {
        play();
        control.textContent = '⏸';
        isPlay = true;
    }
}

if (lines) {
    paintLines();
}

if (nums) {
    paintNumber();
}

if (fins) {
    paintRemainTime();
    play();
}

if(control) {
    control.addEventListener('click', onClickControl);
}