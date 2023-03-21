import {createRandomIdFromRangeGenerator} from './util.js';

const RANDOM_MINIATURES_COUNT = 10;

const imageFiltersElement = document.querySelector('.img-filters');

/**
 * Функция показывает секцию с фильтрами миниатюр
 */
const showImageFilters = () => {
  imageFiltersElement.classList.remove('img-filters--inactive');
};

/**
 * Функция скрывает секцию с фильтрами миниатюр
 */
const hideImageFilters = () => {
  imageFiltersElement.classList.add('img-filters--inactive');
};

/**
 * Функция возвращает массив заданного размера случайных миниатюр
 * @param {array} miniatures - массив данных по миниатюрам
 * @param {number} count - количество миниатюр, которое надо вернуть
 * @return {array} случайный массив миниатюр
 */
const filterRandomMiniatures = (miniatures, count) => {
  const randomIdFromRangeGenerator = createRandomIdFromRangeGenerator(0, miniatures.length - 1);
  const randomMiniatureDataArray = [];
  for(let i = 0; i < count; i++){
    const id = randomIdFromRangeGenerator();
    randomMiniatureDataArray.push(miniatures[id]);
  }
  return randomMiniatureDataArray;
};

/**
 * Функция возвращает массив миниатюр в отсортированном порядке по количеству комментариев
 * @param {array} miniatures - массив данных по миниатюрам
 * @return {array} отсортированный массив
 */
const filterDiscussedMiniatures = (miniatures) => {
  const sortedMiniatures = miniatures.slice();
  sortedMiniatures.sort((a, b) => a.comments.length > b.comments.length ? -1 : 1);
  return sortedMiniatures;
};

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

/**
 * Функция добавляет обработчик события по клику на фильтре по умолчанию
 * @param {array} miniatures - массив данных по миниатюрам
 * @param {function} cb - колбэк функция
 */
const addFilterDefaultButtonHandler = (miniatures, cb) => {
  filterDefaultButton.addEventListener('click', () => {
    filterDefaultButton.classList.add('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    cb(miniatures);
  });
};

/**
 * Функция добавляет обработчик события по клику на фильтре случайных миниатюр
 * @param {array} miniatures - массив данных по миниатюрам
 * @param {function} cb - колбэк функция
 */
const addFilterRandomButtonHandler = (miniatures, cb) => {
  filterRandomButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    cb(filterRandomMiniatures(miniatures, RANDOM_MINIATURES_COUNT));
  });
};

/**
 * Функция добавляет обработчик события по клику на фильтре сортировки по комментариям
 * @param {array} miniatures - массив данных по миниатюрам
 * @param {function} cb - колбэк функция
 */
const addFilterDiscussedButtonHandler = (miniatures, cb) => {
  filterDiscussedButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.add('img-filters__button--active');
    cb(filterDiscussedMiniatures(miniatures));
  });
};

export {showImageFilters, hideImageFilters, addFilterDefaultButtonHandler, addFilterRandomButtonHandler, addFilterDiscussedButtonHandler};
