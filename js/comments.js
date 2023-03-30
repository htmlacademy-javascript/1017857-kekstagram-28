const SHOW_COMMENT_COUNT = 5;
const social = document.querySelector('.social');
const commentListElement = social.querySelector('.social__comments');
const commentItemTemplate = commentListElement.querySelector('.social__comment');
const commentsLoader = social.querySelector('.comments-loader');
let commentsList = [];

/**
 * Функция очистки списка комментариев
 */
const clearComments = () => {
  commentListElement.innerHTML = '';
};

/**
 * Функция добавления комментария в список
 * @param {object} commentData - данные по комментарию
 * @return {Node} - комментарий в виде HTML элемента
 */
const appendCommentItem = (commentData) => {
  const commentItemElement = commentItemTemplate.cloneNode(true);
  commentItemElement.querySelector('.social__picture').setAttribute('src', commentData.avatar);
  commentItemElement.querySelector('.social__picture').setAttribute('alt', commentData.name);
  commentItemElement.querySelector('.social__text').textContent = commentData.message;
  return commentItemElement;
};

/**
 * Функция создает список комментариев
 * @param {array} commentsData - массив из комментариев к фотографии
 */
const createCommentList = (commentsData) => {
  commentsData.forEach((item) => {
    commentsList.push(appendCommentItem(item));
  });
};

/**
 * Функция отображает количество показанных комментариев
 */
const showCommentCount = () => {
  const reg = /^[0-9]{1,3}/;
  let currentCommentCount = social.querySelector('.social__comment-count').innerHTML;
  currentCommentCount = currentCommentCount.replace(reg, commentListElement.childElementCount);
  social.querySelector('.social__comment-count').innerHTML = currentCommentCount;
};

/**
 * Функция возвращает фрагмент с заданным количеством комментариев
 * @param {array} commentElementList - массив комментариев
 * @param {number} commentsCount - количество комментариев
 * @return {Node} фрагмент с комментариями
 */
const getNextComments = (commentElementList, commentsCount) => {
  const nextCommentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCount; i++) {
    if (commentElementList.length === 0) {
      break;
    }
    nextCommentsFragment.append(commentElementList.shift());
  }
  return nextCommentsFragment;
};

/**
 * Функция выводит список комментариев пользователей
 * @param {Array} commentsData - Список комментариев к фотографии
 */
const modifyCommentList = (commentsData) => {
  commentsList = [];
  clearComments();
  social.querySelector('.comments-count').textContent = commentsData.length;
  commentsLoader.classList.remove('hidden');
  createCommentList(commentsData);
  commentListElement.append(getNextComments(commentsList, SHOW_COMMENT_COUNT));
  showCommentCount();
};

/**
 * Обработчик события 'click' по кнопке 'загрузить еще'
 */
commentsLoader.addEventListener('click', () => {
  commentListElement.append(getNextComments(commentsList, SHOW_COMMENT_COUNT));
  showCommentCount();
  if (commentsList.length === 0) {
    commentsLoader.classList.add('hidden');
  }
});

export {modifyCommentList};
