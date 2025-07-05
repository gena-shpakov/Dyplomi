export default function () {
  const lecturerName = localStorage.getItem("teacher");
  document.getElementById("lecturerName").textContent = lecturerName
    ? `Викладач - ${lecturerName}`
    : "Викладач не вказаний";

  const weekType = getWeekType();
  const weekTypeElement = document.getElementById("weekTypeLecturer");
  if (weekTypeElement) {
    weekTypeElement.textContent = `Зараз: ${weekType}`;
  }

  const currentDayElement = document.getElementById("currrentDay");
  if (currentDayElement) {
    const dayNames = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота"];
    const today = new Date().getDay();
    currentDayElement.textContent = dayNames[today];
  }

  const table = document.getElementById("lecturerscheduleTable");
  const tbody = table.querySelector("tbody");

  // Назад
  document
    .querySelector('[data-page="lecturer_login"]')
    .addEventListener("click", () => render("lecturer_login"));

  // Отримуємо всі кнопки з днями
  const dayButtons = document.querySelectorAll(".day-button");

  const jsDay = new Date().getDay(); // 0 — неділя, 1 — понеділок ...
  const today = jsDay === 0 ? 7 : jsDay;

  dayButtons.forEach((button) => {
    if (parseInt(button.dataset.day) === today) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      dayButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const day = button.textContent.trim();

      if (!lecturerName) {
        alert("Викладач не вказаний.");
        return;
      }

      showLoader();

      google.script.run
        .withSuccessHandler((data) => {
          hideLoader();
          tbody.innerHTML = "";

          if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6">Розклад відсутній</td></tr>';
          } else {
            data.forEach((row) => {
              const tr = document.createElement("tr");
              tr.innerHTML = `
                <td>${row.day}</td>
                <td class="group-cell">${row.group}</td>
                <td>${row.number}</td>
                <td class="subject-cell">${row.subject}</td>
                <td>${row.room}</td>
                <td class="time-cell">${row.time}</td>
              `;
              tbody.appendChild(tr);
            });
          }

          table.style.display = "table";
        })
        .withFailureHandler((e) => {
          hideLoader();
          alert("Помилка при завантаженні розкладу: " + e.message);
        })
        .getScheduleForTeacherAndDay(lecturerName, day);
    });
  });
}

function showLoader() {
  document.getElementById("loader").style.display = "flex";
}
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function getWeekType() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
  return weekNumber % 2 === 0 ? 'Чисельник' : 'Знаменник';
}
