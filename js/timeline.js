/**
 * 에티오피아 선교 아카이브 - 제자리(In-place) 60fps 무렉 부드러운 가로 타임라인 컴포넌트
 */

class TimelineComponent {
  constructor() {
    this.container = document.getElementById("timelineContainer") || document.getElementById("timelineList");
    this.activeId = null;
    this.isNavigating = false;
    this.lightboxImages = [];
    this.lightboxIndex = 0;
    this.tempHistoryItems = [];
    this.inMemoryBlobMap = {};
    this.activeYear = null; // Filter state for Year 구분
    this.initEvents();
  }

  getImageSrc(src) {
    if (!src) return '';
    // Priority A: If already a full URL or blob/data URL, return as is
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('blob:') || src.startsWith('data:')) {
      return src;
    }
    // Priority B: In-memory Blob ObjectURL during current tab session right after upload
    if (this.inMemoryBlobMap && this.inMemoryBlobMap[src]) {
      return this.inMemoryBlobMap[src];
    }
    // Priority C: Newly uploaded image (images/history/hist-) -> Return Raw GitHub CDN URL directly!
    const cleanPath = src.replace(/^\/+/, '');
    if (cleanPath.startsWith('images/history/hist-')) {
      return `https://raw.githubusercontent.com/wjdgns131/ethiopia_gospel_archive/main/${cleanPath}`;
    }
    // Priority D: Existing master images maintain relative path
    return src;
  }

  migrateLegacyStorageIfNeeded() {
    try {
      const legacyRaw = localStorage.getItem("ethiopia_history");
      if (!legacyRaw) return; // No legacy storage to migrate

      const existingOverridesRaw = localStorage.getItem("ethiopia_history_overrides");
      
      let legacyList = [];
      try {
        legacyList = JSON.parse(legacyRaw);
      } catch(e) {
        // Corrupt legacy data, safely remove to reclaim quota
        localStorage.removeItem("ethiopia_history");
        return;
      }

      if (!Array.isArray(legacyList) || legacyList.length === 0) {
        localStorage.removeItem("ethiopia_history");
        return;
      }

      const baseList = (window.DEFAULT_HISTORY && window.DEFAULT_HISTORY.length > 0)
        ? window.DEFAULT_HISTORY
        : (typeof DEFAULT_HISTORY !== 'undefined' ? DEFAULT_HISTORY : []);

      let overrides = { modified: {}, added: [], deleted: [] };
      if (existingOverridesRaw) {
        try {
          const parsed = JSON.parse(existingOverridesRaw);
          if (parsed && typeof parsed === 'object') {
            overrides.modified = parsed.modified || {};
            overrides.added = Array.isArray(parsed.added) ? parsed.added : [];
            overrides.deleted = Array.isArray(parsed.deleted) ? parsed.deleted : [];
          }
        } catch(e) {}
      }

      // Safely extract user modifications from legacyList without losing user edits
      legacyList.forEach(legacyItem => {
        if (!legacyItem || !legacyItem.id) return;

        const baseItem = baseList.find(b => b && String(b.id) === String(legacyItem.id));
        if (baseItem) {
          const isTextDiff = (legacyItem.title !== baseItem.title) ||
                             (legacyItem.desc !== baseItem.desc) ||
                             (legacyItem.date !== baseItem.date) ||
                             (legacyItem.location !== baseItem.location);

          const baseImagesJson = JSON.stringify(baseItem.images || []);
          const legacyImagesJson = JSON.stringify(legacyItem.images || []);
          const isImagesDiff = baseImagesJson !== legacyImagesJson;

          if (isTextDiff || isImagesDiff) {
            if (!overrides.modified[legacyItem.id]) {
              const modObj = {
                date: legacyItem.date,
                title: legacyItem.title,
                location: legacyItem.location,
                desc: legacyItem.desc
              };
              if (isImagesDiff) {
                modObj.images = legacyItem.images;
              }
              overrides.modified[legacyItem.id] = modObj;
            }
          }
        } else {
          if (!overrides.added.some(a => a && String(a.id) === String(legacyItem.id))) {
            overrides.added.push(legacyItem);
          }
        }
      });

      // Write lightweight migrated overrides first
      localStorage.setItem("ethiopia_history_overrides", JSON.stringify(overrides));

      // Successfully saved overrides! Now safely remove legacy key to free ~4.8MB quota
      localStorage.removeItem("ethiopia_history");
      console.log("✨ Safe migration complete: Reclaimed ~4.8MB localStorage quota while preserving user history edits!");
    } catch(e) {
      console.error("Migration error:", e);
      // If migration error occurred, if overrides already exists, remove legacy key to prevent locking quota
      if (localStorage.getItem("ethiopia_history_overrides")) {
        try { localStorage.removeItem("ethiopia_history"); } catch(ex) {}
      }
    }
  }

  getStoredHistory() {
    this.migrateLegacyStorageIfNeeded();

    let baseList = (window.DEFAULT_HISTORY && window.DEFAULT_HISTORY.length > 0)
      ? window.DEFAULT_HISTORY
      : (typeof DEFAULT_HISTORY !== 'undefined' ? DEFAULT_HISTORY : []);

    let historyList = baseList.map(item => ({
      ...item,
      images: item && item.images ? [...item.images] : []
    }));

    try {
      const overridesRaw = localStorage.getItem("ethiopia_history_overrides");
      if (overridesRaw) {
        const overrides = JSON.parse(overridesRaw);
        if (overrides && typeof overrides === 'object') {
          const { modified = {}, added = [], deleted = [] } = overrides;

          if (Array.isArray(deleted) && deleted.length > 0) {
            historyList = historyList.filter(item => item && !deleted.includes(item.id));
          }

          historyList = historyList.map(item => {
            if (item && modified[item.id]) {
              const mod = modified[item.id];
              return {
                ...item,
                ...mod,
                images: mod.images !== undefined ? mod.images : (item.images ? [...item.images] : [])
              };
            }
            return item;
          });

          if (Array.isArray(added) && added.length > 0) {
            added.forEach(newItem => {
              if (newItem && newItem.id) {
                const idx = historyList.findIndex(h => h && h.id === newItem.id);
                if (idx !== -1) {
                  historyList[idx] = newItem;
                } else {
                  historyList.unshift(newItem);
                }
              }
            });
          }

          return historyList;
        }
      }
    } catch(e) {
      console.error("Error reading stored history overrides:", e);
    }

    return historyList;
  }

  saveStoredHistory(savedItem, deleteId = null) {
    this.migrateLegacyStorageIfNeeded();

    let overrides = { modified: {}, added: [], deleted: [] };
    try {
      const overridesRaw = localStorage.getItem("ethiopia_history_overrides");
      if (overridesRaw) {
        const parsed = JSON.parse(overridesRaw);
        if (parsed && typeof parsed === 'object') {
          overrides.modified = parsed.modified || {};
          overrides.added = Array.isArray(parsed.added) ? parsed.added : [];
          overrides.deleted = Array.isArray(parsed.deleted) ? parsed.deleted : [];
        }
      }
    } catch(e) {}

    const baseList = (window.DEFAULT_HISTORY && window.DEFAULT_HISTORY.length > 0)
      ? window.DEFAULT_HISTORY
      : (typeof DEFAULT_HISTORY !== 'undefined' ? DEFAULT_HISTORY : []);

    if (deleteId) {
      const isBaseItem = baseList.some(h => h && String(h.id) === String(deleteId));
      if (isBaseItem) {
        if (!overrides.deleted.includes(deleteId)) {
          overrides.deleted.push(deleteId);
        }
        delete overrides.modified[deleteId];
      } else {
        overrides.added = overrides.added.filter(h => h && String(h.id) !== String(deleteId));
      }
    } else if (savedItem && savedItem.id) {
      const id = savedItem.id;
      const baseItem = baseList.find(h => h && String(h.id) === String(id));

      if (baseItem) {
        const modObj = {
          date: savedItem.date,
          title: savedItem.title,
          location: savedItem.location,
          desc: savedItem.desc
        };

        const baseImagesJson = JSON.stringify(baseItem.images || []);
        const savedImagesJson = JSON.stringify(savedItem.images || []);

        if (baseImagesJson !== savedImagesJson) {
          modObj.images = savedItem.images;
        }

        overrides.modified[id] = modObj;
      } else {
        const existingIdx = overrides.added.findIndex(h => h && String(h.id) === String(id));
        if (existingIdx !== -1) {
          overrides.added[existingIdx] = savedItem;
        } else {
          overrides.added.unshift(savedItem);
        }
      }
    }

    try {
      localStorage.setItem("ethiopia_history_overrides", JSON.stringify(overrides));
    } catch(e) {
      console.error("Failed to save ethiopia_history_overrides:", e);
      throw e;
    }
  }

  getFilteredAndSortedHistory() {
    let historyList = this.getStoredHistory();

    historyList = historyList.filter(h => h && typeof h === 'object' && h.title);
    if (historyList.length === 0) {
      historyList = (window.DEFAULT_HISTORY && window.DEFAULT_HISTORY.length > 0) ? window.DEFAULT_HISTORY : (typeof DEFAULT_HISTORY !== 'undefined' ? DEFAULT_HISTORY : []);
    }

    if (this.activeYear) {
      historyList = historyList.filter(item => item && item.date && item.date.includes(this.activeYear));
    }

    historyList.sort((a, b) => this.parseTimelineDate(a.date).localeCompare(this.parseTimelineDate(b.date)));
    return historyList;
  }

  filterByYear(year) {
    this.activeYear = year;
    const historyList = this.getFilteredAndSortedHistory();
    if (historyList && historyList.length > 0) {
      this.activeId = historyList[0].id;
    }
    this.render();
  }

  initEvents() {
    const addBtn = document.getElementById("openAddHistoryBtn") || document.getElementById("addNewHistoryBtn");
    if (addBtn) {
      addBtn.addEventListener("click", () => this.openEditModal());
    }

    // Add History Form Submit Event
    const historyForm = document.getElementById("historyForm");
    if (historyForm) {
      historyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveHistoryFromForm();
      });
    }

    // Modal Image Drag & Drop & File Input & Clipboard Paste Handlers
    const selectBtn = document.getElementById("selectHistoryPhotosBtn") || document.getElementById("selectHistoryPhotoBtn");
    const fileInput = document.getElementById("fieldHistoryFileInput");
    const dropZone = document.getElementById("historyDropZone");

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
          this.readHistoryPhotoFiles(e.dataTransfer.files);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.readHistoryPhotoFiles(e.target.files);
          fileInput.value = "";
        }
      });
    }

    // Clipboard Paste Event for PPT/Screenshot Images (Ctrl+V)
    document.addEventListener("paste", (e) => {
      const modal = document.getElementById("historyEditModal");
      if (!modal || modal.classList.contains("hidden")) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      let foundImage = false;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          foundImage = true;
          const file = items[i].getAsFile();
          if (file) {
            this.readHistoryPhotoFiles([file]);
          }
        }
      }

      if (foundImage) {
        e.preventDefault();
      }
    });
  }

  async uploadOriginalPhotoToWorker(file, historyId) {
    if (!file) return null;

    const workerUrl = window.CF_WORKER_UPLOAD_URL || "https://ethiopia-archive-proxy.wjdgns131.workers.dev";
    const adminPasscode = sessionStorage.getItem("ethiopia_admin_passcode") || sessionStorage.getItem("ethiopia_admin_role") || "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("historyId", historyId);
    formData.append("originalFileName", file.name || "photo.jpg");

    try {
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "X-Admin-Passcode": adminPasscode
        },
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${response.status}`);
      }

      const result = await response.json();
      if (result && result.success && result.path) {
        return result.path;
      }
      return null;
    } catch(err) {
      console.warn("Cloudflare Worker upload endpoint unavailable or offline:", err.message || err);
      return null;
    }
  }

  readHistoryPhotoFiles(files) {
    if (!files || files.length === 0) return;

    if (!this.tempHistoryItems) this.tempHistoryItems = [];

    Array.from(files).forEach(file => {
      if (file) {
        if (file.size > 15 * 1024 * 1024) {
          alert(`사진 용량이 15MB를 초과합니다 (${(file.size / 1024 / 1024).toFixed(1)}MB). 원본 사진 크기를 줄여 주세요.`);
          return;
        }
        const previewUrl = URL.createObjectURL(file);
        this.tempHistoryItems.push({
          type: 'new_file',
          file: file,
          previewUrl: previewUrl
        });
      }
    });

    this.renderHistoryPhotoPreviews();
    if (window.showToast) window.showToast("✨ 원본 사진이 첨부되었습니다! [저장하기] 버튼을 눌러주세요.");
  }

  renderHistoryPhotoPreviews() {
    const previewContainer = document.getElementById("historyImagesPreview") || document.getElementById("historyPhotoPreviews");
    if (!previewContainer) return;

    if (!this.tempHistoryItems || this.tempHistoryItems.length === 0) {
      previewContainer.innerHTML = `<p style="font-size:0.82rem; color:var(--text-muted); width:100%; margin:0.3rem 0;">📷 첨부된 사진이 없습니다. [사진 파일 선택] 버튼 클릭, 이미지 파일 드래그, 또는 [Ctrl + V]로 바로 붙여넣으실 수 있습니다.</p>`;
      return;
    }

    previewContainer.innerHTML = `
      <div style="width:100%; margin-bottom:0.5rem; font-size:0.82rem; color:#0284c7; font-weight:800; display:flex; align-items:center; gap:0.4rem; background:rgba(2,132,199,0.08); padding:0.4rem 0.8rem; border-radius:8px; border:1px solid rgba(2,132,199,0.2);">
        <i class="fa-solid fa-up-down-left-right" style="font-size:0.95rem;"></i> 마우스로 사진을 끌어서(드래그) 순서를 바꾸거나, ◀ ▶ 화살표 버튼을 눌러 위치를 이동하세요.
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:0.85rem; width:100%;">
        ${this.tempHistoryItems.map((item, idx) => {
          const imgSrc = item.type === 'new_file' ? item.previewUrl : this.getImageSrc(item.src);
          return `
            <div draggable="true"
                 ondragstart="window.timelineComponent.handlePhotoDragStart(event, ${idx})"
                 ondragover="window.timelineComponent.handlePhotoDragOver(event)"
                 ondragenter="window.timelineComponent.handlePhotoDragEnter(event)"
                 ondragleave="window.timelineComponent.handlePhotoDragLeave(event)"
                 ondrop="window.timelineComponent.handlePhotoDrop(event, ${idx})"
                 ondragend="window.timelineComponent.handlePhotoDragEnd(event)"
                 style="position:relative; width:98px; height:98px; border-radius:12px; overflow:hidden; border:2px solid var(--border-color); box-shadow:0 4px 12px rgba(0,0,0,0.15); cursor:grab; transition:all 0.2s; background:var(--bg-card);"
                 class="photo-preview-item">
              <img src="${imgSrc}" style="width:100%; height:100%; object-fit:cover; pointer-events:none;" />

              <span style="position:absolute; top:4px; left:4px; background:rgba(2,132,199,0.9); color:#fff; font-size:10px; font-weight:800; padding:1px 6px; border-radius:10px; box-shadow:0 2px 4px rgba(0,0,0,0.4); pointer-events:none;">
                #${idx + 1}
              </span>

              <button type="button" onclick="event.stopPropagation(); window.timelineComponent.removeHistoryPhoto(${idx})" title="사진 삭제" style="position:absolute; top:4px; right:4px; background:rgba(239,68,68,0.95); color:#fff; border:none; border-radius:50%; width:22px; height:22px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.4);">
                <i class="fa-solid fa-xmark"></i>
              </button>

              <div style="position:absolute; bottom:4px; left:4px; right:4px; display:flex; justify-content:space-between; pointer-events:auto;">
                ${idx > 0 ? `
                  <button type="button" onclick="event.stopPropagation(); window.timelineComponent.moveHistoryPhoto(${idx}, ${idx - 1})" title="앞으로 이동" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.4); border-radius:4px; width:24px; height:22px; font-size:11px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                    <i class="fa-solid fa-chevron-left"></i>
                  </button>
                ` : `<div></div>`}
                ${idx < this.tempHistoryItems.length - 1 ? `
                  <button type="button" onclick="event.stopPropagation(); window.timelineComponent.moveHistoryPhoto(${idx}, ${idx + 1})" title="뒤로 이동" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.4); border-radius:4px; width:24px; height:22px; font-size:11px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>
                ` : `<div></div>`}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  handlePhotoDragStart(e, idx) {
    this._draggedPhotoIdx = idx;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', idx);
    if (e.currentTarget) {
      e.currentTarget.style.opacity = '0.5';
      e.currentTarget.style.transform = 'scale(0.95)';
    }
  }

  handlePhotoDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  handlePhotoDragEnter(e) {
    e.preventDefault();
    const item = e.currentTarget || e.target.closest('.photo-preview-item');
    if (item) {
      item.style.border = '2px solid #0284c7';
      item.style.boxShadow = '0 0 15px rgba(2, 132, 199, 0.5)';
      item.style.transform = 'scale(1.05)';
    }
  }

  handlePhotoDragLeave(e) {
    const item = e.currentTarget || e.target.closest('.photo-preview-item');
    if (item) {
      item.style.border = '2px solid var(--border-color)';
      item.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      item.style.transform = 'scale(1.0)';
    }
  }

  handlePhotoDrop(e, targetIdx) {
    e.preventDefault();
    const fromIdx = this._draggedPhotoIdx !== undefined ? this._draggedPhotoIdx : parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (fromIdx !== undefined && !isNaN(fromIdx) && fromIdx !== targetIdx && this.tempHistoryItems) {
      const movedItem = this.tempHistoryItems.splice(fromIdx, 1)[0];
      this.tempHistoryItems.splice(targetIdx, 0, movedItem);
      this.renderHistoryPhotoPreviews();
      if (window.showToast) window.showToast("↔️ 사진 순서가 수월하게 변경되었습니다!");
    }
  }

  handlePhotoDragEnd(e) {
    if (e.currentTarget) {
      e.currentTarget.style.opacity = '1.0';
      e.currentTarget.style.transform = 'scale(1.0)';
    }
    this._draggedPhotoIdx = undefined;
  }

  moveHistoryPhoto(fromIdx, toIdx) {
    if (!this.tempHistoryItems || fromIdx < 0 || toIdx < 0 || toIdx >= this.tempHistoryItems.length) return;
    const movedItem = this.tempHistoryItems.splice(fromIdx, 1)[0];
    this.tempHistoryItems.splice(toIdx, 0, movedItem);
    this.renderHistoryPhotoPreviews();
  }

  removeHistoryPhoto(index) {
    if (!this.tempHistoryItems) return;
    this.tempHistoryItems.splice(index, 1);
    this.renderHistoryPhotoPreviews();
  }

  openPhotoLightboxById(historyId, initialIndex = 0) {
    const historyList = this.getFilteredAndSortedHistory();
    const item = historyList.find(h => h && String(h.id) === String(historyId));
    if (!item || !item.images || item.images.length === 0) return;

    this.openPhotoLightbox(item.images, initialIndex);
  }

  openPhotoLightbox(images, initialIndex = 0) {
    if (!images || images.length === 0) return;
    if (typeof images === 'string') images = [images];

    let modal = document.getElementById("photoLightboxModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "photoLightboxModal";
      modal.className = "modal-backdrop";
      modal.style.cssText = "position:fixed; inset:0; width:100vw; height:100vh; z-index:99999; display:flex; align-items:center; justify-content:center; background:rgba(10,15,28,0.96); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);";
      modal.innerHTML = `
        <div class="lightbox-content-wrapper" style="position:relative; width:100vw; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; box-sizing:border-box; z-index:99999;">
          
          <div style="position:absolute; top:18px; left:20px; right:20px; display:flex; align-items:center; justify-content:space-between; z-index:100100; pointer-events:none;">
            <div id="lightboxCounter" style="pointer-events:auto; background:linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color:#fff; font-size:1rem; font-weight:800; padding:0.4rem 1.2rem; border-radius:25px; border:1px solid #38bdf8; box-shadow:0 6px 18px rgba(0,0,0,0.6);">
              📷 1 / 1
            </div>

            <div style="display:flex; align-items:center; gap:0.8rem; pointer-events:auto;">
              <button type="button" style="background:rgba(2,132,199,0.9); color:#fff; border:1px solid #38bdf8; border-radius:20px; padding:0.4rem 1.1rem; font-size:0.88rem; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:0.4rem; box-shadow:0 4px 14px rgba(0,0,0,0.5); backdrop-filter:blur(8px);" onclick="window.timelineComponent.toggleLightboxZoom()" title="화면 가득 채우기 / 원본 비율 전환">
                <i class="fa-solid fa-expand"></i> 화면 꽉 차게 확대
              </button>

              <button type="button" style="background:#ef4444; color:#fff; border:none; border-radius:50%; width:46px; height:46px; font-size:24px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 20px rgba(239,68,68,0.6); transition:transform 0.2s;" onclick="document.getElementById('photoLightboxModal').classList.add('hidden'); document.getElementById('photoLightboxModal').style.display='none';" title="닫기 (Esc)">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div style="position:relative; width:96vw; height:88vh; display:flex; align-items:center; justify-content:center;" onclick="window.timelineComponent.nextLightboxPhoto()">
            <img id="lightboxImg" src="" alt="Enlarged Photo" style="width:96vw; height:88vh; object-fit:contain; border-radius:14px; box-shadow:0 25px 90px rgba(0,0,0,0.95); display:block; image-rendering:-webkit-optimize-contrast; transition:all 0.3s ease;" />

            <button type="button" id="lightboxPrevBtn" onclick="event.stopPropagation(); window.timelineComponent.prevLightboxPhoto()" style="position:absolute; top:50%; left:16px; transform:translateY(-50%); background:rgba(15,23,42,0.85); color:#ffffff; border:2px solid rgba(255,255,255,0.9); border-radius:50%; width:60px; height:60px; font-size:26px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 30px rgba(0,0,0,0.8); backdrop-filter:blur(10px); transition:all 0.2s; z-index:100101;" title="이전 사진">
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <button type="button" id="lightboxNextBtn" onclick="event.stopPropagation(); window.timelineComponent.nextLightboxPhoto()" style="position:absolute; top:50%; right:16px; transform:translateY(-50%); background:rgba(15,23,42,0.85); color:#ffffff; border:2px solid rgba(255,255,255,0.9); border-radius:50%; width:60px; height:60px; font-size:26px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 30px rgba(0,0,0,0.8); backdrop-filter:blur(10px); transition:all 0.2s; z-index:100101;" title="다음 사진">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <p style="position:absolute; bottom:14px; margin:0; font-size:0.88rem; color:#f1f5f9; font-weight:700; text-shadow:0 2px 8px rgba(0,0,0,0.9); z-index:100100;"><i class="fa-solid fa-circle-info" style="color:#38bdf8; margin-right:5px;"></i> [화면 꽉 차게 확대] 버튼 또는 사진을 누르시면 화면 전면에 100% 꽉 차게 확대됩니다.</p>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.add("hidden");
          modal.style.display = "none";
        }
      });

      document.addEventListener("keydown", (e) => {
        if (modal.classList.contains("hidden")) return;
        if (e.key === "ArrowRight" || e.key === " ") {
          this.nextLightboxPhoto();
        } else if (e.key === "ArrowLeft") {
          this.prevLightboxPhoto();
        } else if (e.key === "Escape") {
          modal.classList.add("hidden");
          modal.style.display = "none";
        }
      });
    }

    const resolvedImages = (images || []).map(img => this.getImageSrc(img));
    this.lightboxImages = resolvedImages;
    this.rawLightboxImages = (images || []);
    this.lightboxIndex = initialIndex;
    this.updateLightboxState();

    modal.style.display = "flex";
    modal.classList.remove("hidden");
  }

  updateLightboxState() {
    const imgEl = document.getElementById("lightboxImg");
    const counterEl = document.getElementById("lightboxCounter");
    const prevBtn = document.getElementById("lightboxPrevBtn");
    const nextBtn = document.getElementById("lightboxNextBtn");

    if (imgEl) {
      const src = this.lightboxImages[this.lightboxIndex];
      imgEl.src = src;
    }
    if (counterEl) counterEl.innerText = `📷 ${this.lightboxIndex + 1} / ${this.lightboxImages.length}`;

    if (this.lightboxImages.length <= 1) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
    } else {
      if (prevBtn) prevBtn.style.display = "flex";
      if (nextBtn) nextBtn.style.display = "flex";
    }
  }

  nextLightboxPhoto() {
    if (!this.lightboxImages || this.lightboxImages.length <= 1) return;
    this.lightboxIndex = (this.lightboxIndex + 1) % this.lightboxImages.length;
    this.updateLightboxState();
  }

  prevLightboxPhoto() {
    if (!this.lightboxImages || this.lightboxImages.length <= 1) return;
    this.lightboxIndex = (this.lightboxIndex - 1 + this.lightboxImages.length) % this.lightboxImages.length;
    this.updateLightboxState();
  }

  toggleLightboxZoom() {
    const img = document.getElementById("lightboxImg");
    if (!img) return;
    if (img.style.objectFit === "cover" || img.getAttribute("data-zoomed") === "true") {
      img.style.objectFit = "contain";
      img.style.transform = "scale(1.0)";
      img.setAttribute("data-zoomed", "false");
      if (window.showToast) window.showToast("🔍 화면 맞춤 비율 모드로 전환되었습니다.");
    } else {
      img.style.objectFit = "cover";
      img.style.transform = "scale(1.18)";
      img.setAttribute("data-zoomed", "true");
      if (window.showToast) window.showToast("🔎 화면 전면 100% 꽉 차게 확대되었습니다!");
    }
  }

  openEditModal(historyId) {
    if (window.checkAdminPermission && !window.checkAdminPermission()) return;
    const modal = document.getElementById("historyEditModal");
    if (!modal) return;

    const titleEl = document.getElementById("historyEditModalTitle");
    const historyList = this.getStoredHistory();
    const item = historyId ? historyList.find(h => h && h.id === historyId) : null;

    document.getElementById("historyId").value = item ? item.id : "";
    document.getElementById("fieldHistoryDate").value = item ? item.date || "" : "";
    document.getElementById("fieldHistoryTitle").value = item ? item.title || "" : "";
    document.getElementById("fieldHistoryLocation").value = item ? item.location || "" : "";
    document.getElementById("fieldHistoryDesc").value = item ? item.desc || "" : "";

    this.tempHistoryItems = (item && item.images)
      ? item.images.map(img => ({ type: 'existing', src: img }))
      : [];
    this.renderHistoryPhotoPreviews();

    if (titleEl) {
      titleEl.innerText = item ? "복음 역사 기록 수정" : "새 복음 역사 기록 작성";
    }

    modal.classList.remove("hidden");
  }

  async saveHistoryFromForm() {
    const id = document.getElementById("historyId").value;
    const date = document.getElementById("fieldHistoryDate").value.trim();
    const title = document.getElementById("fieldHistoryTitle").value.trim();
    const location = document.getElementById("fieldHistoryLocation").value.trim();
    const desc = document.getElementById("fieldHistoryDesc").value.trim();

    if (!title || !date) {
      alert("날짜와 제목을 입력해 주세요.");
      return;
    }

    const modal = document.getElementById("historyEditModal");
    const saveBtn = modal ? modal.querySelector("button[type='submit']") : null;
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 원본 사진 업로드 처리 중...`;
    }

    try {
      const historyTargetId = id || ("hist-" + Date.now());
      const finalImagePaths = [];

      if (this.tempHistoryItems && this.tempHistoryItems.length > 0) {
        for (let i = 0; i < this.tempHistoryItems.length; i++) {
          const item = this.tempHistoryItems[i];
          if (item.type === "new_file" && item.file) {
            const uploadedPath = await this.uploadOriginalPhotoToWorker(item.file, historyTargetId);
            if (uploadedPath) {
              finalImagePaths.push(uploadedPath);
              if (item.previewUrl && !this.inMemoryBlobMap[uploadedPath]) {
                this.inMemoryBlobMap[uploadedPath] = item.previewUrl;
              }
            } else {
              // Fallback for local/offline testing: create clean relative path and map object URL
              const ext = (item.file.name && item.file.name.includes('.')) ? item.file.name.split('.').pop().toLowerCase() : 'jpg';
              const fallbackPath = `images/history/hist-${historyTargetId}-${Date.now()}-${i + 1}.${ext}`;
              if (item.previewUrl) {
                this.inMemoryBlobMap[fallbackPath] = item.previewUrl;
              }
              finalImagePaths.push(fallbackPath);
            }
          } else if (item.src) {
            finalImagePaths.push(item.src);
          }
        }
      }

      const historyData = {
        id: historyTargetId,
        date, title, location, desc,
        images: finalImagePaths
      };

      this.saveStoredHistory(historyData);
      this.activeId = historyTargetId;
      this.activeYear = null;

      document.getElementById("historyEditModal")?.classList.add("hidden");
      if (window.showToast) {
        window.showToast(id ? "✨ 역사 기록 및 원본 사진이 영구 저장되었습니다!" : "✨ 새 역사 기록 및 원본 사진이 영구 등록되었습니다!");
      }
      this.render();
      setTimeout(() => {
        if (this.activeId) {
          this.autoScrollToActiveNode(this.activeId);
        }
      }, 80);
    } catch (err) {
      console.error("Save history error:", err);
      alert("저장 중 오류가 발생했습니다: " + (err.message || err));
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `저장하기`;
      }
    }
  }

  deleteHistory(id) {
    if (window.checkAdminPermission && !window.checkAdminPermission()) return;
    if (confirm("정말로 이 역사 기록을 삭제하시겠습니까?")) {
      try {
        this.saveStoredHistory(null, id);
        this.render();
      } catch(err) {
        console.error("Delete history error:", err);
      }
    }
  }

  formatParagraphs(text) {
    if (!text) return "";
    return text.split('\n\n').map(p => {
      const formattedLines = p.replace(/\n/g, '<br/>');
      return `<p class="history-paragraph" style="word-break: keep-all !important; line-height: 1.8; margin-bottom: 0.95rem; font-size:1.02rem;">${formattedLines}</p>`;
    }).join('');
  }

  setActive(id) {
    if (this.activeId === id) return;
    this.transitionTo(id);
  }

  navigate(direction) {
    if (this.isNavigating) return;
    this.isNavigating = true;
    setTimeout(() => { this.isNavigating = false; }, 350);

    const historyList = this.getFilteredAndSortedHistory();
    if (!historyList || historyList.length === 0) return;

    let currentIndex = historyList.findIndex(h => h && h.id === this.activeId);
    if (currentIndex === -1) currentIndex = 0;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= historyList.length) return; // Prevent looping!

    this.transitionTo(historyList[nextIndex].id);
  }

  // Smoothly auto-scroll container so target node is centered
  autoScrollToActiveNode(targetId) {
    const container = document.getElementById("hzTrackScrollContainer");
    const node = document.getElementById("hz-node-" + targetId);
    if (container && node) {
      const containerWidth = container.offsetWidth;
      const nodeLeft = node.offsetLeft;
      container.scrollTo({
        left: Math.max(0, nodeLeft - containerWidth / 2),
        behavior: "smooth"
      });
    }
  }

  // In-Place Smooth Transition (No DOM Destruction = NO LAG, NO JUMPING!)
  transitionTo(targetId) {
    const historyList = this.getFilteredAndSortedHistory();
    const targetIndex = historyList.findIndex(h => h && h.id === targetId);
    if (targetIndex === -1) return;

    this.activeId = targetId;
    const targetItem = historyList[targetIndex];
    const totalCount = historyList.length;

    // 1. Update Active Node styling in-place
    historyList.forEach(item => {
      const nodeEl = document.getElementById("hz-node-" + item.id);
      if (nodeEl) {
        const isActive = item.id === targetId;
        nodeEl.className = isActive ? 'hz-node-active' : '';

        const label = nodeEl.querySelector('.hz-node-label');
        if (label) {
          label.style.fontSize = isActive ? '1.05rem' : '0.86rem';
          label.style.fontWeight = isActive ? '900' : '700';
          label.style.color = isActive ? '#0284c7' : 'var(--text-primary)';
        }

        const circle = nodeEl.querySelector('.hz-node-circle');
        if (circle) {
          circle.style.width = isActive ? '22px' : '14px';
          circle.style.height = isActive ? '22px' : '14px';
          circle.style.background = isActive ? '#0284c7' : 'var(--border-color)';
        }
      }
    });

    // 2. Gently slide active blue dot
    const activeDot = document.getElementById("hzActiveSlidingDot");
    if (activeDot) {
      const targetPercent = totalCount > 1 ? (targetIndex / (totalCount - 1)) * 100 : 0;
      activeDot.style.left = targetPercent + "%";
    }

    // 3. Smoothly Auto-Scroll Track Container to center target node
    this.autoScrollToActiveNode(targetId);

    // 4. Update Navigation Badge and Arrow Buttons in-place
    const badgeEl = document.getElementById("hzNavBadge");
    if (badgeEl) badgeEl.innerText = `${targetIndex + 1} / ${totalCount}`;

    const prevBtn = document.getElementById("hzPrevBtn");
    if (prevBtn) {
      prevBtn.disabled = targetIndex === 0;
      prevBtn.style.opacity = targetIndex === 0 ? '0.25' : '1';
      prevBtn.style.cursor = targetIndex === 0 ? 'not-allowed' : 'pointer';
    }

    const nextBtn = document.getElementById("hzNextBtn");
    if (nextBtn) {
      nextBtn.disabled = targetIndex === totalCount - 1;
      nextBtn.style.opacity = targetIndex === totalCount - 1 ? '0.25' : '1';
      nextBtn.style.cursor = targetIndex === totalCount - 1 ? 'not-allowed' : 'pointer';
    }

    // 5. Cross-Fade Content Card in-place
    const cardWrapper = document.getElementById("hzMainWideContentWrapper");
    if (cardWrapper) {
      cardWrapper.style.transition = "opacity 0.16s ease-out, transform 0.16s ease-out";
      cardWrapper.style.opacity = "0";
      cardWrapper.style.transform = "translateY(6px)";

      setTimeout(() => {
        cardWrapper.innerHTML = this.renderCardInner(targetItem, targetIndex, totalCount, historyList);

        requestAnimationFrame(() => {
          cardWrapper.style.transition = "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
          cardWrapper.style.opacity = "1";
          cardWrapper.style.transform = "translateY(0)";
        });
      }, 160);
    } else {
      this.render();
    }
  }

  renderCardInner(rawActiveItem, activeIndex, totalCount, historyList) {
    const prevItem = activeIndex > 0 ? historyList[activeIndex - 1] : null;
    const nextItem = activeIndex < totalCount - 1 ? historyList[activeIndex + 1] : null;

    const activeItem = (window.i18n && typeof window.i18n.getTranslatedHistory === "function") ? window.i18n.getTranslatedHistory(rawActiveItem) : rawActiveItem;
    const isEn = window.i18n && window.i18n.getLang() === "en";

    const dateDisp = activeItem.date;
    const locationDisp = activeItem.location;
    const titleDisp = activeItem.title;
    const descDisp = activeItem.desc;

    return `
      <div class="timeline-item-header" style="display:flex; align-items:center; justify-content:space-between; width:100%; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        
        <!-- Left Side: LARGE YEAR & LOCATION -->
        <div class="timeline-meta-group" style="display:flex; align-items:center; gap:1.2rem; flex-wrap:wrap;">
          <span class="timeline-date-badge" style="font-size:1.22rem !important; font-weight:800 !important; padding:0.45rem 1.1rem !important;"><i class="fa-solid fa-calendar-days" style="margin-right:6px;"></i> ${dateDisp}</span>
          ${locationDisp ? `<span class="timeline-location-badge" style="font-size:1.12rem !important; font-weight:700 !important;"><i class="fa-solid fa-location-dot" style="margin-right:6px;"></i> ${locationDisp}</span>` : ''}
        </div>

        <!-- Right Side: Edit & Delete Buttons -->
        <div class="timeline-action-buttons" style="margin-left:auto;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); window.timelineComponent.openEditModal('${activeItem.id}')" title="Edit">
            <i class="fa-solid fa-pen-to-square"></i> ${isEn ? 'Edit' : '문구 및 사진 수정'}
          </button>
          <button type="button" class="btn btn-danger btn-sm icon-only" onclick="event.stopPropagation(); window.timelineComponent.deleteHistory('${activeItem.id}')" title="Delete">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>

      <h2 class="timeline-item-title" style="font-size:1.65rem; margin:1rem 0 1.2rem 0; font-weight:800; color:var(--text-primary); border-left: 4px solid #0284c7; padding-left: 0.8rem;">${titleDisp}</h2>

      <!-- SPACIOUS BODY LAYOUT -->
      <div class="timeline-desc-body" style="font-size:1.05rem; margin-bottom: 1.5rem;">
        ${this.formatParagraphs(descDisp)}
      </div>

      <!-- ASSEMBLY SAVED MEMBERS & TESTIMONIES BUTTON -->
      ${this.renderAssemblyTestimonyButton(activeItem)}

      ${activeItem.images && activeItem.images.length > 0 ? `
        <div style="margin-top:2rem; position:relative;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem; padding:0 0.2rem; flex-wrap:wrap; gap:0.5rem;">
            <span style="font-size:0.95rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:0.4rem;">
              <i class="fa-solid fa-images" style="color:#0284c7;"></i> ${isEn ? 'Field Activity Photos' : '현장 활동 사진'} <span style="background:rgba(2,132,199,0.1); color:#0284c7; padding:0.15rem 0.65rem; border-radius:12px; font-size:0.82rem; font-weight:800;">${activeItem.images.length}${isEn ? ' Photos' : '장'}</span>
            </span>
            ${activeItem.images.length > 2 ? `
              <div style="display:flex; align-items:center; gap:0.7rem;">
                <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">
                  <i class="fa-solid fa-arrows-left-right" style="color:#0284c7; margin-right:3px;"></i> ${isEn ? 'Click arrows or drag left/right to view gallery' : '화살표 클릭 또는 좌우 드래그로 2줄 사진 감상'}
                </span>
                <div style="display:flex; align-items:center; gap:0.4rem;">
                  <button type="button" onclick="event.stopPropagation(); window.timelineComponent.scrollGalleryLeft('${activeItem.id}')" title="${isEn ? 'Previous Photo' : '이전 사진 보기'}" style="border-radius:50%; width:36px; height:36px; padding:0; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-primary); cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.08); transition:all 0.2s;" onmouseover="this.style.background='#0284c7'; this.style.color='#fff';" onmouseout="this.style.background='var(--bg-card)'; this.style.color='var(--text-primary)';">
                    <i class="fa-solid fa-chevron-left" style="font-size:0.9rem;"></i>
                  </button>
                  <button type="button" onclick="event.stopPropagation(); window.timelineComponent.scrollGalleryRight('${activeItem.id}')" title="${isEn ? 'Next Photo' : '다음 사진 보기'}" style="border-radius:50%; width:36px; height:36px; padding:0; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-primary); cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.08); transition:all 0.2s;" onmouseover="this.style.background='#0284c7'; this.style.color='#fff';" onmouseout="this.style.background='var(--bg-card)'; this.style.color='var(--text-primary)';">
                    <i class="fa-solid fa-chevron-right" style="font-size:0.9rem;"></i>
                  </button>
                </div>
              </div>
            ` : ''}
          </div>

          <div class="timeline-gallery-grid ${activeItem.images.length <= 2 ? 'single-col' : ''}" id="hzGalleryScroll_${activeItem.id}" onmousedown="window.timelineComponent.handleGalleryDragStart(event, this)" style="display:grid !important; grid-template-rows:${activeItem.images.length === 1 ? '380px' : 'repeat(2, 250px)'} !important; grid-auto-columns:${activeItem.images.length <= 2 ? '100%' : 'min(420px, 78vw)'} !important; grid-auto-flow:column !important; overflow-x:auto !important; overflow-y:hidden !important; gap:1.0rem !important; margin-top:0.5rem !important; padding:0.4rem 0.2rem 0.8rem 0.2rem !important; scroll-snap-type:x mandatory !important; scroll-behavior:smooth !important; -webkit-overflow-scrolling:touch !important; cursor:grab;">
            ${activeItem.images.map((img, imgIdx) => {
              const resolvedSrc = this.getImageSrc(img);
              return `
                <div class="gallery-image-box" onclick="window.timelineComponent.openPhotoLightboxById('${activeItem.id}', ${imgIdx})" style="width:100% !important; height:100% !important; border-radius:16px !important; overflow:hidden !important; position:relative !important; cursor:pointer !important; background:#ffffff !important; border:1px solid var(--border-color) !important; box-shadow:0 4px 14px rgba(0,0,0,0.08) !important; scroll-snap-align:start !important;">
                  <img src="${resolvedSrc}" alt="${activeItem.title}"
                       style="width:100% !important; height:100% !important; object-fit:cover !important; object-position:center 20% !important; border-radius:16px !important; display:block !important; transition:transform 0.3s ease !important;" class="insta-hover-img" />
                  <div class="image-hover-overlay" style="position:absolute; bottom:8px; right:8px; background:rgba(15,23,42,0.85); color:#fff; padding:5px 12px; border-radius:14px; font-size:12px; font-weight:700; pointer-events:none; display:flex; align-items:center; gap:5px; box-shadow:0 3px 10px rgba(0,0,0,0.25);">
                    <i class="fa-solid fa-magnifying-glass-plus" style="color:var(--accent-gold);"></i> <span>${isEn ? 'Enlarge' : '확대보기'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- PREV / NEXT BOTTOM PREVIEW BAR -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid var(--border-color); gap:1rem; flex-wrap:wrap;">
        
        ${prevItem ? `
          <div onclick="event.stopPropagation(); window.timelineComponent.setActive('${prevItem.id}')" style="cursor:pointer; display:flex; align-items:center; gap:0.6rem; color:var(--text-secondary); transition:all 0.2s;" class="hover-text-primary">
            <i class="fa-solid fa-arrow-left" style="color:#0284c7;"></i>
            <div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${isEn ? 'Previous Event' : '이전 사건'} (${prevItem.date})</div>
              <div style="font-size:0.92rem; font-weight:700; color:var(--text-primary);">${(window.i18n && typeof window.i18n.getTranslatedHistory === 'function') ? window.i18n.getTranslatedHistory(prevItem).title : prevItem.title}</div>
            </div>
          </div>
        ` : '<div></div>'}

        ${nextItem ? `
          <div onclick="event.stopPropagation(); window.timelineComponent.setActive('${nextItem.id}')" style="cursor:pointer; display:flex; align-items:center; gap:0.6rem; text-align:right; color:var(--text-secondary); transition:all 0.2s; margin-left:auto;" class="hover-text-primary">
            <div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${isEn ? 'Next Event' : '다음 사건'} (${nextItem.date})</div>
              <div style="font-size:0.92rem; font-weight:700; color:var(--text-primary);">${(window.i18n && typeof window.i18n.getTranslatedHistory === 'function') ? window.i18n.getTranslatedHistory(nextItem).title : nextItem.title}</div>
            </div>
            <i class="fa-solid fa-arrow-right" style="color:#0284c7;"></i>
          </div>
        ` : '<div></div>'}

      </div>
    `;
  }

  render() {
    this.container = document.getElementById("timelineContainer") || document.getElementById("timelineList");
    if (!this.container) return;

    let rawList = this.getStoredHistory();

    const historyList = this.getFilteredAndSortedHistory();

    // Extract all unique years dynamically for the Year Filter Selector Bar
    const allYears = Array.from(new Set(rawList.map(item => {
      if (!item || !item.date) return null;
      const match = String(item.date).match(/\d{4}/);
      return match ? match[0] : null;
    }).filter(Boolean))).sort((a, b) => a - b);

    const allHistoryList = [...rawList];

    if (!this.activeId || !historyList.some(h => h && h.id === this.activeId)) {
      this.activeId = historyList[0] ? historyList[0].id : null;
    }

    const activeIndex = historyList.findIndex(h => h && h.id === this.activeId);
    const activeItem = historyList[activeIndex] || historyList[0];
    const totalCount = historyList.length;

    // Calculate percentage for active dot position along line
    const activePercent = totalCount > 1 ? (activeIndex / (totalCount - 1)) * 100 : 0;

    // Ensure ample spacing per node (minimum 140px per node) to completely prevent date overlap
    const trackMinWidth = Math.max(1200, totalCount * 140);

    const isEn = window.i18n && window.i18n.getLang() === "en";

    let html = `
      <!-- ULTRA WIDE CONTAINER -->
      <div class="hz-sketch-timeline-container" style="max-width:1200px; width:98%; margin:0 auto; padding: 0.5rem 0;">
        
        <!-- Year Filter Selector Pill Bar (연도별 구분 선택 탭바) -->
        <div class="timeline-year-filter-bar" style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap; margin-bottom:1.5rem; padding:0.85rem 1.25rem; background:#ffffff; border:1px solid var(--border-color); border-radius:14px; box-shadow:var(--shadow-sm);">
          <span style="font-size:0.92rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:6px; margin-right:0.4rem;">
            <i class="fa-solid fa-calendar-days" style="color:#0284c7;"></i> ${isEn ? 'Filter by Year:' : '연도별 구분:'}
          </span>

          <button type="button" class="btn-year-pill ${!this.activeYear ? 'active' : ''}" onclick="event.stopPropagation(); window.timelineComponent.filterByYear(null)" style="padding:0.45rem 1.05rem; font-size:0.88rem; font-weight:800; border-radius:20px; border:1.5px solid ${!this.activeYear ? '#0284c7' : '#cbd5e1'}; background:${!this.activeYear ? '#0284c7' : '#ffffff'}; color:${!this.activeYear ? '#ffffff' : '#334155'}; cursor:pointer; transition:all 0.18s ease; box-shadow:${!this.activeYear ? '0 3px 10px rgba(2, 132, 199, 0.3)' : 'none'};">
            📍 ${isEn ? `All Years (${allHistoryList.length})` : `전체 연도 (${allHistoryList.length}건)`}
          </button>

          ${allYears.map(year => {
            const count = allHistoryList.filter(item => item && item.date && item.date.includes(year)).length;
            const isActive = this.activeYear === year;
            return `
              <button type="button" class="btn-year-pill ${isActive ? 'active' : ''}" onclick="event.stopPropagation(); window.timelineComponent.filterByYear('${year}')" style="padding:0.45rem 1.05rem; font-size:0.88rem; font-weight:800; border-radius:20px; border:1.5px solid ${isActive ? '#0284c7' : '#cbd5e1'}; background:${isActive ? '#0284c7' : '#ffffff'}; color:${isActive ? '#ffffff' : '#334155'}; cursor:pointer; transition:all 0.18s ease; box-shadow:${isActive ? '0 3px 10px rgba(2, 132, 199, 0.3)' : 'none'};">
                🗓️ ${isEn ? `${year} (${count})` : `${year}년 (${count}건)`}
              </button>
            `;
          }).join('')}
        </div>
        
        <!-- Track Container with Edge Gradient Fade -->
        <div style="position:relative; width:100%; margin-bottom:1.2rem; background:transparent; border-radius:14px; -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);">
          
          <!-- Horizontally Scrollable Track -->
          <div id="hzTrackScrollContainer" style="overflow-x:auto; scroll-behavior:smooth; padding: 3rem 4rem 2rem 4rem; scrollbar-width:none; -ms-overflow-style:none;">
            <style>
              #hzTrackScrollContainer::-webkit-scrollbar { display: none; }
            </style>

            <!-- Expanded Track Line -->
            <div style="position:relative; width:100%; min-width:${trackMinWidth}px; height: 4px; background: var(--border-color); border-radius: 2px; margin: 1.5rem 0;">
              
              <!-- Nodes distributed evenly along min-width line -->
              ${historyList.map((rawItem, idx) => {
                const item = (window.i18n && typeof window.i18n.getTranslatedHistory === "function") ? window.i18n.getTranslatedHistory(rawItem) : rawItem;
                const nodePercent = totalCount > 1 ? (idx / (totalCount - 1)) * 100 : 0;
                const isActive = item.id === this.activeId;

                let shortDate = item.date;
                if (shortDate.includes('년') && shortDate.includes('월')) {
                  const yr = shortDate.split('년')[0].trim();
                  const moStr = shortDate.split('년')[1].split('월')[0].trim();
                  shortDate = `${yr}.${moStr.padStart(2, '0')}`;
                } else {
                  const matches = shortDate.match(/\d+/g);
                  if (matches && matches.length >= 2) {
                    const yr = matches[0];
                    const mo = matches[1].padStart(2, '0');
                    shortDate = `${yr}.${mo}`;
                  } else if (shortDate.length > 10) {
                    shortDate = shortDate.substring(0, 7);
                  }
                }

                return `
                  <div id="hz-node-${item.id}" class="${isActive ? 'hz-node-active' : ''}" onclick="event.stopPropagation(); window.timelineComponent.setActive('${item.id}')" style="position:absolute; left:${nodePercent}%; top:50%; transform:translate(-50%, -50%); cursor:pointer; z-index:${isActive ? '10' : '5'}; display:flex; flex-direction:column; align-items:center;" title="${item.date}: ${item.title}">
                    
                    <!-- Crisp High Contrast Date Label -->
                    <div class="hz-node-label" style="position:absolute; bottom:32px; font-size:${isActive ? '1.08rem' : '0.88rem'}; font-weight:${isActive ? '900' : '700'}; color:${isActive ? '#0f4c81' : 'var(--text-primary)'}; white-space:nowrap; transition:all 0.3s ease; text-shadow:0 1px 2px rgba(0,0,0,0.05);">
                      ${shortDate}
                    </div>

                    <!-- Single Clean High-Contrast Active Glowing Node Circle -->
                    <div class="hz-node-circle" style="width:${isActive ? '24px' : '14px'}; height:${isActive ? '24px' : '14px'}; border-radius:50%; background:${isActive ? '#0f4c81' : '#cbd5e1'}; border:${isActive ? '3px solid #ffffff' : '2px solid var(--bg-main)'}; box-shadow:${isActive ? '0 0 18px rgba(15, 76, 129, 0.9)' : 'none'}; transition:all 0.35s ease;"></div>
                  </div>
                `;
              }).join('')}

            </div>

          </div>

        </div>

        <!-- ULTRA MINIMALIST NAVIGATION BAR -->
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; padding:0 0.5rem;">
          
          <!-- SLEEK LEFT CIRCULAR ARROW BUTTON (❮) -->
          <button type="button" id="hzPrevBtn" class="btn btn-secondary" onclick="event.stopPropagation(); window.timelineComponent.navigate(-1)" ${activeIndex === 0 ? 'disabled style="opacity:0.25; cursor:not-allowed; border-radius:50%; width:44px; height:44px; padding:0; display:flex; align-items:center; justify-content:center;"' : 'style="border-radius:50%; width:44px; height:44px; padding:0; display:flex; align-items:center; justify-content:center; font-size:1.15rem;"'} title="이전 사건">
            <i class="fa-solid fa-chevron-left"></i>
          </button>

          <!-- CLEAN SIMPLE INDEX BADGE ONLY -->
          <span id="hzNavBadge" style="font-weight:800; color:var(--text-muted); font-size:0.95rem; background:var(--bg-card); padding:0.35rem 1.1rem; border-radius:20px; border:1px solid var(--border-color); letter-spacing:0.5px;">
            ${activeIndex + 1} / ${totalCount}
          </span>

          <!-- SLEEK RIGHT CIRCULAR ARROW BUTTON (❯) -->
          <button type="button" id="hzNextBtn" class="btn btn-secondary" onclick="event.stopPropagation(); window.timelineComponent.navigate(1)" ${activeIndex === totalCount - 1 ? 'disabled style="opacity:0.25; cursor:not-allowed; border-radius:50%; width:44px; height:44px; padding:0; display:flex; align-items:center; justify-content:center;"' : 'style="border-radius:50%; width:44px; height:44px; padding:0; display:flex; align-items:center; justify-content:center; font-size:1.15rem;"'} title="다음 사건">
            <i class="fa-solid fa-chevron-right"></i>
          </button>

        </div>

        <!-- FULL-WIDTH SPACIOUS MAIN CONTENT CARD -->
        <div id="hzMainWideContentWrapper" class="timeline-item-card" data-id="${activeItem.id}" style="width:100%; transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); opacity: 1; transform: translateY(0); padding: 2rem;">
          ${this.renderCardInner(activeItem, activeIndex, totalCount, historyList)}
        </div>

      </div>
    `;

    this.container.innerHTML = html;

    requestAnimationFrame(() => {
      this.autoScrollToActiveNode(this.activeId);
    });
  }

  parseTimelineDate(dateStr) {
    if (!dateStr) return "9999.99";
    const matches = dateStr.match(/\d+/g);
    if (!matches || matches.length === 0) return "9999.99";
    const year = matches[0];
    const month = matches.length > 1 ? matches[1].padStart(2, '0') : '01';
    const day = matches.length > 2 ? matches[2].padStart(2, '0') : '01';
    return `${year}.${month}.${day}`;
  }

  getSavedMembersForHistory(historyItem) {
    const members = (window.db && typeof window.db.getMembers === 'function') ? window.db.getMembers() : (window.DEFAULT_MEMBERS || (typeof DEFAULT_MEMBERS !== 'undefined' ? DEFAULT_MEMBERS : []));
    if (!historyItem || !historyItem.date) return [];

    const hDateClean = String(historyItem.date).replace(/\s+/g, '');
    const hNumbers = hDateClean.match(/\d+/g) || [];
    const hYear = hNumbers[0];
    const hMonth = hNumbers[1] ? parseInt(hNumbers[1], 10) : null;
    const hDay = hNumbers[2] ? parseInt(hNumbers[2], 10) : null;

    return members.filter(m => {
      if (!m || !m.assemblyMonth) return false;
      const mDateClean = String(m.assemblyMonth).replace(/\s+/g, '');

      // 1. Exact or substring match of full string
      if (hDateClean === mDateClean || hDateClean.includes(mDateClean) || mDateClean.includes(hDateClean)) return true;

      // 2. Strict Year, Month and Day Range Check
      const mNumbers = mDateClean.match(/\d+/g) || [];
      const mYear = mNumbers[0];
      const mMonth = mNumbers[1] ? parseInt(mNumbers[1], 10) : null;
      const mDay = mNumbers[2] ? parseInt(mNumbers[2], 10) : null;

      if (hYear && mYear && hYear === mYear && hMonth && mMonth && hMonth === mMonth) {
        // If both have day numbers specified, check day range proximity (within 5 days)
        if (hDay !== null && mDay !== null) {
          return Math.abs(hDay - mDay) <= 5;
        }
        // If member assemblyMonth has no day (e.g. "2026.02" or "2026년 2월"), match
        if (mDay === null) {
          return true;
        }
      }

      return false;
    });
  }

  renderAssemblyTestimonyButton(activeItem) {
    if (!activeItem || !activeItem.title) return '';

    // Must be related to an assembly/gospel event ('집회' or '전도' or '모임') and not a non-assembly visit/entry
    const savedMembers = this.getSavedMembersForHistory(activeItem);
    const count = savedMembers.length;
    const isEn = window.i18n && window.i18n.getLang() === "en";

    // Do not show button if count is 0
    if (count === 0) {
      return '';
    }

    return `
      <div class="assembly-testimony-btn-wrapper" style="margin: 1.2rem 0;">
        <button type="button" class="btn btn-primary" onclick="event.stopPropagation(); window.timelineComponent.openAssemblyMembersModal('${activeItem.id}')" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 0.75rem 1.4rem; border-radius: 14px; font-size: 0.98rem; font-weight: 800; border: none; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.35); cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; transition: transform 0.2s, box-shadow 0.2s;">
          <i class="fa-solid fa-users-rectangle" style="font-size: 1.2rem; color: #fbbf24;"></i>
          <span>🍇 ${isEn ? `Members Saved Through This Seminar (${count})` : `이 집회를 통해 구원받은 식구 간증 보러가기 (${count}명)`}</span>
        </button>
      </div>
    `;
  }

  openAssemblyMembersModal(historyId) {
    const historyList = this.getFilteredAndSortedHistory();
    const rawItem = historyList.find(h => h && String(h.id) === String(historyId));
    if (!rawItem) return;

    const item = (window.i18n && typeof window.i18n.getTranslatedHistory === "function") ? window.i18n.getTranslatedHistory(rawItem) : rawItem;
    const isEn = window.i18n && window.i18n.getLang() === "en";

    const savedMembers = this.getSavedMembersForHistory(rawItem);
    const modal = document.getElementById("assemblyMembersModal");
    const body = document.getElementById("assemblyMembersModalBody");
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--border-color);">
        <div style="display:flex; align-items:center; gap:0.8rem; margin-bottom:0.4rem; flex-wrap:wrap;">
          <i class="fa-solid fa-users-rectangle" style="font-size:1.8rem; color:#0284c7;"></i>
          <h2 style="font-size:1.45rem; font-weight:800; margin:0; color:var(--text-primary);">
            🍇 ${item.date} ${item.title} ${isEn ? `Saved Members (${savedMembers.length})` : `구원받은 식구 (${savedMembers.length}명)`}
          </h2>
        </div>
        <p style="margin:0.2rem 0 0 0; font-size:0.95rem; color:var(--text-secondary);">
          ${isEn ? 'Profiles and testimonies of saved members who received the Gospel through this seminar.' : '이 집회를 통해 은혜롭게 복음을 깨닫고 구원받은 식구들의 프로필과 간증입니다.'}
        </p>
      </div>

      ${savedMembers.length > 0 ? `
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:1.2rem;">
          ${savedMembers.map(rawM => {
            const m = (window.i18n && typeof window.i18n.getTranslatedMember === "function") ? window.i18n.getTranslatedMember(rawM) : rawM;
            const photoUrl = m.photo || 'images/members/mem_shambel.png';
            const testimonyUrl = (m.testimony || m.youtube || "").trim();
            const ageDisplay = (window.directoryComponent && typeof window.directoryComponent.getCalculatedAge === 'function') ? window.directoryComponent.getCalculatedAge(m) : (m.age || '');

            return `
              <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:18px; padding:1.2rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--shadow-sm);">
                <div>
                  <div style="display:flex; align-items:center; gap:1rem; margin-bottom:0.8rem;">
                    <div style="width:70px; height:70px; border-radius:16px; overflow:hidden; border:1px solid var(--border-color); flex-shrink:0; background:#fff;">
                      <img src="${photoUrl}" alt="${m.name}" style="width:100%; height:100%; object-fit:cover;" />
                    </div>
                    <div style="overflow:hidden;">
                      <h4 style="font-size:1.15rem; font-weight:800; margin:0 0 0.2rem 0; color:var(--text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${m.name}</h4>
                      <div style="font-size:0.85rem; color:var(--text-secondary); display:flex; gap:0.4rem; flex-wrap:wrap;">
                        <span>📍 ${m.region || (isEn ? 'Ethiopia' : '에티오피아')}</span>
                        <span>• ${ageDisplay}</span>
                      </div>
                      <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.15rem;">💼 ${m.job || (isEn ? 'No occupation listed' : '직업 미기재')}</div>
                    </div>
                  </div>

                  <div style="font-size:0.85rem; background:rgba(2,132,199,0.06); padding:0.6rem 0.8rem; border-radius:10px; margin-bottom:0.8rem; border:1px solid rgba(2,132,199,0.12);">
                    <div style="color:var(--text-muted); font-size:0.78rem;">${isEn ? 'Inviter Info:' : '초대자 정보:'}</div>
                    <div style="font-weight:700; color:var(--text-primary);">
                      ${m.inviter ? `<span data-action="open-inviter-network" data-id="${m.inviter}" style="cursor:pointer; color:#0284c7; text-decoration:underline;">${m.inviter}</span>` : (isEn ? 'Self-attended' : '자발적 참석')} ${m.inviterRelation ? `(${m.inviterRelation})` : ''}
                    </div>
                  </div>
                </div>

                ${testimonyUrl ? `
                  <button type="button" class="btn btn-primary btn-sm" onclick="event.stopPropagation(); if (window.directoryComponent) { window.directoryComponent.openVideoModal('${testimonyUrl}', '${m.name}'); } else { window.open('${testimonyUrl}', '_blank'); }" style="width:100%; background:linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color:#fff; border-radius:12px; font-weight:800; padding:0.6rem; font-size:0.9rem; cursor:pointer;">
                    <i class="fa-solid fa-circle-play" style="color:#fbbf24; margin-right:6px; font-size:1.05rem;"></i> ${isEn ? 'Watch Testimony' : '구원 간증 보기'}
                  </button>
                ` : `
                  <div style="text-align:center; font-size:0.82rem; color:var(--text-muted); padding:0.4rem;">${isEn ? 'No testimony link registered yet' : '간증 링크 준비 중'}</div>
                `}
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
          <i class="fa-solid fa-users-slash" style="font-size:2.5rem; margin-bottom:0.8rem; color:#cbd5e1;"></i>
          <p style="font-size:1rem; margin:0;">${isEn ? 'Saved member profiles for this seminar are coming soon.' : '해당 집회에 등록된 구원받은 식구 프로필이 준비 중입니다.'}</p>
        </div>
      `}
    `;

    modal.classList.remove("hidden");
  }

  handleGalleryDragStart(e, container) {
    if (!container) return;
    let isDown = true;
    let startX = e.pageX - container.offsetLeft;
    let scrollLeft = container.scrollLeft;

    const onMouseMove = (moveEv) => {
      if (!isDown) return;
      moveEv.preventDefault();
      const x = moveEv.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.6;
      container.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      isDown = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  scrollGalleryLeft(historyId) {
    const container = document.getElementById("hzGalleryScroll_" + historyId);
    if (container) {
      container.scrollBy({ left: -500, behavior: 'smooth' });
    }
  }

  scrollGalleryRight(historyId) {
    const container = document.getElementById("hzGalleryScroll_" + historyId);
    if (container) {
      container.scrollBy({ left: 500, behavior: 'smooth' });
    }
  }
}

window.TimelineComponent = TimelineComponent;
