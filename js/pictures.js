'use strict';

// Функция генерации данных
var generateData = function () {

  // -------
  // 1. Константы
  // -------

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

  // -------
  // 2. Переменные
  // -------

  // Массив данных о фотографиях
  var photosData = [];

  // -------
  // 3. Функции
  // -------

  // Функция получения рандомных чисел из диапазона
  var getRandomNumber = function (min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
  };

  // Функция получения случайного значения из массива
  var getRandomArrayValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

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

  console.log(photosData);
};

generateData();
