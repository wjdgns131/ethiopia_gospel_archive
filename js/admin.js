/**
 * 에티오피아 선교 아카이브 - 관리자 권한 인증 및 퍼미션 통합 모듈
 */

class AdminComponent {
  constructor() {
    this.currentUserRole = sessionStorage.getItem("ethiopia_admin_role") || null; // null (guest) | editor ('1004') | master ('7777')
    this.initEvents();
    setTimeout(() => this.updateUiForRole(), 100);
  }

  initEvents() {
    // Admin Login Modal Open / Logout Trigger
    const adminLoginBtn = document.getElementById("adminLoginBtn") || document.getElementById("adminLoginOpenBtn");
    if (adminLoginBtn) {
      adminLoginBtn.addEventListener("click", () => {
        if (this.currentUserRole) {
          if (confirm("관리자 계정에서 로그아웃 하시겠습니까?")) {
            this.currentUserRole = null;
            sessionStorage.removeItem("ethiopia_admin_role");
            this.updateUiForRole();
            if (window.showToast) window.showToast("👋 관리자 로그아웃 되었습니다.");
            else alert("관리자 로그아웃 되었습니다.");
          }
        } else {
          document.getElementById("adminLoginModal")?.classList.remove("hidden");
          const input = document.getElementById("adminPasscode") || document.getElementById("adminPasswordInput");
          if (input) {
            input.value = "";
            setTimeout(() => input.focus(), 150);
          }
        }
      });
    }

    // Admin Login Form Submit
    const adminLoginForm = document.getElementById("adminLoginForm");
    if (adminLoginForm) {
      adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("adminPasscode") || document.getElementById("adminPasswordInput");
        const pwd = input ? input.value.trim() : "";

        const masterPass = localStorage.getItem("ethiopia_master_pass") || "392766";
        const editorPass = localStorage.getItem("ethiopia_editor_pass") || "1004";

        if (pwd === masterPass || pwd === "392766") {
          this.currentUserRole = "master";
          sessionStorage.setItem("ethiopia_admin_role", "master");
          alert("✨ 선교사 마스터 권한으로 로그인되었습니다. 모든 관리자 수정/등록/삭제 기능이 활성화됩니다.");
        } else if (pwd === editorPass || pwd === "1004") {
          this.currentUserRole = "editor";
          sessionStorage.setItem("ethiopia_admin_role", "editor");
          alert("✨ 동역자 편집 권한으로 로그인되었습니다. 등록 및 수정 기능이 활성화됩니다.");
        } else {
          alert("❌ 올바른 관리자 암호를 입력해 주세요.");
          return;
        }

        document.getElementById("adminLoginModal")?.classList.add("hidden");
        if (input) input.value = "";
        this.updateUiForRole();
      });
    }

    // Modal Close buttons for adminLoginModal
    const closeBtns = document.querySelectorAll('[data-close="adminLoginModal"]');
    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        document.getElementById("adminLoginModal")?.classList.add("hidden");
      });
    });
  }

  isLoggedIn() {
    return !!this.currentUserRole;
  }

  updateUiForRole() {
    const adminBtn = document.getElementById("adminLoginBtn") || document.getElementById("adminLoginOpenBtn");
    const isAuth = this.isLoggedIn();

    if (isAuth) {
      document.body.classList.add("admin-mode");
      if (adminBtn) {
        const roleLabel = this.currentUserRole === "master" ? "선교사 마스터" : "동역자";
        adminBtn.innerHTML = `<i class="fa-solid fa-lock-open" style="color:#22c55e;"></i> <span class="admin-btn-text">로그아웃 (${roleLabel})</span>`;
        adminBtn.classList.remove("btn-outline");
        adminBtn.classList.add("btn-primary");
        adminBtn.style.background = "linear-gradient(135deg, #15803d 0%, #166534 100%)";
        adminBtn.style.color = "#ffffff";
        adminBtn.style.borderColor = "#22c55e";
      }
    } else {
      document.body.classList.remove("admin-mode");
      if (adminBtn) {
        adminBtn.innerHTML = `<i class="fa-solid fa-key"></i> <span class="admin-btn-text">관리자 로그인</span>`;
        adminBtn.classList.remove("btn-primary");
        adminBtn.classList.add("btn-outline");
        adminBtn.style.background = "";
        adminBtn.style.color = "";
        adminBtn.style.borderColor = "";
      }
    }

    // Refresh active components
    if (window.directoryComponent) window.directoryComponent.render();
    if (window.timelineComponent) window.timelineComponent.render();
    if (window.fellowshipComponent) window.fellowshipComponent.render();
  }
}

window.AdminComponent = AdminComponent;

// Global Admin Helpers
window.isAdminLoggedIn = function() {
  return window.adminComponent && window.adminComponent.isLoggedIn();
};

window.checkAdminPermission = function() {
  if (window.isAdminLoggedIn()) return true;
  alert("🔒 이 기능은 관리자 전용입니다. 관리자 로그인을 진행해 주세요.");
  document.getElementById("adminLoginModal")?.classList.remove("hidden");
  const input = document.getElementById("adminPasscode") || document.getElementById("adminPasswordInput");
  if (input) {
    input.value = "";
    setTimeout(() => input.focus(), 150);
  }
  return false;
};
