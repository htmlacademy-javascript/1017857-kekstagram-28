import {generateUserPhotoData} from './mocks/data.js';
import {renderRandomUserPhotos} from './miniatures.js';

const COUNT_OF_PHOTOS = 25;

renderRandomUserPhotos(generateUserPhotoData(COUNT_OF_PHOTOS));
