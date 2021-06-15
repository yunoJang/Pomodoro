const timer = document.getElementById('timer');
const lines = timer.querySelector('#lines');
const fins = timer.querySelector('#fins');
const nums = timer.querySelector('#num-container');
const remainTimeDisplay = document.querySelector('.time-container #remain-time');
const totalTimeDisplay = document.querySelector('.time-container #total-time');

export default class Timer {
    constructor(time, isWorking) {
        this.totalTime = time;
        this.progressTimeSec = 0;
        this.isWorking = isWorking;

        this.intervalId = null;
        
        paintLines();
        paintNumber();
        
        this.paintRemainFins();
        if(totalTimeDisplay && remainTimeDisplay) this.paintTime();

        this.play();
    }

    paintTime() {
        renderRemainTime();
        totalTimeDisplay.textContent = `( ${this.totalTime} : 00 )`;
    }

    paintRemainFins() {
        for (let min=0; min<this.totalTime; min++) {
            for (let sec=0; sec<60; sec++) {
                const fin = document.createElement('div');
                fin.classList.add('fin');
    
                if(!this.isWorking) {
                    fin.classList.add('resting');
                }
    
                const deg = min*6+sec*0.1;
                fin.style.transform = `rotate(${-deg}deg)`
                
                fins.append(fin);
            }
        }
    }

    tickSecond() {
        const lastFin = fins.lastChild;
        if (lastFin) {
            lastFin.remove();
        }

        this.progressTimeSec++;

        renderRemainTime();
    }

    play() {
        this.intervalID = setInterval(this.tickSecond.bind(this),1000)
        control.innerHTML = `<i class="fas fa-pause"></i>`;
    }
    
    pause() {
        clearInterval(this.intervalID);
        control.innerHTML = `<i class="fas fa-play"></i>`;
    }

    stop() {
        this.pause();
    
        while(fins.children.length) {
            const child = fins.lastElementChild;
            child.remove();
        }
    }

}

let remainMin = 0;
let remainSec = 0;

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

function renderRemainTime() {
    if(remainMin < 0) return;

    remainTimeDisplay.textContent = `
        ${remainMin < 10 ? `0${remainMin}`: remainMin}:
        ${remainSec < 10 ? `0${remainSec}`: remainSec}
    `;

    remainSec--;
    if (remainSec < 0) {
        remainSec = 59;
        remainMin--;
    }
}

