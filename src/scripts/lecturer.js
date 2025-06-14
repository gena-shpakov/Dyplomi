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

  dayButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const day = button.dataset.day;

      if (!lecturerName) {
        alert("Викладач не вказаний.");
        return;
      }

      google.script.run
        .withSuccessHandler((data) => {
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
          alert("Помилка при завантаженні розкладу: " + e.message);
        })
        .getScheduleForTeacherAndDay(lecturerName, day);
    });
  });
}
