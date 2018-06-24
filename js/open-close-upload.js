'use strict';
// ---
// Логика открытия/закрытия модального окна загрузки изображения
// ---

(function () {
  // Блок input загрузки изображения
  var uploadInput = window.utils.uploadBlock.querySelector('#upload-file');

  // Блок закрытия формы редактирования изображения
  var crossButtonUpload = window.utils.uploadOverlay.querySelector(
      '.img-upload__cancel'
  );

  // Реакция на событие 'change' блока '#upload-file'
  uploadInput.addEventListener('change', function () {
    window.utils.openPopup(window.utils.uploadOverlay);
    document.addEventListener('keydown', window.utils.onPopupEscPress);
  });

  // Реакция на событие 'click' на блок 'crossButtonUpload'
  crossButtonUpload.addEventListener('click', function () {
    window.utils.closePopup(window.utils.uploadOverlay);
    document.removeEventListener('keydown', window.utils.onPopupEscPress);
  });
})();
