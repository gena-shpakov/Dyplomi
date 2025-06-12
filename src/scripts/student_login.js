export default function () {
  document
    .querySelector('[data-page="main"]')
    .addEventListener("click", () => render("main"));
}
