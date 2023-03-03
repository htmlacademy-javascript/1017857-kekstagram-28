import {isEscapeKey} from './util.js';

const uploadControl = document.querySelector('#upload-file');
const userForm = document.querySelector('.img-upload__overlay');
const userFormCancel = document.querySelector('#upload-cancel');

const closeUserForm = () => {
  userForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openUserForm = () => {
  userForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadControl.addEventListener('change', () => {
  openUserForm();
});

userFormCancel.addEventListener('click', () => {
  closeUserForm();
});


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserForm();
  }
}
