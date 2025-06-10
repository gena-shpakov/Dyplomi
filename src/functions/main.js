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

// 🆕 Гнучкий парсер, що підтримує будь-який порядок колонок
function processImportedData() {
  const ss = SpreadsheetApp.openById("1Pqx0UDzGQMjl6G0iZtcp5ftiv2YeuOQ8xqn6nYM3_A4");
  const rawSheet = ss.getSheetByName("Вхідні");
  const outputSheet = ss.getSheetByName("Лист1");

  if (!rawSheet || !outputSheet) return;

  const rawData = rawSheet.getDataRange().getValues();
  if (rawData.length < 2) return;

  const header = rawData[0].map(h => h.toString().toLowerCase().trim());
  const result = [];

  const dayIndex = header.findIndex(h => h.includes("день"));
  const pairIndex = header.findIndex(h => h.includes("пара") || h.includes("№"));
  const subjectIndex = header.findIndex(h => h.includes("предмет"));
  const teacherIndex = header.findIndex(h => h.includes("викладач"));
  const roomIndex = header.findIndex(h => h.includes("ауд") || h.includes("кабінет"));
  const timeIndex = header.findIndex(h => h.includes("час"));

  if ([dayIndex, pairIndex, subjectIndex, teacherIndex, roomIndex, timeIndex].some(i => i === -1)) {
    Logger.log("❌ Не знайдено всі необхідні колонки в аркуші 'Вхідні'");
    return;
  }

  rawData.slice(1).forEach(row => {
    const day = row[dayIndex];
    const pair = row[pairIndex];
    const subject = row[subjectIndex];
    const teacher = row[teacherIndex];
    const room = row[roomIndex];
    const time = row[timeIndex];

    if (day && pair && subject) {
      result.push([day, pair, subject, teacher || "", room || "", time || ""]);
    }
  });

  outputSheet.clear();
  outputSheet.appendRow(["День", "Пара", "Предмет", "Викладач", "Аудиторія", "Час"]);

  if (result.length > 0) {
    outputSheet.getRange(2, 1, result.length, 6).setValues(result);
  }
}

// 🆕 Автоматичний тригер — якщо адміністратор вставляє або редагує "Вхідні"
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  if (sheet.getName() === "Вхідні") {
    processImportedData();
  }
}
