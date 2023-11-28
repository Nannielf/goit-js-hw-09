import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.fontWeight = 'bold';
document.body.style.fontSize = '16px';
const timer = document.querySelector('.timer');
timer.style.display = 'flex';
timer.style.gap = '5px';


const startBtn = document.querySelector('[data-start]');
const inputDate = document.querySelector('input#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let selectedDate = 0;
let currentDate = 0;
let interval = 0;
startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
      if(selectedDates[0].getTime() < Date.now()) {
  
        Report.failure(
            'Warning!',
            'Please choose a date in the future.',
            'OK',
            );
      } else {
        Report.success(
            'Super!',
            'Please, click on button start.',
            'OK',
            );
        startBtn.disabled = false;
        selectedDate = selectedDates[0].getTime();
      }
    },
  };
const fp = flatpickr(inputDate, options);


const counter = {
    start() {
        interval = setInterval(() => {
            startBtn.disabled = true;
            inputDate.disabled = true;
            currentDate = Date.now();
            const delta = selectedDate - currentDate;
            convertMs(delta);
            addZero(convertMs(delta));
            if (delta <= 1000) {
                this.stop();
                Report.info(
                    'That is over',
                    'Choose a new date and time',
                    'OK',
                    );
            }
        }, 1000);
    }, 
    stop() {
        clearInterval(interval);
        startBtn.disabled = true;
        inputDate.disabled = false;
        return;
    },
}
startBtn.addEventListener("click", onStart);
function onStart () {
    counter.start()
}


function addZero ({ days, hours, minutes, seconds }) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }