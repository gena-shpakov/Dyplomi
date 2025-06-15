// Основна функція, яка виконується при завантаженні сторінки студента
export default function () {
  // Отримуємо посилання на таблицю та її тіло (tbody)
  const table = document.getElementById("scheduleTable");
  const tbody = table.querySelector("tbody");

  // Обробник для кнопки "Назад", яка повертає на сторінку входу студента
  document
    .querySelector('[data-page="student_login"]')
    .addEventListener("click", () => render("student_login"));

  // Отримуємо всі кнопки днів тижня
  const dayButtons = document.querySelectorAll(".day-button");

  // Визначаємо поточний день тижня (0 — неділя, 1 — понеділок і т.д.)
  const jsDay = new Date().getDay();
  const today = jsDay === 0 ? 7 : jsDay; // Якщо неділя (0), ставимо 7

  // Перебираємо всі кнопки днів тижня
  dayButtons.forEach((button) => {
    // Якщо кнопка відповідає поточному дню, додаємо їй клас активності
    if (parseInt(button.dataset.day) === today) {
      button.classList.add("active");
    }

    // Додаємо подію "click" для кожної кнопки
    button.addEventListener("click", () => {
      // Знімаємо клас "active" з усіх кнопок
      dayButtons.forEach((btn) => btn.classList.remove("active"));
      // Додаємо клас "active" до натиснутої кнопки
      button.classList.add("active");

      // Отримуємо значення обраного дня (текст кнопки)
      const day = button.textContent.trim();

      // Отримуємо назву групи з localStorage
      const group = localStorage.getItem("group");

      // Якщо група не вказана, повертаємо користувача на логін сторінку
      if (!group) {
        alert("Група не вказана. Перейдіть назад на логін.");
        render("student_login");
        return;
      }

      // Викликаємо серверну функцію для отримання розкладу
      google.script.run
        .withSuccessHandler((data) => {
          // Очищаємо попередній вміст таблиці
          tbody.innerHTML = "";

          // Якщо дані порожні — виводимо повідомлення
          if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5">Розклад не знайдено</td></tr>';
          } else {
            // Інакше — заповнюємо таблицю рядками з даними
            data.forEach((row) => {
              const tr = document.createElement("tr");
              tr.innerHTML = `
                <td>${row.number}</td>
                <td class="subject-cell">${row.subject}</td>
                <td>${row.teacher}</td>
                <td>${row.room}</td>
                <td class="time-cell">${row.time}</td>
              `;
              tbody.appendChild(tr);
            });
          }

          // Показуємо таблицю (на випадок, якщо вона була прихована)
          table.style.display = "table";
        })
        .withFailureHandler((e) => {
          // Виводимо повідомлення про помилку
          alert("Помилка при завантаженні: " + e.message);
        })
        .getScheduleForGroupAndDay(group, day); // Викликаємо серверну функцію з параметрами
    });
  });
}
