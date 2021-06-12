const form = document.querySelector('#name-form'),
    input = form.querySelector('input');

const greetingContainer = document.querySelector('#greeting'),
    title = greetingContainer.querySelector('#title');

const USER_LS = 'currentUser';

function saveName(text) {
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();

    const currentValue = input.value;
    if(!currentValue) return;

    saveName(currentValue);
    paintGreeting(currentValue)
}

function askForName() {
    greetingContainer.hidden = true;
    form.hidden = false;
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text) {
    form.hidden = true;
    greetingContainer.hidden = false;
    title.textContent = `🍅 Hello ${text} 🍅`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

export function hide() {
    form.hidden = true;
    greetingContainer.hidden = true;
}

export function init() {
    loadName();
}
