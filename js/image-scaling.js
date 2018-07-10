'use strict';

(function () {

  var STEP = 25;
  var resizeBlock = window.utils.uploadBlock.querySelector('.resize');
  var resizeButtonMinus = resizeBlock.querySelector('.resize__control--minus');
  var resizeButtonPlus = resizeBlock.querySelector('.resize__control--plus');

  // Объявим функцию задания масштаба по умолчанию
  var setToDefault = function () {
    window.utils.resizeInput.value = '100%';
    applySize(getCurrentSize());
  };

  // Объявим функцию получения текущего масштаба из 'resizeInput' в числовом формате
  var getCurrentSize = function () {
    return parseInt(window.utils.resizeInput.value, 10);
  };

  // Объявим функцию присвоения масштаба в 'resizeInput' с шагом 'STEP'
  var applySize = function (size) {
    if (size < 25) {
      size = 25;
    }
    if (size > 100) {
      size = 100;
    }
    window.utils.resizeInput.value = size + '%';
    window.utils.image.style.transform = 'scale(' + size / 100 + ')';
  };

  // Объявим функцию уменьшения масштаба
  var onButtonMinusClick = function () {
    applySize(getCurrentSize() - STEP);
  };

  // Объявим функцию увеличения масштаба
  var onButtonPlusClick = function () {
    applySize(getCurrentSize() + STEP);
  };

  // Зададим значение размера по умочанию
  setToDefault();

  // Обработаем событие 'click' на кнопке уменьшения масштаба
  resizeButtonMinus.addEventListener('click', onButtonMinusClick);

  // Обработаем событие 'click' на кнопке увеличения масштаба
  resizeButtonPlus.addEventListener('click', onButtonPlusClick);

  // Обработаем событие 'change' на инпуте масштаба
  window.utils.resizeInput.addEventListener('change', function () {
    if (isNaN(getCurrentSize())) {
      setToDefault();
    } else {
      applySize(getCurrentSize());
    }
  });

  window.imageScaling = {
    setToDefault: setToDefault
  };
})();
