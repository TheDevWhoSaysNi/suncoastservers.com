(() => {
  const year = document.getElementById("y");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.getElementById("quote-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (String(data.get("company_url") || "").trim()) return;

    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Service: ${data.get("service") || ""}`,
      "",
      data.get("message") || ""
    ].join("\n");

    const href =
      "mailto:info@suncoastservers.com" +
      "?subject=" +
      encodeURIComponent("Suncoast Servers inquiry") +
      "&body=" +
      encodeURIComponent(body);
    window.location.href = href;
  });

  const toggle = document.getElementById("nav-toggle");
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (toggle) toggle.checked = false;
    });
  });
})();
