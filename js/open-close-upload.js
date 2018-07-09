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

  // Блок input загрузки изображения
  var uploadInput = window.utils.uploadBlock.querySelector('#upload-file');

  // Блок закрытия формы редактирования изображения
  var crossButtonUpload = window.utils.uploadOverlay.querySelector(
      '.img-upload__cancel'
  );

  // Реакция на событие 'change' блока '#upload-file'
  uploadInput.addEventListener('change', function () {
    openPopup(window.utils.uploadOverlay);
    window.imageScaling.setToDefault();
    document.addEventListener('keydown', window.utils.onPopupEscPress);
  });

  // Реакция на событие 'click' на блок 'crossButtonUpload'
  crossButtonUpload.addEventListener('click', function () {
    closePopup(window.utils.uploadOverlay);
    document.removeEventListener('keydown', window.utils.onPopupEscPress);
  });
})();
