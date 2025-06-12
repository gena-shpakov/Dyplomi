export default function () {
  const button = document.getElementById("loadSchedule");
  const select = document.getElementById("daySelect");
  const table = document.getElementById("scheduleTable");
  const tbody = table.querySelector("tbody");

  document
    .querySelector('[data-page="main"]')
    .addEventListener("click", () => render("main"));

  button.addEventListener("click", () => {
    const day = select.value;

    google.script.run
      .withSuccessHandler((data) => {
        console.log("Received data:", data);
        tbody.innerHTML = "";

        if (!data || data.length === 0) {
          tbody.innerHTML = '<tr><td colspan="5">Немає даних</td></tr>';
        } else {
          data.forEach((row) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
                <td>${row[4]}</td>
                <td>${row[5]}</td>
              `;
            tbody.appendChild(tr);
          });
        }

        table.style.display = "table";
      })
      .withFailureHandler((e) => {
        alert("Помилка при завантаженні розкладу: " + e.message);
      })
      .getScheduleForDay(day);
  });
}
