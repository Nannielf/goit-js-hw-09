
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let interval = 0;

stopBtn.disabled = true;
stopBtn.addEventListener('click', onStop);
startBtn.addEventListener('click', onStart);

function onStart(e) {
    e.target.disabled = true;
    stopBtn.disabled = false;

    interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};
function onStop(e) {
    startBtn.disabled = false;
    e.target.disabled = true;

    clearInterval(interval);
    document.body.style.backgroundColor = '#fafafa';
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}