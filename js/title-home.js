document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".site-header h1");
  if (!title) return;

  title.style.cursor = "pointer";
  title.setAttribute("role", "link");
  title.setAttribute("tabindex", "0");

  const goHome = () => window.location.href = "../index.html";

  title.addEventListener("click", goHome);
  title.addEventListener("keydown", e => {
    if (e.key === "Enter") goHome();
  });
});
