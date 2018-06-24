'use strict';
// ---
// Переключение фильтров и применение эффекта
// ---

(function () {
  // Текстовая приставка к классам фильтров
  var CSS_CLASS_TEMPLATE = 'effects__preview--';

  // Список ul эффектов
  var effectsList = window.utils.uploadBlock.querySelector('.effects__list');

  // Коллекция радиоинпутов с эффектами
  var inputCollection = effectsList.querySelectorAll('input');

  // Функция применения эффекта
  var applyEffect = function (block, cssClass) {
    window.utils.removeAllClasses(block);
    window.utils.addClass(block, cssClass);
    window.applyEffectLevel(window.utils.image, window.utils.scaleInput.value);
  };

  // Проходимся в цикле по всем инпутам из коллекции
  for (var i = 0; i < inputCollection.length; i++) {
    // Класс эффекта для изображения
    var cssClass = CSS_CLASS_TEMPLATE + inputCollection[i].value;

    // Проверяем какой радиобаттон в разметке имеет атрибут 'checked'
    if (inputCollection[i].checked) {
      applyEffect(window.utils.image, cssClass);
    }
    // Обработчик события 'change' на радиобаттоне
    inputCollection[i].addEventListener('change', function (evt) {
      if (evt.target.value === 'none') {
        // Скрываем блок шкалы на изображении-оргинале
        window.utils.addClass(window.utils.scaleBlock, 'hidden');
      } else {
        // Показываем блок шкалы во всех остальных случаях
        window.utils.removeClass(window.utils.scaleBlock, 'hidden');
      }
      // Приставку к классу изображения берем из 'evt'
      cssClass = CSS_CLASS_TEMPLATE + evt.target.value;
      applyEffect(window.utils.image, cssClass);
    });
  }
})();
