const ALERT_SHOW_TIME = 5000;

/**
 * Проверка на нажатие кнопки Esc
 * @param {object} evt - объект события
 * @return {boolean} true, если нажата кнопка Esc
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Функция показывает сообщение при неудачной попытки получения данных с сервера
 * @param {string} message - сообщение об ошибке
 */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

/**
 * Генератор случайных целых чисел в заданном диапазоне
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @return {number} случайное целое число
 */
const generateRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

/**
 * Генератор случайных не повторяющихся целых чисел в заданном диапазоне
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @return {number} случайное цело число из заданного диапазона
 */
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = generateRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = generateRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

/**
 * Функция устранения дребезга
 * @param callback - колбэк функция
 * @param {number} timeoutDelay - задержка в миллисекундах
 * @return {(function(...[*]): void)|*}
 */
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, showAlert, createRandomIdFromRangeGenerator, debounce};
