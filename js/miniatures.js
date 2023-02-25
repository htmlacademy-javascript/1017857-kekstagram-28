const picturesListElement = document.querySelector('.pictures');
const randomUserPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Обрисовывает миниатюры случайных пользователей на главной странице
 * @param {Array} photosData - массив данных фотографий
 */
const createRandomUserPhotos = (photosData) => {
  photosData.forEach ((photoData) => {
    const randomUserPictureElement = randomUserPictureTemplate.cloneNode(true);
    randomUserPictureElement.querySelector('.picture__img').setAttribute('src', photoData.url);
    randomUserPictureElement.querySelector('.picture__comments').textContent = photoData.comments.length;
    randomUserPictureElement.querySelector('.picture__likes').textContent = photoData.likes;
    picturesListElement.append(randomUserPictureElement);
  });
};

export {createRandomUserPhotos};
