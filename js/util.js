/**
 * Проверка на нажатие кнопки Esc
 * @param {object} evt - объект события
 * @return {boolean} true, если нажата кнопка Esc
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

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

export {isEscapeKey, createRandomIdFromRangeGenerator, debounce};
