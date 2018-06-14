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

// Скрытие блока 'block' с помощью добавления скрывающего класс 'hiddenClass'
var hideBlock = function (block, hiddenClass) {
  block.classList.add(hiddenClass);
};

// Показ скрытого блока 'block' с помощью удаления скрывающего класс 'hiddenClass'
var showBlock = function (block, hiddenClass) {
  block.classList.remove(hiddenClass);
};

// Модалка большой фотографии
var bigPhoto = document.querySelector('.big-picture');

// Показ модалки
showBlock(bigPhoto, 'hidden');

// Наполнение тега модалки контентом
// 1. Путь к фотографии
bigPhoto.querySelector('.big-picture__img img').src = data[0].url;

// 2. Содержимое счетчика лайков
bigPhoto.querySelector('.likes-count').textContent = data[0].likes;

// 3. Содержимое счетчика комментариев
bigPhoto.querySelector('.comments-count').textContent = data[0].comments.length;

// 4. Содержимое блока комментариев
// Список ul комментариев
var commentsList = bigPhoto.querySelector('.social__comments');

// Коллекция li комментариев
var commentsCollection = commentsList.querySelectorAll('.social__comment');

// Последняя li в псевдомассиве 'commentsCollection'
var lastLi = commentsList.querySelectorAll('.social__comment:last-child')[0];

// Удаление лишней li если комментарий всего один
if (data[0].comments.length < commentsCollection.length) {
  hideBlock(lastLi, 'visually-hidden');
}

// Заполнение атрибутов и свойств контентом
for (i = 0; i < data[0].comments.length; i++) {
  commentsCollection[i].querySelector('img').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  commentsCollection[i].querySelector('.social__text').textContent = data[0].comments[i];
}

// Заполнение описания фотографии
bigPhoto.querySelector('.social__caption').textContent = data[0].description;

// Cчетчик комментариев
var commentCount = bigPhoto.querySelector('.social__comment-count');

// Скрытие счетчика комментариев
hideBlock(commentCount, 'visually-hidden');

// Кнопка 'Загрузить еще'
var buttonLoadMore = bigPhoto.querySelector('.social__loadmore');

// Cкрытие кнопки 'Загрузить еще'
hideBlock(buttonLoadMore, 'visually-hidden');
