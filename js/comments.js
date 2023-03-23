const SHOW_COMMENT_COUNT = 5;
const social = document.querySelector('.social');
const commentListElement = social.querySelector('.social__comments');
const commentItemTemplate = commentListElement.querySelector('.social__comment');
const commentsLoader = social.querySelector('.comments-loader');
let commentList = [];
let countComments = SHOW_COMMENT_COUNT;

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
    commentList.push(appendCommentItem(item));
  });
};

/**
 * Функция отображает количество показанных комментариев
 * @param {number} count - количество комментариев к фотографии
 */
const showCommentCount = (count) => {
  const reg = /^[0-9]{1,3}/;
  let currentCommentCount = social.querySelector('.social__comment-count').innerHTML;
  currentCommentCount = currentCommentCount.replace(reg, count);
  social.querySelector('.social__comment-count').innerHTML = currentCommentCount;
};

/**
 * Функция отображает список комментариев и скрывает кнопку 'загрузить еще', если показаны все комментарии
 * @param {object} commentsData - данные по комментарию
 * @param {number} count - общее количество комментариев
 */
const renderCommentList = (commentsData, count) => {
  clearComments();
  commentsData.forEach((item, index) => {
    if (index >= count) {
      item.classList.add('hidden');
    } else {
      item.classList.remove('hidden');
    }
    commentListElement.append(item);
  });
  if (count >= commentsData.length) {
    commentsLoader.classList.add('hidden');
  }
  const commentsCount = count < commentsData.length ? count : commentsData.length;
  showCommentCount(commentsCount);
};

/**
 * Функция выводит список комментариев пользователей
 * @param {Array} commentsData - Список комментариев к фотографии
 */
const modifyCommentList = (commentsData) => {
  commentList = [];
  countComments = SHOW_COMMENT_COUNT;
  clearComments();
  social.querySelector('.comments-count').textContent = commentsData.length;
  commentsLoader.classList.remove('hidden');
  createCommentList(commentsData);
  renderCommentList(commentList, countComments);
};

/**
 * Обработчик события 'click' по кнопке 'загрузить еще'
 */
commentsLoader.addEventListener('click', () =>{
  countComments += SHOW_COMMENT_COUNT;
  renderCommentList(commentList, countComments);
});

export {modifyCommentList};
