'use strict';
// ---
// Логика открытия/закрытия формы
// Логика отправки формы на сервер
// Логика незакрывания на ESC формы при фокусе на полях ввода данных
// Логика неотправки формы при фокусе на текстовом поле масштаба
// ---

(function () {

  // Функция открытия всплывающего окна
  var openPopup = function (popup) {
    window.utils.removeClass(popup, 'hidden');
  };

  // Функция закрытия всплывающего окна
  var closePopup = function (popup) {
    window.utils.addClass(popup, 'hidden');
  };

  // Блок input загрузки изображения
  var uploadInput = window.utils.uploadBlock.querySelector('#upload-file');

  // Реакция на событие 'change' блока '#upload-file'
  uploadInput.addEventListener('change', function () {
    openPopup(window.utils.uploadOverlay);
    window.imageScaling.setToDefault();
    document.addEventListener('keydown', window.utils.onPopupEscPress);
  });

  // Блок закрытия формы редактирования изображения
  var crossButtonUpload = window.utils.uploadOverlay.querySelector(
      '.img-upload__cancel'
  );

  // Реакция на событие 'click' на блок 'crossButtonUpload'
  crossButtonUpload.addEventListener('click', function () {
    closePopup(window.utils.uploadOverlay);
    document.removeEventListener('keydown', window.utils.onPopupEscPress);
  });

  // Фунция-коллбэк в случае успеха отправки формы
  var onSuccess = function () {
    window.utils.errorBlock.textContent = '';
    window.utils.addClass(window.utils.errorBlock, 'hidden');
    window.utils.form.reset();
    window.utils.addClass(window.utils.uploadOverlay, 'hidden');
  };

  // Фунция-коллбэк в случае ошибки отправки формы
  var onError = function (message) {
    window.utils.errorBlock.textContent = message;
    window.utils.removeClass(window.utils.errorBlock, 'hidden');
  };

  // Функция-коллбэк, которая отправляет форму
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    if (window.validateForm()) {
      window.backend.save(new FormData(window.utils.form), onSuccess, onError);
    }
  };

  // Функция-коллбэк, которая предотвращает отправку формы
  var onFormStopSubmit = function (evt) {
    evt.preventDefault();
  };

  // Обрабатываем событие 'submit' на форме
  window.utils.form.addEventListener('submit', onFormSubmit);

  // Функция незакрывания окна формы при нажатии на ESC когда инпут в фокусе
  var dontCloseForm = function (input) {
    // Обрабатываем событие 'focus'
    input.addEventListener('focus', function () {
      // Предотвращение закрытия формы по нажатию на ESC
      document.removeEventListener('keydown', window.utils.onPopupEscPress);
    });

    // Обрабатываем событие 'blur'
    input.addEventListener('blur', function () {
      // Возобновление закрытия формы по нажатию на ESC
      document.addEventListener('keydown', window.utils.onPopupEscPress);
    });
  };

  // Вызываем функцию на соответствующих текстовых полях формы
  dontCloseForm(window.utils.commentField);
  dontCloseForm(window.utils.hashtagsField);
  dontCloseForm(window.utils.resizeInput);

  // Функция неотправки формы при нажатии на Enter когда инпут в фокусе
  var dontSendForm = function (input) {
    input.addEventListener('focus', function () {
      // Предотвращение отправки формы
      window.utils.form.removeEventListener('submit', onFormSubmit);
      window.utils.form.addEventListener('submit', onFormStopSubmit);
    });
    input.addEventListener('blur', function () {
      // Возобновление отправки формы
      window.utils.form.addEventListener('submit', onFormSubmit);
      window.utils.form.removeEventListener('submit', onFormStopSubmit);
    });
  };

  // Вызываем функцию на текстовом поле масштаба
  dontSendForm(window.utils.resizeInput);

})();
