import {
  createIdGenerator,
  generateRandomInteger,
  createRandomIdFromRangeGenerator,
  generateRandomElement
} from './mock-functions.js';

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
const Comments = {
  MIN_ID: 1,
  MAX_ID: 150,
  MIN_COUNT: 5,
  MAX_COUNT: 30
};
const Likes = {
  MIN: 15,
  MAX: 200
};
const Avatar = {
  MIN: 1,
  MAX: 5
};

const generatePhotoId = createIdGenerator();
const generateCommentId = createRandomIdFromRangeGenerator(Comments.MIN_ID, Comments.MAX_ID);

/**
 * Генерация комментария пользователя
 * @param {number} commentId - идентификатор комментария
 * @return {Object} Комментарий с параметрами: id - идентификатор, avatar - url аватарки пользователя, message - комментарий пользователя, name - имя пользователя
 */
const generateComment = (commentId) => ({
  id: commentId,
  avatar: `img/avatar-${generateRandomInteger(Avatar.MIN, Avatar.MAX)}.svg`,
  message: generateRandomElement(MESSAGES),
  name: generateRandomElement(NAMES)
});


/**
 * Создание списка комментариев
 * @param {number} commentCount - количество комментариев
 * @return {Array} Список комментариев заданного размера
 */
const generateCommentList = (commentCount) => {
  const commentList = [];
  for (let i = 0; i <= commentCount; i++) {
    commentList.push(generateComment(generateCommentId()));
  }
  return commentList;
};


/**
 * Генерация данных для пользовательских фотографий
 * @return {Object}  Данные одной фотографии с параметрами:
 * id - идентификатор фотографии,
 * url - путь до фотографии,
 * description - описание фотографии,
 * likes - количество лайков,
 * comments - массив с комментариями
 */
const generatePhotoData = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `Описание фотографии ${photoId}.jpg`,
    likes: generateRandomInteger(Likes.MIN, Likes.MAX),
    comments: generateCommentList(generateRandomInteger(Comments.MIN_COUNT, Comments.MAX_COUNT))
  };
};


/**
 * Генератор данных для пользовательских фотографий заданного размера
 * @param {number} count - количество фотографий
 * @return {Array} Массив данных для фотографий заданного размера
 */
const generatePhotosData = (count) => Array.from({length: count}, generatePhotoData);

export {generatePhotosData};
