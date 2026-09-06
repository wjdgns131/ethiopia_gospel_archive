/**
 * 에티오피아 선교 아카이브 - 메인 애플리케이션 진입점
 */

// 1. Single-Execution Main Content Initializer (Global Scope)
let mainContentInitialized = false;

window.initializeMainContent = function() {
  if (mainContentInitialized) return;
  mainContentInitialized = true;

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

  if (window.db) {
    try {
      const currentHistory = localStorage.getItem("ethiopia_history");
      if (!currentHistory || JSON.parse(currentHistory).length === 0) {
        localStorage.setItem("ethiopia_history", JSON.stringify(DEFAULT_HISTORY));
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

  // Initial Render of All Tabs Safely ONCE on Authentication
  try { if (window.directoryComponent) window.directoryComponent.render(); } catch (e) { console.error("Directory render error:", e); }
  try { if (window.mapComponent) window.mapComponent.render((window.db && typeof window.db.getMembers === 'function') ? window.db.getMembers() : (window.DEFAULT_MEMBERS || (typeof DEFAULT_MEMBERS !== 'undefined' ? DEFAULT_MEMBERS : []))); } catch (e) { console.error("Map render error:", e); }
  try { if (window.timelineComponent) window.timelineComponent.render(); } catch (e) { console.error("Timeline render error:", e); }
  try { if (window.assembliesComponent) window.assembliesComponent.render(); } catch (e) { console.error("Assemblies render error:", e); }
  try { if (window.calendarComponent) window.calendarComponent.render(); } catch (e) { console.error("Calendar render error:", e); }
};

// Pending main content recovery on app.js evaluate
const siteUnlocked = !document.body.classList.contains("site-locked");
if (window.__pendingMainContentInit || siteUnlocked) {
  window.__pendingMainContentInit = false;
  window.initializeMainContent();
}

document.addEventListener("DOMContentLoaded", () => {

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

// On-demand Lazy Loader for Tesseract.js OCR Engine
let tesseractLoadPromise = null;
window.ensureTesseractLoaded = function() {
  if (window.Tesseract) {
    return Promise.resolve(window.Tesseract);
  }
  if (tesseractLoadPromise) {
    return tesseractLoadPromise;
  }
  tesseractLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.onload = () => resolve(window.Tesseract);
    script.onerror = (err) => {
      tesseractLoadPromise = null;
      console.error("Tesseract.js load failed:", err);
      reject(err);
    };
    document.head.appendChild(script);
  });
  return tesseractLoadPromise;
};
