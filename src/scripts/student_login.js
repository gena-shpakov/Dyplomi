export default function () {
  const form = document.getElementById("studentLoginForm");
  const groupSelect = document.getElementById("groupSelect");
  const errorMsg = document.getElementById("errorMsg");

  document
    .querySelector('[data-page="main"]')
    .addEventListener("click", () => render("main"));

  google.script.run
    .withSuccessHandler((data) => {
      groupSelect.innerHTML = "";
      data.groups.forEach((group) => {
        const option = document.createElement("option");
        option.value = group;
        option.textContent = group;
        groupSelect.appendChild(option);
      });
    })
    .getLoginOptions();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const group = groupSelect.value;

    if (!group) {
      errorMsg.textContent = "Будь ласка, оберіть групу.";
      return;
    }

    localStorage.setItem("group", group);
    render("student");
  });
}
