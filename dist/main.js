function doGet() {
  return HtmlService.createTemplateFromFile("index.html").evaluate();
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
