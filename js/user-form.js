import {setScaleClick} from './scale.js';
import {setEffectLevelSliderClickUpdate} from './effect.js';
import {setUserFormSubmit} from './user-form-validation.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const userPicture = document.querySelector('.img-upload__preview img');

const setUserForm = () => {
  setScaleClick(userPicture);
  setEffectLevelSliderClickUpdate(userPicture);
  setUserFormSubmit(userPicture);

  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      userPicture.src = URL.createObjectURL(file);
    }
  });
};

export {setUserForm};
