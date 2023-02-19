import {createIdGenerator, getRandomInteger, createRandomIdFromRangeGenerator} from './util.js';

const COUNT_OF_PHOTOS = 25;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 150;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

const generatePhotoId = createIdGenerator();
const generateCommentId = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);
const getURL = (id) => `photos/${id}.jpg`;
const getDescription = (id) => `Описание фотографии ${id}.jpg`;
const getAvatarURL = (min, max) => `img/avatar-${getRandomInteger(min, max)}.svg`;
const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

const createPhotoData = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: getURL(photoId),
    description: getDescription(photoId),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: {
      id: generateCommentId(),
      avatar: getAvatarURL(AVATAR_MIN, AVATAR_MAX),
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES)
    }
  };
};
const createPhotos = () => Array.from({length: COUNT_OF_PHOTOS}, createPhotoData);

export {createPhotos};
