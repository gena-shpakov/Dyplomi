function doGet() {
  return HtmlService.createTemplateFromFile("main.html").evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function loadPage(pageName) {
  var allowed = [
    "lecturer",
    "student",
    "lecturer_login",
    "student_login"
  ];

  if (allowed.indexOf(pageName) !== -1) {
    return HtmlService.createHtmlOutputFromFile(pageName).getContent();
  }

  return '<p>Сторінку "' + pageName + '" не знайдено.</p>';
}

function getScheduleForDay(day) {
  var sheet = SpreadsheetApp.openById(
    "1Pqx0UDzGQMjl6G0iZtcp5ftiv2YeuOQ8xqn6nYM3_A4"
  ).getSheetByName("Лист1");
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  var filtered = data.filter(function (row, i) {
    return i > 0 && row[0] === day;
  });

  return filtered;
}

// 🆕 Автоматичне оновлення розкладу з аркуша "Вхідні"
function processImportedData() {
  const ss = SpreadsheetApp.openById("1Pqx0UDzGQMjl6G0iZtcp5ftiv2YeuOQ8xqn6nYM3_A4");
  const rawSheet = ss.getSheetByName("Вхідні");
  const outputSheet = ss.getSheetByName("Лист1");

  if (!rawSheet || !outputSheet) return;

  const rawData = rawSheet.getDataRange().getValues();
  if (rawData.length < 2) return;

  const result = [];

  rawData.slice(1).forEach(function(row) {
    if (row.length < 6 || !row[0] || !row[1]) return;


    const day = row[0];
    const pair = row[1];
    const subject = row[2];
    const teacher = row[3];
    const room = row[4];
    const time = row[5];

    result.push([day, pair, subject, teacher, room, time]);
  });

  // Очистити та оновити Лист1
  outputSheet.clear();
  outputSheet.appendRow(["День", "Пара", "Предмет", "Викладач", "Аудиторія", "Час"]);
  if (result.length > 0) {
    outputSheet.getRange(2, 1, result.length, 6).setValues(result);
  }
}

// 🆕 Автоматичний тригер — якщо адміністратор вставляє/редагує дані вручну
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  if (sheet.getName() === "Вхідні") {
    processImportedData();
  }
}
