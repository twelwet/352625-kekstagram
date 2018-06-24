'use strict';
// ---
// Логика генерации объекта mock-данных
// ---

(function () {
  // Массив данных о фотографиях
  var photosData = [];

  // Функция получения пути к фотографии
  var getUrl = function (numeral) {
    return 'photos/' + numeral + '.jpg';
  };

  // Функция получения рандомного числа лайков из диапазона
  var getLikesQuantity = function () {
    return window.utils.getRandomNumber(
        window.mock.MIN_LIKES_QUANTITY,
        window.mock.MAX_LIKES_QUANTITY
    );
  };

  // Функция генерации комментариев из массива phrases
  var getComments = function () {
    // Рандомное количество фраз в комментарии
    var phrasesNumber = window.utils.getRandomArrayValue(
        window.mock.PHRASE_NUMBERS
    );

    // Массив фраз, возвращаемый данной функцией
    var comment = [];

    // Цикл заполнения массива фраз, когда фраз две, логику неповторяемости фраз реализовывать не стал
    for (var i = 0; i < phrasesNumber; i++) {
      comment[i] = window.utils.getRandomArrayValue(window.mock.PHRASES);
    }
    return comment;
  };

  // Функция генерации описаний к фотографии
  var getDescription = function () {
    return window.utils.getRandomArrayValue(window.mock.DESCRIPTIONS);
  };

  // Цикл заполнения массива photosData данными
  for (var i = 0; i < window.mock.MAX_PHOTO_NUMBER; i++) {
    photosData[i] = {
      url: getUrl(i + 1),
      likes: getLikesQuantity(),
      comments: getComments(),
      description: getDescription()
    };
  }

  window.data = photosData;
})();
