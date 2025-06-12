export default function () {
  const form = document.getElementById("teacherForm");
  if (!form) return;
  const validSurnames = ["Смагін", "Русін", "Трембовецька", "Сметанін"];
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const surname = document.getElementById("surnameInput").value.trim();
    const error = document.getElementById("errorMsg");
    if (!surname) {
      error.textContent = "Будь ласка, введіть прізвище.";
    } else if (!validSurnames.includes(surname)) {
      error.textContent = "Прізвище не знайдено. Спробуйте ще раз";
    } else {
      localStorage.setItem("surname", surname);
      render("lecturer");
    }
  });
}
