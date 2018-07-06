'use strict';

(function () {
  var updateInputValue = function () {
    // Считаем уровень применяемого эффекта (получаемое значение от 0 до 100)
    var effectLevel =
      Math.round(100 *
      (window.utils.scalePin.offsetLeft / window.utils.scaleLine.offsetWidth));

    // Записываем полученное значение в свойство 'value' инпута '.scale__value'
    window.utils.scaleInput.value = effectLevel;
  };

  var setFilter = {
    chrome: function (block, filterLevel) {
      block.style.filter = 'grayscale(' + filterLevel / 100 + ')';
    },
    sepia: function (block, filterLevel) {
      block.style.filter = 'sepia(' + filterLevel / 100 + ')';
    },
    marvin: function (block, filterLevel) {
      block.style.filter = 'invert(' + filterLevel + '%)';
    },
    phobos: function (block, filterLevel) {
      block.style.filter = 'blur(' + filterLevel / 10 + 'px)';
    },
    heat: function (block, filterLevel) {
      block.style.filter = 'brightness(' + filterLevel / 10 + ')';
    },
    none: function (block) {
      block.style.filter = 'none';
    }
  };

  // Объект соответсвия классов и функций применения фильтров
  var classToSetFilter = {
    'effects__preview--chrome': setFilter.chrome,
    'effects__preview--sepia': setFilter.sepia,
    'effects__preview--marvin': setFilter.marvin,
    'effects__preview--phobos': setFilter.phobos,
    'effects__preview--heat': setFilter.heat,
    'effects__preview--none': setFilter.none
  };

  // Функция применения уровня эффекта
  window.applyEffectLevel = function (block, filterLevel) {
    // Если выбран оригинал изображения, то обновлять положение пина не нужно (потому что блок шкалы скрыт)
    if (block.classList.value !== 'effects__preview--none') {
      updateInputValue();
    }
    (classToSetFilter[block.classList.value])(block, filterLevel);
  };
})();
