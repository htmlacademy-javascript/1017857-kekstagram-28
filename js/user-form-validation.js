import {sendData} from './api.js';
import {closeUserForm, onDocumentKeydown} from './user-modal.js';
import {isEscapeKey} from './util.js';

const ErrorMessages = {
  LONG_MESSAGE: 'Не более 140 символов.',
  LOT_OF_HASHTAGS: 'Не более 5 хештегов.',
  WRONG_HASHTAG: 'Не верный хештег.',
  DUPLICATE_HASHTAG: 'Хештеги повторяются.'
};

const message = {
  errorText: ErrorMessages.LONG_MESSAGE,
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

/**
 * Функция проверяет комментарий на максимальное количество символов
 * @param {string} comment - комментарий
 * @return {boolean} true, если комментарий меньше максимально допустимого значения
 */
const isValidComment = (comment) => comment.length <= message.NAX_LENGTH;

const userCommentElement = imageUploadForm.querySelector('.text__description');
pristine.addValidator(userCommentElement, isValidComment, `${message.errorText}`);

const hashtagElement = imageUploadForm.querySelector('.text__hashtags');

/**
 * Функция проверяет являться ли слово хештегом
 * @param {string} word - проверяемое слов
 * @return {boolean} true, если слова является хештегом
 */
const isHashtag = (word) => {
  const regexp = /^#[a-zA-Zа-яА-Яё0-9]{1,19}$/;
  return regexp.test(word);
};

/**
 * Функция создает массив хештегов из введенных пользователем данных
 * @return {array} возвращает массив хештегов
 */
const getHashtags = () => hashtagElement.value.toLowerCase().split(/\s+/).filter((elem) => elem);

/**
 * Функция проверяет на допустимые символы хештега
 * @return {boolean} true, если хештеги корректны
 */
const isCorrectHashtag = () => {
  hashtag.correct.isCorrect = getHashtags().every(isHashtag);
  hashtag.correct.errorText = !hashtag.correct.isCorrect ? ErrorMessages.WRONG_HASHTAG : '';
  return hashtag.correct.isCorrect;
};

/**
 * Функция проверяет на предельно допустимое количество хештегов
 * @return {boolean} true, если количество хештегов не превышает предельно допустимого значения
 */
const isCorrectCountHashtag = () => {
  hashtag.count.isCorrect = getHashtags().length <= hashtag.MAX_COUNT;
  hashtag.count.errorText = !hashtag.count.isCorrect ? ErrorMessages.LOT_OF_HASHTAGS : '';
  return hashtag.count.isCorrect;
};

/**
 * Функция проверяет хештеги на уникальность
 * @return {boolean} true, если хештеги не повторяются
 */
const isUniqHashtag = () => {
  const makeUniq = (arr) => [...new Set(arr)];
  hashtag.uniq.isCorrect = makeUniq(getHashtags()).length === getHashtags().length;
  hashtag.uniq.errorText = !hashtag.uniq.isCorrect ? ErrorMessages.DUPLICATE_HASHTAG : '';
  return hashtag.uniq.isCorrect;
};

/**
 * Функция проверяет на правильность ввода хештегов
 * @return {boolean} true, если хештеги введены верно
 */
const validateHashtagInput = () => isCorrectHashtag() && isCorrectCountHashtag() && isUniqHashtag();

/**
 * Функция формирует сообщение об ошибке при неверном вводе хештега
 * @return {string} возвращает сообщение об ошибке
 */
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
const openUploadSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  document.addEventListener('keydown', onDocumentWithUploadSuccessClickAndKeydown);
  document.addEventListener('click', onDocumentWithUploadSuccessClickAndKeydown);
  successFragment.append(successElement);
  bodyElement.append(successFragment);
};

/**
 * Функция удаляет сообщение об успешной отправке данных
 */
const closeUploadSuccess = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onDocumentWithUploadSuccessClickAndKeydown);
  document.removeEventListener('click', onDocumentWithUploadSuccessClickAndKeydown);
};

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorFragment = document.createDocumentFragment();

/**
 * Функция показывает сообщение об ошибке при неудачной отправке данных
 */
const openUploadError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.addEventListener('keydown', onDocumentWithUploadErrorClickAndKeydown);
  document.addEventListener('click', onDocumentWithUploadErrorClickAndKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
  errorFragment.append(errorElement);
  bodyElement.append(errorFragment);
};

/**
 * Функция удаляет сообщение об ошибке при неудачной отправке данных
 */
const closeUploadError = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onDocumentWithUploadErrorClickAndKeydown);
  document.removeEventListener('click', onDocumentWithUploadErrorClickAndKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
};

/**
 * Функция добавляет обработчик события на отправку формы
 */
const addUserFormSubmitHandler = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(openUploadSuccess)
        .then(() => {
          imageUploadForm.reset();
          closeUserForm();
        })
        .catch(openUploadError)
        .finally(unblockSubmitButton);
    }
  });
};

/**
 * Обработчик события на закрытие сообщения об успешной отправке данных по кнопке Enter и клику
 * @param {Object} evt - Объект события
 */
function onDocumentWithUploadSuccessClickAndKeydown(evt) {
  if (isEscapeKey(evt) || evt.target.className === 'success' || evt.target.className === 'success__button') {
    evt.preventDefault();
    closeUploadSuccess();
  }
}

/**
 * Обработчик события на закрытие сообщения при неудачной попытке отправки данных по кнопке Enter и клику
 * @param {Object} evt - Объект события
 */
function onDocumentWithUploadErrorClickAndKeydown(evt) {
  if (isEscapeKey(evt) || evt.target.className === 'error' || evt.target.className === 'error__button') {
    evt.preventDefault();
    closeUploadError();
  }
}

export {addUserFormSubmitHandler};
