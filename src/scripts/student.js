export default function () {
  const button = document.getElementById("loadSchedule");
  const select = document.getElementById("daySelect");
  const table = document.getElementById("scheduleTable");
  const tbody = table.querySelector("tbody");

  document
    .querySelector('[data-page="student_login"]')
    .addEventListener("click", () => render("student_login"));

  button.addEventListener("click", () => {
    const day = select.value;
    const group = localStorage.getItem("group");

    if (!group) {
      alert("Група не вказана. Перейдіть назад на логін.");
      render("student_login");
      return;
    }

    google.script.run
      .withSuccessHandler((data) => {
        tbody.innerHTML = "";

        if (!data || data.length === 0) {
          tbody.innerHTML = '<tr><td colspan="5">Розклад не знайдено</td></tr>';
        } else {
          data.forEach((row) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${row.number}</td>
              <td>${row.subject}</td>
              <td>${row.teacher}</td>
              <td>${row.room}</td>
              <td>${row.time}</td>
            `;
            tbody.appendChild(tr);
          });
        }

        table.style.display = "table";
      })
      .withFailureHandler((e) => {
        alert("Помилка при завантаженні: " + e.message);
      })
      .getScheduleForGroupAndDay(group, day);
  });
}
