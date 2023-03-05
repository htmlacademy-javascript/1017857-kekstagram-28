/**
 * Генератор последовательности целых чисел начиная с нуля с шагом +1
 * @return {number} положительное целое число
 */
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
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
 * Генератор случайного элемента из массива
 * @param {Array} array - массив с данными
 * @return {string} случайное значение из массива array
 */
const generateRandomElement = (array) => array[generateRandomInteger(0, array.length - 1)];

/**
 * Проверяет на нажатие кнопки Enter
 * @param evt
 * @return {boolean}
 */

export {createIdGenerator, generateRandomInteger, createRandomIdFromRangeGenerator, generateRandomElement};
