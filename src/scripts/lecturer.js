export default function () {
  const lecturerName = localStorage.getItem("teacher");
  document.getElementById("lecturerName").textContent = lecturerName
    ? `Викладач: ${lecturerName}`
    : "Викладач не вказаний";

  const table = document.getElementById("scheduleTable");
  const tbody = table.querySelector("tbody");

  // Назад
  document
    .querySelector('[data-page="lecturer_login"]')
    .addEventListener("click", () => render("lecturer_login"));

  // Отримуємо всі кнопки з днями
  const dayButtons = document.querySelectorAll(".day-button");

  // Визначаємо поточний день тижня (0 = неділя, 1 = понеділок, ...)
  const jsDay = new Date().getDay(); // 1–5 для Пн–Пт
  const today = jsDay === 0 ? 7 : jsDay; // зробимо 1–7, де 7 — неділя

  dayButtons.forEach((button) => {
    // Виділяємо кнопку поточного дня
    if (parseInt(button.dataset.day) === today) {
      button.classList.add("active");
    }

    // Логіка кліку
    button.addEventListener("click", () => {
      // Знімаємо активність з усіх
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