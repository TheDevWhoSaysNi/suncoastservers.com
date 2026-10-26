(() => {
  const params = new URLSearchParams(location.search);
  const palettes = {
    sunset: ["#f25a2c", "#10202e"],
    gulf: ["#0a6f6a", "#ec5b47"],
    dusk: ["#c9325a", "#1e1836"]
  };
  const setPalette = (name) => {
    if (name === "sunset") delete document.documentElement.dataset.palette;
    else document.documentElement.dataset.palette = name;
  };
  if (palettes[params.get("palette")]) setPalette(params.get("palette"));
  if (params.has("preview") || params.has("palette")) {
    const bar = document.createElement("div");
    bar.className = "palette-switch";
    bar.innerHTML = "<span>Palette</span>";
    Object.entries(palettes).forEach(([name, [a, b]]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.innerHTML = `<i style="--a:${a};--b:${b}"></i>${name[0].toUpperCase() + name.slice(1)}`;
      btn.setAttribute("aria-pressed", String((document.documentElement.dataset.palette || "sunset") === name));
      btn.addEventListener("click", () => {
        setPalette(name);
        bar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        params.set("palette", name);
        history.replaceState(null, "", `?${params}${location.hash}`);
      });
      bar.append(btn);
    });
    document.body.append(bar);
  }

  const year = document.getElementById("y");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector("header.site");
  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.getElementById("nav-toggle");
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (toggle) toggle.checked = false;
    });
  });

  const service = document.getElementById("service");
  const preset = params.get("service");
  if (preset && service) {
    const match = [...service.options].find((option) => option.value === preset);
    if (match) service.value = match.value;
  }
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      if (service) service.value = link.dataset.service;
    });
  });

  const revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach((el) => io.observe(el));
  }

  const form = document.getElementById("quote-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (String(data.get("company_url") || "").trim()) return;

    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Service: ${data.get("service") || ""}`,
      "",
      data.get("message") || ""
    ].join("\n");

    window.location.href =
      "mailto:info@suncoastservers.com" +
      "?subject=" +
      encodeURIComponent(`Suncoast Servers inquiry: ${data.get("service") || "General"}`) +
      "&body=" +
      encodeURIComponent(body);
  });
})();
