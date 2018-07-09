'use strict';

(function () {

  var SIZES = [25, 50, 75, 100];
  var resizeBlock = window.utils.uploadBlock.querySelector('.resize');
  var resizeButtonMinus = resizeBlock.querySelector('.resize__control--minus');
  var resizeButtonPlus = resizeBlock.querySelector('.resize__control--plus');
  var resizeInput = resizeBlock.querySelector('.resize__control--value');

  // Объявим функцию задания размера по умолчанию
  var setSizeToDefault = function () {
    resizeInput.value = SIZES[3] + '%';
  };

  // Объявим функцию уменьшения размера
  var sizeDown = function () {
    var size = parseInt(resizeInput.value, 10);
    switch (size) {
      case SIZES[0]:
        break;
      default:
        resizeInput.value = SIZES[SIZES.indexOf(size) - 1] + '%';
        break;
    }
  };

  // Объявим функцию увеличения размера
  var sizeUp = function () {
    var size = parseInt(resizeInput.value, 10);
    switch (size) {
      case SIZES[3]:
        break;
      default:
        resizeInput.value = SIZES[SIZES.indexOf(size) + 1] + '%';
        break;
    }
  };

  // Объявим функцию применения размера к изображению
  var applySize = function () {
    var size = parseInt(resizeInput.value, 10) / 100;
    window.utils.image.style.transform = 'scale(' + size + ')';
  };

  // Зададим значение размера по умочанию
  setSizeToDefault();

  // Обработаем событие 'click' на кнопке уменьшения размера
  resizeButtonMinus.addEventListener('click', function () {
    sizeDown();
    applySize();
  });

  // Обработаем событие 'click' на кнопке увеличения размера
  resizeButtonPlus.addEventListener('click', function () {
    sizeUp();
    applySize();
  });
})();
