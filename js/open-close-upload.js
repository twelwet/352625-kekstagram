'use strict';
// ---
// Логика открытия/закрытия модального окна загрузки изображения
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

  // Функция закрытия попапа по нажатию на Esc
  var onPopupEscPress = function (evt) {
    if (window.utils.isEscPress(evt)) {
      closePopup(uploadOverlay);
    }
  };

  // Форма редактирования изображения
  var uploadOverlay = window.utils.uploadBlock.querySelector('.img-upload__overlay');

  // Блок input загрузки изображения
  var uploadInput = window.utils.uploadBlock.querySelector('#upload-file');

  // Блок закрытия формы редактирования изображения
  var crossButtonUpload = uploadOverlay.querySelector(
      '.img-upload__cancel'
  );

  // Реакция на событие 'change' блока '#upload-file'
  uploadInput.addEventListener('change', function () {
    openPopup(window.utils.uploadOverlay);
    document.addEventListener('keydown', onPopupEscPress);
  });

  // Реакция на событие 'click' на блок 'crossButtonUpload'
  crossButtonUpload.addEventListener('click', function () {
    closePopup(window.utils.uploadOverlay);
    document.removeEventListener('keydown', onPopupEscPress);
  });
})();
