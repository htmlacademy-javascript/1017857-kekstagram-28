import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const userForm = document.querySelector('.img-upload__overlay');
const userFormCancel = document.querySelector('#upload-cancel');
const hashtagElement = imageUploadForm.querySelector('.text__hashtags');
const userCommentElement = imageUploadForm.querySelector('.text__description');
const uploadControl = document.querySelector('#upload-file');
const userPicture = document.querySelector('.img-upload__preview img');

/**
 * Закрытие формы загрузки изображения
 */
const closeUserForm = () => {
  userForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

/**
 * Открытие формы загрузки изображения
 */
const openUserForm = () => {
  userForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  resetScale(userPicture);
};

userFormCancel.addEventListener('click', () => {
  closeUserForm();
});

hashtagElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

hashtagElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

userCommentElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

userCommentElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserForm();
  }
}

const setUploadControlChange = () => {
  uploadControl.addEventListener('change', () => {
    openUserForm();
  });
};

export {setUploadControlChange};
