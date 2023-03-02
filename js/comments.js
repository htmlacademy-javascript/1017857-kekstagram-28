const SHOW_COMMENT_COUNT = 5;
const social = document.querySelector('.social');
const commentListElement = social.querySelector('.social__comments');
const commentItemTemplate = commentListElement.querySelector('.social__comment');
const commentsLoader = social.querySelector('.comments-loader');
let commentList = [];
let countComments = SHOW_COMMENT_COUNT;


const clearComments = () => {
  commentListElement.innerHTML = '';
};

const appendCommentItem = (commentData) => {
  const commentItemElement = commentItemTemplate.cloneNode(true);
  commentItemElement.querySelector('.social__picture').setAttribute('src', commentData.avatar);
  commentItemElement.querySelector('.social__picture').setAttribute('alt', commentData.name);
  commentItemElement.querySelector('.social__text').textContent = commentData.message;
  return commentItemElement;
};

const createCommentList = (commentsData) => {
  commentsData.forEach((item) => {
    commentList.push(appendCommentItem(item));
  });
};

const showCommentCount = (count) => {
  const reg = /^[0-9]{1,3}/;
  let currentCommentCount = social.querySelector('.social__comment-count').innerHTML;
  currentCommentCount = currentCommentCount.replace(reg, count);
  social.querySelector('.social__comment-count').innerHTML = currentCommentCount;
};


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
  // eslint-disable-next-line no-unused-expressions
  count < commentsData.length ? showCommentCount(count) : showCommentCount(commentsData.length);
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

commentsLoader.addEventListener('click', () =>{
  countComments += SHOW_COMMENT_COUNT;
  renderCommentList(commentList, countComments);
});

export {modifyCommentList};
