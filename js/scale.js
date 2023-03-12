const Scale = {
  INIT: '100%',
  STEP: 25,
  MIN: 25,
  MAX: 100
};


const scaleElement = document.querySelector('.scale');
const scaleSmallerElement = scaleElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = scaleElement.querySelector('.scale__control--bigger');
const scaleValueElement = scaleElement.querySelector('.scale__control--value');

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

const scalePicture = (userPicture) => {
  userPicture.style.transform = `scale(${(scaleValueElement.value.slice(0,-1) / 100)})`;
};

const setScaleClick = (element) => {
  scaleSmallerElement.addEventListener('click', () => {
    scaleCalculate(-Scale.STEP);
    scalePicture(element);
  });
  scaleBiggerElement.addEventListener('click', () => {
    scaleCalculate(Scale.STEP);
    scalePicture(element);
  });
};

const resetScale = (userPicture) => {
  scaleValueElement.value = Scale.INIT;
  scalePicture(userPicture);
};

export {setScaleClick, resetScale};
