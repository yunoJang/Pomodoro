const timer = document.getElementById('timer');
const lines = timer.querySelector('#lines');
const fins = timer.querySelector('#fins');
const nums = timer.querySelector('#num-container');
const controlButton = pomodoro.querySelector('.button-container #control');
const remainTimeDisplay = document.querySelector('.time-container #remain-time');
const totalTimeDisplay = document.querySelector('.time-container #total-time');

export default class Timer {
    constructor() {
        this.progressTimeSec = 0;
        this.intervalId = null;

        controlButton.addEventListener('click', this.clickControl.bind(this));
    }

    set(time,isWorking) {
        this.totalTime = time;
        this.progressTimeSec = 0;
        this.paintRemainFins(isWorking);
        this.paintTime();
    }

    clickControl() {
        if(this.isPlay) this.pause();
        else this.play();
    }

    stop() {
        this.pause();
    
        while(fins.children.length) {
            const child = fins.lastElementChild;
            child.remove();
        }
    }

    tickSecond() {
        this.progressTimeSec++;

        const lastFin = fins.lastChild;
        if (lastFin) lastFin.remove();

        this.renderRemainTime();
    }

    play() {
        this.isPlay = true;
        this.intervalID = setInterval(this.tickSecond.bind(this),1000)
        control.innerHTML = `<i class="fas fa-pause"></i>`;
    }
    
    pause() {
        this.isPlay = false;
        clearInterval(this.intervalID);
        control.innerHTML = `<i class="fas fa-play"></i>`;
    }

    renderRemainTime() {
        const totalSec = this.totalTime * 60 - this.progressTimeSec;
        const min = Math.floor(totalSec/60);
        const sec = totalSec % 60;

        remainTimeDisplay.textContent = `
            ${min<10? `0${min}`: min} : 
            ${sec<10? `0${sec}`: sec}
        `;
    }

    paintTime() {
        this.renderRemainTime();
        totalTimeDisplay.textContent = `( ${this.totalTime} : 00 )`;
    }

    paintRemainFins(isWorking) {
        for (let min=0; min<this.totalTime; min++) {
            for (let sec=0; sec<60; sec++) {
                const fin = document.createElement('div');
                fin.classList.add('fin');
    
                if(!isWorking) {
                    fin.classList.add('resting');
                }
    
                const deg = min*6+sec*0.1;
                fin.style.transform = `rotate(${-deg}deg)`
                
                fins.append(fin);
            }
        }
    }

}

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

paintLines();
paintNumber();
