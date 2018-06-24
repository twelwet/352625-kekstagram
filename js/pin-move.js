'use strict';
// ---
// Логика перетаскивания ползунка и уровня шкалы насыщенности изображения
// ---

(function () {
  // Уровень шкалы насыщенности изображения
  var scaleLevel = window.utils.scaleBlock.querySelector('.scale__level');

  // Функция задает положение ползунка
  var setPosition = function (number) {
    window.utils.scalePin.style.left = number + 'px';
  };

  // Функция возвращает положение ползунка
  var getPosition = function () {
    return window.utils.scalePin.style.left;
  };

  window.utils.scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Запоминаем стартовую горизонтальную координату
    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // Запоминаем смещение по горизонтали
      var shiftX = startCoordX - moveEvt.clientX;

      // Переписываем стартовую горизонтальную координату
      startCoordX = moveEvt.clientX;

      // Положение ползунка - это разница между смещением от родительского элемента и смещением мыши
      setPosition(window.utils.scalePin.offsetLeft - shiftX);

      // Ограничиваем область перемещения ползунка слева
      if (window.utils.scalePin.offsetLeft < 0) {
        setPosition(0);
      }

      // Ограничиваем область перемещения ползунка справа
      if (
        window.utils.scalePin.offsetLeft > window.utils.scaleLine.offsetWidth
      ) {
        setPosition(window.utils.scaleLine.offsetWidth);
      }

      // Приравниваем ширину уровня насыщенности и отступ ползунка
      scaleLevel.style.width = getPosition();

      // Применяем уровень фильтра при перемещении мыши
      window.applyEffectLevel(
          window.utils.image,
          window.utils.scaleInput.value
      );
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // Применяем уровень фильтра при отпускании мыши
      window.applyEffectLevel(
          window.utils.image,
          window.utils.scaleInput.value
      );

      // Удаляем обработчики событий на перемещние и отпускание кнопки мыши
      window.utils.scaleBlock.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // Добавляем обработчики событий на перемещение и отпускание кнопки мыши
    window.utils.scaleBlock.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
