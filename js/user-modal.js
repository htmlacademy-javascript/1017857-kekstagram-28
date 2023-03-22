import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffect} from './effect.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const userForm = document.querySelector('.img-upload__overlay');
const userFormCancel = document.querySelector('#upload-cancel');
const hashtagElement = imageUploadForm.querySelector('.text__hashtags');
const userCommentElement = imageUploadForm.querySelector('.text__description');
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
  resetEffect(userPicture);
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

export {openUserForm, closeUserForm, onDocumentKeydown};
