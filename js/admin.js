/**
 * 에티오피아 선교 아카이브 - 사이트 전체 게이트 인증 및 권한(Admin / Coworker) 통합 모듈
 */

class AdminComponent {
  constructor() {
    this.currentUserRole = sessionStorage.getItem("ethiopia_auth_role") || null; // null | 'admin' | 'coworker'
    this.initEvents();
    setTimeout(() => this.initGate(), 50);
  }

  initEvents() {
    // 1. Site Gate Login Form Submit (Delegated to document)
    document.addEventListener("submit", (e) => {
      if (e.target && (e.target.id === "siteGateForm" || e.target.id === "adminLoginForm")) {
        e.preventDefault();
        const input = document.getElementById("gatePasswordInput") || document.getElementById("adminPasscode") || document.getElementById("adminPasswordInput");
        const passcode = input ? input.value.trim() : "";
        if (passcode) {
          this.loginWithPasscode(passcode);
        }
      }
    });

    // 2. Header Logout / Login Status Button
    document.addEventListener("click", (e) => {
      const btn = e.target ? e.target.closest('#adminLoginBtn, #adminLoginOpenBtn') : null;
      if (btn) {
        if (this.currentUserRole) {
          this.logout();
        } else {
          this.lockSite();
        }
      }
    });
  }

  async loginWithPasscode(passcode) {
    const errorMsg = document.getElementById("gateErrorMessage");
    const submitBtn = document.getElementById("siteGateSubmitBtn");
    const cleanPasscode = passcode ? String(passcode).trim() : "";

    if (errorMsg) errorMsg.classList.add("hidden");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 확인 중...`;
    }

    try {
      const workerUrl = window.CF_WORKER_UPLOAD_URL || "https://ethiopia-archive-proxy.wjdgns131.workers.dev";
      const authEndpoint = `${workerUrl.replace(/\/+$/, '')}/auth`;

      let data = null;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        const response = await fetch(authEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "auth", passcode: passcode }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (response.ok) {
          data = await response.json();
        }
      } catch(ex) {
        console.warn("[AdminAuth] Worker /auth fetch failed or timed out:", ex);
      }

      if (!data) {
        // Local dev / offline fallback
        if (cleanPasscode === "0000") {
          data = { ok: true, role: "coworker" };
        } else if (cleanPasscode === "392766" || cleanPasscode === "7777") {
          data = { ok: true, role: "admin" };
        }
      }

      if (data && data.ok && (data.role === "admin" || data.role === "coworker")) {
        this.currentUserRole = data.role;
        sessionStorage.setItem("ethiopia_auth_role", data.role);

        if (data.role === "admin") {
          sessionStorage.setItem("ethiopia_admin_passcode", passcode);
        } else {
          sessionStorage.removeItem("ethiopia_admin_passcode");
        }

        const input = document.getElementById("gatePasswordInput");
        if (input) input.value = "";

        this.unlockSite();
        if (window.showToast) {
          const roleLabel = data.role === "admin" ? "관리자" : "동역자";
          window.showToast(`✨ ${roleLabel} 권한으로 로그인되었습니다.`);
        }
      } else {
        if (errorMsg) {
          errorMsg.textContent = "비밀번호가 올바르지 않습니다.";
          errorMsg.classList.remove("hidden");
        } else {
          alert("❌ 비밀번호가 올바르지 않습니다.");
        }
        const input = document.getElementById("gatePasswordInput");
        if (input) {
          input.value = "";
          input.focus();
        }
      }
    } catch(err) {
      console.error("[AdminAuth] Login error:", err);
      if (errorMsg) {
        errorMsg.textContent = "인증 중 오류가 발생했습니다. 다시 시도해 주세요.";
        errorMsg.classList.remove("hidden");
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> 로그인`;
      }
    }
  }

  initGate() {
    this.currentUserRole = sessionStorage.getItem("ethiopia_auth_role") || null;
    if (this.currentUserRole === "admin" || this.currentUserRole === "coworker") {
      this.unlockSite();
    } else {
      this.lockSite();
    }
  }

  lockSite() {
    this.currentUserRole = null;
    sessionStorage.removeItem("ethiopia_auth_role");
    sessionStorage.removeItem("ethiopia_admin_passcode");

    document.body.classList.add("site-locked");
    document.body.classList.remove("admin-mode");

    const overlay = document.getElementById("siteGateOverlay");
    if (overlay) overlay.classList.remove("hidden");

    const input = document.getElementById("gatePasswordInput");
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 100);
    }

    const errorMsg = document.getElementById("gateErrorMessage");
    if (errorMsg) errorMsg.classList.add("hidden");

    this.updateUiForRole();
  }

  unlockSite() {
    document.body.classList.remove("site-locked");

    const overlay = document.getElementById("siteGateOverlay");
    if (overlay) overlay.classList.add("hidden");

    if (this.currentUserRole === "admin") {
      document.body.classList.add("admin-mode");
    } else {
      document.body.classList.remove("admin-mode");
    }

    this.updateUiForRole();
  }

  logout() {
    if (confirm("로그아웃 하시겠습니까?")) {
      this.lockSite();
      if (window.showToast) window.showToast("👋 로그아웃 되었습니다.");
    }
  }

  isLoggedIn() {
    return !!this.currentUserRole;
  }

  isAdmin() {
    return this.currentUserRole === "admin";
  }

  updateUiForRole() {
    const adminBtn = document.getElementById("adminLoginBtn") || document.getElementById("adminLoginOpenBtn");
    const isAuth = this.isLoggedIn();

    if (isAuth) {
      if (adminBtn) {
        const roleLabel = this.currentUserRole === "admin" ? "관리자" : "동역자";
        adminBtn.innerHTML = `<i class="fa-solid fa-lock-open" style="color:#22c55e;"></i> <span class="admin-btn-text">로그아웃 (${roleLabel})</span>`;
        adminBtn.classList.remove("btn-outline");
        adminBtn.classList.add("btn-primary");
        adminBtn.style.background = "linear-gradient(135deg, #15803d 0%, #166534 100%)";
        adminBtn.style.color = "#ffffff";
        adminBtn.style.borderColor = "#22c55e";
      }
    } else {
      if (adminBtn) {
        adminBtn.innerHTML = `<i class="fa-solid fa-key"></i> <span class="admin-btn-text">로그인 필요</span>`;
        adminBtn.classList.remove("btn-primary");
        adminBtn.classList.add("btn-outline");
        adminBtn.style.background = "";
        adminBtn.style.color = "";
        adminBtn.style.borderColor = "";
      }
    }

    if (window.directoryComponent) window.directoryComponent.render();
    if (window.timelineComponent) window.timelineComponent.render();
    if (window.fellowshipComponent) window.fellowshipComponent.render();
  }
}

window.AdminComponent = AdminComponent;

window.isAdminLoggedIn = function() {
  return window.adminComponent && window.adminComponent.isAdmin();
};

window.checkAdminPermission = function() {
  if (window.isAdminLoggedIn()) return true;
  alert("🔒 이 기능은 관리자 전용입니다.");
  return false;
};

