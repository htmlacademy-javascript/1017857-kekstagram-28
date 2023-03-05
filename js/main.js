import {generatePhotosData} from './mocks/photos-data.js';
import {renderMiniatures} from './miniatures.js';
import {openUserForm} from './form.js';

const COUNT_OF_PHOTOS = 25;
const uploadControl = document.querySelector('#upload-file');

renderMiniatures(generatePhotosData(COUNT_OF_PHOTOS));
uploadControl.addEventListener('change', () => {
  openUserForm();
});
