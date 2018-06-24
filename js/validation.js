'use strict';
// ---
// Валидация формы отправки изображения
// ---

(function () {
  var HASHTAG_MAX_LENGTH = 20; // Максимальное количество символов в хэштеге
  var HASHTAG_MIN_LENGTH = 2; // Минимальное количество символов в хэштеге
  var HASHTAG_MAX_QUANTITY = 5; // Максимальное количество хэштегов через пробел
  var HASHTAG_DELIMITER = ' '; // Разделитель между хэштегами

  // Объект сообщений об ошибках валидации поля хэштегов:
  // flag = 'false' - ошибки валидации нет,
  // flag = 'true' - есть ошибка валидации,
  // message = 'Текст ошибки валидации'.
  var errorList = {
    hashtag: {
      flag: false,
      message:
        'Хэштег должен начинаться с символа #, хэштеги разделяются пробелом'
    },
    wrongLength: {
      flag: false,
      message:
        'Длина хэштега должна быть не меньше ' +
        HASHTAG_MIN_LENGTH +
        '-х символов и не должна превышать ' +
        HASHTAG_MAX_LENGTH +
        '-ти символов'
    },
    quantity: {
      flag: false,
      message:
        'Количество хэштегов должно быть не более ' + HASHTAG_MAX_QUANTITY
    },
    notUnique: {
      flag: false,
      message: 'Хэштеги должны быть уникальны'
    }
  };

  // Массив названий ошибок
  var errorNames = Object.keys(errorList);

  // Блок формы
  var form = window.utils.uploadBlock.querySelector('.img-upload__form');

  // Блок хэштегов
  var hashtagsField = form.querySelector('.text__hashtags');

  // Блок комментария
  var commentField = form.querySelector('.text__description');

  // Кнопка отправки формы
  var submitButton = form.querySelector('.img-upload__submit');

  // Функция очистки поля ввода
  var clearContent = function (input) {
    input.value = '';
  };

  // Функция проверки длины поля
  var checkMaxLength = function (input) {
    var validity = input.validity;
    if (validity.tooLong) {
      input.setCustomValidity(
          'Текст не должен превышать ' + input.maxLength + ' символов'
      );
      window.utils.addClass(input, 'text__field--error');
    } else {
      input.setCustomValidity('');
      window.utils.removeClass(input, 'text__field--error');
    }
  };

  // Функция незакрывания окна формы при нажатии на ESC когда инпут в фокусе
  var dontCloseForm = function (input) {
    // Обрабатываем событие 'focus'
    input.addEventListener('focus', function () {
      // Предотвращение закрытия формы по нажатию на ESC
      document.removeEventListener('keydown', window.utils.onPopupEscPress);
    });

    // Обрабатываем событие 'blur'
    input.addEventListener('blur', function () {
      // Возобновление закрытия формы по нажатию на ESC
      document.addEventListener('keydown', window.utils.onPopupEscPress);
    });
  };

  // Функция очистки текста поля по нажатию на ESC
  var clearFieldOnEsc = function (field) {
    field.addEventListener('keydown', function (evt) {
      if (window.utils.isEscPress(evt)) {
        clearContent(field);
      }
    });
  };

  // Функция перезаписи введенного значения без избыточных пробелов
  var deleteSpaces = function (element) {
    element.value = element.value.replace(/\s+/g, ' ').trim();
  };

  // Функция смены элементов массива в нижний регистр для удобства сравнения элементов
  var convertToLowerCase = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = array[i].toLowerCase();
    }
  };

  // Функция возвращает 'true', если хотя бы один элемент массива не начинается с символа #
  var setHashtagFlag = function (array) {
    errorList.hashtag.flag = false;
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] !== '#') {
        errorList.hashtag.flag = true;
        break;
      }
    }
    return errorList.hashtag.flag;
  };

  // Функция возвращает 'true', если хотя бы один элемент массива имеет длину менее 2-х или более 20-ти символов
  var setWrongLengthFlag = function (array) {
    errorList.wrongLength.flag = false;
    for (var i = 0; i < array.length; i++) {
      if (
        array[i].length > HASHTAG_MAX_LENGTH ||
        array[i].length < HASHTAG_MIN_LENGTH
      ) {
        errorList.wrongLength.flag = true;
        break;
      }
    }
  };

  // Функция возвращает 'true', если массив состоит более чем из 5 элементов
  var setQuantityFlag = function (array) {
    errorList.quantity.flag = false;
    if (array.length > HASHTAG_MAX_QUANTITY) {
      errorList.quantity.flag = true;
    }
    return errorList.quantity.flag;
  };

  // Функция возвращает 'true', если массив имеет хотя бы один повторяющийся элемент (регистр не важен)
  var setNotUniqueFlag = function (array) {
    // Переводим все элементы массива в нижний регистр для удобства сравнения
    convertToLowerCase(array);
    errorList.notUnique.flag = false;
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          errorList.notUnique.flag = true;
          break;
        }
      }
      if (errorList.notUnique.flag === true) {
        break;
      }
    }
  };

  // Функция проставляет флаги в объекте 'errorList'
  var setErrorFlags = function () {
    var string = hashtagsField.value;
    // Если строка поля имеет хотя бы один символ, то запускаем процесс валидации
    if (string !== '') {
      var array = string.split(HASHTAG_DELIMITER);
      setQuantityFlag(array);
      setHashtagFlag(array);
      setWrongLengthFlag(array);
      setNotUniqueFlag(array);
      // Если контент поля отсутсвует, то сбрасываем флаги ошибок (т.к. поле не имеет атрибут 'required')
    } else {
      for (var i = 0; i < errorNames.length; i++) {
        errorList[errorNames[i]].flag = false;
      }
    }
  };

  // Функция генерирует сообщение ошибок валидации исходя из соответствующих флагов
  var generateErrorMessage = function () {
    var errors = [];
    var errorMessage = '';
    for (var i = 0; i < errorNames.length; i++) {
      if (errorList[errorNames[i]].flag) {
        errors.push(errorList[errorNames[i]].message);
      }
    }
    // Если массив ошибок 'errors' наполнился хотя бы одним сообщением
    if (errors.length > 0) {
      // Превращаем массив в строку
      errorMessage = errors.join('. \n');
      // Красим валидируемое поле в красный
      window.utils.addClass(hashtagsField, 'text__field--error');
      // Если массив ошибок 'errors' остался пустым
    } else {
      // Обнуляем на всякий случай сообщение об ошибках
      errorMessage = '';
      // Сброс цвета обводки валидируемого поля
      window.utils.removeClass(hashtagsField, 'text__field--error');
    }
    return errorMessage;
  };

  hashtagsField.addEventListener('blur', function () {
    deleteSpaces(hashtagsField);
    setErrorFlags();
    hashtagsField.setCustomValidity(generateErrorMessage());
  });

  submitButton.addEventListener('submit', function () {
    checkMaxLength(commentField);
  });

  dontCloseForm(commentField);
  dontCloseForm(hashtagsField);

  clearFieldOnEsc(commentField);
  clearFieldOnEsc(hashtagsField);
})();
