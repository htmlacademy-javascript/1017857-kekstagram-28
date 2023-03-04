import {isEscapeKey} from './util.js';

const uploadControl = document.querySelector('#upload-file');
const userForm = document.querySelector('.img-upload__overlay');
const userFormCancel = document.querySelector('#upload-cancel');
const imageUploadForm = document.querySelector('#upload-select-image');


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

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const userCommentElement = imageUploadForm.querySelector('.text__description');
const validateComment = (comment) => comment.length <= 140;

pristine.addValidator(userCommentElement, validateComment, 'Не более 140 символов');

userCommentElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

userCommentElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

const hashtagElement = imageUploadForm.querySelector('.text__hashtags');
let isHashtagCorrectCount = true;
let isHashtagCorrect = true;
let isHashtagUniq = true;

const isHashtag = (word) => {
  const regexp = /^#[a-zа-я0-9]{1,19}$/;
  return regexp.test(word);
};
const validateHashtag = (hashtagString) => {
  const hashtags = hashtagString.split(' ');
  const makeUniq = (arr) => [...new Set(arr)];
  isHashtagCorrect = hashtags.every(isHashtag);
  isHashtagCorrectCount = hashtags.length <= 5;
  isHashtagUniq = makeUniq(hashtags).length === hashtags.length;
  return isHashtagCorrect && isHashtagCorrectCount && isHashtagUniq;
};

const getErrorMessage = () => `
  ${isHashtagCorrectCount ? '' : 'Слишком много хештегов.'}
  ${isHashtagCorrect ? '' : ' Не верный хештег. '}
  ${isHashtagUniq ? '' : ' Хештеги повторяются. '}
  `;

pristine.addValidator(hashtagElement, validateHashtag, getErrorMessage);
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

hashtagElement.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

hashtagElement.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

