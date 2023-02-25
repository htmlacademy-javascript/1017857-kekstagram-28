import {generateUserPhotoData} from './mocks/data.js';
import {createRandomUserPhotos} from './miniatures.js';

const COUNT_OF_PHOTOS = 25;

createRandomUserPhotos(generateUserPhotoData(COUNT_OF_PHOTOS));
