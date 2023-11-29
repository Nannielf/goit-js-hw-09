import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
  }
)
}

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;

  let inputDelay = Number(delay.value);
  const inputAmount = Number(amount.value);
  const inputStep = Number(step.value);

  for (let i = 1; i <= inputAmount; i+=1) {
    
    createPromise(i, inputDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    inputDelay += inputStep;
  }
  e.currentTarget.reset();
}