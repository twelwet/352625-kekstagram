'use strict';
// ---
// Наполнения данными превью изображения
// +
// Логика показа/скрытия превью изображения
// ---

(function () {
  // Модалка превью изображения
  var preview = document.querySelector('.big-picture');

  // Функция наполнения тега модалки контентом
  var createPreview = function (index) {
    // 1. Путь к фотографии
    preview.querySelector('.big-picture__img img').src = window.data[index].url;

    // 2. Содержимое счетчика лайков
    preview.querySelector('.likes-count').textContent =
      window.data[index].likes;

    // 3. Содержимое счетчика комментариев
    preview.querySelector('.comments-count').textContent =
      window.data[index].comments.length;

    // 4. Содержимое блока комментариев
    // Список ul комментариев
    var commentsList = preview.querySelector('.social__comments');

    // Коллекция li комментариев
    var commentsCollection = commentsList.querySelectorAll('.social__comment');

    // Последняя li в псевдомассиве 'commentsCollection'
    var lastLi = commentsList.querySelectorAll(
        '.social__comment:last-child'
    )[0];

    // Удаление лишней li если комментарий всего один
    if (window.data[index].comments.length < commentsCollection.length) {
      window.utils.addClass(lastLi, 'visually-hidden');
    }

    // Заполнение атрибутов и свойств контентом
    for (var i = 0; i < window.data[index].comments.length; i++) {
      commentsCollection[i].querySelector('img').src =
        'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';
      commentsCollection[i].querySelector('.social__text').textContent =
        window.data[index].comments[i];
    }

    // Заполнение описания фотографии
    preview.querySelector('.social__caption').textContent =
      window.data[index].description;
  };

  // Временное скрытие элементов счетчика комментов и кнопки 'Загрузить еще'
  // 1. Cчетчик комментариев
  var commentCount = preview.querySelector('.social__comment-count');

  // 2. Кнопка 'Загрузить еще'
  var buttonLoadMore = preview.querySelector('.social__loadmore');

  window.utils.addClass(commentCount, 'visually-hidden');
  window.utils.addClass(buttonLoadMore, 'visually-hidden');

  // ---
  // Логика показа (отрисовки) / скрытия (добавление 'hidden') превью изображения
  // ---

  // Кнопка закрытия попапа превью изображения
  var crossButtonPreview = preview.querySelector('.cancel');

  // Коллекция ссылок на изображения
  var picturesCollection = document.querySelectorAll('.picture__link');

  // Функция получения порядкового номера фото из строки src тега img
  var getNumber = function (src) {
    return Number(src.substr(7, 2)) - 1;
  };

  // Проходимся в цикле по всем ссылкам на изображения из коллекции
  for (var i = 0; i < picturesCollection.length; i++) {
    picturesCollection[i].addEventListener('click', function (evt) {
      // Находим атрибут src у изображения
      var src = evt.target.attributes.src.value;

      // Порядковый номер изображения
      var photoNumber = getNumber(src);

      // Наполняем модалку превью контентом
      createPreview(photoNumber);

      // Показываем модалку превью изображения
      window.utils.removeClass(preview, 'hidden');

      // Скрываем модалку превью изображения
      crossButtonPreview.addEventListener('click', function () {
        window.utils.addClass(preview, 'hidden');
      });

      // Скрываем модалку превью по нажатию на Esc
      document.addEventListener('keydown', function (escEvt) {
        if (window.utils.isEscPress(escEvt)) {
          window.utils.addClass(preview, 'hidden');
        }
      });
    });
  }
})();
