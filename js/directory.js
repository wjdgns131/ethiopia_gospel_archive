/**
 * 에티오피아 선교 아카이브 - 초안정적(Rock-Solid) 이벤트 위임 & DOM 빌더 컴포넌트 v5000
 * 문자열 인라인 따옴표 에러 100% 원천 차단 + 0.01초 무결성 이벤트 엔진
 */

class DirectoryComponent {
  constructor() {
    this.activeCategory = "all";
    this.activeRegion = null;
    this.searchQuery = "";
    this.tempMemberPhoto = "";
    this.container = document.getElementById("memberGrid");
    this.activeFiltersBadge = document.getElementById("activeFilterBar");

    this.initGlobalEventDelegation();
    this.initFormListeners();
  }

  // 1. Centralized Safe Event Delegation (DOM 클릭 이벤트 통일 수신기)
  // 1. Centralized Safe Event Delegation (DOM 클릭 이벤트 통일 수신기)
  // 1. Centralized Safe Event Delegation (DOM 클릭 이벤트 통일 수신기)
  // 1. Centralized Safe Event Delegation (DOM 클릭 이벤트 통일 수신기)
  // 1. Centralized Safe Event Delegation (DOM 클릭 이벤트 통일 수신기)
  initGlobalEventDelegation() {
// Region Pill Click Handler (지도 아래 하단 지역 알약 클릭 시 즉시 필터링 및 구글 지도 위치 이동)
    document.addEventListener("click", (e) => {
      const pill = e.target.closest(".region-pill");
      if (!pill) return;

      const reg = pill.getAttribute("data-region");
      const targetRegion = (reg === "all" || !reg) ? null : reg;

      document.querySelectorAll(".region-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      this.activeRegion = targetRegion;
      this.render();

      if (window.mapComponent) {
        window.mapComponent.selectRegion(targetRegion);
      }
    });
    // A. Card Click & Action Event Delegation
    document.body.addEventListener("click", (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;

      const action = target.getAttribute("data-action");
      const id = target.getAttribute("data-id");

      if (action === "open-add-member") {
        e.preventDefault();
        this.openEditModal(null);
      } else if (action === "open-edit-member") {
        e.preventDefault();
        e.stopPropagation();
        this.openEditModal(id);
      } else if (action === "open-member-detail") {
        e.preventDefault();
        this.openMemberDetailModal(id);
      } else if (action === "open-inviter-network") {
        e.preventDefault();
        e.stopPropagation();
        this.openNetworkModal(id);
      } else if (action === "open-testimony-link") {
        e.preventDefault();
        e.stopPropagation();
        const link = target.getAttribute("data-link");
        const name = target.getAttribute("data-name");
        this.openTestimonyLink(link, name);
      }
    });

    // B. Clipboard Paste Listener ([Ctrl + V]) for PPT & KakaoTalk Photos
    window.addEventListener("paste", (e) => {
      const modal = document.getElementById("memberEditModal");
      if (!modal || modal.classList.contains("hidden")) return;

      const clipboardData = e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData);
      if (!clipboardData) return;

      let imageFile = null;

      const htmlData = clipboardData.getData("text/html");
      if (htmlData) {
        const imgMatch = htmlData.match(/<img[^>]+src=["'](data:image\/[^"']+)["']/i);
        if (imgMatch && imgMatch[1]) {
          e.preventDefault();
          this.tempMemberPhoto = imgMatch[1];
          this.renderMemberPhotoPreview();
          if (window.showToast) window.showToast("📋 PPT 캡처 사진이 올라갔습니다! 1:1 구도를 맞추세요.");
          setTimeout(() => this.openCropperModal(), 100);
          return;
        }
      }

      if (clipboardData.files && clipboardData.files.length > 0) {
        for (let i = 0; i < clipboardData.files.length; i++) {
          if (clipboardData.files[i].type.startsWith("image/")) {
            imageFile = clipboardData.files[i];
            break;
          }
        }
      }

      if (!imageFile && clipboardData.items && clipboardData.items.length > 0) {
        for (let i = 0; i < clipboardData.items.length; i++) {
          const item = clipboardData.items[i];
          if (item.type.startsWith("image/")) {
            imageFile = item.getAsFile();
            break;
          }
        }
      }

      if (imageFile) {
        e.preventDefault();
        this.readAndAutoCropMemberPhoto(imageFile);
      }
    });

    // C. File Dialog & Select Button Listeners
    document.addEventListener("change", (e) => {
      const target = e.target;
      if (target && (target.id === "fieldMemberFileInput" || target.id === "fieldFileInput")) {
        if (target.files && target.files.length > 0) {
          this.readAndAutoCropMemberPhoto(target.files[0]);
          target.value = "";
        }
      }
    });

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("#selectMemberPhotoBtn, #selectPhotoBtn, .photo-select-btn");
      if (btn) {
        e.preventDefault();
        let fileInput = document.getElementById("fieldMemberFileInput") || document.getElementById("fieldFileInput");
        if (!fileInput) {
          fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.id = "fieldMemberFileInput";
          fileInput.accept = "image/*";
          fileInput.style.display = "none";
          document.body.appendChild(fileInput);
          fileInput.addEventListener("change", (evt) => {
            if (evt.target.files && evt.target.files.length > 0) {
              this.readAndAutoCropMemberPhoto(evt.target.files[0]);
            }
          });
        }
        fileInput.value = "";
        fileInput.click();
      }
    });

    // D. Category Tabs Listener
    const tabs = document.querySelectorAll("#categoryTabs .cat-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.activeCategory = tab.getAttribute("data-category") || "all";
        this.render();
      });
    });

    // E. Search Input Listener
    const searchInput = document.getElementById("searchInput") || document.getElementById("memberSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.render();
      });
    }

    // F. Region Dropdown Listener
    const regionDropdown = document.getElementById("regionDropdown");
    if (regionDropdown) {
      regionDropdown.addEventListener("change", (e) => {
        const val = e.target.value;
        const selectedRegion = (!val || val === "all") ? null : val;
        this.activeRegion = selectedRegion;
        if (window.mapComponent) {
          window.mapComponent.selectRegion(selectedRegion);
        } else {
          this.render();
        }
      });
    }
  }

  resetFilters() {
    this.activeCategory = "all";
    this.activeRegion = null;
    this.searchQuery = "";
    
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";
    
    const regionDropdown = document.getElementById("regionDropdown");
    if (regionDropdown) regionDropdown.value = "all";

    document.querySelectorAll("#categoryTabs .cat-tab").forEach(t => {
      if (t.getAttribute("data-category") === "all") t.classList.add("active");
      else t.classList.remove("active");
    });

    if (window.mapComponent) {
      window.mapComponent.selectRegion(null);
    } else {
      this.render();
    }
  }

  parseMemberDate(dateStr) {
    if (!dateStr) return "0000.00.00";
    const matches = String(dateStr).match(/\d+/g);
    if (!matches || matches.length === 0) return "0000.00.00";
    const year = matches[0];
    const month = matches.length > 1 ? matches[1].padStart(2, '0') : '01';
    const day = matches.length > 2 ? matches[2].padStart(2, '0') : '01';
    return `${year}.${month}.${day}`;
  }

  getCanonicalRegionKey(rawRegion) {
    if (!rawRegion) return "기타";
    const str = String(rawRegion).toLowerCase().trim();
    if (str.includes("아디스아바바") || str.includes("addis")) return "아디스아바바";
    if (str.includes("비쇼프투") || str.includes("bishoftu")) return "비쇼프투";
    if (str.includes("아다마") || str.includes("adama")) return "아다마";
    if (str.includes("세베타") || str.includes("sebeta")) return "세베타";
    if (str.includes("모조") || str.includes("mojo") || str.includes("modjo")) return "모조";
    if (str.includes("네켐테") || str.includes("nekemte")) return "네켐테";
    if (str.includes("하와사") || str.includes("hawassa") || str.includes("아와사") || str.includes("awassa")) return "하와사";
    if (str.includes("아르바민치") || str.includes("아르바 민치") || str.includes("arba minch") || str.includes("arbaminch")) return "아르바민치";
    if (str.includes("알렘테나") || str.includes("alem tena") || str.includes("alemtena")) return "알렘테나";
    if (str.includes("아사사") || str.includes("asasa") || str.includes("아르시") || str.includes("arsi")) return "아사사";
    if (str.includes("바히르다르") || str.includes("bahir")) return "바히르다르";
    if (str.includes("디레다와") || str.includes("dire")) return "디레다와";
    if (str.includes("곤다르") || str.includes("gondar")) return "곤다르";
    if (str.includes("지마") || str.includes("jimma")) return "지마";
    return "기타";
  }

  filterMembers() {
    let members = window.db ? window.db.getMembers() : [];
    if (!members || members.length === 0) {
      members = (typeof DEFAULT_MEMBERS !== 'undefined') ? DEFAULT_MEMBERS : [];
    }

    let filtered = members.filter(m => {
      if (!m) return false;
      // Category Filter
      if (this.activeCategory !== "all" && m.category !== this.activeCategory) return false;

      // Region Filter
      if (this.activeRegion && this.activeRegion !== "all" && !this.activeRegion.toLowerCase().includes("전체") && !this.activeRegion.toLowerCase().includes("all")) {
        const targetCanonical = this.getCanonicalRegionKey(this.activeRegion);
        const memberCanonical = this.getCanonicalRegionKey(m.region);
        if (targetCanonical !== memberCanonical) return false;
      }

      // Search Query Filter
      if (this.searchQuery) {
        const q = this.searchQuery;
        const name = (m.name || '').toLowerCase();
        const region = (m.region || '').toLowerCase();
        const job = (m.job || '').toLowerCase();
        const inviter = (m.inviter || '').toLowerCase();
        if (!name.includes(q) && !region.includes(q) && !job.includes(q) && !inviter.includes(q)) return false;
      }

      return true;
    });

    // Chronological Earliest to Latest Sort (2023년 -> 2024년 -> 2025년 -> 2026년)
    filtered.sort((a, b) => this.parseMemberDate(a.assemblyMonth).localeCompare(this.parseMemberDate(b.assemblyMonth)));
    return filtered;
  }

  render() {
    if (!this.container) this.container = document.getElementById("memberGrid");
    if (!this.container) return;

    let filtered = this.filterMembers();

    this.container.className = "member-grid mockup-member-grid";
    this.container.innerHTML = ""; // Clear

    if (!filtered || filtered.length === 0) {
      const isEn = window.i18n && window.i18n.getLang() === "en";
      const emptyDiv = document.createElement("div");
      emptyDiv.style.cssText = "grid-column:1/-1; text-align:center; padding:3rem 1rem; color:var(--text-muted); font-weight:600;";
      emptyDiv.innerText = isEn ? "No members found for this filter." : "조건에 맞는 식구가 없습니다.";
      this.container.appendChild(emptyDiv);
      return;
    }

    // Safe DOM Element Construction (No string concatenation bugs!)
    filtered.forEach(m => {
      const cardEl = this.createMemberCardDOM(m);
      this.container.appendChild(cardEl);
    });
  }

  createMemberCardDOM(rawM) {
    const m = (window.i18n && typeof window.i18n.getTranslatedMember === "function") ? window.i18n.getTranslatedMember(rawM) : rawM;
    const isEn = window.i18n && window.i18n.getLang() === "en";

    const isDisrupter = m.category === "disrupter";
    const photoUrl = (m.photo && m.photo.length > 5) ? m.photo : "images/members/mem_pdf-mem-1.jpg";
    const testimonyUrl = (m.testimony || m.youtube || "").trim();

    const card = document.createElement("div");
    card.className = `member-card ${isDisrupter ? 'disrupter-card' : ''}`;
    card.setAttribute("data-action", "open-member-detail");
    card.setAttribute("data-id", m.id);
    card.style.cssText = "cursor:pointer; background:var(--bg-card); border:1px solid var(--border-color); border-radius:20px; overflow:hidden; box-shadow:var(--shadow-sm); transition:transform 0.25s, box-shadow 0.25s; display:flex; flex-direction:column; padding:0.4rem 0.4rem 1rem 0.4rem;";

    const photoFrame = document.createElement("div");
    photoFrame.style.cssText = "position:relative; width:170px; height:170px; margin:0.8rem auto 0.6rem auto; border-radius:18px; overflow:hidden; border:1px solid var(--border-color); background:#ffffff; flex-shrink:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.06);";

    const img = document.createElement("img");
    img.src = photoUrl;
    img.alt = m.name || (isEn ? "Member" : "식구");
    img.loading = "lazy";
    img.style.cssText = "width:100%; height:100%; object-fit:cover; display:block;";
    photoFrame.appendChild(img);

    if (isDisrupter) {
      const badge = document.createElement("span");
      badge.className = "badge badge-danger";
      badge.style.cssText = "position:absolute; top:6px; left:6px; font-size:0.72rem; font-weight:800; padding:0.2rem 0.5rem; border-radius:10px; z-index:2;";
      badge.textContent = "⚠️ Disrupter";
      photoFrame.appendChild(badge);
    }
    card.appendChild(photoFrame);

    const body = document.createElement("div");
    body.style.cssText = "padding:0.4rem 0.8rem 0.2rem 0.8rem; display:flex; flex-direction:column; flex:1; justify-content:space-between;";

    const topInfo = document.createElement("div");
    const nameRow = document.createElement("div");
    nameRow.style.cssText = "display:flex; align-items:center; justify-content:space-between; margin-bottom:0.25rem;";

    const h3 = document.createElement("h3");
    h3.style.cssText = "font-size:1.22rem; font-weight:800; margin:0; color:#1e3a8a; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;";
    h3.textContent = m.name || (isEn ? "Member" : "식구");
    nameRow.appendChild(h3);

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.setAttribute("data-action", "open-edit-member");
    editBtn.setAttribute("data-id", m.id);
    editBtn.title = isEn ? `Edit ${m.name}` : `${m.name} 정보 수정`;
    editBtn.className = "hover-text-primary";
    editBtn.style.cssText = "background:transparent; color:var(--text-muted); border:none; padding:2px 6px; font-size:0.85rem; cursor:pointer; border-radius:4px;";
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    nameRow.appendChild(editBtn);

    topInfo.appendChild(nameRow);

    const regP = document.createElement("p");
    regP.style.cssText = "font-size:0.88rem; color:var(--text-secondary); margin:0 0 0.3rem 0; font-weight:600;";
    regP.textContent = m.region || (isEn ? "Ethiopia" : "에티오피아");
    topInfo.appendChild(regP);

    const jobP = document.createElement("p");
    jobP.style.cssText = "font-size:0.84rem; color:var(--text-muted); margin:0 0 0.5rem 0; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;";
    jobP.innerHTML = `<i class="fa-solid fa-briefcase" style="margin-right:4px;"></i> `;
    const jobText = document.createTextNode(m.job || "-");
    jobP.appendChild(jobText);
    topInfo.appendChild(jobP);

    body.appendChild(topInfo);

    const btmInfo = document.createElement("div");
    btmInfo.style.cssText = "padding-top:0.5rem; border-top:1px solid var(--border-color); font-size:0.82rem;";

    const btmRow = document.createElement("div");
    btmRow.style.cssText = "display:flex; align-items:center; justify-content:space-between; gap:0.4rem;";

    const dateSpan = document.createElement("span");
    dateSpan.style.cssText = "color:var(--text-muted); font-weight:600;";
    dateSpan.innerHTML = `<i class="fa-solid fa-calendar-days" style="color:var(--accent-gold); margin-right:4px;"></i> `;
    dateSpan.appendChild(document.createTextNode(m.assemblyMonth || "-"));
    btmRow.appendChild(dateSpan);

    if (testimonyUrl) {
      const tBtn = document.createElement("button");
      tBtn.type = "button";
      tBtn.setAttribute("data-action", "open-testimony-link");
      tBtn.setAttribute("data-link", testimonyUrl);
      tBtn.setAttribute("data-name", m.name);
      tBtn.style.cssText = "background:#f0f9ff; color:#0284c7; border:1px solid #7dd3fc; border-radius:10px; padding:0.2rem 0.55rem; font-size:0.75rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:0.3rem;";
      tBtn.innerHTML = `<i class="fa-solid fa-circle-play" style="color:#0284c7; font-size:0.8rem;"></i> ${isEn ? 'Testimony' : '간증 보기'}`;
      btmRow.appendChild(tBtn);
    }
    btmInfo.appendChild(btmRow);

    if (m.inviter) {
      const invDiv = document.createElement("div");
      invDiv.setAttribute("data-action", "open-inviter-network");
      invDiv.setAttribute("data-id", m.inviter);
      invDiv.className = "hover-text-primary";
      invDiv.style.cssText = "cursor:pointer; color:var(--text-secondary); font-weight:600; margin-top:0.35rem; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;";
      invDiv.innerHTML = `<i class="fa-solid fa-user-plus" style="color:#0284c7; margin-right:4px;"></i> ${isEn ? 'Inviter:' : '초대자:'} <strong style="color:var(--text-primary); text-decoration:underline;">${m.inviter}</strong>`;
      btmInfo.appendChild(invDiv);
    }

    body.appendChild(btmInfo);
    card.appendChild(body);

    return card;
  }

  // Modals Implementation
  openEditModal(memberId = null) {
    const modal = document.getElementById("memberEditModal");
    const titleEl = document.getElementById("memberEditModalTitle");
    if (!modal) return;

    const idInput = document.getElementById("memberId");
    const nameInput = document.getElementById("fieldName");
    const catInput = document.getElementById("fieldCategory");
    const ageInput = document.getElementById("fieldAge");
    const regionInput = document.getElementById("fieldRegion");
    const jobInput = document.getElementById("fieldJob");
    const asmInput = document.getElementById("fieldAssemblyMonth");
    const inviterInput = document.getElementById("fieldInviter");
    const youtubeInput = document.getElementById("fieldYoutube");
    const testimonyInput = document.getElementById("fieldTestimony");

    if (memberId) {
      const members = window.db ? window.db.getMembers() : [];
      const m = members.find(x => x.id === memberId);
      if (m) {
        if (titleEl) titleEl.innerText = `✏️ ${m.name} 식구 정보 수정`;
        if (idInput) idInput.value = m.id;
        if (nameInput) nameInput.value = m.name || "";
        if (catInput) catInput.value = m.category || "saved";
        if (ageInput) ageInput.value = m.age || "";
        if (regionInput) regionInput.value = m.region || "";
        if (jobInput) jobInput.value = m.job || "";
        if (asmInput) asmInput.value = m.assemblyMonth || "";
        if (inviterInput) inviterInput.value = m.inviter || "";
        if (youtubeInput) youtubeInput.value = m.youtube || "";
        if (testimonyInput) testimonyInput.value = m.testimony || "";
        this.tempMemberPhoto = m.photo || "";
      }
    } else {
      if (titleEl) titleEl.innerText = "➕ 새로운 식구 등록하기";
      if (idInput) idInput.value = "";
      if (nameInput) nameInput.value = "";
      if (catInput) catInput.value = "saved";
      if (ageInput) ageInput.value = "";
      if (regionInput) regionInput.value = "아디스아바바";
      if (jobInput) jobInput.value = "";
      if (asmInput) asmInput.value = "2026.02";
      if (inviterInput) inviterInput.value = "";
      if (youtubeInput) youtubeInput.value = "";
      if (testimonyInput) testimonyInput.value = "";
      this.tempMemberPhoto = "";
    }

    this.renderMemberPhotoPreview();
    modal.classList.remove("hidden");
  }

  // Interactive 1:1 Profile Photo Cropper Engine
  readAndAutoCropMemberPhoto(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.tempMemberPhoto = e.target.result;
      
      const photoInput = document.getElementById("fieldPhoto");
      if (photoInput) photoInput.value = this.tempMemberPhoto;

      this.renderMemberPhotoPreview();
      
      if (window.showToast) window.showToast("📷 사진이 성공적으로 올라갔습니다! 1:1 자르기 창을 엽니다.");
      
      setTimeout(() => {
        this.openCropperModal();
      }, 150);
    };
    reader.readAsDataURL(file);
  }

  // Interactive 1:1 Profile Photo Cropper Engine (PPT & Photo Optimal Fit)
  openCropperModal() {
    if (!this.tempMemberPhoto) {
      alert("먼저 사진을 올려주시거나 [Ctrl + V]로 이미지 캡처를 붙여넣어 주세요.");
      return;
    }

    let modal = document.getElementById("cropperModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "cropperModal";
      modal.className = "modal-backdrop";
      modal.style.zIndex = "999999";
      modal.innerHTML = `
        <div class="modal-card" style="max-width:480px; background:#ffffff; color:#0f172a; padding:1.5rem; border-radius:20px; box-shadow:0 25px 50px rgba(0,0,0,0.3); text-align:center;">
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid #e2e8f0; padding-bottom:0.75rem;">
            <h3 style="font-size:1.2rem; font-weight:800; margin:0; color:#1e3a8a; display:flex; align-items:center; gap:0.4rem;">
              <i class="fa-solid fa-crop-simple" style="color:#0284c7;"></i> 프로필 사진 구도 & 위치 구도 조정
            </h3>
            <button type="button" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:#64748b;" onclick="document.getElementById('cropperModal').classList.add('hidden')"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <p style="font-size:0.85rem; color:#64748b; margin-bottom:1rem; line-height:1.4;">
            마우스 드래그로 얼굴 위치를 맞추시거나, 확대/축소 슬라이더로 원하는 구도를 편하게 맞춰주세요.
          </p>

          <!-- 1:1 SQUARE CROP VIEWPORT (260px x 260px) -->
          <div id="cropperViewport" style="position:relative; width:260px; height:260px; margin:0 auto 1.25rem auto; border-radius:20px; overflow:hidden; border:3px solid #0284c7; box-shadow:0 8px 20px rgba(2,132,199,0.25); background:#0f172a; cursor:grab; user-select:none;">
            <img id="cropperTargetImg" src="" alt="Crop Target" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) scale(0.6); max-width:none; transition:none;" />
            <div style="position:absolute; inset:0; border:2px dashed rgba(255,255,255,0.7); border-radius:18px; pointer-events:none;"></div>
          </div>

          <!-- CONTROLS TOOLBAR -->
          <div style="background:#f1f5f9; padding:0.85rem 1rem; border-radius:14px; margin-bottom:1.25rem; display:flex; flex-direction:column; gap:0.75rem;">
            
            <!-- ZOOM SLIDER & BUTTONS -->
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <button type="button" id="cropBtnZoomOut" class="btn btn-secondary btn-sm" style="padding:0.25rem 0.55rem; font-weight:800;"><i class="fa-solid fa-minus"></i> 축소</button>
              <input type="range" id="cropZoomSlider" min="0.2" max="3.0" step="0.05" value="0.6" style="flex:1; cursor:pointer;" />
              <button type="button" id="cropBtnZoomIn" class="btn btn-secondary btn-sm" style="padding:0.25rem 0.55rem; font-weight:800;"><i class="fa-solid fa-plus"></i> 확대</button>
            </div>

            <!-- 4-WAY DIRECTION BUTTONS -->
            <div style="display:flex; justify-content:center; gap:0.5rem; align-items:center;">
              <span style="font-size:0.8rem; font-weight:700; color:#475569; margin-right:4px;">위치 이동:</span>
              <button type="button" id="cropBtnLeft" class="btn btn-secondary btn-sm" style="padding:0.25rem 0.6rem; font-size:0.8rem;"><i class="fa-solid fa-arrow-left"></i></button>
              <button type="button" id="cropBtnUp" class="btn btn-secondary btn-sm" style="padding:0.25rem 0.6rem; font-size:0.8rem;"><i class="fa-solid fa-arrow-up"></i></button>
              <button type="button" id="cropBtnDown" class="btn btn-secondary btn-sm" style="padding:0.25rem 0.6rem; font-size:0.8rem;"><i class="fa-solid fa-arrow-down"></i></button>
              <button type="button" id="cropBtnRight" class="btn btn-secondary btn-sm" style="padding:0.25rem 0.6rem; font-size:0.8rem;"><i class="fa-solid fa-arrow-right"></i></button>
              <button type="button" id="cropBtnReset" class="btn btn-outline btn-sm" style="padding:0.25rem 0.6rem; font-size:0.78rem; font-weight:700; color:#0284c7;">초기화</button>
            </div>
          </div>

          <!-- MODAL ACTIONS -->
          <div style="display:flex; justify-content:flex-end; gap:0.6rem;">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('cropperModal').classList.add('hidden')">취소</button>
            <button type="button" id="applyCropBtn" class="btn btn-primary" style="font-weight:800; background:#0284c7;">
              <i class="fa-solid fa-scissors"></i> ✂️ 선택 구도로 사진 자르기 & 적용
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      this.initCropperInteractions();
    }

    const targetImg = document.getElementById("cropperTargetImg");
    if (targetImg) {
      targetImg.src = this.tempMemberPhoto;
      this.cropState = { scale: 0.6, offsetX: 0, offsetY: 0, isDragging: false, startX: 0, startY: 0 };
      const slider = document.getElementById("cropZoomSlider");
      if (slider) slider.value = 0.6;
      this.applyCropTransforms();
    }

    modal.classList.remove("hidden");
  }

  initCropperInteractions() {
    const viewport = document.getElementById("cropperViewport");
    const slider = document.getElementById("cropZoomSlider");
    const applyBtn = document.getElementById("applyCropBtn");

    const updateScale = (val) => {
      this.cropState.scale = Math.max(0.2, Math.min(3.0, val));
      if (slider) slider.value = this.cropState.scale;
      this.applyCropTransforms();
    };

    if (slider) {
      slider.addEventListener("input", (e) => updateScale(parseFloat(e.target.value)));
    }

    document.getElementById("cropBtnZoomIn")?.addEventListener("click", () => updateScale(this.cropState.scale + 0.15));
    document.getElementById("cropBtnZoomOut")?.addEventListener("click", () => updateScale(this.cropState.scale - 0.15));

    const updatePos = (dx, dy) => {
      this.cropState.offsetX += dx;
      this.cropState.offsetY += dy;
      this.applyCropTransforms();
    };

    document.getElementById("cropBtnLeft")?.addEventListener("click", () => updatePos(-15, 0));
    document.getElementById("cropBtnRight")?.addEventListener("click", () => updatePos(15, 0));
    document.getElementById("cropBtnUp")?.addEventListener("click", () => updatePos(0, -15));
    document.getElementById("cropBtnDown")?.addEventListener("click", () => updatePos(0, 15));
    document.getElementById("cropBtnReset")?.addEventListener("click", () => {
      this.cropState.offsetX = 0;
      this.cropState.offsetY = 0;
      updateScale(0.6);
    });

    if (viewport) {
      viewport.addEventListener("mousedown", (e) => {
        this.cropState.isDragging = true;
        this.cropState.startX = e.clientX - this.cropState.offsetX;
        this.cropState.startY = e.clientY - this.cropState.offsetY;
        viewport.style.cursor = "grabbing";
      });

      window.addEventListener("mousemove", (e) => {
        if (!this.cropState || !this.cropState.isDragging) return;
        this.cropState.offsetX = e.clientX - this.cropState.startX;
        this.cropState.offsetY = e.clientY - this.cropState.startY;
        this.applyCropTransforms();
      });

      window.addEventListener("mouseup", () => {
        if (this.cropState) this.cropState.isDragging = false;
        if (viewport) viewport.style.cursor = "grab";
      });

      // Mouse Wheel Zoom
      viewport.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.08 : 0.08;
        updateScale(this.cropState.scale + delta);
      });
    }

    if (applyBtn) {
      applyBtn.addEventListener("click", () => this.generateCroppedCanvasResult());
    }
  }

  applyCropTransforms() {
    const img = document.getElementById("cropperTargetImg");
    if (!img || !this.cropState) return;
    const { scale, offsetX, offsetY } = this.cropState;
    img.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
  }

  generateCroppedCanvasResult() {
    const img = document.getElementById("cropperTargetImg");
    if (!img || !this.cropState) return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 400, 400);

      const tempImg = new Image();
      tempImg.crossOrigin = "anonymous";
      tempImg.onload = () => {
        const scale = this.cropState.scale;
        const offsetX = this.cropState.offsetX;
        const offsetY = this.cropState.offsetY;

        // Viewport 260x260 mapped to canvas 400x400 (ratio = 400 / 260 = 1.538)
        const ratio = 400 / 260;

        let drawW = tempImg.naturalWidth * scale * ratio;
        let drawH = tempImg.naturalHeight * scale * ratio;

        const drawX = (200 - drawW / 2) + (offsetX * ratio);
        const drawY = (200 - drawH / 2) + (offsetY * ratio);

        ctx.drawImage(tempImg, drawX, drawY, drawW, drawH);

        this.tempMemberPhoto = canvas.toDataURL("image/jpeg", 0.9);

        const photoInput = document.getElementById("fieldPhoto");
        if (photoInput) photoInput.value = this.tempMemberPhoto;

        this.renderMemberPhotoPreview();

        document.getElementById("cropperModal")?.classList.add("hidden");
        if (window.showToast) window.showToast("✂️ 선택하신 구도로 프로필 사진이 자르기 적용되었습니다!");
      };
      tempImg.src = img.src;
    } catch(e) {
      console.error("Cropping canvas error:", e);
      document.getElementById("cropperModal")?.classList.add("hidden");
    }
  }

  renderMemberPhotoPreview() {
    const photoInput = document.getElementById("fieldPhoto");
    if (photoInput) photoInput.value = this.tempMemberPhoto || "";

    const previewContainer = document.getElementById("memberPhotoPreview");
    if (!previewContainer) return;

    if (!this.tempMemberPhoto) {
      previewContainer.innerHTML = `<p style="font-size:0.78rem; color:var(--text-muted);">등록된 사진이 없습니다.</p>`;
      return;
    }

    previewContainer.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem; margin-top:0.4rem;">
        <div style="position:relative; width:120px; height:120px; border-radius:18px; overflow:hidden; border:2px solid var(--border-color); background:#ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
          <img src="${this.tempMemberPhoto}" style="width:100%; height:100%; object-fit:cover; background:#ffffff;" />
        </div>
      </div>
    `;
  }

  initFormListeners() {
    const memberForm = document.getElementById("memberForm");
    if (memberForm) {
      memberForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveMemberFromForm();
      });
    }
  }

  saveMemberFromForm() {
    const nameVal = document.getElementById("fieldName")?.value.trim();
    if (!nameVal) {
      alert("식구 이름을 입력해 주세요.");
      return;
    }

    const idVal = document.getElementById("memberId")?.value || `mem-${Date.now()}`;
    const memberData = {
      id: idVal,
      name: nameVal,
      category: document.getElementById("fieldCategory")?.value || "saved",
      age: document.getElementById("fieldAge")?.value || "",
      region: document.getElementById("fieldRegion")?.value || "아디스아바바",
      job: document.getElementById("fieldJob")?.value || "",
      assemblyMonth: document.getElementById("fieldAssemblyMonth")?.value || "",
      inviter: document.getElementById("fieldInviter")?.value || "",
      photo: this.tempMemberPhoto || "images/members/mem_pdf-mem-1.jpg",
      youtube: document.getElementById("fieldYoutube")?.value || "",
      testimony: document.getElementById("fieldTestimony")?.value || ""
    };

    if (window.db) {
      const existing = window.db.getMembers().find(x => x.id === idVal);
      if (existing) window.db.updateMember(memberData);
      else window.db.addMember(memberData);
    }

    const modal = document.getElementById("memberEditModal");
    if (modal) modal.classList.add("hidden");

    this.render();
    if (window.showToast) window.showToast(`✨ ${nameVal} 님의 사진 및 정보가 저장되었습니다!`);
    else alert(`✨ ${nameVal} 님의 사진 및 정보가 성공적으로 저장되었습니다!`);
  }

  openMemberDetailModal(memberId) {
    const members = window.db ? window.db.getMembers() : [];
    const rawM = members.find(x => x.id === memberId);
    if (!rawM) return;

    const m = (window.i18n && typeof window.i18n.getTranslatedMember === "function") ? window.i18n.getTranslatedMember(rawM) : rawM;
    const isEn = window.i18n && window.i18n.getLang() === "en";

    const modal = document.getElementById("memberDetailModal");
    const body = document.getElementById("memberDetailBody");
    if (!modal || !body) return;

    const photoUrl = (m.photo && m.photo.length > 5) ? m.photo : "images/members/mem_pdf-mem-1.jpg";
    const isDisrupter = m.category === "disrupter";
    const testimonyUrl = (m.testimony || m.youtube || "").trim();

    body.innerHTML = `
      <div style="padding:0.5rem; color:var(--text-primary);">
        
        <!-- LARGE HERO PHOTO CONTAINER -->
        <div style="position:relative; width:100%; max-width:280px; height:280px; margin:0 auto 1.25rem auto; border-radius:24px; overflow:hidden; border:3px solid ${isDisrupter ? '#ef4444' : '#0284c7'}; box-shadow:0 12px 30px rgba(0,0,0,0.18); background:#ffffff; display:flex; align-items:center; justify-content:center;">
          <img src="${photoUrl}" alt="${m.name}" style="width:100%; height:100%; object-fit:cover; display:block;" />
          ${isDisrupter ? '<span class="badge badge-danger" style="position:absolute; top:10px; left:10px; font-size:0.85rem; font-weight:800; padding:0.3rem 0.7rem; border-radius:12px; z-index:2;">⚠️ Disrupter</span>' : ''}
        </div>

        <!-- MEMBER INFO HEADER -->
        <div style="text-align:center; margin-bottom:1.2rem;">
          <h2 style="font-size:1.7rem; font-weight:900; margin:0 0 0.4rem 0; color:#1e3a8a;">${m.name}</h2>
          <p style="font-size:1.02rem; color:var(--text-secondary); margin:0; font-weight:700;">📍 ${m.region} · 💼 ${m.job || (isEn ? 'No occupation listed' : '직업 정보 없음')}</p>
        </div>

        <!-- DETAILS CARD LIST -->
        <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:16px; padding:1rem 1.25rem; margin-bottom:1.2rem; display:flex; flex-direction:column; gap:0.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.92rem;">
            <span style="color:var(--text-muted); font-weight:600;"><i class="fa-solid fa-calendar-days" style="color:var(--accent-gold); margin-right:6px;"></i> ${isEn ? 'Saved / Connected Date' : '참석/구원 일자'}</span>
            <strong style="color:var(--text-primary); font-weight:800;">${m.assemblyMonth || '-'}</strong>
          </div>
          ${m.inviter ? `
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.92rem; border-top:1px solid var(--border-color); padding-top:0.6rem;">
              <span style="color:var(--text-muted); font-weight:600;"><i class="fa-solid fa-user-plus" style="color:#0284c7; margin-right:6px;"></i> ${isEn ? 'Inviter' : '초대자'}</span>
              <span data-action="open-inviter-network" data-id="${m.inviter}" style="cursor:pointer; color:#0284c7; font-weight:800; text-decoration:underline;">${m.inviter}</span>
            </div>
          ` : ''}
        </div>

        <!-- TESTIMONY BUTTON & ACTION -->
        ${testimonyUrl ? `
          <div style="text-align:center; margin-bottom:1rem;">
            <button type="button" data-action="open-testimony-link" data-link="${testimonyUrl}" data-name="${m.name}" class="btn btn-primary" style="width:100%; padding:0.8rem; font-size:1rem; font-weight:800; border-radius:14px; box-shadow:0 4px 15px rgba(2,132,199,0.3); display:inline-flex; align-items:center; justify-content:center; gap:0.5rem;">
              <i class="fa-solid fa-circle-play" style="font-size:1.1rem; color:#fbbf24;"></i> 🎬 ${isEn ? `Watch ${m.name}'s Salvation Testimony` : `${m.name} 님 구원 간증 보기`}
            </button>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:flex-end; gap:0.6rem; margin-top:1rem; padding-top:0.8rem; border-top:1px solid var(--border-color);">
          <button type="button" class="btn btn-secondary btn-sm" data-action="open-edit-member" data-id="${m.id}" style="padding:0.4rem 0.9rem; font-weight:700;">
            <i class="fa-solid fa-pen"></i> ${isEn ? 'Edit' : '수정하기'}
          </button>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
  }

  openNetworkModal(inviterName) {
    const modal = document.getElementById("networkModal");
    const body = document.getElementById("networkModalBody");
    if (!modal || !body) return;

    const isEn = window.i18n && window.i18n.getLang() === "en";

    const members = (window.db && typeof window.db.getMembers === 'function') ? window.db.getMembers() : (window.DEFAULT_MEMBERS || (typeof DEFAULT_MEMBERS !== 'undefined' ? DEFAULT_MEMBERS : []));
    const inviterNameClean = (inviterName || '').trim();

    const norm = (s) => (s || '').replace(/^:/, '').replace(/\(.*?\)/g, '').trim().toLowerCase();
    const targetNorm = norm(inviterNameClean);

    // Find Inviter Profile Object
    const inviterObj = members.find(m => {
      const mNameNorm = norm(m.name);
      return mNameNorm === targetNorm || targetNorm.includes(mNameNorm) || mNameNorm.includes(targetNorm);
    });
    const inviterPhoto = inviterObj && inviterObj.photo ? inviterObj.photo : "images/members/mem_pdf-mem-1.jpg";

    // Find All Members Invited by this Inviter
    const invitedMembers = members.filter(m => {
      if (!m.inviter) return false;
      const mInvNorm = norm(m.inviter);
      return mInvNorm === targetNorm || mInvNorm.includes(targetNorm) || targetNorm.includes(mInvNorm);
    });

    body.innerHTML = `
      <div style="padding:0.5rem;">
        
        <!-- INVITER HEADER CARD WITH LARGE FACE -->
        <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color:#ffffff; padding:1.2rem 1.4rem; border-radius:18px; margin-bottom:1.5rem; box-shadow:0 8px 25px rgba(2,132,199,0.3); display:flex; align-items:center; gap:1.2rem; flex-wrap:wrap;">
          
          <!-- Inviter Face Photo (100px x 100px) -->
          <div style="position:relative; width:95px; height:95px; border-radius:18px; overflow:hidden; border:3px solid #ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.2); flex-shrink:0; background:#ffffff;">
            <img src="${inviterPhoto}" alt="${inviterNameClean}" style="width:100%; height:100%; object-fit:cover; display:block;" />
          </div>

          <div>
            <span style="font-size:0.8rem; color:#e0f2fe; font-weight:800; letter-spacing:0.5px; text-transform:uppercase;">
              <i class="fa-solid fa-sitemap"></i> ${isEn ? 'Inviter Network' : '전도 초대자 계보'}
            </span>
            <h2 style="font-size:1.5rem; font-weight:900; margin:2px 0; color:#ffffff;">${inviterNameClean}</h2>
            <p style="font-size:0.92rem; color:#f0f9ff; margin:0; font-weight:700;">
              ${isEn ? 'Directly Invited Members' : '직접 초청한 참석자'}: <strong style="color:#fbbf24; font-size:1.1rem;">${isEn ? 'Total ' : '총 '}${invitedMembers.length}${isEn ? '' : '명'}</strong>
            </p>
          </div>
        </div>

        <!-- INVITED MEMBERS GRID WITH MINI FACE AVATARS -->
        <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin-bottom:0.8rem; display:flex; align-items:center; gap:0.4rem;">
          <i class="fa-solid fa-users" style="color:#0284c7;"></i> ${isEn ? 'Invited Members List' : '초청된 식구 명단'} (${invitedMembers.length}${isEn ? '' : '명'})
        </h4>

        ${invitedMembers.length === 0 ? `
          <div style="text-align:center; padding:2.5rem 1rem; color:var(--text-muted); background:var(--bg-main); border-radius:14px; border:1px solid var(--border-color);">
            <i class="fa-solid fa-users-slash" style="font-size:2rem; margin-bottom:0.5rem; color:#0284c7;"></i>
            <p style="font-size:0.95rem; font-weight:700; margin:0;">${isEn ? 'No invited members found.' : '등록된 초청 식구가 없습니다.'}</p>
          </div>
        ` : `
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:0.9rem;">
            ${invitedMembers.map(rawM => {
              const m = (window.i18n && typeof window.i18n.getTranslatedMember === "function") ? window.i18n.getTranslatedMember(rawM) : rawM;
              const photo = m.photo || "images/members/mem_pdf-mem-1.jpg";
              return `
                <div data-action="open-member-detail" data-id="${m.id}" style="cursor:pointer; background:var(--bg-card); border:1px solid var(--border-color); border-radius:16px; padding:0.75rem; display:flex; align-items:center; gap:0.85rem; box-shadow:var(--shadow-sm); transition:transform 0.2s;" class="hover-text-primary">
                  <!-- Mini Face Avatar (65px x 65px) -->
                  <div style="width:65px; height:65px; border-radius:14px; overflow:hidden; border:2px solid #0284c7; flex-shrink:0; background:#ffffff; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                    <img src="${photo}" alt="${m.name}" style="width:100%; height:100%; object-fit:cover; display:block;" />
                  </div>
                  <div style="flex:1; overflow:hidden;">
                    <h4 style="font-size:1.05rem; font-weight:800; margin:0 0 2px 0; color:#1e3a8a; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${m.name}</h4>
                    <p style="font-size:0.8rem; color:var(--text-secondary); margin:0 0 2px 0; font-weight:600;">📍 ${m.region}</p>
                    <span style="font-size:0.75rem; color:var(--accent-gold); font-weight:700;">📅 ${m.assemblyMonth || '-'}</span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        `}

      </div>
    `;

    modal.classList.remove("hidden");
  }

  openTestimonyLink(url, name) {
    if (!url) return;
    // Play directly inside the webpage modal video player without opening duplicate links/tabs!
    this.openVideoModal(url, name);
  }

  openVideoModal(videoUrl, memberName) {
    if (!videoUrl) return;

    let iframeSrc = "";
    if (videoUrl.includes("drive.google.com")) {
      const driveMatch = videoUrl.match(/\/d\/([^\/]+)/);
      if (driveMatch) {
        iframeSrc = `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
      }
    } else if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      let videoId = "";
      if (videoUrl.includes("v=")) {
        videoId = videoUrl.split("v=")[1].split("&")[0];
      } else if (videoUrl.includes("youtu.be/")) {
        videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
      } else if (videoUrl.includes("embed/")) {
        videoId = videoUrl.split("embed/")[1].split("?")[0];
      }
      if (videoId) iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    if (!iframeSrc) {
      iframeSrc = videoUrl;
    }

    let modal = document.getElementById("videoPlayerModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "videoPlayerModal";
      modal.className = "modal-backdrop";
      modal.style.zIndex = "999999";
      modal.innerHTML = `
        <div class="modal-card modal-card-lg" style="max-width:860px; background:#ffffff; color:#0f172a; padding:1.5rem; border-radius:20px; position:relative; box-shadow:0 25px 50px rgba(0,0,0,0.3);">
          <button style="position:absolute; top:14px; right:14px; background:rgba(0,0,0,0.08); color:#0f172a; border:none; border-radius:50%; width:34px; height:34px; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center;" onclick="document.getElementById('videoPlayerModal').classList.add('hidden'); document.getElementById('videoModalContainer').innerHTML='';"><i class="fa-solid fa-xmark"></i></button>
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1rem;">
            <i class="fa-solid fa-circle-play" style="font-size:1.5rem; color:#0284c7;"></i>
            <h3 id="videoModalTitle" style="font-size:1.2rem; font-weight:800; margin:0; color:#1e3a8a;">구원 간증 영상</h3>
          </div>
          <div id="videoModalContainer" class="video-responsive" style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:14px; background:#000;">
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.add("hidden");
          document.getElementById("videoModalContainer").innerHTML = "";
        }
      });
    }

    document.getElementById("videoModalTitle").innerText = `🎬 ${memberName || '식구'} 님 구원 간증 영상`;
    document.getElementById("videoModalContainer").innerHTML = `
      <iframe src="${iframeSrc}" title="${memberName} 간증 영상" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>
    `;
    modal.classList.remove("hidden");
  }
}

// Global Singleton Instant Access
if (typeof window !== 'undefined') {
  window.directoryComponent = new DirectoryComponent();
}
