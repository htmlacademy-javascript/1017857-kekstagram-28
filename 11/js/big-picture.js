import {isEscapeKey} from './util.js';
import {modifyCommentList} from './comments.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const closeBigPictureElement = bigPictureElement.querySelector('#picture-cancel');

/**
 * Функция выводит большое изображение на основе полученных данных
 * @param {Object} photoData - данные изображения
 */
const modifyBigPicture = (photoData) => {
  bigPictureElement.querySelector('.big-picture__img img').setAttribute('src', photoData.url);
  bigPictureElement.querySelector('.likes-count').textContent = photoData.likes;
  bigPictureElement.querySelector('.social__caption').textContent = photoData.description;
  modifyCommentList(photoData.comments);
};

/**
 * Функция открывает большое изображение и добавляет обработчик на закрытие окна по нажатию на кнопку ESC
 * @param {Object} photoData - данные изображения
 */
const openBigPicture = (photoData) => {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  modifyBigPicture(photoData);
  bodyElement.classList.add('modal-open');
};

/**
 * Функция закрывает большое изображение и удаляет обработчик на закрытие окна по нажатию на кнопку ESC
 */
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.remove('modal-open');
};

/**
 * Обработчик события на закрытие изображения по клику
 */
closeBigPictureElement.addEventListener('click', () => {
  closeBigPicture();
});

/**
 * Обработчик события на закрытие изображения по кнопке ESC
 * @param {Object} evt - Объект события
 */
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture};
