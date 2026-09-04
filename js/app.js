/**
 * 에티오피아 선교 아카이브 - 메인 애플리케이션 진입점
 */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Auto-healing storage check: Ensure valid array structure without deleting user data
  try {
    const mems = JSON.parse(localStorage.getItem("ethiopia_members") || "[]");
    if (!Array.isArray(mems) || mems.length === 0) {
      localStorage.removeItem("ethiopia_members");
    }
    const hists = JSON.parse(localStorage.getItem("ethiopia_history") || "[]");
    if (!Array.isArray(hists) || hists.length === 0) {
      localStorage.removeItem("ethiopia_history");
    }
  } catch(e) {}
  // 1. Theme Toggle Management
  try {
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("ethiopia_theme") || "dark";
    if (savedTheme === "light") {
      html.classList.remove("dark");
      if (themeToggle) themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    } else {
      html.classList.add("dark");
      if (themeToggle) themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        if (html.classList.contains("dark")) {
          html.classList.remove("dark");
          localStorage.setItem("ethiopia_theme", "light");
          themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        } else {
          html.classList.add("dark");
          localStorage.setItem("ethiopia_theme", "dark");
          themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
        }
      });
    }
  } catch (e) {
    console.error("Theme toggle error:", e);
  }

  // 2. Main Navigation Tabs
  try {
    const navTabs = document.querySelectorAll(".nav-tab");
    const tabPages = document.querySelectorAll(".tab-page");

    navTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");

        navTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        tabPages.forEach(page => {
          if (page.id === `tab-${target}`) {
            page.classList.add("active");
            if (target === "directory" && window.mapComponent && window.mapComponent.leafletMap) {
              setTimeout(() => window.mapComponent.leafletMap.invalidateSize(), 150);
            }
          } else {
            page.classList.remove("active");
          }
        });
      });
    });
  } catch (e) {
    console.error("Navigation error:", e);
  }

  // 3. Initialize Data & Components Defensively
  if (window.db) {
    try {
      const currentHistory = localStorage.getItem("ethiopia_history");
      if (!currentHistory || JSON.parse(currentHistory).length === 0) {
        localStorage.setItem("ethiopia_history", JSON.stringify(window.DEFAULT_HISTORY || []));
      }
    } catch(e) { console.error("DB force sync error:", e); }
  }

  try {
    window.directoryComponent = new DirectoryComponent();
  } catch (e) { console.error("DirectoryComponent init error:", e); }

  try {
    window.mapComponent = new EthiopiaMapComponent(
      "ethiopiaMapContainer",
      "regionPillsList",
      (regionId) => {
        if (window.directoryComponent) {
          window.directoryComponent.activeRegion = regionId;
          window.directoryComponent.render();
        }
      }
    );
  } catch (e) { console.error("EthiopiaMapComponent init error:", e); }

  try {
    window.timelineComponent = new TimelineComponent();
  } catch (e) { console.error("TimelineComponent init error:", e); }

  try {
    window.fellowshipComponent = new FellowshipComponent();
    window.assembliesComponent = window.fellowshipComponent;
  } catch (e) { console.error("FellowshipComponent init error:", e); }

  try {
    window.calendarComponent = new CalendarComponent("calendarContainer");
  } catch (e) { console.error("CalendarComponent init error:", e); }

  try {
    window.adminComponent = new AdminComponent();
  } catch (e) { console.error("AdminComponent init error:", e); }

  // Initial Render of All Tabs Safely
  try { if (window.directoryComponent) window.directoryComponent.render(); } catch (e) { console.error("Directory render error:", e); }
  try { if (window.mapComponent) window.mapComponent.render(window.db ? window.db.getMembers() : []); } catch (e) { console.error("Map render error:", e); }
  try { if (window.timelineComponent) window.timelineComponent.render(); } catch (e) { console.error("Timeline render error:", e); }
  try { if (window.assembliesComponent) window.assembliesComponent.render(); } catch (e) { console.error("Assemblies render error:", e); }
  try { if (window.calendarComponent) window.calendarComponent.render(); } catch (e) { console.error("Calendar render error:", e); }

  // 4. Modal Close Handlers
  try {
    document.querySelectorAll("[data-close]").forEach(btn => {
      btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-close");
        document.getElementById(modalId)?.classList.add("hidden");
      });
    });

    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add("hidden");
        }
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop").forEach(b => b.classList.add("hidden"));
      }
    });
  } catch (e) {
    console.error("Modal handler error:", e);
  }
});

window.showToast = function(message, type = "success") {
  let container = document.querySelector(".app-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "app-toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `app-toast ${type}`;
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="font-size:1.1rem;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
};
