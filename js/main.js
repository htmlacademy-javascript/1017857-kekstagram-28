import {renderMiniatures} from './miniatures.js';
import {setUploadControlChange} from './user-modal.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setUserForm} from './user-form.js';
import {showImageFilters} from './filters.js';
import {addFilterDefaultButtonHandler, addFilterRandomButtonHandler} from './filters.js';

getData()
  .then((miniaturesData) => {
    renderMiniatures(miniaturesData);
    addFilterDefaultButtonHandler(miniaturesData);
    addFilterRandomButtonHandler(miniaturesData);
    showImageFilters();
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUploadControlChange();
setUserForm();

