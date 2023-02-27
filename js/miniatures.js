import {openBigPicture} from './big-picture.js';

const miniatureListElement = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniatureListFragment = document.createDocumentFragment();

/**
 * Отрисовывает миниатюры случайных пользователей на главной странице
 * @param {Array} photosData - массив данных фотографий
 */
const renderMiniatures = (photosData) => {
  photosData.forEach ((photoData) => {
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
