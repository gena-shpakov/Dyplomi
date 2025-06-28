export default function () {
  const form = document.getElementById("lecturerLoginForm");
  const teacherInput = document.getElementById("teacherInput");
  const autocompleteList = document.getElementById("autocompleteList");
  const errorMsg = document.getElementById("errorMsg");

  let allTeachers = [];

  document
    .querySelector('[data-page="main"]')
    .addEventListener("click", () => render("main"));

  // Отримати список викладачів з GAS
  google.script.run
    .withSuccessHandler((data) => {
      allTeachers = data.teachers || [];
    })
    .getLoginOptions();

  // Функція рендеру підказок
  function showSuggestions(query = "") {
    autocompleteList.innerHTML = "";
    const filtered = allTeachers.filter((teacher) =>
      teacher.toLowerCase().includes(query.toLowerCase().trim())
    );

    filtered.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      li.classList.add("autocomplete-item");
      li.addEventListener("click", () => {
        teacherInput.value = name;
        autocompleteList.innerHTML = "";
      });
      autocompleteList.appendChild(li);
    });
  }

  // Показати список одразу при фокусі
  teacherInput.addEventListener("focus", () => {
    showSuggestions(); // Показати повний список
  });

  // Фільтрувати список при введенні
  teacherInput.addEventListener("input", () => {
    showSuggestions(teacherInput.value);
  });

  // Закрити список при втраті фокусу
  teacherInput.addEventListener("blur", () => {
    setTimeout(() => {
      autocompleteList.innerHTML = "";
    }, 150);
  });

  // Обробка форми
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const teacher = teacherInput.value.trim();

    if (!teacher) {
      errorMsg.textContent = "Будь ласка, введіть прізвище викладача.";
      return;
    }

    if (!allTeachers.includes(teacher)) {
      errorMsg.textContent = "Викладача з таким прізвищем не знайдено.";
      return;
    }

    localStorage.setItem("teacher", teacher);
    render("lecturer"); // Перехід до сторінки з розкладом викладача
  });
}
