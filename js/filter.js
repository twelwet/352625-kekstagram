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

  window.filter = {
    // Фильтр 'Популярные' (оставляем данные как есть после загрузки)
    popular: function (data) {
      window.photos.remove();
      window.photos.paste(data);
    },
    // Фильтр 'Новые' (10 рандомных фотографий из загруженных данных)
    new: function (data) {
      window.photos.remove();
      var newData = data.slice().sort(compareRandom).splice(0, NEW_FILTER_QANTITY);
      window.photos.paste(newData);
    },
    // Фильтр 'Обсуждаемые' (ранжируем данные по убыванию количества комментариев)
    discussed: function (data) {
      window.photos.remove();
      var discussingData = data.slice();
      discussingData = discussingData.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
      window.photos.paste(discussingData);
    },
    // Активация (подсветка) кнопки активного фильтра
    activateButton: function (button) {
      window.filter.deactivateButton();
      button.classList.add('img-filters__button--active');
    },
    // Деактивация (убирание подсветки) кнопки активного фильтра
    deactivateButton: function () {
      var button = filterContainer.querySelector('.img-filters__button--active');
      if (button !== null) {
        button.classList.remove('img-filters__button--active');
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
