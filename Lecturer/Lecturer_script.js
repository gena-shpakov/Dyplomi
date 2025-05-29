// Функція для отримання поточної дати та форматування її
function updateCurrentDay() {
    const dayNames = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'];
    const monthNames = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
  
    const now = new Date();
    const dayName = dayNames[now.getDay()];
    const day = now.getDate();
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
  
    document.getElementById('currentDay').textContent = `${dayName}, ${day} ${month} ${year}`;
  }
  
  // Функція для визначення чисельника/знаменника (наприклад, за парністю тижня)
  function updateNumeratorDenominator() {
    const startDate = new Date('2025-09-01');
    const now = new Date();
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(diffDays / 7) + 1;
    const label = (weekNumber % 2 === 1) ? 'Чисельник' : 'Знаменник';
    document.getElementById('numeratorDenominator').textContent = label;
  }
  
  // Викликаємо функції при завантаженні сторінки
  window.onload = function() {
    updateCurrentDay();
    updateNumeratorDenominator();
  }
  