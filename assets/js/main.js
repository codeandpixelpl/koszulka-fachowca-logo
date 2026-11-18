(() => {
  const spokojnie = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animacje logo: start od początku, gdy plansza wchodzi w kadr; pauza poza kadrem.
  // Przy ograniczonym ruchu zostaje plakat z końcową klatką.
  const filmy = document.querySelectorAll("video.anim");
  if (!spokojnie && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((wpisy) => {
      for (const w of wpisy) {
        const v = w.target;
        if (w.isIntersecting) {
          if (v.preload !== "auto") { v.preload = "auto"; v.load(); }
          v.currentTime = 0;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      }
    }, { threshold: 0.45 });
    filmy.forEach((v) => io.observe(v));
  }

  // Aktywny numer w pasku.
  const linki = [...document.querySelectorAll(".pasek nav a")];
  const cele = linki.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const io2 = new IntersectionObserver((wpisy) => {
      for (const w of wpisy) {
        if (!w.isIntersecting) continue;
        linki.forEach((a) => {
          const on = a.getAttribute("href") === "#" + w.target.id;
          a.toggleAttribute("aria-current", on);
          if (on) a.setAttribute("aria-current", "true");
          if (on && a.scrollIntoView) a.parentElement.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
        });
      }
    }, { rootMargin: "-40% 0px -55% 0px" });
    cele.forEach((c) => io2.observe(c));
  }

  // Podgląd zdjęcia w pełnym rozmiarze, w obrębie jednej koncepcji albo palety.
  const lb = document.getElementById("lb");
  if (!lb || typeof lb.showModal !== "function") return;
  const img = document.getElementById("lb-img");
  const pod = document.getElementById("lb-pod");
  let grupa = [], i = 0, ostatni = null;

  const pokaz = (n) => {
    i = (n + grupa.length) % grupa.length;
    const b = grupa[i];
    img.src = b.dataset.full;
    img.alt = b.querySelector("img").alt;
    pod.textContent = `${b.closest("figure").querySelector("figcaption").textContent} · ${i + 1} / ${grupa.length}`;
  };

  document.addEventListener("click", (ev) => {
    const b = ev.target.closest(".zoom");
    if (!b) return;
    grupa = [...document.querySelectorAll(`.zoom[data-grupa="${b.dataset.grupa}"]`)];
    ostatni = b;
    pokaz(grupa.indexOf(b));
    lb.showModal();
  });

  lb.addEventListener("click", (ev) => {
    const ster = ev.target.closest("[data-lb]");
    if (ster) {
      ster.dataset.lb === "zamknij" ? lb.close() : pokaz(i + Number(ster.dataset.lb));
    } else if (ev.target === lb) {
      lb.close();
    }
  });
  lb.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowRight") pokaz(i + 1);
    if (ev.key === "ArrowLeft") pokaz(i - 1);
  });
  lb.addEventListener("close", () => { img.removeAttribute("src"); ostatni && ostatni.focus(); });

  let x0 = null;
  lb.addEventListener("touchstart", (ev) => { x0 = ev.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (ev) => {
    if (x0 === null) return;
    const dx = ev.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) pokaz(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
