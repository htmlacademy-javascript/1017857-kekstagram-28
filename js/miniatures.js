const picturesListElement = document.querySelector('.pictures');
const randomUserPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();

/**
 * Отрисовывает миниатюры случайных пользователей на главной странице
 * @param {Array} photosData - массив данных фотографий
 */
const renderRandomUserPhotos = (photosData) => {
  photosData.forEach ((photoData) => {
    const randomUserPictureElement = randomUserPictureTemplate.cloneNode(true);
    randomUserPictureElement.querySelector('.picture__img').setAttribute('src', photoData.url);
    randomUserPictureElement.querySelector('.picture__img').setAttribute('data-index', photoData.id);
    randomUserPictureElement.querySelector('.picture__comments').textContent = photoData.comments.length;
    randomUserPictureElement.querySelector('.picture__likes').textContent = photoData.likes;
    picturesListFragment.append(randomUserPictureElement);
  });
  picturesListElement.append(picturesListFragment);
};

export {renderRandomUserPhotos};
