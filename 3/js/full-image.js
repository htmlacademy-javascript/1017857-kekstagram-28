import {userPhotoData} from './mocks/data.js';
import {isEscapeKey} from './mocks/util.js';

const bodyElement = document.querySelector('body');
const picturesListElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const closeBigPictureElement = bigPictureElement.querySelector('#picture-cancel');
const commentListElement = bigPictureElement.querySelector('.social__comments');

const commentHTML = (commentData) => (`
  <li class="social__comment">
    <img
      class="social__picture"
      src="${commentData.avatar}"
      alt="${commentData.name}"
      width="35" height="35">
      <p class="social__text">${commentData.message}</p>
  </li>`
);


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderBigPicture = (singlePhotoData) => {
  bigPictureElement.querySelector('.big-picture__img img').setAttribute('src', singlePhotoData.url);
  bigPictureElement.querySelector('.likes-count').textContent = singlePhotoData.likes;
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  bigPictureElement.querySelector('.social__caption').textContent = singlePhotoData.description;
  commentListElement.innerHTML = '';
  for (let i = 0; i <= singlePhotoData.comments.length; i++) {
    const res = commentHTML(singlePhotoData.comments[i]);
    commentListElement.innerHTML += res;
  }
};


const openBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderBigPicture(data);
  bodyElement.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.remove('modal-open');
};


picturesListElement.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    const pictureData = userPhotoData.find((photoData) => photoData.id === Number(evt.target.dataset.index));
    openBigPicture(pictureData);
  }
});

closeBigPictureElement.addEventListener('click', () => {
  closeBigPicture();
});
