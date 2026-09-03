/**
 * 에티오피아 선교 아카이브 - 교제 & 선교 활동 모듈
 */

class FellowshipComponent {
  constructor() {
    this.activeCategory = "all"; // all | fellowship | house | outreach | study | other
    this.tempFellowshipImages = [];
    this.container = document.getElementById("fellowshipGridContainer") || document.getElementById("assemblyGrid");
    this.initEvents();
  }

  initEvents() {
    // Category Tabs Listener
    const tabs = document.querySelectorAll("#fellowshipCategoryTabs .cat-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.activeCategory = tab.getAttribute("data-category");
        this.render();
      });
    });

    // Add Fellowship Button Event
    const addBtn = document.getElementById("addNewFellowshipBtn");
    if (addBtn) {
      addBtn.addEventListener("click", () => this.openEditModal());
    }

    // Modal Close Data-Close Handler
    document.querySelectorAll('[data-close="fellowshipEditModal"]').forEach(btn => {
      btn.addEventListener("click", () => {
        document.getElementById("fellowshipEditModal")?.classList.add("hidden");
      });
    });

    // Photo Upload & DropZone & File Input Handlers
    const selectBtn = document.getElementById("selectFellowshipPhotosBtn");
    const fileInput = document.getElementById("fieldFellowshipFileInput");
    const dropZone = document.getElementById("fellowshipDropZone");

    if (selectBtn && fileInput) {
      selectBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.value = "";
        fileInput.click();
      });
    }

    if (dropZone && fileInput) {
      dropZone.addEventListener("click", (e) => {
        if (e.target !== fileInput && selectBtn && !selectBtn.contains(e.target)) {
          fileInput.value = "";
          fileInput.click();
        }
      });

      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });

      dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
      });

      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.readPhotoFiles(e.dataTransfer.files);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.readPhotoFiles(e.target.files);
          fileInput.value = "";
        }
      });
    }

    // Clipboard Paste Listener for Images (Ctrl+V)
    document.addEventListener("paste", (e) => {
      const modal = document.getElementById("fellowshipEditModal");
      if (!modal || modal.classList.contains("hidden")) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      let found = false;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            found = true;
            this.readPhotoFiles([file]);
          }
        }
      }
      if (found) e.preventDefault();
    });
  }

  processPhotoFile(file) {
    return new Promise((resolve) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawDataUrl = e.target.result;
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            let w = img.width;
            let h = img.height;
            const maxDim = 720;
            if (w > maxDim || h > maxDim) {
              if (w > h) {
                h = Math.round((h * maxDim) / w);
                w = maxDim;
              } else {
                w = Math.round((w * maxDim) / h);
                h = maxDim;
              }
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL("image/jpeg", 0.68));
          } catch(err) {
            console.error("Canvas compression error, using raw DataURL:", err);
            resolve(rawDataUrl);
          }
        };
        img.onerror = () => resolve(rawDataUrl);
        img.src = rawDataUrl;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  async readPhotoFiles(files) {
    if (!files || files.length === 0) return;

    const modal = document.getElementById("fellowshipEditModal");
    const saveBtn = modal ? modal.querySelector("button[type='submit']") : null;
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 사진 압축 처리 중...`;
    }

    if (window.showToast) window.showToast("📷 사진을 최적화 압축하는 중입니다...");

    const fileArray = Array.from(files);
    const results = await Promise.all(fileArray.map(file => this.processPhotoFile(file)));

    if (!this.tempFellowshipImages) this.tempFellowshipImages = [];
    results.forEach(dataUrl => {
      if (dataUrl) this.tempFellowshipImages.push(dataUrl);
    });

    this.renderPhotoPreviews();

    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = `저장하기`;
    }

    if (window.showToast) window.showToast("✨ 활동 소식 사진이 첨부되었습니다!");
  }

  renderPhotoPreviews() {
    const previewContainer = document.getElementById("fellowshipImagesPreview");
    if (!previewContainer) return;

    if (!this.tempFellowshipImages || this.tempFellowshipImages.length === 0) {
      previewContainer.innerHTML = `<p style="font-size:0.82rem; color:var(--text-muted); width:100%; margin:0.3rem 0;">📷 첨부된 사진이 없습니다. 버튼 클릭, 드래그 또는 Ctrl+V로 추가할 수 있습니다.</p>`;
      return;
    }

    previewContainer.innerHTML = this.tempFellowshipImages.map((src, idx) => `
      <div style="position:relative; width:90px; height:90px; border-radius:10px; overflow:hidden; border:2px solid var(--border-color); box-shadow:0 3px 10px rgba(0,0,0,0.15);">
        <img src="${src}" style="width:100%; height:100%; object-fit:cover;" />
        <button type="button" onclick="event.stopPropagation(); window.fellowshipComponent.removePhoto(${idx})" title="삭제" style="position:absolute; top:3px; right:3px; background:rgba(239,68,68,0.9); color:#fff; border:none; border-radius:50%; width:22px; height:22px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');
  }

  removePhoto(idx) {
    if (!this.tempFellowshipImages) return;
    this.tempFellowshipImages.splice(idx, 1);
    this.renderPhotoPreviews();
  }

  getCategoryLabel(cat) {
    switch (cat) {
      case "fellowship": return { text: "☕ 교제", color: "#0284c7", bg: "#f0f9ff" };
      case "daily": return { text: "🏠 일상", color: "#166534", bg: "#f0fdf4" };
      case "visit": return { text: "🚗 탐방", color: "#b45309", bg: "#fffbeb" };
      case "book": return { text: "📚 책자", color: "#6b21a8", bg: "#faf5ff" };
      default: return { text: "📌 기타", color: "#475569", bg: "#f8fafc" };
    }
  }

  openEditModal(id = null) {
    if (window.checkAdminPermission && !window.checkAdminPermission()) return;

    const modal = document.getElementById("fellowshipEditModal");
    if (!modal) return;

    const titleEl = document.getElementById("fellowshipEditModalTitle");
    const list = window.db ? window.db.getFellowship() : [];
    const item = id ? list.find(f => f.id === id) : null;

    document.getElementById("fieldFellowshipId").value = item ? item.id : "";
    document.getElementById("fieldFellowshipDate").value = item ? item.date || "" : "";
    document.getElementById("fieldFellowshipCategory").value = item ? item.category || "fellowship" : "fellowship";
    document.getElementById("fieldFellowshipTitle").value = item ? item.title || "" : "";
    document.getElementById("fieldFellowshipLocation").value = item ? item.location || "" : "";
    document.getElementById("fieldFellowshipParticipants").value = item ? item.participants || "" : "";
    document.getElementById("fieldFellowshipDesc").value = item ? item.desc || "" : "";

    this.tempFellowshipImages = item && item.images ? [...item.images] : [];
    this.renderPhotoPreviews();

    if (titleEl) {
      titleEl.innerText = item ? "교제 & 선교 활동 소식 수정" : "새 교제 & 선교 활동 소식 작성";
    }

    modal.classList.remove("hidden");
  }

  saveFellowshipFromForm() {
    if (window.checkAdminPermission && !window.checkAdminPermission()) return;

    const id = document.getElementById("fieldFellowshipId").value;
    const date = document.getElementById("fieldFellowshipDate").value.trim();
    const category = document.getElementById("fieldFellowshipCategory").value;
    const title = document.getElementById("fieldFellowshipTitle").value.trim();
    const location = document.getElementById("fieldFellowshipLocation").value.trim();
    const participants = document.getElementById("fieldFellowshipParticipants").value.trim();
    const desc = document.getElementById("fieldFellowshipDesc").value.trim();

    if (!title || !date) {
      alert("날짜와 제목을 입력해 주세요.");
      return;
    }

    const itemData = {
      id: id || ("fel-" + Date.now()),
      date, category, title, location, participants, desc,
      images: this.tempFellowshipImages || []
    };

    if (window.db) {
      if (id) {
        window.db.updateFellowship(itemData);
      } else {
        window.db.addFellowship(itemData);
      }
    }

    document.getElementById("fellowshipEditModal")?.classList.add("hidden");
    if (window.showToast) window.showToast("✨ 활동 소식이 성공적으로 저장되었습니다!");
    this.render();
  }

  deleteFellowship(id) {
    if (window.checkAdminPermission && !window.checkAdminPermission()) return;

    if (confirm("정말로 이 활동 소식을 삭제하시겠습니까?")) {
      if (window.db) window.db.deleteFellowship(id);
      this.render();
    }
  }

  render() {
    this.container = document.getElementById("fellowshipGridContainer") || document.getElementById("assemblyGrid");
    if (!this.container) return;

    const list = window.db ? window.db.getFellowship() : [];
    const isAdmin = window.isAdminLoggedIn ? window.isAdminLoggedIn() : false;

    // Filter by activeCategory
    const filtered = this.activeCategory === "all" 
      ? list 
      : list.filter(item => item.category === this.activeCategory);

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state" style="padding:3rem 1rem; text-align:center; width:100%; color:var(--text-secondary);">
          <i class="fa-solid fa-camera-retro" style="font-size:2.8rem; color:#cbd5e1; margin-bottom:1rem; display:block;"></i>
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin-bottom:0.4rem;">등록된 교제 & 활동 소식이 없습니다.</h3>
          <p style="font-size:0.9rem;">[새 활동 소식 작성하기] 버튼을 눌러 성도 교제 및 일상 소식을 올려보세요.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1.8rem; width:100%;">
        ${filtered.map(item => {
          const catInfo = this.getCategoryLabel(item.category);
          const images = item.images || [];

          return `
            <div class="fellowship-card" style="background:#ffffff; border:1px solid var(--border-color); border-radius:18px; padding:1.8rem; box-shadow:var(--shadow-sm); transition:all 0.2s ease;">
              
              <!-- Card Header Meta Bar -->
              <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.8rem; margin-bottom:1.2rem;">
                <div style="display:flex; align-items:center; gap:0.8rem; flex-wrap:wrap;">
                  <span style="background:${catInfo.bg}; color:${catInfo.color}; border:1px solid ${catInfo.color}33; font-weight:800; font-size:0.88rem; padding:0.35rem 0.9rem; border-radius:20px;">
                    ${catInfo.text}
                  </span>
                  <span style="font-weight:700; font-size:0.95rem; color:var(--text-secondary); display:flex; align-items:center; gap:5px;">
                    <i class="fa-solid fa-calendar-days" style="color:#0284c7;"></i> ${item.date}
                  </span>
                  ${item.location ? `
                    <span style="font-weight:700; font-size:0.92rem; color:var(--text-muted); display:flex; align-items:center; gap:5px;">
                      <i class="fa-solid fa-location-dot" style="color:#eab308;"></i> ${item.location}
                    </span>
                  ` : ''}
                </div>

                ${isAdmin ? `
                  <div style="display:flex; gap:0.5rem; margin-left:auto;">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); window.fellowshipComponent.openEditModal('${item.id}')" title="수정">
                      <i class="fa-solid fa-pen"></i> 수정
                    </button>
                    <button type="button" class="btn btn-danger btn-sm icon-only" onclick="event.stopPropagation(); window.fellowshipComponent.deleteFellowship('${item.id}')" title="삭제">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                ` : ''}
              </div>

              <!-- Card Title -->
              <h3 style="font-size:1.45rem; font-weight:800; color:var(--text-primary); margin:0 0 1rem 0; border-left:4px solid #0284c7; padding-left:0.75rem;">
                ${item.title}
              </h3>

              <!-- Description -->
              <div style="font-size:1.02rem; line-height:1.75; color:var(--text-primary); white-space:pre-line; margin-bottom:1.2rem;">
                ${item.desc}
              </div>

              <!-- Participants Tagging -->
              ${item.participants ? `
                <div style="margin-bottom:1.4rem; background:#f8fafc; padding:0.65rem 1rem; border-radius:12px; border:1px solid #e2e8f0; font-size:0.9rem; font-weight:700; color:#334155; display:flex; align-items:center; gap:8px;">
                  <i class="fa-solid fa-users" style="color:#0284c7;"></i> 함께한 식구: <span style="color:#0369a1;">${item.participants}</span>
                </div>
              ` : ''}

              <!-- Photo Gallery Grid -->
              ${images.length > 0 ? `
                <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:0.9rem; margin-top:1.2rem;">
                  ${images.map((img, imgIdx) => `
                    <div style="position:relative; height:180px; border-radius:12px; overflow:hidden; border:1px solid var(--border-color); cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.08);" onclick="window.timelineComponent ? window.timelineComponent.openPhotoLightbox(${JSON.stringify(images).replace(/"/g, '&quot;')}, ${imgIdx}) : window.open('${img}', '_blank')">
                      <img src="${img}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.3s;" class="hover-scale-img" />
                    </div>
                  `).join('')}
                </div>
              ` : ''}

            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}

window.FellowshipComponent = FellowshipComponent;
// Backwards compatibility alias
window.AssembliesComponent = FellowshipComponent;
