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
    return HtmlService.createHtmlOutputFromFile(
      pageName
    ).getContent();
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
