import main from "./pages/main.html?raw";
import student from "./pages/student.html?raw";
import lecturer from "./pages/lecturer.html?raw";

const routes = {
  main,
  student,
  lecturer,
};

function render(page) {
  const html = routes[page] || "<h1>404 Not Found</h1>";
  document.getElementById("app").innerHTML = html;
}

function setupNavigation() {
  document.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-page]");
    if (button) {
      const page = button.getAttribute("data-page");
      render(page);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  render("main");
});
