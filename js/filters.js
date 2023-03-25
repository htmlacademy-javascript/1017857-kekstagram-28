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
 * Функция возвращает массив заданного размера случайных миниатюр
 * @param {array} miniatures - массив данных по миниатюрам
 * @param {number} count - количество миниатюр, которое надо вернуть
 * @return {array} случайный массив миниатюр
 */
const filterRandomMiniatures = (miniatures, count) => {
  const randomIdFromRangeGenerator = createRandomIdFromRangeGenerator(0, miniatures.length - 1);
  const randomMiniaturesData = [];
  for (let i = 0; i < count; i++){
    const id = randomIdFromRangeGenerator();
    randomMiniaturesData.push(miniatures[id]);
  }
  return randomMiniaturesData;
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

const filtersFormElement = document.querySelector('.img-filters__form');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

/**
 * Функция добавляет обработчик события по клику на фильтрах
 * @param {array} miniatures - массив данных по миниатюрам
 * @param {function} cb - колбэк функция
 */
const addFilterButtonHandler = (miniatures, cb) => {
  filtersFormElement.addEventListener('click', (evt) => {
    switch (evt.target.id) {
      case ('filter-default'):
        filterDefaultButton.classList.add('img-filters__button--active');
        filterRandomButton.classList.remove('img-filters__button--active');
        filterDiscussedButton.classList.remove('img-filters__button--active');
        cb(miniatures);
        break;
      case ('filter-random'):
        filterDefaultButton.classList.remove('img-filters__button--active');
        filterRandomButton.classList.add('img-filters__button--active');
        filterDiscussedButton.classList.remove('img-filters__button--active');
        cb(filterRandomMiniatures(miniatures, RANDOM_MINIATURES_COUNT));
        break;
      case ('filter-discussed'):
        filterDefaultButton.classList.remove('img-filters__button--active');
        filterRandomButton.classList.remove('img-filters__button--active');
        filterDiscussedButton.classList.add('img-filters__button--active');
        cb(filterDiscussedMiniatures(miniatures));
        break;
      default:
        break;
    }
  });
};

export {showImageFilters, addFilterButtonHandler};
