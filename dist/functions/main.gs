function doGet(e) {
  const part = e.parameter.part;

  switch (part) {
    case "lecturer":
      return HtmlService.createTemplateFromFile(
        "frontend/templates/lecturer"
      ).evaluate();
    default:
      return HtmlService.createTemplateFromFile(
        "frontend/templates/main"
      ).evaluate();
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
