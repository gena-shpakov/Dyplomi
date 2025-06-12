import "./style.css";

const pages = import.meta.glob("./pages/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
});

const scripts = import.meta.glob("./scripts/*.js", {
  eager: true,
  import: "default",
});

const routes = {};
for (const path in pages) {
  const name = path.split("/").pop().replace(".html", "");
  routes[name] = pages[path];
}

window.render = function (page) {
  const html = routes[page] || "<h1>404 Not Found</h1>";
  document.getElementById("app").innerHTML = html;
  localStorage.setItem("currentPage", page);
  const fn = scripts[`./scripts/${page}.js`];
  if (typeof fn === "function") fn();
};

window.addEventListener("DOMContentLoaded", () => {
  const page = localStorage.getItem("currentPage") || "main";
  render(page);
});
