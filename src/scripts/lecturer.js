export default function () {
  const lecturerName = localStorage.getItem("teacher");
  document.getElementById("lecturerName").textContent = lecturerName
    ? `Викладач: ${lecturerName}`
    : "Викладач не вказаний";

  const button = document.getElementById("loadSchedule");
  const select = document.getElementById("daySelect");
  const table = document.getElementById("scheduleTable");
  const tbody = table.querySelector("tbody");

  document
    .querySelector('[data-page="main"]')
    .addEventListener("click", () => render("main"));

  button.addEventListener("click", () => {
    const day = select.value;

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
              <td>${row.group}</td>
              <td>${row.number}</td>
              <td>${row.subject}</td>
              <td>${row.room}</td>
              <td>${row.time}</td>
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
}
