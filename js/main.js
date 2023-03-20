import {renderMiniatures} from './miniatures.js';
import {setUploadControlChange} from './user-modal.js';
import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {setUserForm} from './user-form.js';
import {showImageFilters} from './filters.js';
import {addFilterDefaultButtonHandler, addFilterRandomButtonHandler, addFilterDiscussedButtonHandler} from './filters.js';

getData()
  .then((miniaturesData) => {
    renderMiniatures(miniaturesData);
    addFilterDefaultButtonHandler(miniaturesData, debounce(renderMiniatures));
    addFilterRandomButtonHandler(miniaturesData, debounce(renderMiniatures));
    addFilterDiscussedButtonHandler(miniaturesData, debounce(renderMiniatures));
    showImageFilters();
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUploadControlChange();
setUserForm();
