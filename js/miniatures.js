import {openBigPicture} from './big-picture.js';

const miniatureListElement = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniatureListFragment = document.createDocumentFragment();

/**
 * Функция удаляет список комментариев под фото
 */
const resetMiniatures = () => {
  const miniatures = miniatureListElement.querySelectorAll('.picture');
  miniatures.forEach((miniature) => {
    miniature.remove();
  });
};
/**
 * Функция отрисовывает миниатюры случайных пользователей на главной странице и добавляет обработчик события на открытие большого изображения по клику на миниатюре
 * @param {Array} photosData - массив данных фотографий
 */
const renderMiniatures = (photosData) => {
  photosData.forEach ((photoData) => {
    resetMiniatures();
    const miniatureElement = miniatureTemplate.cloneNode(true);
    miniatureElement.querySelector('.picture__img').setAttribute('src', photoData.url);
    miniatureElement.querySelector('.picture__comments').textContent = photoData.comments.length;
    miniatureElement.querySelector('.picture__likes').textContent = photoData.likes;
    miniatureElement.addEventListener('click', () => {
      openBigPicture(photoData);
    });
    miniatureListFragment.append(miniatureElement);
  });
  miniatureListElement.append(miniatureListFragment);
};

export {renderMiniatures};
