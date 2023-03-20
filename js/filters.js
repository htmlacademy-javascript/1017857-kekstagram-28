import {createRandomIdFromRangeGenerator} from './util.js';
import {renderMiniatures} from './miniatures.js';

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

const filterDiscussedMiniatures = (miniatures) => miniatures.sort((a, b) => a.comments.length > b.comments.length ? -1 : 1);

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const addFilterDefaultButtonHandler = (miniatures) => {
  filterDefaultButton.addEventListener('click', () => {
    filterDefaultButton.classList.add('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    renderMiniatures(miniatures);
  });
};
const addFilterRandomButtonHandler = (miniatures) => {
  filterRandomButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    renderMiniatures(filterRandomMiniatures(miniatures, RANDOM_MINIATURES_COUNT));
  });
};
const addFilterDiscussedButtonHandler = (miniatures) => {
  filterDiscussedButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.add('img-filters__button--active');
    renderMiniatures(filterDiscussedMiniatures(miniatures));
  });
};

export {showImageFilters, hideImageFilters,addFilterDefaultButtonHandler, addFilterRandomButtonHandler, addFilterDiscussedButtonHandler};
