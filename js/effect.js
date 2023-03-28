const effects = {
  none: {
    name: 'none',
    filter: '',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    connect: 'lower'
  },
  chrome: {
    name: 'chrome',
    filter: 'grayscale',
    units: '',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  sepia: {
    name: 'sepia',
    filter: 'sepia',
    units: '',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  marvin: {
    name: 'marvin',
    filter: 'invert',
    units: '%',
    range: {
      min: 1,
      max: 100
    },
    start: 100,
    step: 1
  },
  phobos: {
    name: 'phobos',
    filter: 'blur',
    units: 'px',
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  heat: {
    name: 'heat',
    filter: 'brightness',
    units: '',
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
};

const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');
const effectSliderContainer = document.querySelector('.effect-level');
const effectList = document.querySelector('.effects__list');
let currentFilter = effects.none.name;

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: effects.none.range.min,
    max: effects.none.range.max,
  },
  start: effects.none.start,
  step: effects.none.step,
  connect: effects.none.connect,
});

/**
 * Функция для устанавливает стиль эффекта
 * @param {Node} userPicture - пользовательское изображение. HTML элемент.
 * @param {string} filterValue - название эффекта
 */
const setFilter = (userPicture, filterValue) => {
  const filterUnit = effects[currentFilter].units ? effects[currentFilter].units : '';
  userPicture.style.filter = `${effects[currentFilter].filter}(${filterValue}${filterUnit})`;
};

/**
 * Функция сброса эффекта в исходное состояние - нейтральный фильтр со значением 100
 * @param {Node} userPicture - Пользовательское изображение к которому применяется эффект
 */
const resetEffect = (userPicture) => {
  userPicture.className = '';
  userPicture.classList.add('effects__preview--none');
  effectSliderContainer.classList.add('hidden');
  effectLevelSliderElement.noUiSlider.set(effects.none.start);
};

/**
 * Функция добавляет обработчики события на обновление значения эффекта и выбора эффекта
 * @param {Node} userPicture - Пользовательское изображение к которому применяется эффект
 */
const addEffectLevelSliderClickUpdateHandler = (userPicture) => {
  effectLevelSliderElement.noUiSlider.on('update', () => {
    effectLevelElement.value = effectLevelSliderElement.noUiSlider.get();
    setFilter(userPicture, effectLevelElement.value);
  });

  effectList.addEventListener('click', (evt) => {
    userPicture.className = '';
    currentFilter = evt.target.value;
    userPicture.classList.add(`effects__preview--${currentFilter}`);
    effectSliderContainer.classList.remove('hidden');
    if (currentFilter === 'none') {
      resetEffect(userPicture);
    }
    if (currentFilter) {
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: effects[currentFilter].range.min,
          max: effects[currentFilter].range.max
        },
        start: effects[currentFilter].start,
        step: effects[currentFilter].step
      });
    }
  });
};

export {addEffectLevelSliderClickUpdateHandler, resetEffect};
