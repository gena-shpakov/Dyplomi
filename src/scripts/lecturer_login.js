export default function () {
  const form = document.getElementById("lecturerLoginForm");
  const teacherInput = document.getElementById("teacherInput");
  const autocompleteList = document.getElementById("autocompleteList");
  const errorMsg = document.getElementById("errorMsg");

  let allTeachers = [];

  errorMsg.style.display = "none";

  // Повернення на головну
  document.querySelector('[data-page="main"]').addEventListener("click", () => {
    if (typeof render === "function") render("main");
  });

  // Отримання списку викладачів із Google Apps Script
  google.script.run.withSuccessHandler((data) => {
    allTeachers = data.teachers || [];
  }).getLoginOptions();

  // Показати підказки
  function showSuggestions(query = "") {
    autocompleteList.innerHTML = "";

    const filtered = allTeachers.filter((teacher) =>
      teacher.toLowerCase().includes(query.toLowerCase().trim())
    );

    if (filtered.length === 0) {
      autocompleteList.classList.add("hidden");
      return;
    }

    autocompleteList.classList.remove("hidden");
    filtered.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      li.classList.add("autocomplete-item");
      li.addEventListener("click", () => {
        teacherInput.value = name;
        autocompleteList.innerHTML = "";
        errorMsg.style.display = "none";
      });
      autocompleteList.appendChild(li);
    });
  }

  teacherInput.addEventListener("focus", () => {
    if (teacherInput.value.trim() === "") {
      showSuggestions();
    }
  });

  teacherInput.addEventListener("input", () => {
    showSuggestions(teacherInput.value);
    error.style.display = "none";
  });

    const value = teacherInput.value.trim();
    if (value && allTeachers.includes(value)) {
      errorMsg.style.display = "none";
    }
  
  teacherInput.addEventListener("blur", () => {
    setTimeout(() => (autocompleteList.innerHTML = ""), 150);
  });

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

    errorMsg.style.display = "none";
    localStorage.setItem("teacher", teacher);
    if (typeof render === "function") render("lecturer");
  });
}