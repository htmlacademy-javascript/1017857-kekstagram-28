import {sendData} from './api.js';
import {closeUserForm} from './user-modal.js';

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
const hashtag = {
  count: {
    errorText: '',
    isCorrect: true
  },
  correct: {
    errorText: '',
    isCorrect: true
  },
  uniq: {
    errorText: '',
    isCorrect: true
  },
  MAX_COUNT: 5
};

const SubmitButtonText = {
  PUBLISH: 'Опубликовать',
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

const getHashtags = () => hashtagElement.value.toLowerCase().split(/\s+/).filter((elem) => elem);
const validateCorrectHashtag = () => {
  hashtag.correct.isCorrect = getHashtags().every(isHashtag);
  hashtag.correct.errorText = !hashtag.correct.isCorrect ? ErrorMessages.WRONG_HASHTAG : '';
  return hashtag.correct.isCorrect;
};
const validateCorrectCountHashtag = () => {
  hashtag.count.isCorrect = getHashtags().length <= hashtag.MAX_COUNT;
  hashtag.count.errorText = !hashtag.count.isCorrect ? ErrorMessages.LOT_OF_HASHTAGS : '';
  return hashtag.count.isCorrect;
};
const validateUniqHashtag = () => {
  const makeUniq = (arr) => [...new Set(arr)];
  hashtag.uniq.isCorrect = makeUniq(getHashtags()).length === getHashtags().length;
  hashtag.uniq.errorText = !hashtag.uniq.isCorrect ? ErrorMessages.DUPLICATE_HASHTAG : '';
  return hashtag.uniq.isCorrect;
};

const validateHashtagInput = () => validateCorrectHashtag() && validateCorrectCountHashtag() && validateUniqHashtag();

const getErrorMessage = () => `${hashtag.count.errorText} ${hashtag.correct.errorText} ${hashtag.uniq.errorText}`;

pristine.addValidator(hashtagElement, validateHashtagInput, getErrorMessage);

const submitButton = document.querySelector('.img-upload__submit');

/**
 * Функция блокирует кнопку отправки формы
 */
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

/**
 * Функция разблокирует кнопку отправки формы
 */
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.PUBLISH;
};

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();
const bodyElement = document.querySelector('body');

/**
 * Функция показывает сообщение об успешной отправке данных
 */
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

/**
 * Функция показывает сообщение об ошибке при неудачной отправке данных
 */
const uploadError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });
  errorFragment.append(errorElement);
  bodyElement.append(errorFragment);
};

const addUserFormSubmitHandler = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(uploadSuccess)
        .then(() => {
          imageUploadForm.reset();
          closeUserForm();
        })
        .catch(uploadError)
        .finally(unblockSubmitButton);
    }
  });
};

export {addUserFormSubmitHandler};
