import {isEscapeKey} from './util.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const closeBigPictureElement = bigPictureElement.querySelector('#picture-cancel');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentItemTemplate = commentListElement.querySelector('.social__comment');
const commentListFragment = document.createDocumentFragment();

/**
 * Функция выводит список комментариев пользователей
 * @param {Array} commentsData - Список комменатриев к фотографии
 */
const modifyCommentList = (commentsData) => {
  commentListElement.innerHTML = '';
  commentsData.forEach((commentData) => {
    const commentItemElement = commentItemTemplate.cloneNode(true);
    commentItemElement.querySelector('.social__picture').setAttribute('src', commentData.avatar);
    commentItemElement.querySelector('.social__picture').setAttribute('alt', commentData.name);
    commentItemElement.querySelector('.social__text').textContent = commentData.message;
    commentListFragment.append(commentItemElement);
  });
  commentListElement.append(commentListFragment);
};

/**
 * Функция выводит большое изображение на основе полученных данных
 * @param {Object} photoData - данные изображения
 */
const modifyBigPicture = (photoData) => {
  bigPictureElement.querySelector('.big-picture__img img').setAttribute('src', photoData.url);
  bigPictureElement.querySelector('.likes-count').textContent = photoData.likes;
  bigPictureElement.querySelector('.social__caption').textContent = photoData.description;
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  modifyCommentList(photoData.comments);
};

/**
 * Функция открывает большое изображение и добавляет обработчик на закрытие окна по нажатию на кнопку Enter
 * @param {Object} photoData - данные изображения
 */
const openBigPicture = (photoData) => {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  modifyBigPicture(photoData);
  bodyElement.classList.add('modal-open');
};

/**
 * Функция закрывает большое изображение и удаляет обработчик на закрытие окна по нажатию на кнопку Enter
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
 * Обработчик события на закрытие изображения по кнопке Enter
 * @param {Object} evt - Объект события
 */
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture};
