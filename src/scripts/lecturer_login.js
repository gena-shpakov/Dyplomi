export default function () {
  const form = document.getElementById("lecturerLoginForm");
  const teacherSelect = document.getElementById("teacherSelect");
  const errorMsg = document.getElementById("errorMsg");

  document
    .querySelector('[data-page="main"]')
    .addEventListener("click", () => render("main"));

  // Отримати список викладачів з GAS
  google.script.run
    .withSuccessHandler((data) => {
      teacherSelect.innerHTML = "";
      data.teachers.forEach((teacher) => {
        const option = document.createElement("option");
        option.value = teacher;
        option.textContent = teacher;
        teacherSelect.appendChild(option);
      });
    })
    .getLoginOptions();

  // Обробка форми
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const teacher = teacherSelect.value;

    if (!teacher) {
      errorMsg.textContent = "Будь ласка, оберіть викладача.";
      return;
    }

    localStorage.setItem("teacher", teacher);
    render("lecturer"); // Перехід до сторінки з розкладом викладача
  });
}
