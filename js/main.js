import {renderMiniatures} from './miniatures.js';
import {setUploadControlChange} from './user-modal.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setUserForm} from './user-form.js';

getData()
  .then((miniaturesData) => {
    renderMiniatures(miniaturesData);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUploadControlChange();
setUserForm();
