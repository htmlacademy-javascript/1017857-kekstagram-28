import {addScaleClickHandler} from './scale.js';
import {addEffectLevelSliderClickUpdateHandler} from './effect.js';
import {isValidComment} from './comment-validation.js';
import {openUserForm, addEventListenersToForm, closeUserForm} from './user-modal.js';
import {sendData} from './api.js';
import {openUploadSuccess, openUploadError} from './user-form-messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  PUBLISH: 'Опубликовать',
  SENDING: 'Сохраняю...'
};

const fileChooser = document.querySelector('#upload-file');
const userPicture = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('.img-upload__submit');

/**
 * Функция блокирует кнопку отправки формы
 */
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

/**
 * Функция разблокирует кнопку отправки формы
 */
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.PUBLISH;
};

const imageUploadForm = document.querySelector('#upload-select-image');

/**
 * Функция добавляет обработчик события на отправку формы
 */
const addUserFormSubmitHandler = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isValidComment()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(openUploadSuccess)
        .then(() => {
          closeUserForm();
        })
        .catch(openUploadError)
        .finally(unblockSubmitButton);
    }
  });
};

/**
 * Функция добавляет обработчик события на изменения загружаемого изображения
 */
const addFileChooserChangeHandler = () => {
  fileChooser.addEventListener('change', () => {
    openUserForm();
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));
    if (matches) {
      userPicture.src = URL.createObjectURL(file);
    }
  });
};

/**
 * Функция добавляет обработчики событий: изменение масштаба, изменение диапазона значений эффекта, отправку пользовательской формы, изменения загружаемого изображения
 */
const addUserFormHandler = () => {
  addScaleClickHandler(userPicture);
  addEffectLevelSliderClickUpdateHandler(userPicture);
  addUserFormSubmitHandler();
  addEventListenersToForm();
  addFileChooserChangeHandler();
};

export {addUserFormHandler};
