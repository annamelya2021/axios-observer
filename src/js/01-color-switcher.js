const bodyRef = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let timerId = null;

buttonStart.addEventListener('click', () => {
  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
  timerId = setInterval(
    () =>
      (bodyRef.style.backgroundColor = `#${Math.floor(
        Math.random() * 16777215
      ).toString(16)}`),
    1000
  );
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  //   bodyRef.style.backgroundColor = 'white';
  buttonStop.setAttribute('disabled', false);
  buttonStart.removeAttribute('disabled', false);
  setTimeout(() => {
    bodyRef.style.backgroundColor = 'white';
  }, 1000);
});
