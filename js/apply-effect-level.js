'use strict';

(function () {
  var updateInputValue = function () {
    // Считаем уровень применяемого эффекта (получаемое значение от 0 до 100)
    var effectLevel =
      100 *
      (window.utils.scalePin.offsetLeft / window.utils.scaleLine.offsetWidth);

    // Записываем полученное значение в свойство 'value' инпута '.scale__value'
    window.utils.scaleInput.value = effectLevel;
  };

  // Функция применения уровня эффекта
  window.applyEffectLevel = function (block, filterLevel) {
    updateInputValue();
    switch (block.classList.value) {
      case 'effects__preview--chrome': // Логика подсчета уровня эффекта 'Хром' (диапазон от 0 до 1)
        block.style.filter = 'grayscale(' + filterLevel / 100 + ')';
        break;
      case 'effects__preview--sepia': // Логика подсчета уровня эффекта 'Хром' (диапазон от 0 до 1)
        block.style.filter = 'sepia(' + filterLevel / 100 + ')';
        break;
      case 'effects__preview--marvin': // Логика подсчета уровня эффекта 'Марвин' (диапазон от 0% до 100%)
        block.style.filter = 'invert(' + filterLevel + '%)';
        break;
      case 'effects__preview--phobos': // Логика подсчета уровня эффекта 'Фобос' (диапазон от 0px до 10px)
        block.style.filter = 'blur(' + filterLevel / 10 + 'px)';
        break;
      case 'effects__preview--heat': // Логика подсчета уровня эффекта 'Жара' (диапазон от 0 до 10)
        block.style.filter = 'brightness(' + filterLevel / 10 + ')';
        break;
      default:
        break;
    }
  };
})();
