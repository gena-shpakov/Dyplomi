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
      teacherSelect.innerHTML = "";
      data.teachers.forEach((teacher) => {
        const option = document.createElement("option");
        option.value = teacher;
        option.textContent = teacher;
        teacherSelect.appendChild(option);
      });
    })
    .getLoginOptions();


    teacherInput.addEventListener("input", () => {
    const query = teacherInput.value.toLowerCase().trim();
    autocompleteList.innerHTML = "";

    if (!query) return;

    const filtered = allTeachers.filter((teacher) =>
      teacher.toLowerCase().includes(query)
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
  });

  teacherInput.addEventListener("blur", () => {
    setTimeout(() => {
      autocompleteList.innerHTML = "";
    }, 150);
  });


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
