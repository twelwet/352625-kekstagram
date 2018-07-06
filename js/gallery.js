'use strict';
// ---
// Успешная загрузка данных с сервера --> отображение галереи изображений
// Неуспешная загрузка --> сообщение об ошибке
// ---

(function () {

  // Создадим объект, куда сложим функции фильтрации
  var filters = {
    'filter-popular': window.filter.popular,
    'filter-new': window.filter.new,
    'filter-discussed': window.filter.discussed
  };

  // Обрабатываем событие 'click' на кнопках фильтров
  for (var i = 0; i < window.filter.buttons.length; i++) {
    window.filter.buttons[i].addEventListener('click', function (evt) {
      var targetElement = evt.target;
      window.filter.activateButton(targetElement);
      (filters[targetElement.id])(window.data);
    });
  }

  // Объявим callback-функцию которая отрисует пины
  // при успешной загрузке данных
  var onLoad = function (data) {
    window.data = data;
    window.utils.errorBlock.textContent = '';
    window.utils.addClass(window.utils.errorBlock, 'hidden');
    window.filter.container.show();
    window.photos.paste(data);
    window.activatePreview();
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
