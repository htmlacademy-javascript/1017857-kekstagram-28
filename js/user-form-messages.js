import {onDocumentKeydown} from './user-modal.js';
import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000;

/**
 * Функция показывает сообщение при неудачной попытки получения данных с сервера
 * @param {string} message - сообщение об ошибке
 */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const bodyElement = document.querySelector('body');

/**
 * Функция показывает сообщение об успешной отправке данных
 */
const openUploadSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  document.addEventListener('keydown', onDocumentWithUploadSuccessClickAndKeydown);
  document.addEventListener('click', onDocumentWithUploadSuccessClickAndKeydown);
  bodyElement.append(successElement);
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

/**
 * Функция показывает сообщение об ошибке при неудачной отправке данных
 */
const openUploadError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.addEventListener('keydown', onDocumentWithUploadErrorClickAndKeydown);
  document.addEventListener('click', onDocumentWithUploadErrorClickAndKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.append(errorElement);
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


// Функция объявлена в виде Function Declaration т.к. нужен механизм hoisting
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

// Функция объявлена в виде Function Declaration т.к. нужен механизм hoisting
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

export {openUploadSuccess, openUploadError, showAlert};
