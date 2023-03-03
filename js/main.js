import {generatePhotosData} from './mocks/photos-data.js';
import {renderMiniatures} from './miniatures.js';
import './form.js';

const COUNT_OF_PHOTOS = 25;

renderMiniatures(generatePhotosData(COUNT_OF_PHOTOS));
