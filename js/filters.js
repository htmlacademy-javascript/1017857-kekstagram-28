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

const filterRandomButton = document.querySelector('#filter-random');

const addFilterRandomButtonHandler = (miniatures) => {
  filterRandomButton.addEventListener('click', () => {
    renderMiniatures(filterRandomMiniatures(miniatures, RANDOM_MINIATURES_COUNT));
  });
};

export {showImageFilters, hideImageFilters, addFilterRandomButtonHandler};
