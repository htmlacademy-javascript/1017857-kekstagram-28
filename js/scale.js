const Scale = {
  INIT: 100,
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const scaleElement = document.querySelector('.scale');
const scaleSmallerElement = scaleElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = scaleElement.querySelector('.scale__control--bigger');
const scaleValueElement = scaleElement.querySelector('.scale__control--value');

/**
 * Функция рассчитывает масштаб изображения
 * @param {number} step - шаг масштабирования
 */
const scaleCalculate = (step) => {
  let result;
  let scaleValue = Number(scaleValueElement.value.slice(0,-1));
  scaleValue = scaleValue + step;
  scaleValue = Math.round(scaleValue / Math.abs(step)) * Math.abs(step);
  if (scaleValue < Scale.MIN) {
    result = Scale.MIN;
  } else if (scaleValue > Scale.MAX) {
    result = Scale.MAX;
  } else {
    result = scaleValue;
  }
  scaleValueElement.value = `${result}%`;
};

/**
 * Функция применяет масштаб к пользовательскому изображению
 * @param {Node} userPicture - пользовательское изображение. HTML элемент.
 */
const scalePicture = (userPicture) => {
  userPicture.style.transform = `scale(${(scaleValueElement.value.slice(0,-1) / 100)})`;
};

/**
 * Функция добавляет обработчик события по клику по кнопкам масштабирования
 * @param {Node} userPicture - пользовательское изображение. HTML элемент.
 */
const addScaleClickHandler = (userPicture) => {
  scaleSmallerElement.addEventListener('click', () => {
    scaleCalculate(-Scale.STEP);
    scalePicture(userPicture);
  });
  scaleBiggerElement.addEventListener('click', () => {
    scaleCalculate(Scale.STEP);
    scalePicture(userPicture);
  });
};

/**
 * Функция сбрасывает значение масштаба в 100%
 * @param userPicture
 */
const resetScale = (userPicture) => {
  scaleValueElement.value = `${Scale.INIT}%`;
  scalePicture(userPicture);
};

export {addScaleClickHandler, resetScale};
