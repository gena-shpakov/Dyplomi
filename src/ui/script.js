const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота"];
const today = new Date();
const todayIndex = today.getDay();
let currentDay = days[todayIndex >= 1 && todayIndex <= 5 ? todayIndex : 1];

const dayNameElement = document.getElementById("day-name");
const buttons = document.querySelectorAll(".day-button");

function loadSchedule(day) {
  dayNameElement.textContent = day;

  buttons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.day === day);
  });

  google.script.run.withSuccessHandler(function(data) {
    const tbody = document.getElementById("schedule-body");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = "<tr><td colspan='3'>Розкладу на цей день немає</td></tr>";
      return;
    }

    data.forEach(row => {
      const tr1 = document.createElement("tr");
      tr1.innerHTML = `<td>${row[1]}</td><td class="subject-cell">${row[2]}</td><td class="time-cell">${row[3]}</td>`;
      const tr2 = document.createElement("tr");
      tr2.innerHTML = `<td></td><td colspan="2">${row[4]}</td>`;
      tbody.appendChild(tr1);
      tbody.appendChild(tr2);
    });
  }).getScheduleForDay(day);
}

// Initial load
loadSchedule(currentDay);

// Button click handling
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedDay = button.dataset.day;
    loadSchedule(selectedDay);
  });
});
