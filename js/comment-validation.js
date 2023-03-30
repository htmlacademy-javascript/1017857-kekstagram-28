const ErrorMessages = {
  LONG_MESSAGE: 'Не более 140 символов.',
  LOT_OF_HASHTAGS: 'Не более 5 хештегов.',
  WRONG_HASHTAG: 'Не верный хештег.',
  DUPLICATE_HASHTAG: 'Хештеги повторяются.'
};

const message = {
  errorText: '',
  isCorrect: true,
  maxLength: 140
};

const hashtagParam = {
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
  maxCount: 5
};

const imageUploadFormElement = document.querySelector('#upload-select-image');

const pristine = new Pristine(imageUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const userCommentElement = imageUploadFormElement.querySelector('.text__description');

/**
 * Функция формирует сообщение об ошибке в зависимости от длины
 * @param {string} comment - комментарий
 */
const setCommentMessage = (comment) => {
  if (comment.length >= message.maxLength) {
    message.errorText = ErrorMessages.LONG_MESSAGE;
    message.isCorrect = false;
  } else {
    message.errorText = '';
    message.isCorrect = true;
  }
};

/**
 * Функция проверяет комментарий на максимальное количество символов
 * @return {boolean} true, если комментарий меньше максимально допустимого значения
 */
const isValidCommentMessage = () => {
  setCommentMessage(userCommentElement.value);
  return message.isCorrect;
};

/**
 * Получение текста об ошибке при вводе комментария
 * @return {string}
 */
const getCommentErrorText = () => message.errorText;

pristine.addValidator(userCommentElement, isValidCommentMessage, getCommentErrorText);

const hashtagElement = imageUploadFormElement.querySelector('.text__hashtags');

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
const getHashtags = () => hashtagElement.value.toLowerCase().split(/\s+/).filter((hashtag) => hashtag);

/**
 * Функция проверяет на допустимые символы хештега
 * @return {boolean} true, если хештеги корректны
 */
const isCorrectHashtag = () => {
  hashtagParam.correct.isCorrect = getHashtags().every(isHashtag);
  hashtagParam.correct.errorText = !hashtagParam.correct.isCorrect ? ErrorMessages.WRONG_HASHTAG : '';
  return hashtagParam.correct.isCorrect;
};

/**
 * Функция проверяет на предельно допустимое количество хештегов
 * @return {boolean} true, если количество хештегов не превышает предельно допустимого значения
 */
const isCorrectCountHashtag = () => {
  hashtagParam.count.isCorrect = getHashtags().length <= hashtagParam.maxCount;
  hashtagParam.count.errorText = !hashtagParam.count.isCorrect ? ErrorMessages.LOT_OF_HASHTAGS : '';
  return hashtagParam.count.isCorrect;
};

/**
 * Функция проверяет хештеги на уникальность
 * @return {boolean} true, если хештеги не повторяются
 */
const isUniqHashtag = () => {
  const makeUniq = (arr) => [...new Set(arr)];
  hashtagParam.uniq.isCorrect = makeUniq(getHashtags()).length === getHashtags().length;
  hashtagParam.uniq.errorText = !hashtagParam.uniq.isCorrect ? ErrorMessages.DUPLICATE_HASHTAG : '';
  return hashtagParam.uniq.isCorrect;
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
const getErrorMessage = () => `${hashtagParam.count.errorText} ${hashtagParam.correct.errorText} ${hashtagParam.uniq.errorText}`;
pristine.addValidator(hashtagElement, validateHashtagInput, getErrorMessage);

const isValidComment = () => pristine.validate();

/**
 * Функция очищает поля ввода хештегов и сообщения
 */
const resetMessageAndHashtagText = () => {
  hashtagElement.value = '';
  userCommentElement.value = '';
};

export {resetMessageAndHashtagText, isValidComment};
