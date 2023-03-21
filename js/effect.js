const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');
const effectSliderContainer = document.querySelector('.effect-level');

const hideSlider = () => {
  effectSliderContainer.classList.add('hidden');
};

const showSlider = () => {
  effectSliderContainer.classList.remove('hidden');
};

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});
const getFilter = (userPicture, filterValue) => {
  const effect = userPicture.classList.value.split('--')[1];
  let filter;
  switch (effect) {
    case 'chrome':
      filter = `grayscale(${filterValue})`;
      break;
    case 'sepia':
      filter = `sepia(${filterValue})`;
      break;
    case 'marvin':
      filter = `invert(${filterValue}%)`;
      break;
    case 'phobos':
      filter = `blur(${filterValue}px)`;
      break;
    case 'heat':
      filter = `brightness(${filterValue})`;
      break;
    default:
      filter = '';
  }
  userPicture.style.filter = filter;
};

const effectList = document.querySelector('.effects__list');

const resetEffect = (userPicture) => {
  userPicture.classList.remove(userPicture.classList.item(0));
  userPicture.classList.add('effects__preview--none');
  hideSlider();
  effectLevelSliderElement.noUiSlider.set(100);
};

const setEffectLevelSliderClickUpdate = (userPicture) => {
  effectLevelSliderElement.noUiSlider.on('update', () => {
    effectLevelElement.value = effectLevelSliderElement.noUiSlider.get();
    getFilter(userPicture, effectLevelElement.value);
  });

  effectList.addEventListener('click', (evt) => {
    userPicture.classList.remove(userPicture.classList.item(0));
    userPicture.classList.add(`effects__preview--${evt.target.value}`);
    switch (evt.target.value) {
      case 'chrome':
        showSlider();
        effectLevelSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1
        });
        break;
      case 'sepia':
        showSlider();
        effectLevelSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1
        });
        break;
      case 'marvin':
        showSlider();
        effectLevelSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100
          },
          start: 100,
          step: 1
        });
        break;
      case 'phobos':
        showSlider();
        effectLevelSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3
          },
          start: 3,
          step: 0.1
        });
        break;
      case 'heat':
        showSlider();
        effectLevelSliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3
          },
          start: 3,
          step: 0.1
        });
        break;
      default:
        resetEffect(userPicture);
    }
  });
};

export {setEffectLevelSliderClickUpdate, resetEffect};
