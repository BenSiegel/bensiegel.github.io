document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = item.getAttribute("data-section");

      navItems.forEach((n) => n.classList.remove("active"));
      item.classList.add("active");

      sections.forEach((section) => {
        section.classList.toggle(
          "active",
          section.id === target
        );
      });
    });
  });
});

