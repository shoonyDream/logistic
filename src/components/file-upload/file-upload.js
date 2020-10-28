"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var forms = document.querySelectorAll('form');
  var inputFile = document.querySelectorAll('.upload-file__input');
  /////////// Кнопка «Прикрепить файл» ///////////

  inputFile.forEach(function (el) {
    var textSelector = document.querySelector('.upload-file__text');
    var fileList;
    // Событие выбора файла(ов)

    el.addEventListener('change', function (e) {
      // создаём массив файлов
      fileList = [];

      for (var i = 0; i < el.files.length; i++) {
        fileList.push(el.files[i]);
      }
      // вызов функции для каждого файла


      fileList.forEach(function (file) {
        uploadFile(file);
      });
    }); // Проверяем размер файлов и выводим название

    var uploadFile = function uploadFile(file) {
      // файла <5 Мб
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл должен быть не более 5 МБ.');
        return;
      } // Показ загружаемых файлов


      if (file && file.length > 1) {
        if (file.length <= 4) {
          textSelector.textContent = "\u0412\u044B\u0431\u0440\u0430\u043D\u043E ".concat(file.length, " \u0444\u0430\u0439\u043B\u0430");
        }

        if (file.length > 4) {
          textSelector.textContent = "\u0412\u044B\u0431\u0440\u0430\u043D\u043E ".concat(file.length, " \u0444\u0430\u0439\u043B\u043E\u0432");
        }
      } else {
        textSelector.textContent = file.name;
      }
    };
  });
});
