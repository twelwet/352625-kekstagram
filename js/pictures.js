'use strict';

// Функция получения рандомных чисел из диапазона
var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * (max - min + 1) + min));
};

// Функция получения случайного значения из массива
var getRandomArrayValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Функция генерации данных
var generateData = function () {

  // Максимальное значение номера фотографии
  var MAX_PHOTO_NUMBER = 25;

  // Минимальное количество лайков
  var MIN_LIKES_QUANTITY = 15;

  // Максимальное количество лайков
  var MAX_LIKES_QUANTITY = 200;

  // Фразы для комментариев
  var PHRASES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // Варианты описания к фотографии
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  // Количество фраз в генерируемом комментарии
  var PHRASE_NUMBERS = [1, 2];

  // Массив данных о фотографиях
  var photosData = [];

  // Функция получения пути к фотографии
  var getUrl = function (numeral) {
    return 'photos/' + numeral + '.jpg';
  };

  // Функция получения рандомного числа лайков из диапазона
  var getLikesQuantity = function () {
    return getRandomNumber(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY);
  };

  // Функция генерации комментариев из массива phrases
  var getComments = function () {
    // Рандомное количество фраз в комментарии
    var phrasesNumber = getRandomArrayValue(PHRASE_NUMBERS);

    // Массив фраз, возвращаемый данной функцией
    var comment = [];

    // Цикл заполнения массива фраз, когда фраз две, логику неповторяемости фраз реализовывать не стал
    for (var i = 0; i < phrasesNumber; i++) {
      comment[i] = getRandomArrayValue(PHRASES);
    }
    return comment;
  };

  // Функция генерации описаний к фотографии
  var getDescription = function () {
    return getRandomArrayValue(DESCRIPTIONS);
  };

  // Цикл заполнения массива photosData данными
  for (var i = 0; i < MAX_PHOTO_NUMBER; i++) {
    photosData[i] = {
      url: getUrl(i + 1),
      likes: getLikesQuantity(),
      comments: getComments(),
      description: getDescription()
    };
  }

  return photosData;
};

// Переменная с массивом данных из функции generateData()
var data = generateData();

// Блок шаблона
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

// Фрагмент
var fragment = document.createDocumentFragment();

// Пустой контейнер фотографий
var photosList = document.querySelector('.pictures');

// Функция создания DOM-элемента на основе шаблона
var createPhoto = function (array) {
  // Клон тега <a> из шаблона
  var photo = photoTemplate.cloneNode(true);

  // Наполнение тега <a> контентом
  // 1. Содержимое счетчика лайков
  photo.querySelector('.picture__stat--likes').textContent = array.likes;

  // 2. Содержимое счетчика комментариев
  photo.querySelector('.picture__stat--comments').textContent = array.comments.length;

  // 3. Путь к фотографии
  photo.querySelector('.picture__img').src = array.url;

  return photo;
};

// Заполнение фрагмента
for (var i = 0; i < data.length; i++) {
  fragment.appendChild(createPhoto(data[i]));
}

// Вставка фрагмента на страницу
photosList.appendChild(fragment);

// ---
// Работа с модалкой .big-picture
// ---

// Добавление блоку 'block' класса 'cssClass'
var addClass = function (block, cssClass) {
  block.classList.add(cssClass);
};

// Удаление у блока 'block' класса 'cssClass'
var removeClass = function (block, cssClass) {
  block.classList.remove(cssClass);
};

// Удаление всех классов блока
var removeAllClasses = function (block) {
  block.className = '';
};

// Модалка большой фотографии
var bigPhoto = document.querySelector('.big-picture');

// Кнопка закрытия попапа большой фотографии
var crossButtonBigPhoto = bigPhoto.querySelector('.cancel');

// Коллекция ссылок на изображения
var picturesCollection = document.querySelectorAll('.picture__link');

// Проходимся в цикле по всем ссылкам на изображения из коллекции
for (i = 0; i < picturesCollection.length; i++) {
  picturesCollection[i].addEventListener('click', function (evt) {
    // Находим атрибут src у изображеения
    var src = evt.target.attributes.src.value;

    // Порядковый номер изображения
    var photoNumber = (Number(src.substr(7, 2)) - 1);
    // Наполняем модалку большого изображения контентом
    pasteContentToBigPhoto(photoNumber);

    // Показываем модалку большого изображения
    removeClass(bigPhoto, 'hidden');
    crossButtonBigPhoto.addEventListener('click', function () {
      addClass(bigPhoto, 'hidden');
    });
  });
}

// Наполнение тега модалки контентом
var pasteContentToBigPhoto = function (index) {
  // 1. Путь к фотографии
  bigPhoto.querySelector('.big-picture__img img').src = data[index].url;

  // 2. Содержимое счетчика лайков
  bigPhoto.querySelector('.likes-count').textContent = data[index].likes;

  // 3. Содержимое счетчика комментариев
  bigPhoto.querySelector('.comments-count').textContent = data[index].comments.length;

  // 4. Содержимое блока комментариев
  // Список ul комментариев
  var commentsList = bigPhoto.querySelector('.social__comments');

  // Коллекция li комментариев
  var commentsCollection = commentsList.querySelectorAll('.social__comment');

  // Последняя li в псевдомассиве 'commentsCollection'
  var lastLi = commentsList.querySelectorAll('.social__comment:last-child')[0];

  // Удаление лишней li если комментарий всего один
  if (data[index].comments.length < commentsCollection.length) {
    addClass(lastLi, 'visually-hidden');
  }

  // Заполнение атрибутов и свойств контентом
  for (i = 0; i < data[index].comments.length; i++) {
    commentsCollection[i].querySelector('img').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    commentsCollection[i].querySelector('.social__text').textContent = data[index].comments[i];
  }

  // Заполнение описания фотографии
  bigPhoto.querySelector('.social__caption').textContent = data[index].description;
};

// Cчетчик комментариев
var commentCount = bigPhoto.querySelector('.social__comment-count');

// Скрытие счетчика комментариев
addClass(commentCount, 'visually-hidden');

// Кнопка 'Загрузить еще'
var buttonLoadMore = bigPhoto.querySelector('.social__loadmore');

// Cкрытие кнопки 'Загрузить еще'
addClass(buttonLoadMore, 'visually-hidden');

// ---
// Логика открытия/закрытия модального окна загрузки изображения
// ---

// Константы клавиатурных клавиш
var ESC_KEYCODE = 27;

// Родительский блок, в котором находятся все элементы загрузки изображения
var uploadBlock = document.querySelector('.img-upload');

// Форма редактирования изображения
var uploadOverlay = uploadBlock.querySelector('.img-upload__overlay');

// Блок input загрузки изображения
var uploadInput = uploadBlock.querySelector('#upload-file');

// Блок закрытия формы редактирования изображения
var crossButtonUpload = uploadOverlay.querySelector('.img-upload__cancel');

// Функция открытия всплывающего окна
var openPopup = function (popup) {
  removeClass(popup, 'hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия всплывающего окна
var closePopup = function (popup) {
  addClass(popup, 'hidden');
  // Сброс значения поля выбора файла
  uploadInput.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};

// Функция закрытия всплывающего окна по нажатию на ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(uploadOverlay);
  }
};

// Реакция на событие 'change' блока '#upload-file'
uploadInput.addEventListener('change', function () {
  openPopup(uploadOverlay);
});

// Реакция на событие 'click' на блок 'crossButtonUpload'
crossButtonUpload.addEventListener('click', function () {
  closePopup(uploadOverlay);
});

// ---
// Логика получения уровня эффекта 'effectLevel' при отпускании ползунка
// ---

// Функция получения CSS-свойства элемента
var getCssProperty = function (element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
};

// Функция удаления последних символов в строке
var deleteLastSymbols = function (string, quantity) {
  return string.substring(0, string.length - quantity);
};

// Ползунок регулировки насыщенности изображения
var scalePin = uploadBlock.querySelector('.scale__pin');

// Шкала регулировки ползунка
var scaleLine = uploadBlock.querySelector('.scale__line');

// Инпут, в свойстве 'value' которого хранится значение уровня эффекта (от 0 до 100)
var scale = uploadBlock.querySelector('.scale__value');

// Обрабатываем событие 'mouseup' ползунка '.scale__pin'
scalePin.addEventListener('mouseup', function () {
  // Находим положение ползунка, обратившись к css-свойству 'left'
  var pinPosition = getCssProperty(scalePin, 'left');

  // Удаляем 'px' в конце строки и приводим к числу
  pinPosition = Number(deleteLastSymbols(pinPosition, 2));

  // Находим длину шкалы ползунка, обратившись к css-свойству 'width'
  var scaleWidth = getCssProperty(scaleLine, 'width');

  // Удаляем 'px' в конце строки и приводим к числу
  scaleWidth = Number(deleteLastSymbols(scaleWidth, 2));

  // Считаем уровень применяемого эффекта в процентах
  var effectLevel = 100 * (pinPosition / scaleWidth);

  // Записываем полученное значение в свойство 'value' инпута '.scale__value'
  scale.value = effectLevel;
});

// ---
// Логика переключения фильтров
// ---

var CSS_CLASS_TEMPLATE = 'effects__preview--';

// Находим изображение
var image = uploadBlock.querySelector('.img-upload__preview img');

// Список ul эффектов
var effectsList = uploadBlock.querySelector('.effects__list');

// Коллекция радиоинпутов с эффектами
var inputCollection = effectsList.querySelectorAll('input');

// Функция применения эффекта
var applyEffect = function (block, cssClass) {
  removeAllClasses(block);
  addClass(block, cssClass);
};

// Проходимся в цикле по всем инпутам из коллекции
for (i = 0; i < inputCollection.length; i++) {
  // Класс эффекта для изображения
  var cssClass = CSS_CLASS_TEMPLATE + inputCollection[i].value;

  // Проверяем какой радиобаттон в разметке имеет атрибут 'checked'
  if (inputCollection[i].checked) {
    applyEffect(image, cssClass);
  }
  // Обработчик события 'change' на радиобаттоне
  inputCollection[i].addEventListener('change', function (evt) {
    // Приставку к классу изображения берем из 'evt'
    cssClass = CSS_CLASS_TEMPLATE + evt.target.value;
    applyEffect(image, cssClass);
  });
}

// ---
// Валидация формы отправки изображения
// ---

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
    message: 'Хэштег должен начинаться с символа #, хэштеги разделяются пробелом'
  },
  length: {
    flag: false,
    message: 'Длина хэштега должна быть не меньше ' + HASHTAG_MIN_LENGTH + '-х символов и не должна превышать ' + HASHTAG_MAX_LENGTH + '-ти символов'
  },
  quantity: {
    flag: false,
    message: 'Количество хэштегов должно быть не более ' + HASHTAG_MAX_QUANTITY
  },
  unique: {
    flag: false,
    message: 'Хэштеги должны быть уникальны'
  }
};

// Блок формы
var form = uploadBlock.querySelector('.img-upload__form');

// Блок хэштегов
var hashtagsField = form.querySelector('.text__hashtags');

// Блок комментария
var commentField = form.querySelector('.text__description');

// Кнопка отправки формы
var submitButton = form.querySelector('.img-upload__submit');

// Покраска обводки элемента
var paintBorder = function (element, color) {
  element.style.border = '1px solid ' + color;
};

// Функция очистки поля ввода
var clearContent = function (input) {
  input.value = '';
};

// Функция проверки длины поля
var checkMaxLength = function (input) {
  var validity = input.validity;
  if (validity.tooLong) {
    input.setCustomValidity('Текст не должен превышать ' + input.maxLength + ' символов');
    paintBorder(input, 'red');
  } else {
    input.setCustomValidity('');
    paintBorder(input, 'black');
  }
};

// Функция незакрывания окна формы при нажатии на ESC когда инпут в фокусе
var dontCloseForm = function (input) {
  // Обрабатываем событие 'focus'
  input.addEventListener('focus', function () {
    // Предотвращение закрытия формы по нажатию на ESC
    document.removeEventListener('keydown', onPopupEscPress);
  });

  // Обрабатываем событие 'blur'
  input.addEventListener('blur', function () {
    // Возобновление закрытия формы по нажатию на ESC
    document.addEventListener('keydown', onPopupEscPress);
  });
};

// Функция очистки текста поля по нажатию на ESC
var clearFieldOnEsc = function (field) {
  field.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      clearContent(field);
    }
  });
};

// Функция удаляет лишние пробелы (которых больше чем один) в строке
var deleteSpaces = function (string) {
  string = string.replace(/\s+/g, ' ').trim();
  return string;
};

// Функция перезаписи введенного значения без пробелов
var rewriteContent = function (element) {
  element.value = deleteSpaces(element.value);
};

// Функция смены элементов массива в нижний регистр для удобства сравнения элементов
var convertToLowerCase = function (array) {
  for (i = 0; i < array.length; i++) {
    array[i] = array[i].toLowerCase();
  }
};

// Функция возвращает 'true', если хотя бы один элемент массива не начинается с символа #
var setHashtagFlag = function (array) {
  errorList.hashtag.flag = false;
  for (i = 0; i < array.length; i++) {
    if (array[i][0] !== '#') {
      errorList.hashtag.flag = true;
      break;
    }
  }
  return errorList.hashtag.flag;
};

// Функция возвращает 'true', если хотя бы один элемент массива имеет длину менее 2-х или более 20-ти символов
var setLengthFlag = function (array) {
  errorList.length.flag = false;
  for (i = 0; i < array.length; i++) {
    if (array[i].length > HASHTAG_MAX_LENGTH || array[i].length < HASHTAG_MIN_LENGTH) {
      errorList.length.flag = true;
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
var setUniqueFlag = function (array) {
  // Переводим все элементы массива в нижний регистр для удобства сравнения
  convertToLowerCase(array);
  errorList.unique.flag = false;
  for (i = 0; i < array.length; i++) {
    for (var j = (i + 1); j < array.length; j++) {
      if (array[i] === array[j]) {
        errorList.unique.flag = true;
        break;
      }
    }
    if (errorList.unique.flag === true) {
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
    setLengthFlag(array);
    setUniqueFlag(array);
    // Если контент поля отсутсвует, то сбрасываем флаги ошибок (т.к. поле не имеет атрибут 'required')
  } else {
    errorList.hashtag.flag = false;
    errorList.length.flag = false;
    errorList.quantity.flag = false;
    errorList.unique.flag = false;
  }
};

// Функция генерирует сообщение ошибок валидации исходя из соответствующих флагов
var generateErrorMessage = function () {
  var errors = [];
  var errorMessage = '';
  if (errorList.hashtag.flag) {
    errors.push(errorList.hashtag.message);
  }
  if (errorList.quantity.flag) {
    errors.push(errorList.quantity.message);
  }
  if (errorList.length.flag) {
    errors.push(errorList.length.message);
  }
  if (errorList.unique.flag) {
    errors.push(errorList.unique.message);
  }
  // Если массив ошибок 'errors' наполнился хотя бы одним сообщением
  if (errors.length > 0) {
    // Превращаем массив в строку
    errorMessage = errors.join('. \n');
    // Красим валидируемое поле в красный
    paintBorder(hashtagsField, 'red');
    // Если массив ошибок 'errors' остался пустым
  } else {
    // Обнуляем на всякий случай сообщение об ошибках
    errorMessage = '';
    // Сброс цвета обводки валидируемого поля
    paintBorder(hashtagsField, 'black');
  }
  return errorMessage;
};

hashtagsField.addEventListener('blur', function () {
  rewriteContent(hashtagsField);
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
