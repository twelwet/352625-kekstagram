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
  var returnLow = function (array) {
    return array.map(function (element) {
      return element.toLowerCase();
    });
  };

  // Функция возвращает 'true', если хотя бы один элемент массива не начинается с символа #
  var setHashtagFlag = function (array) {
    errorList.hashtag.flag = false;
    array.some(function (element) {
      if (element[0] !== '#') {
        errorList.hashtag.flag = true;
      }
    });
    return errorList.hashtag.flag;
  };

  // Функция возвращает 'true', если хотя бы один элемент массива имеет длину менее 2-х или более 20-ти символов
  var setWrongLengthFlag = function (array) {
    errorList.wrongLength.flag = false;
    array.some(function (element) {
      if (
        element.length > HASHTAG_MAX_LENGTH ||
        element.length < HASHTAG_MIN_LENGTH
      ) {
        errorList.wrongLength.flag = true;
      }
    });
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
    var lowArray = returnLow(array);
    errorList.notUnique.flag = false;
    for (var i = 0; i < lowArray.length; i++) {
      for (var j = i + 1; j < lowArray.length; j++) {
        if (lowArray[i] === lowArray[j]) {
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

  commentField.addEventListener('change', function () {
    checkMaxLength(commentField);
  });

  var setDefaultForm = function () {
    form.reset();
  };

  var onSuccess = function () {
    window.utils.errorBlock.textContent = '';
    window.utils.addClass(window.utils.errorBlock, 'hidden');
    setDefaultForm();
    window.utils.addClass(window.utils.uploadOverlay);
  };

  var onError = function (message) {
    window.utils.errorBlock.textContent = message;
    window.utils.removeClass(window.utils.errorBlock, 'hidden');
  };

  var validateForm = function () {
    var isValid = true;
    for (var i = 0; i < errorNames.length; i++) {
      if (errorList[errorNames[i]].flag) {
        isValid = false;
        break;
      }
    }
    if (commentField.validity.tooLong) {
      isValid = false;
    }
    return isValid;
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (validateForm()) {
      window.backend.save(new FormData(form), onSuccess, onError);
    }
  });

  dontCloseForm(commentField);
  dontCloseForm(hashtagsField);

  clearFieldOnEsc(commentField);
  clearFieldOnEsc(hashtagsField);
})();
