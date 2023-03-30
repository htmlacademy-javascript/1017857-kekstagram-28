const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/3',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

/**
 * Функция формирования запроса
 * @param {string} route - путь до сервера
 * @param {string} errorText - сообщение об ошибке
 * @param {string} method - метод передачи/получения данных
 * @param {object} body - тело запроса
 * @return {Promise<any>}
 */
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

/**
 * Функция получения данных с сервера
 * @return {Promise<any>}
 */
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

/**
 * Функция отправки данных на сервер
 * @param {object} body - тело запроса
 * @return {Promise<any>}
 */
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
