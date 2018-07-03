'use strict';

(function () {

  var createConnection = function (callbackSuccess, callbackError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        callbackSuccess(xhr.response);
      } else {
        callbackError('Error status ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('timeout', function () {
      callbackError('Timeout error: request failed in ' + xhr.timeout + ' ms');
    });
    xhr.timeout = 1000;
    return xhr;
  };

  window.backend = {
    load: function (callbackSuccess, callbackError) {
      var xhr = createConnection(callbackSuccess, callbackError);
      xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
      xhr.send();
    },
    save: function (data, callbackSuccess, callbackError) {
      var xhr = createConnection(callbackSuccess, callbackError);
      xhr.open('POST', 'https://js.dump.academy/kekstagram');
      xhr.send(data);
    }
  };
})();
