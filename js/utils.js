'use strict';
// ---
// Утилиты
// ---

(function () {
  // Константы клавиатурных клавиш
  var ESC_KEYCODE = 27;

  // Родительский блок, в котором находятся все элементы загрузки изображения
  var uploadBlock = document.querySelector('.img-upload');

  // Форма редактирования изображения
  var uploadOverlay = uploadBlock.querySelector('.img-upload__overlay');

  // Находим загружаемое изображение
  var image = uploadBlock.querySelector('.img-upload__preview img');

  // Фиелдсет, содержащий инпут, шкалу и ползунок
  var scaleBlock = uploadBlock.querySelector('.scale');

  // Шкала регулировки ползунка
  var scaleLine = scaleBlock.querySelector('.scale__line');

  // Ползунок регулировки насыщенности изображения
  var scalePin = scaleBlock.querySelector('.scale__pin');

  // Инпут, в свойстве 'value' которого хранится значение уровня эффекта (от 0 до 100)
  var scaleInput = scaleBlock.querySelector('.scale__value');

  // Находим блок, содержащий текст сетевой ошибки (скрыт по-умолчанию)
  var errorBlock = document.querySelector('.network-error');

  window.utils = {
    // Функция добавления блоку 'block' класса 'cssClass'
    addClass: function (block, cssClass) {
      block.classList.add(cssClass);
    },
    // Функция удаления у блока 'block' класса 'cssClass'
    removeClass: function (block, cssClass) {
      block.classList.remove(cssClass);
    },
    // Функция отслеживания нажатия Esc
    isEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        return true;
      } else {
        return false;
      }
    },
    // Функция закрытия попапа загрузки изображения по нажатию на Esc
    onPopupEscPress: function (evt) {
      if (window.utils.isEscPress(evt)) {
        window.utils.addClass(uploadOverlay, 'hidden');
      }
    },
    uploadBlock: uploadBlock,
    uploadOverlay: uploadOverlay,
    image: image,
    scaleBlock: scaleBlock,
    scaleLine: scaleLine,
    scalePin: scalePin,
    scaleInput: scaleInput,
    errorBlock: errorBlock
  };
})();
