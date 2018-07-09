'use strict';
// ---
// Функция создания миниатюры изображения
// Функция вставки миниатюр изображений на страницу
// Функция удаления миниатюр изображений со страницы
// ---

(function () {
  // Блок шаблона
  var photoTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture__link');

  // Контейнер фотографий
  var photosList = document.querySelector('.pictures');

  // Функция создания DOM-элемента на основе шаблона
  var createPhoto = function (array) {
    // Клон тега <a> из шаблона
    var photo = photoTemplate.cloneNode(true);

    // Наполнение тега <a> контентом
    // 1. Содержимое счетчика лайков
    photo.querySelector('.picture__stat--likes').textContent = array.likes;

    // 2. Содержимое счетчика комментариев
    photo.querySelector('.picture__stat--comments').textContent =
      array.comments.length;

    // 3. Путь к фотографии
    photo.querySelector('.picture__img').src = array.url;

    return photo;
  };

  window.photos = {
    // Вставка миниатюр изображений на страницу
    paste: function (data) {
      // Фрагмент
      var fragment = document.createDocumentFragment();
      // Заполнение фрагмента миниатюрами изображений
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(createPhoto(data[i]));
      }

      // Вставка фрагмента на страницу
      photosList.appendChild(fragment);
      window.activatePreview();
    },
    // Удаление миниатюр изображений со страницы
    remove: function () {
      var photos = photosList.querySelectorAll('.picture__link');
      for (var i = 0; i < photos.length; i++) {
        photos[i].remove();
      }
    }
  };
})();
