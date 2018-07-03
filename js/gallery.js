'use strict';
// ---
// Успешная загрузка данных с сервера --> отображение галереи изображений
// Неуспешная загрузка --> сообщение об ошибке
// ---

(function () {

  // Объявим callback-функцию которая отрисует пины
  // при успешной загрузке данных
  var onLoad = function (data) {
    window.utils.errorBlock.textContent = '';
    window.utils.addClass(window.utils.errorBlock, 'hidden');
    window.pastePhotos(data);
    window.activatePreview();
    window.data = data;
  };

  // Объявим callback-функцию, которая сообщит об ошибке
  // при неуспешной попытке загрузить данные с сервера
  var onError = function (message) {
    window.utils.errorBlock.textContent = message;
    window.utils.removeClass(window.utils.errorBlock, 'hidden');
  };

  // Вызовем саму функцию загрузки данных
  window.backend.load(onLoad, onError);
})();
