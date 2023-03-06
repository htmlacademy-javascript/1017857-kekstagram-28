import {renderMiniatures} from './miniatures.js';
import {openUserForm} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

const uploadControl = document.querySelector('#upload-file');

getData()
  .then((miniaturesData) => {
    renderMiniatures(miniaturesData);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

uploadControl.addEventListener('change', () => {
  openUserForm();
});
