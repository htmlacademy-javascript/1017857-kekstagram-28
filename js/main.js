import {renderMiniatures} from './miniatures.js';
import {getData} from './api.js';
import {debounce} from './util.js';
import {addUserFormHandler} from './user-form.js';
import {showImageFilters} from './filters.js';
import {addFilterButtonHandler} from './filters.js';
import {showAlert} from './user-form-messages.js';

getData()
  .then((miniaturesData) => {
    renderMiniatures(miniaturesData);
    addFilterButtonHandler(miniaturesData, debounce(renderMiniatures));
    showImageFilters();
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

addUserFormHandler();
