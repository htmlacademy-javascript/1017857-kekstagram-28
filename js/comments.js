const social = document.querySelector('.social');
const commentListElement = social.querySelector('.social__comments');
const commentItemTemplate = commentListElement.querySelector('.social__comment');
const commentListFragment = document.createDocumentFragment();
const COMMENT_COUNT_INIT = 5;

let commentsCount = COMMENT_COUNT_INIT;

const clearComment = () => {
  commentListElement.innerHTML = '';
};

const appendComment = (commentData) => {
  const commentItemElement = commentItemTemplate.cloneNode(true);
  commentItemElement.querySelector('.social__picture').setAttribute('src', commentData.avatar);
  commentItemElement.querySelector('.social__picture').setAttribute('alt', commentData.name);
  commentItemElement.querySelector('.social__text').textContent = commentData.message;
  commentListFragment.append(commentItemElement);
};

const addComments = (commentsData, count) => {
  clearComment();
  for (let i = 0; i < count; i ++) {
    if (commentsData.length === i) {
      social.querySelector('.comments-loader').classList.add('hidden');
      break;
    }
    appendComment(commentsData[i]);
  }
  commentListElement.append(commentListFragment);
};

/**
 * Функция выводит список комментариев пользователей
 * @param {Array} commentsData - Список комментариев к фотографии
 */
const modifyCommentList = (commentsData) => {
  social.querySelector('.comments-count').textContent = commentsData.length;
  addComments(commentsData, commentsCount);
  social.querySelector('.comments-loader').addEventListener('click', () => {
    commentsCount += COMMENT_COUNT_INIT;
    addComments(commentsData, commentsCount);
  });
};


export {modifyCommentList};
