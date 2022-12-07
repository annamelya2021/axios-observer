import { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let start = true;

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
let timerID = null;
if (start) {
  btnStart.setAttribute('disabled', true);
}
const refs = {
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
const options = {
  // Включает времея
  enableTime: true,
  //  добавляет выбор времени в 24-часовом режиме без выбора AM/PM,
  time_24hr: true,
  //   Устанавливает начальную выбранную дату
  defaultDate: new Date(),
  //   Регулирует шаг ввода минут
  minuteIncrement: 1,

  // Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем.
  // Параметр selectedDates это массив выбранных дат,
  // поэтому мы берем первый элемент.
  onClose(selectedDates) {
    if (selectedDates[0] < new Date().getTime()) {
      // если выбранная дата меньше текущей даты то
      // добавляем атрибут и кнопка старт неактивна и всплывает окно с оповещением
      // сменить дату
      // Если пользователь выбрал дату в прошлом,
      // покажи window.alert() с текстом "Please choose a date in the future".
      start = false;
      btnStart.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
      return;
    }
    // Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
    // Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
    // в противном случае если дата больше текущей
    //удаляем атрибут и делаем кнопку активной
    btnStart.removeAttribute('disabled', true);
    start = true;
    btnStart.addEventListener('click', function startTimer() {
      // и при клике на start она снова становится неактивной
      btnStart.setAttribute('disabled', true);
      // и при клике на start она снова становится неактивной
      input.setAttribute('disabled', true);
      // функция для расчета разницы времени
      // При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
      function time() {
        let countTime = selectedDates[0].getTime() - Date.now();
        convertMs(countTime);
        if (countTime <= 0) {
          clearInterval(timerID);
          refs.dataDays.textContent = '00';
          refs.dataHours.textContent = '00';
          refs.dataMinutes.textContent = '00';
          refs.dataSeconds.textContent = '00';
          return Notify.success('time end');
        }
      }
      // запускаем функцию с обратным отсчетом с интервалом
      timerID = setInterval(time, 1000);
    });
  },
};

flatpickr('input#datetime-picker', options);

// Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты.
// Обрати внимание, что она не форматирует результат.
// То есть, если осталось 4 минуты или любой другой составляющей времени, то функция вернет 4, а не 04.
// В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов.
// Напиши функцию addLeadingZero(value),
// которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;

  // return {days, hours, minutes, seconds};
}
