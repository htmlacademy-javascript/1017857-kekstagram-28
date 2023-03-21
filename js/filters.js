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

const filterRandomMiniatures = (miniatures, count) => {
  const randomIdFromRangeGenerator = createRandomIdFromRangeGenerator(0, miniatures.length - 1);
  const result = [];
  for(let i = 0; i < count; i++){
    const id = randomIdFromRangeGenerator();
    result.push(miniatures[id]);
  }
  return result;
};

const filterDiscussedMiniatures = (miniatures) => {
  const sortedMiniatures = miniatures.slice();
  sortedMiniatures.sort((a, b) => a.comments.length > b.comments.length ? -1 : 1);
  return sortedMiniatures;
};

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const addFilterDefaultButtonHandler = (miniatures, cb) => {
  filterDefaultButton.addEventListener('click', () => {
    filterDefaultButton.classList.add('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    cb(miniatures);
  });
};
const addFilterRandomButtonHandler = (miniatures, cb) => {
  filterRandomButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    cb(filterRandomMiniatures(miniatures, RANDOM_MINIATURES_COUNT));
  });
};
const addFilterDiscussedButtonHandler = (miniatures, cb) => {
  filterDiscussedButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.add('img-filters__button--active');
    cb(filterDiscussedMiniatures(miniatures));
  });
};

export {showImageFilters, hideImageFilters, addFilterDefaultButtonHandler, addFilterRandomButtonHandler, addFilterDiscussedButtonHandler};
