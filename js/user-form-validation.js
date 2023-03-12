import {sendData} from './api.js';
import {resetEffect} from './effect.js';
import {resetScale} from './scale.js';

const ErrorMessages = {
  LONG_MESSAGE: 'Не более 140 символов.',
  LOT_OF_HASHTAGS: 'Не более 5 хештегов.',
  WRONG_HASHTAG: 'Не верный хештег.',
  DUPLICATE_HASHTAG: 'Хештеги повторяются.'
};

const Message = {
  errorText:ErrorMessages.LONG_MESSAGE,
  NAX_LENGTH: 140
};
const Hashtag = {
  Count: {
    errorText: '',
    isCorrect: true
  },
  Correct: {
    errorText: '',
    isCorrect: true
  },
  Uniq: {
    errorText: '',
    isCorrect: true
  },
  MAX_COUNT: 5
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};

const imageUploadForm = document.querySelector('#upload-select-image');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const validateComment = (comment) => comment.length <= Message.NAX_LENGTH;

const userCommentElement = imageUploadForm.querySelector('.text__description');
pristine.addValidator(userCommentElement, validateComment, `${Message.errorText}`);

const hashtagElement = imageUploadForm.querySelector('.text__hashtags');

const isHashtag = (word) => {
  const regexp = /^#[a-zA-Zа-яА-Яё0-9]{1,19}$/;
  return regexp.test(word);
};

const getHashtags = () => hashtagElement.value.split(/\s+/).filter((elem) => elem);
const validateCorrectHashtag = () => {
  Hashtag.Correct.isCorrect = getHashtags().every(isHashtag);
  Hashtag.Correct.errorText = !Hashtag.Correct.isCorrect ? ErrorMessages.WRONG_HASHTAG : '';
  return Hashtag.Correct.isCorrect;
};
const validateCorrectCountHashtag = () => {
  Hashtag.Count.isCorrect = getHashtags().length <= Hashtag.MAX_COUNT;
  Hashtag.Count.errorText = !Hashtag.Count.isCorrect ? ErrorMessages.LOT_OF_HASHTAGS : '';
  return Hashtag.Count.isCorrect;
};
const validateUniqHashtag = () => {
  const makeUniq = (arr) => [...new Set(arr)];
  Hashtag.Uniq.isCorrect = makeUniq(getHashtags()).length === getHashtags().length;
  Hashtag.Uniq.errorText = !Hashtag.Uniq.isCorrect ? ErrorMessages.DUPLICATE_HASHTAG : '';
  return Hashtag.Uniq.isCorrect;
};

const validateHashtagInput = () => validateCorrectHashtag() && validateCorrectCountHashtag() && validateUniqHashtag();

const getErrorMessage = () => `${Hashtag.Count.errorText} ${Hashtag.Correct.errorText} ${Hashtag.Uniq.errorText}`;

pristine.addValidator(hashtagElement, validateHashtagInput, getErrorMessage);

const submitButton = document.querySelector('.img-upload__submit');
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const clearMessageHashtag = () => {
  hashtagElement.value = '';
  userCommentElement.value = '';
};

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();
const bodyElement = document.querySelector('body');
const uploadSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  successElement.querySelector('.success__button').addEventListener('click', () => {
    successElement.remove();
  });
  successFragment.append(successElement);
  bodyElement.append(successFragment);
};

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorFragment = document.createDocumentFragment();
const uploaderror = () => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });
  errorFragment.append(errorElement);
  bodyElement.append(errorFragment);
};

const resetDefault = (userPicture) => {
  resetEffect(userPicture);
  resetScale(userPicture);
  clearMessageHashtag();
};

const setUserFormSubmit = (userPicture) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(uploadSuccess)
        .then(() => {
          resetDefault(userPicture);
        })
        .catch(uploaderror)
        .finally(unblockSubmitButton);
    }
  });
};

export {setUserFormSubmit};
