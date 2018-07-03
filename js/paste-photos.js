'use strict';
// ---
// Создание и вставка миниатюр изображений на страницу
// ---

(function () {
  // ---
  // 1. Создание миниатюры изображения
  // ---

  // Блок шаблона
  var photoTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture__link');

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

  // ---
  // 2. Вставка миниатюр изображений на страницу
  // ---
  window.pastePhotos = function (data) {
    // Фрагмент
    var fragment = document.createDocumentFragment();

    // Пустой контейнер фотографий
    var photosList = document.querySelector('.pictures');

    // Заполнение фрагмента миниатюрами изображений
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(createPhoto(data[i]));
    }

    // Вставка фрагмента на страницу
    photosList.appendChild(fragment);
  };
})();
