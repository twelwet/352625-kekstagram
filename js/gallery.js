'use strict';
// ---
// Успешная загрузка данных с сервера --> отображение галереи изображений
// Неуспешная загрузка --> сообщение об ошибке
// ---

(function () {
  // Объявим callback-функцию которая отрисует пины
  // при успешной загрузке данных
  var onLoad = function (data) {
    window.pastePhotos(data);
    window.activatePreview();
    window.data = data;
  };

  // Объявим callback-функцию, которая сообщит об ошибке
  // при неуспешной попытке загрузить данные с сервера
  var onError = function (message) {
    var node = document.createElement('div');
    node.style.backgroundColor = 'red';
    node.style.margin = 'auto';
    node.style.textAlign = 'center';
    node.style.position = 'relative';
    node.style.fontSize = '18px';
    node.style.color = 'white';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Вызовем саму функцию загрузки данных
  window.backend.load(onLoad, onError);

})();
