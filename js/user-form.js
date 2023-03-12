import {setScaleClick} from './scale.js';
import {setEffectLevelSliderClickUpdate} from './effect.js';
import {setUserFormSubmit} from './user-form-validation.js';

const userPicture = document.querySelector('.img-upload__preview img');

const setUserForm = () => {
  setScaleClick(userPicture);
  setEffectLevelSliderClickUpdate(userPicture);
  setUserFormSubmit(userPicture);
};

export {setUserForm};
