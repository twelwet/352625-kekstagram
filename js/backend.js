'use strict';

(function () {
  window.backend = {
    load: function (callbackSuccess, callbackError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            callbackSuccess(xhr.response);
            break;
          case 400:
            error = xhr.status + ' Неверный запрос';
            break;
          case 404:
            error = xhr.status + ' Ничего не найдено';
            break;
          case 500:
            error = xhr.status + ' Сервер не отвечает';
            break;
          default:
            error = 'Неизвестный статус ' + xhr.status + ' ' + xhr.statusText;
            break;
        }
        if (error) {
          callbackError(error);
        }
      });
      xhr.addEventListener('timeout', function () {
        callbackError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      xhr.timeout = 3000;
      xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
      xhr.send();
    },
    save: function (data, callbackSuccess, callbackError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            callbackSuccess(xhr.response);
            break;
          case 400:
            error = xhr.status + ' Неверный запрос';
            break;
          case 404:
            error = xhr.status + ' Ничего не найдено';
            break;
          case 500:
            error = xhr.status + ' Сервер не отвечает';
            break;
          default:
            error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
            break;
        }
        if (error) {
          callbackError(error);
        }
      });
      xhr.addEventListener('timeout', function () {
        callbackError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      xhr.timeout = 1000;
      xhr.open('POST', 'https://js.dump.academy/kekstagram');
      xhr.send(data);
    }
  };
})();
