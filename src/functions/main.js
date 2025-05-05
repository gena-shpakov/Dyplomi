function doGet() {
  return HtmlService.createTemplateFromFile("frontend/pages/main").evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function loadPage(pageName) {
  var allowed = [
    "lecturer",
    "student",
    "exams",
    "practice",
    "substitutions",
    "attendance",
  ];

  if (allowed.indexOf(pageName) !== -1) {
    return HtmlService.createHtmlOutputFromFile(
      "frontend/pages/" + pageName
    ).getContent();
  }

  return '<p>Сторінку "' + pageName + '" не знайдено.</p>';
}
