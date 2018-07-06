'use strict';

(function () {
  var NEW_FILTER_QANTITY = 10; // Количество отображаемых фотографий фильтра 'Новые'

  // Контейнер кнопок фильтров
  var filterContainer = document.querySelector('.img-filters');

  // Коллекция кнопок-фильтров
  var filters = filterContainer.querySelectorAll('.img-filters__button');

  // Объявим функцию, которая возвращает рандомное число от -0.5 до 0.5
  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  var fnWithDebounce = window.debounce(window.photos.paste);

  window.filter = {
    // Фильтр 'Популярные' (оставляем данные как есть после загрузки)
    popular: function (data) {
      window.photos.remove();
      fnWithDebounce(data);
      window.activatePreview();
    },
    // Фильтр 'Новые' (10 рандомных фотографий из загруженных данных)
    new: function (data) {
      window.photos.remove();
      var newData = data.slice().sort(compareRandom).splice(0, NEW_FILTER_QANTITY);
      fnWithDebounce(newData);
      window.activatePreview();
    },
    // Фильтр 'Обсуждаемые' (ранжируем данные по убыванию количества комментариев)
    discussed: function (data) {
      window.photos.remove();
      var discussingData = data.slice();
      discussingData = discussingData.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
      fnWithDebounce(discussingData);
      window.activatePreview();
    },
    // Активация (подсветка) кнопки активного фильтра
    activateButton: function (button) {
      window.filter.deactivateButton();
      window.utils.addClass(button, 'img-filters__button--active');
    },
    // Деактивация (убирание подсветки) кнопки активного фильтра
    deactivateButton: function () {
      var button = filterContainer.querySelector('.img-filters__button--active');
      if (button !== null) {
        window.utils.removeClass(button, 'img-filters__button--active');
      }
    },
    container: {
      // Функция показа блока кнопок фильтров
      show: function () {
        window.utils.removeClass(filterContainer, 'img-filters--inactive');
      }
    },
    buttons: filters
  };
})();
