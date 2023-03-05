import {isEscapeKey} from './util.js';

const MESSAGE_MAX_LENGTH = 140;
const HASHTAG_MAX_COUNT = 5;
const Scale = {
  INIT: '100%',
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const userForm = document.querySelector('.img-upload__overlay');
const userFormCancel = document.querySelector('#upload-cancel');
const imageUploadForm = document.querySelector('#upload-select-image');
const scaleElement = document.querySelector('.scale');
const scaleSmallerElement = scaleElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = scaleElement.querySelector('.scale__control--bigger');
const scaleValueElement = scaleElement.querySelector('.scale__control--value');
const userPicture = document.querySelector('.img-upload__preview img');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');
const effectSliderContainer = document.querySelector('.effect-level');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const userCommentElement = imageUploadForm.querySelector('.text__description');
const validateComment = (comment) => comment.length <= MESSAGE_MAX_LENGTH;

pristine.addValidator(userCommentElement, validateComment, 'Не более 140 символов');

userCommentElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

userCommentElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

const hashtagElement = imageUploadForm.querySelector('.text__hashtags');
let isHashtagCorrectCount = true;
let isHashtagCorrect = true;
let isHashtagUniq = true;

const isHashtag = (word) => {
  const regexp = /^#[a-zа-я0-9]{1,19}$/;
  return regexp.test(word);
};
const validateHashtag = (hashtagString) => {
  const hashtags = hashtagString.split(' ');
  const makeUniq = (arr) => [...new Set(arr)];
  isHashtagCorrect = hashtags.every(isHashtag);
  isHashtagCorrectCount = hashtags.length <= HASHTAG_MAX_COUNT;
  isHashtagUniq = makeUniq(hashtags).length === hashtags.length;
  return isHashtagCorrect && isHashtagCorrectCount && isHashtagUniq;
};

const getErrorMessage = () => `
  ${isHashtagCorrectCount ? '' : 'Слишком много хештегов.'}
  ${isHashtagCorrect ? '' : ' Не верный хештег. '}
  ${isHashtagUniq ? '' : ' Хештеги повторяются. '}
  `;

pristine.addValidator(hashtagElement, validateHashtag, getErrorMessage);
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

hashtagElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

hashtagElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

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

const scalePicture = () => {
  userPicture.style.transform = `scale(${(scaleValueElement.value.slice(0,-1) / 100)})`;
};
scaleSmallerElement.addEventListener('click', () => {
  scaleCalculate(-Scale.STEP);
  scalePicture();
});
scaleBiggerElement.addEventListener('click', () => {
  scaleCalculate(Scale.STEP);
  scalePicture();
});

const hideSlider = () => {
  effectSliderContainer.classList.add('hidden');
};

const showSlider = () => {
  effectSliderContainer.classList.remove('hidden');
};

const closeUserForm = () => {
  userForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};
const openUserForm = () => {
  userForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  scaleValueElement.value = Scale.INIT;
  scalePicture();
  userPicture.classList.add('effects__preview--none');
  hideSlider();
};

userFormCancel.addEventListener('click', () => {
  closeUserForm();
});

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserForm();
  }
}

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});
const getFilter = (filterValue) => {
  const effect = userPicture.classList.value.split('--');
  let filter;
  switch (effect[1]) {
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

effectLevelSliderElement.noUiSlider.on('update', () => {
  effectLevelElement.value = effectLevelSliderElement.noUiSlider.get();
  getFilter(effectLevelElement.value);
});

const effectList = document.querySelector('.effects__list');
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
      hideSlider();
      effectLevelSliderElement.noUiSlider.set(100);
  }
});

export {openUserForm};
