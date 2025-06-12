export default function () {
  const surname = localStorage.getItem("surname") || "гість";
  document.getElementById("lecturerName").textContent = `Вітаємо, ${surname}!`;
  document
    .querySelector('[data-page="main"]')
    .addEventListener("click", () => render("main"));
}
