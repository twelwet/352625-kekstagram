'use strict';
// ---
// Объявление в глобальную область видимости:
// - функции создания окна превью изображения
// - функции показа окна превью изображения
// - функции скрытия окна превью изображения
// ---

(function () {
  // Модалка превью изображения
  var preview = document.querySelector('.big-picture');

  // Находим список комментариев в верстке
  var commentsList = preview.querySelector('.social__comments');

  // Сохраняем первый комментарий в глобальную переменную для шаблона
  var createCommentTemplate = function () {
    window.commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);
  };

  // Объявляем функцию удаления комментариев из списка
  var clearComments = function () {
    while (commentsList.children[0]) {
      commentsList.removeChild(commentsList.children[0]);
    }
  };

  // Объявляем функцию открытия окна превью
  var openPreview = function () {
    window.utils.removeClass(preview, 'hidden');
  };

  // Объявляем функцию закрытия превью
  var closePreview = function () {
    window.utils.addClass(preview, 'hidden');
    clearComments();
  };

  // Объявляем функцию показа превью
  var showPreview = function (index) {
    createPreview(index);
    openPreview();
  };

  // Объявляем функцию создания превью
  var createPreview = function (index) {
    // 1. Путь к фотографии
    preview.querySelector('.big-picture__img img').src = window.data[index].url;

    // 2. Содержимое счетчика лайков
    preview.querySelector('.likes-count').textContent = window.data[index].likes;

    // 3. Содержимое счетчика комментариев
    preview.querySelector('.comments-count').textContent =
      window.data[index].comments.length;

    // Заполнение описания фотографии
    preview.querySelector('.social__caption').textContent =
      window.data[index].description;

    // Объявляем функцию создания комментария
    var createComment = function (commentIndex) {
      var comment = window.commentTemplate.cloneNode(true);
      // Наполнение тега <li> контентом:
      // Произвольная картинка аватара ко
      comment.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';

      // Текст комментария
      comment.querySelector('.social__text').textContent = window.data[index].comments[commentIndex];

      return comment;
    };

    // Объявляем функцию вставки комментариев на страницу
    var pasteComments = function () {
      // Количество комментариев в превью
      var COMMENT_QUANTITY = 5;

      // Фрагмент
      var fragment = document.createDocumentFragment();

      // Наполнение фрагмента
      if (window.data[index].comments.length < COMMENT_QUANTITY) {
        var counter = window.data[index].comments.length;
      } else {
        counter = COMMENT_QUANTITY;
      }
      preview.querySelector('.social__comment-count').childNodes[0].textContent = counter + ' из ';
      for (var i = 0; i < counter; i++) {
        fragment.appendChild(createComment(i));
      }

      // Вставка фрагмента на страницу
      commentsList.appendChild(fragment);
    };

    if (commentsList.children.length === 0) {
      pasteComments();
    }
  };

  window.activatePreview = function () {
    // Создаем шаблон комментария
    createCommentTemplate();

    // Удаляем встроенные в верстку комментарии
    clearComments();
    // Кнопка закрытия попапа превью изображения
    var crossButtonPreview = preview.querySelector('.cancel');

    // Коллекция ссылок на изображения
    var photoLinks = document.querySelectorAll('.picture__link');

    // Функция получения порядкового номера фото из строки src тега img
    var getIndex = function (src) {
      return Number(src.substr(7, 2)) - 1;
    };

    // Проходимся в цикле по всем ссылкам на изображения из коллекции
    for (var i = 0; i < photoLinks.length; i++) {
      photoLinks[i].addEventListener('click', function (evt) {
        var targetElement = evt.currentTarget;

        // Находим строку пути к фотографии
        var src = targetElement.querySelector('.picture__img').attributes.src.value;

        // Показываем модалку превью
        showPreview(getIndex(src));

        // Скрываем модалку превью изображения
        crossButtonPreview.addEventListener('click', function () {
          closePreview();
        });

        // Скрываем модалку превью по нажатию на Esc
        document.addEventListener('keydown', function (escEvt) {
          if (window.utils.isEscPress(escEvt)) {
            closePreview();
          }
        });
      });
    }
  };
})();
