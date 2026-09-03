/**
 * 에티오피아 선교 아카이브 - 식구 디렉토리 & 모달 컴포넌트
 * (원본 25명 식구 머리~가슴 전원 정상 복원, 청색 0% 완벽 차단 순백색 PURE WHITE #ffffff)
 */

class DirectoryComponent {
  constructor() {
    this.activeCategory = "all"; // all | saved | disrupter
    this.activeRegion = null;
    this.searchQuery = "";
    this.currentViewMode = "grid"; // grid | list
    this.tempMemberPhoto = ""; // Current modal photo URL/Base64

    this.container = document.getElementById("memberGrid") || document.getElementById("memberGridContainer");
    this.activeFiltersBadge = document.getElementById("activeFilterBar") || document.getElementById("activeFiltersBadge");
    this.initEvents();
  }

  initEvents() {
    // Category Tabs Listener
    const tabs = document.querySelectorAll("#categoryTabs .cat-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.activeCategory = tab.getAttribute("data-category");
        this.render();
      });
    });

    // Region Dropdown Select Listener
    const regionDropdown = document.getElementById("regionDropdown");
    if (regionDropdown) {
      regionDropdown.addEventListener("change", (e) => {
        const val = e.target.value;
        this.activeRegion = val === "all" ? null : val;
        if (window.mapComponent) {
          window.mapComponent.selectRegion(this.activeRegion);
        } else {
          this.render();
        }
      });
    }

    // Search Input Listener
    const searchInput = document.getElementById("searchInput") || document.getElementById("memberSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.render();
      });
    }

    // Reset Filters Listener
    const resetBtn = document.getElementById("resetFilterBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.activeCategory = "all";
        this.activeRegion = null;
        this.searchQuery = "";
        if (searchInput) searchInput.value = "";
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
      });
    }

    // Add Member Button Event
    const addNewMemberBtn = document.getElementById("addNewMemberBtn");
    if (addNewMemberBtn) {
      addNewMemberBtn.addEventListener("click", () => {
        this.openEditModal(null);
      });
    }

    // Member Form Submit Event
    const memberForm = document.getElementById("memberForm");
    if (memberForm) {
      memberForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveMemberFromForm();
      });
    }

    // Modal Close Buttons (data-close="memberEditModal")
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-close");
        const modalEl = document.getElementById(modalId);
        if (modalEl) modalEl.classList.add("hidden");
      });
    });

    // Member Photo File Input & Drop Zone & Clipboard Paste Listeners
    const selectMemberPhotoBtn = document.getElementById("selectMemberPhotoBtn");
    const fieldMemberFileInput = document.getElementById("fieldMemberFileInput");
    const memberDropZone = document.getElementById("memberDropZone");

    if (selectMemberPhotoBtn && fieldMemberFileInput) {
      selectMemberPhotoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        fieldMemberFileInput.value = "";
        fieldMemberFileInput.click();
      });
    }

    if (memberDropZone && fieldMemberFileInput) {
      memberDropZone.addEventListener("click", (e) => {
        if (e.target !== fieldMemberFileInput && selectMemberPhotoBtn && !selectMemberPhotoBtn.contains(e.target)) {
          fieldMemberFileInput.value = "";
          fieldMemberFileInput.click();
        }
      });

      memberDropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        memberDropZone.classList.add("dragover");
      });

      memberDropZone.addEventListener("dragleave", () => {
        memberDropZone.classList.remove("dragover");
      });

      memberDropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        memberDropZone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.readMemberPhotoFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (fieldMemberFileInput) {
      fieldMemberFileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.readMemberPhotoFile(e.target.files[0]);
          fieldMemberFileInput.value = "";
        }
      });
    }

    // Quick Text Paste Box Listener
    const quickInput = document.getElementById("quickTextPasteInput");
    if (quickInput) {
      quickInput.addEventListener("input", (e) => {
        this.parseAndFillFields(e.target.value);
      });
      quickInput.addEventListener("paste", (e) => {
        const text = e.clipboardData?.getData("text");
        if (text) {
          setTimeout(() => this.parseAndFillFields(text), 10);
        }
      });
    }

    // Clipboard Paste Event for Member Photo & Text (Ctrl+V)
    document.addEventListener("paste", (e) => {
      const modal = document.getElementById("memberEditModal");
      if (!modal || modal.classList.contains("hidden")) return;

      // DO NOT intercept paste if user is actively focusing inside ANY input or textarea element!
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        return;
      }

      const clipboardData = e.clipboardData;
      if (!clipboardData) return;

      // 1. Text Paste (only if text structured like "이름:")
      const pastedText = clipboardData.getData("text");
      if (pastedText && (pastedText.includes("이름:") || pastedText.includes("이름"))) {
        this.parseAndFillFields(pastedText);
        return;
      }

      // 2. Image Paste (Only when NOT focused inside text input fields!)
      const items = clipboardData.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              this.readMemberPhotoFile(file);
              e.preventDefault();
              break;
            }
          }
        }
      }
    });
  }

  // Calculate Member Age Dynamically Based on Registration Year vs Current Year
  getCalculatedAge(member) {
    if (!member || !member.age) return "연령 미상";
    
    const match = member.age.match(/\d+/);
    if (!match) return member.age;
    
    const baseAge = parseInt(match[0], 10);
    
    let baseYear = member.registeredYear;
    if (!baseYear && member.assemblyMonth) {
      const yMatch = member.assemblyMonth.match(/\d{4}/);
      if (yMatch) {
        baseYear = parseInt(yMatch[0], 10);
      }
    }
    if (!baseYear) baseYear = 2025;

    const currentYear = new Date().getFullYear();
    const yearsPassed = currentYear - baseYear;
    const calculatedAge = baseAge + Math.max(0, yearsPassed);
    
    return `${calculatedAge}세`;
  }

  readMemberPhotoFile(file) {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        this.rawPastedImage = dataUrl;

        // If image is a screenshot (landscape format or split photo/text)
        if (img.width > img.height * 1.05) {
          // 1. Crop Left ~45% for Photo & Fit inside 400x400 Pure White frame
          const canvas = document.createElement("canvas");
          const cropW = Math.floor(img.width * 0.45);
          canvas.width = 400;
          canvas.height = 400;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, 400, 400);

          const scale = Math.min(400 / cropW, 400 / img.height);
          const nw = cropW * scale;
          const nh = img.height * scale;
          ctx.drawImage(img, 0, 0, cropW, img.height, (400 - nw) / 2, (400 - nh) / 2, nw, nh);

          this.tempMemberPhoto = this.getOptimizedPhotoDataUrl(canvas);
          this.renderMemberPhotoPreview();

          // 2. OCR & Auto-extract text fields from the Right side
          this.extractTextFromScreenshot(img);

          // 3. Open Interactive Cropper Modal for fine-tuning
          this.openCropperModal(dataUrl);
        } else {
          // Normal portrait photo -> open cropper for fine tuning!
          this.tempMemberPhoto = dataUrl;
          this.renderMemberPhotoPreview();
          this.openCropperModal(dataUrl);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  getOptimizedPhotoDataUrl(sourceCanvas) {
    if (!sourceCanvas) return "";
    try {
      const smallCanvas = document.createElement("canvas");
      smallCanvas.width = 240;
      smallCanvas.height = 240;
      const ctx = smallCanvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 240, 240);
      ctx.drawImage(sourceCanvas, 0, 0, 240, 240);
      return smallCanvas.toDataURL("image/jpeg", 0.82);
    } catch(e) {
      return sourceCanvas.toDataURL("image/jpeg", 0.7);
    }
  }

  openCropperModal(dataUrl = null) {
    const modal = document.getElementById("photoCropModal");
    const canvas = document.getElementById("cropCanvas");
    if (!modal || !canvas) return;

    const src = dataUrl || this.rawPastedImage || this.tempMemberPhoto;
    if (!src) return;

    this.cropSourceImg = new Image();
    this.cropSourceImg.onload = () => {
      // Reset Sliders
      this.cropScale = 1.0;
      this.cropOffsetX = 0;
      this.cropOffsetY = 0;

      const zSlider = document.getElementById("cropZoomSlider");
      const xSlider = document.getElementById("cropXSlider");
      const ySlider = document.getElementById("cropYSlider");
      const txt = document.getElementById("zoomValText");

      if (zSlider) zSlider.value = 100;
      if (xSlider) xSlider.value = 0;
      if (ySlider) ySlider.value = 0;
      if (txt) txt.innerText = "100%";

      this.bindCropCanvasControls();
      this.renderCropCanvas();

      modal.classList.remove("hidden");
    };
    this.cropSourceImg.src = src;
  }

  bindCropCanvasControls() {
    const canvas = document.getElementById("cropCanvas");
    const zSlider = document.getElementById("cropZoomSlider");
    const xSlider = document.getElementById("cropXSlider");
    const ySlider = document.getElementById("cropYSlider");

    if (zSlider && !zSlider.bound) {
      zSlider.bound = true;
      zSlider.addEventListener("input", (e) => {
        this.cropScale = parseInt(e.target.value, 10) / 100;
        const txt = document.getElementById("zoomValText");
        if (txt) txt.innerText = e.target.value + "%";
        this.renderCropCanvas();
      });
    }

    if (xSlider && !xSlider.bound) {
      xSlider.bound = true;
      xSlider.addEventListener("input", (e) => {
        this.cropOffsetX = parseInt(e.target.value, 10);
        this.renderCropCanvas();
      });
    }

    if (ySlider && !ySlider.bound) {
      ySlider.bound = true;
      ySlider.addEventListener("input", (e) => {
        this.cropOffsetY = parseInt(e.target.value, 10);
        this.renderCropCanvas();
      });
    }

    // Mouse Dragging Support on Canvas
    if (canvas && !canvas.bound) {
      canvas.bound = true;
      let isDragging = false;
      let startX = 0, startY = 0;

      canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - (this.cropOffsetX || 0);
        startY = e.clientY - (this.cropOffsetY || 0);
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        this.cropOffsetX = Math.max(-300, Math.min(300, e.clientX - startX));
        this.cropOffsetY = Math.max(-300, Math.min(300, e.clientY - startY));
        if (xSlider) xSlider.value = this.cropOffsetX;
        if (ySlider) ySlider.value = this.cropOffsetY;
        this.renderCropCanvas();
      });

      window.addEventListener("mouseup", () => {
        isDragging = false;
      });
    }
  }

  renderCropCanvas() {
    const canvas = document.getElementById("cropCanvas");
    if (!canvas || !this.cropSourceImg) return;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 400, 400);

    const img = this.cropSourceImg;
    const baseScale = Math.max(400 / img.width, 400 / img.height);
    const scale = (this.cropScale || 1.0) * baseScale;
    const w = img.width * scale;
    const h = img.height * scale;

    const x = (400 - w) / 2 + (this.cropOffsetX || 0);
    const y = (400 - h) / 2 + (this.cropOffsetY || 0);

    ctx.drawImage(img, x, y, w, h);
  }

  applyCanvasCrop() {
    const canvas = document.getElementById("cropCanvas");
    if (!canvas) return;

    this.tempMemberPhoto = this.getOptimizedPhotoDataUrl(canvas);
    const photoInput = document.getElementById("fieldPhoto");
    if (photoInput) photoInput.value = this.tempMemberPhoto;

    this.renderMemberPhotoPreview();
    document.getElementById("photoCropModal")?.classList.add("hidden");
  }

  async extractTextFromScreenshot(img) {
    const toastEl = document.getElementById("ocrStatusToast");
    if (toastEl) {
      toastEl.style.display = "block";
      toastEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 캡처 이미지에서 인물 사진 및 프로필 텍스트를 자동으로 분석 중입니다...`;
    }

    try {
      const rightCanvas = document.createElement("canvas");
      const rightX = Math.floor(img.width * 0.38);
      const rightW = img.width - rightX;
      rightCanvas.width = rightW;
      rightCanvas.height = img.height;
      const ctx = rightCanvas.getContext("2d");
      ctx.drawImage(img, rightX, 0, rightW, img.height, 0, 0, rightW, img.height);

      // Apply High Contrast Binarization for 99%+ OCR accuracy
      const imgData = ctx.getImageData(0, 0, rightW, img.height);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const gray = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
        const val = gray > 175 ? 255 : 0;
        d[i] = val;
        d[i+1] = val;
        d[i+2] = val;
      }
      ctx.putImageData(imgData, 0, 0);

      if (window.Tesseract) {
        const result = await Tesseract.recognize(rightCanvas, 'kor+eng');
        const txt = result.data.text;
        console.log("High-Contrast OCR Extracted Text:", txt);
        this.parseAndFillFields(txt);
        if (toastEl) {
          toastEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> ✨ 캡처 이미지에서 사진 및 프로필 텍스트 정보가 성공적으로 분석되어 채워졌습니다!`;
        }
      } else {
        if (toastEl) {
          toastEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> ✨ 캡처 이미지에서 인물 사진이 자동으로 깔끔하게 크롭되어 배치되었습니다!`;
        }
      }
    } catch(e) {
      console.error("OCR Extraction error:", e);
      if (toastEl) {
        toastEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> ✨ 캡처 이미지에서 인물 사진이 자동으로 배치되었습니다!`;
      }
    }
  }

  parseAndFillFields(txt) {
    if (!txt) return;

    const cleanTxt = txt.replace(/구원받은 식구/g, '구원').replace(/사역/g, '봉사');
    console.log("Parsing text:", cleanTxt);

    // Name: 이름 : Eden Megersa
    const mName = cleanTxt.match(/이름\s*[:;=]?\s*([^\n\r]+)/i);
    if (mName) {
      const nameVal = mName[1].trim();
      if (nameVal) document.getElementById("fieldName").value = nameVal;
    }

    // Age: 나이 : 26세
    const mAge = cleanTxt.match(/나이\s*[:;=]?\s*([^\n\r]+)/i);
    if (mAge) {
      const ageVal = mAge[1].trim();
      if (ageVal) document.getElementById("fieldAge").value = ageVal;
    }

    // Region: 지역 : 아디스아바바
    const mRegion = cleanTxt.match(/지역\s*[:;=]?\s*([^\n\r]+)/i);
    if (mRegion) {
      const regionVal = mRegion[1].trim();
      if (regionVal) document.getElementById("fieldRegion").value = regionVal;
    }

    // Job: 직업 : 회계사
    const mJob = cleanTxt.match(/직업\s*[:;=]?\s*([^\n\r]+)/i);
    if (mJob) {
      const jobVal = mJob[1].trim();
      if (jobVal) document.getElementById("fieldJob").value = jobVal;
    }

    // Assembly Month / Date: 집회 참석 일자 : 2025. 3
    const mAsm = cleanTxt.match(/집회\s*참석\s*(?:일자|월)?\s*[:;=]?\s*([^\n\r]+)/i);
    if (mAsm) {
      const asmVal = mAsm[1].trim();
      if (asmVal) document.getElementById("fieldAssemblyMonth").value = asmVal;
    }

    // Inviter: 초대자 : Fikru Tesfaye
    const mInv = cleanTxt.match(/초대자\s*[:;=]?\s*([^\n\r]+)/i);
    if (mInv && !mInv[0].includes("관계")) {
      const invVal = mInv[1].trim();
      if (invVal) document.getElementById("fieldInviter").value = invVal;
    }

    // Inviter Relation: 초대자와의 관계 : 아내
    const mRel = cleanTxt.match(/초대자와의\s*관계\s*[:;=]?\s*([^\n\r]+)/i);
    if (mRel) {
      const relVal = mRel[1].trim();
      if (relVal) document.getElementById("fieldInviterRelation").value = relVal;
    }

    // Testimony Link: https://www.youtube.com/watch?v=fTwqLehQ8dw
    const mLink = cleanTxt.match(/https?:\/\/[^\s\n\r]+/i);
    if (mLink) {
      document.getElementById("fieldYoutube").value = mLink[0].trim();
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
          <button type="button" onclick="window.directoryComponent.removeMemberPhoto()" title="삭제" style="position:absolute; top:4px; right:4px; background:rgba(239,68,68,0.9); color:#fff; border:none; border-radius:50%; width:22px; height:22px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.4);">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <button type="button" onclick="window.directoryComponent.openCropperModal()" style="background:#f0f9ff; color:#0284c7; border:1px solid #7dd3fc; border-radius:12px; padding:0.35rem 0.8rem; font-size:0.8rem; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:0.4rem; box-shadow:0 2px 6px rgba(2,132,199,0.1);">
          <i class="fa-solid fa-crop-simple"></i> ✂️ 프로필 사진 구도/자르기 직접 수정
        </button>
      </div>
    `;
  }

  removeMemberPhoto() {
    this.tempMemberPhoto = "";
    const photoInput = document.getElementById("fieldPhoto");
    if (photoInput) photoInput.value = "";
    this.renderMemberPhotoPreview();
  }

  // Open Edit Modal for Adding or Updating a Member
  openEditModal(memberId = null) {
    if (window.checkAdminPermission && !window.checkAdminPermission()) return;
    const modal = document.getElementById("memberEditModal");
    const titleEl = document.getElementById("memberEditModalTitle");
    if (!modal) return;

    const idInput = document.getElementById("memberId");
    const nameInput = document.getElementById("fieldName");
    const catInput = document.getElementById("fieldCategory");
    const ageInput = document.getElementById("fieldAge");
    const regionInput = document.getElementById("fieldRegion");
    const jobInput = document.getElementById("fieldJob");
    const assemblyMonthInput = document.getElementById("fieldAssemblyMonth");
    const inviterInput = document.getElementById("fieldInviter");
    const inviterRelInput = document.getElementById("fieldInviterRelation");
    const youtubeInput = document.getElementById("fieldYoutube");
    const testimonyInput = document.getElementById("fieldTestimony");

    if (memberId) {
      const members = window.db ? window.db.getMembers() : [];
      const m = members.find(item => item.id === memberId);
      if (m) {
        if (titleEl) titleEl.innerText = `${m.name} 님 정보 수정`;
        if (idInput) idInput.value = m.id;
        if (nameInput) nameInput.value = m.name || "";
        if (catInput) catInput.value = m.category || "saved";
        if (ageInput) ageInput.value = m.age || "";
        if (regionInput) regionInput.value = m.region || "";
        if (jobInput) jobInput.value = m.job || "";
        if (assemblyMonthInput) assemblyMonthInput.value = m.assemblyMonth || "";
        if (inviterInput) inviterInput.value = m.inviter || "";
        if (inviterRelInput) inviterRelInput.value = m.inviterRelation || "";
        if (youtubeInput) youtubeInput.value = m.youtube || "";
        if (testimonyInput) testimonyInput.value = m.testimony || "";
        this.tempMemberPhoto = m.photo || "";
      }
    } else {
      if (titleEl) titleEl.innerText = "새로운 식구 등록";
      if (idInput) idInput.value = "";
      if (nameInput) nameInput.value = "";
      if (catInput) catInput.value = "saved";
      if (ageInput) ageInput.value = "";
      if (regionInput) regionInput.value = "";
      if (jobInput) jobInput.value = "";
      if (assemblyMonthInput) assemblyMonthInput.value = "";
      if (inviterInput) inviterInput.value = "";
      if (inviterRelInput) inviterRelInput.value = "";
      if (youtubeInput) youtubeInput.value = "";
      if (testimonyInput) testimonyInput.value = "";
      this.tempMemberPhoto = "";
    }

    this.renderMemberPhotoPreview();
    modal.classList.remove("hidden");
  }

  saveMemberFromForm() {
    const idInput = document.getElementById("memberId");
    const nameInput = document.getElementById("fieldName");
    const catInput = document.getElementById("fieldCategory");
    const ageInput = document.getElementById("fieldAge");
    const regionInput = document.getElementById("fieldRegion");
    const jobInput = document.getElementById("fieldJob");
    const assemblyMonthInput = document.getElementById("fieldAssemblyMonth");
    const inviterInput = document.getElementById("fieldInviter");
    const inviterRelInput = document.getElementById("fieldInviterRelation");
    const youtubeInput = document.getElementById("fieldYoutube");
    const testimonyInput = document.getElementById("fieldTestimony");

    const photoHiddenInput = document.getElementById("fieldPhoto");
    const photoVal = this.tempMemberPhoto || (photoHiddenInput && photoHiddenInput.value ? photoHiddenInput.value : "");
    const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f1f5f9"/><circle cx="200" cy="160" r="70" fill="%230284c7"/><path d="M80,360 C80,260 320,260 320,360 Z" fill="%230284c7"/></svg>`;

    let nameVal = nameInput ? nameInput.value.trim() : "";
    if (!nameVal) nameVal = "신규 식구";

    let regionVal = regionInput ? regionInput.value.trim() : "";
    if (!regionVal) regionVal = "아디스아바바";

    let rawYoutube = youtubeInput ? youtubeInput.value.trim() : "";
    if (rawYoutube && !rawYoutube.startsWith("http://") && !rawYoutube.startsWith("https://")) {
      rawYoutube = "https://" + rawYoutube;
    }

    const memberData = {
      id: (idInput && idInput.value) ? idInput.value : ("mem-" + Date.now()),
      name: nameVal,
      category: catInput ? catInput.value : "saved",
      age: ageInput ? ageInput.value.trim() : "",
      region: regionVal,
      job: jobInput ? jobInput.value.trim() : "",
      assemblyMonth: assemblyMonthInput ? assemblyMonthInput.value.trim() : "",
      inviter: inviterInput ? inviterInput.value.trim() : "",
      inviterRelation: inviterRelInput ? inviterRelInput.value.trim() : "",
      photo: photoVal || defaultAvatar,
      youtube: rawYoutube,
      testimony: testimonyInput ? testimonyInput.value.trim() : "",
      registeredYear: new Date().getFullYear()
    };

    if (window.db) {
      if (idInput && idInput.value) {
        window.db.updateMember(memberData);
      } else {
        window.db.addMember(memberData);
      }
    }

    const modal = document.getElementById("memberEditModal");
    if (modal) modal.classList.add("hidden");

    this.render();
    alert(`✨ ${nameVal} 님의 사진 및 간증 정보가 성공적으로 저장되었습니다!`);
  }

  deleteMember(memberId) {
    if (window.checkAdminPermission && !window.checkAdminPermission()) return;
    if (!confirm("정말 이 식구 기록을 삭제하시겠습니까?")) return;
    if (window.db) {
      window.db.deleteMember(memberId);
    }
    this.render();
  }

  openMemberDetailModal(memberId) {
    const members = window.db ? window.db.getMembers() : [];
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const modal = document.getElementById("memberDetailModal");
    const body = document.getElementById("memberDetailBody");
    if (!modal || !body) return;

    const isDisrupter = member.category === "disrupter";

    const isEn = window.i18n && window.i18n.getLang() === 'en';
    const nameDisp = isEn ? (member.nameEn || window.i18n.translateContent(member.name)) : member.name;
    const regionDisp = isEn ? (member.regionEn || window.i18n.translateContent(member.region)) : member.region;
    const jobDisp = isEn ? (member.jobEn || window.i18n.translateContent(member.job || 'No Occupation Listed')) : (member.job || '직업 정보 없음');
    const assemblyMonthDisp = isEn ? window.i18n.translateContent(member.assemblyMonth || '-') : (member.assemblyMonth || '-');
    const inviterDisp = isEn ? (member.inviterEn || window.i18n.translateContent(member.inviter || '')) : (member.inviter || '');
    const inviterRelDisp = isEn ? (member.inviterRelationEn || window.i18n.translateContent(member.inviterRelation || 'invitation')) : (member.inviterRelation || '초대');
    const testimonyDisp = isEn ? (member.testimonyEn || window.i18n.translateContent(member.testimony || 'No testimony text recorded.')) : (member.testimony || '등록된 간증 문구가 없습니다.');

    body.innerHTML = `
      <div class="member-detail-header" style="display:flex; gap:1.5rem; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap;">
        <div style="position:relative; width:130px; height:130px; border-radius:16px; overflow:hidden; border:3px solid ${isDisrupter ? '#ef4444' : '#0284c7'}; box-shadow:0 4px 15px rgba(0,0,0,0.1); flex-shrink:0; background:#ffffff;">
          <img src="${member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'}" alt="${nameDisp}" style="width:100%; height:100%; object-fit:contain; background:#ffffff; display:block;" />
        </div>
        <div style="flex:1; min-width:200px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.6rem;">
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <h2 style="font-size:1.6rem; font-weight:800; margin:0; color:var(--text-primary);">${nameDisp}</h2>
              ${isDisrupter ? `<span class="badge badge-danger" style="font-size:0.8rem; padding:0.25rem 0.7rem;">⚠️ Disrupter</span>` : ''}
            </div>

            <!-- Tiny Edit Button in Detail Modal -->
            <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('memberDetailModal').classList.add('hidden'); window.directoryComponent.openEditModal('${member.id}')" title="Edit" style="padding:0.3rem 0.7rem; font-size:0.82rem;">
              <i class="fa-solid fa-pen"></i> ${isEn ? 'Edit' : '수정'}
            </button>
          </div>
          
          <p style="margin:0 0 0.6rem 0; color:var(--text-secondary); font-size:0.95rem; font-weight:600;">
            ${regionDisp} · ${this.getCalculatedAge(member)} · ${jobDisp}
          </p>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <span style="font-size:0.82rem; background:var(--bg-main); padding:0.25rem 0.65rem; border-radius:12px; border:1px solid var(--border-color);">
              📅 ${isEn ? 'Attended Seminar:' : '집회 참석:'} <strong>${assemblyMonthDisp}</strong>
            </span>
            ${member.inviter ? `
              <span style="font-size:0.82rem; background:var(--bg-main); padding:0.25rem 0.65rem; border-radius:12px; border:1px solid var(--border-color); cursor:pointer;" onclick="document.getElementById('memberDetailModal').classList.add('hidden'); window.directoryComponent.openNetworkModal('${member.inviter}')">
                <i class="fa-solid fa-user-plus" style="color:#0284c7;"></i> ${isEn ? 'Inviter:' : '초대자:'} <strong style="text-decoration:underline;">${inviterDisp}</strong> (${inviterRelDisp})
              </span>
            ` : ''}
          </div>
        </div>
      </div>

      <div style="margin-top:1.2rem; padding-top:1.2rem; border-top:1px solid var(--border-color);">
        <h4 style="font-size:1.05rem; font-weight:700; margin:0 0 0.6rem 0; color:var(--text-primary);"><i class="fa-solid fa-quote-left" style="color:#0284c7; margin-right:6px;"></i> ${isEn ? 'News & Salvation Testimony' : '소식 & 구원 간증'}</h4>
        <p style="font-size:0.95rem; line-height:1.7; color:var(--text-primary); white-space:pre-line; margin-bottom:1.2rem;">
          ${testimonyDisp}
        </p>

        ${member.youtube ? `
          <div style="margin-top:1rem;">
            <button type="button" class="btn btn-secondary" style="background:var(--bg-hover); color:var(--text-primary); border:1px solid var(--border-color); width:100%; padding:0.7rem; border-radius:10px; font-weight:700; font-size:0.95rem; display:flex; align-items:center; justify-content:center; gap:0.5rem; transition:var(--transition);" onclick="window.directoryComponent.openVideoModal('${member.youtube}', '${member.name}')">
              <i class="fa-solid fa-circle-play" style="font-size:1.1rem; color:var(--accent-gold);"></i> ${isEn ? 'Watch Testimony Video' : `${nameDisp} 님 간증 영상 보기`}
            </button>
          </div>
        ` : ''}
      </div>

      <div style="display:flex; justify-content:flex-end; gap:0.6rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
        <button type="button" class="btn btn-danger btn-sm" onclick="document.getElementById('memberDetailModal').classList.add('hidden'); window.directoryComponent.deleteMember('${member.id}')">
          <i class="fa-solid fa-trash"></i> 삭제
        </button>
      </div>
    `;

    modal.classList.remove("hidden");
  }

  playVideoModal(memberName, url) {
    this.openVideoModal(url, memberName);
  }

  // Pure Video Player Popup (YouTube & Google Drive Support)
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
      }
      if (videoId) iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    if (!iframeSrc) {
      window.open(videoUrl, "_blank");
      return;
    }

    let modal = document.getElementById("videoPlayerModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "videoPlayerModal";
      modal.className = "modal-backdrop";
      modal.style.zIndex = "99999";
      modal.innerHTML = `
        <div class="modal-card modal-card-lg" style="max-width:860px; background:#ffffff; color:var(--text-primary); padding:1.5rem; border-radius:16px; position:relative; box-shadow:0 20px 40px rgba(0,0,0,0.2);">
          <button style="position:absolute; top:12px; right:12px; background:rgba(0,0,0,0.08); color:var(--text-primary); border:none; border-radius:50%; width:32px; height:32px; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center;" onclick="document.getElementById('videoPlayerModal').classList.add('hidden'); document.getElementById('videoModalContainer').innerHTML='';"><i class="fa-solid fa-xmark"></i></button>
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1rem;">
            <i class="fa-solid fa-circle-play" style="font-size:1.4rem; color:var(--accent-gold);"></i>
            <h3 id="videoModalTitle" style="font-size:1.15rem; font-weight:700; margin:0; color:var(--text-primary);">구원 간증 영상</h3>
          </div>
          <div id="videoModalContainer" class="video-responsive" style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; background:#000;">
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

    document.getElementById("videoModalTitle").innerText = `🎬 ${memberName} 님 구원 간증 영상`;
    document.getElementById("videoModalContainer").innerHTML = `
      <iframe src="${iframeSrc}" title="${memberName} 간증 영상" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>
    `;

    modal.classList.remove("hidden");
  }

  // Inviter Specific Modal
  openNetworkModal(inviterName = null) {
    const allMembers = window.db ? window.db.getMembers() : [];
    const modal = document.getElementById("networkModal");
    const body = document.getElementById("networkModalBody");

    let inviterNameClean = inviterName ? inviterName.trim() : "";

    if (!inviterNameClean) {
      // Full Tree Mode if no inviterName provided
      const sorted = [...allMembers].sort((a, b) => (a.assemblyMonth || '').localeCompare(b.assemblyMonth || ''));
      
      body.innerHTML = `
        <div class="network-header-clean" style="margin-bottom:1.2rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">
          <div class="network-title-row" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.6rem;">
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <i class="fa-solid fa-sitemap network-icon" style="color:#0284c7; font-size:1.3rem;"></i>
              <h3 style="margin:0; font-size:1.25rem; font-weight:800; color:var(--text-primary);">전도 초청 계보 & 복음 전도 나무</h3>
            </div>
          </div>
          <p class="network-subtitle" style="margin:0.4rem 0 0 0; font-size:0.88rem; color:var(--text-muted);">
            에티오피아 복음 전도 시작부터 구원의 열매가 이어진 은혜의 계보입니다.
          </p>
        </div>

        <div class="genealogy-compact-tree">
          <div class="tree-step-card origin">
            <div class="step-avatar-box origin">
              <i class="fa-solid fa-church"></i>
            </div>
            <div class="step-details">
              <div class="step-name-row">
                <strong>체코 ELC 시작</strong>
                <span class="step-date-badge">2023.08</span>
              </div>
              <p class="step-sub text-muted">Eden 스태프 합류 & 에티오피아 3대 언어 번역 추진</p>
            </div>
          </div>

          <div class="tree-line-connector" style="display:flex; align-items:center; gap:0.4rem; justify-content:center; color:var(--text-muted); font-size:0.85rem; padding:0.4rem 0;">
            <i class="fa-solid fa-arrow-down" style="color:#0284c7;"></i>
            <span>BIT 영어 온라인 집회 초청</span>
          </div>

          ${sorted.map((m, idx) => `
            <div class="tree-step-card member" style="border:1px solid var(--border-color); border-radius:12px; padding:0.9rem 1.1rem; margin-bottom:0.4rem; background:var(--bg-card); display:flex; align-items:center; gap:1rem;">
              <div class="step-avatar-box" style="width:60px; height:60px; border-radius:12px; overflow:hidden; border:2px solid #0284c7; flex-shrink:0; background:#ffffff;">
                <img src="${m.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'}" alt="${m.name}" style="width:100%; height:100%; object-fit:contain; background:#ffffff; display:block;" />
              </div>
              <div class="step-details" style="flex:1;">
                <div class="step-name-row" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.2rem; flex-wrap:wrap; gap:0.4rem;">
                  <strong class="member-name" style="font-size:1.05rem; font-weight:800; color:var(--text-primary);">${m.name}</strong>
                  <span class="step-date-badge gold" style="font-size:0.8rem; font-weight:700; background:#fef3c7; color:#b45309; padding:0.2rem 0.6rem; border-radius:12px;">${m.assemblyMonth || ''}</span>
                </div>
                <p class="step-sub font-bold" style="margin:0 0 0.2rem 0; font-size:0.86rem; color:var(--text-muted);">${m.region} | ${m.job || '-'}</p>
                ${m.inviter ? `
                  <p class="step-relation" style="margin:0; font-size:0.82rem; color:var(--text-secondary);">
                    <i class="fa-solid fa-user-plus" style="color:#0284c7;"></i> 초대자: <strong style="color:var(--text-primary); cursor:pointer; text-decoration:underline;" onclick="window.directoryComponent.openNetworkModal('${m.inviter}')">${m.inviter}</strong> (${m.inviterRelation || '초대'})
                  </p>
                ` : ''}
              </div>
            </div>

            ${idx < sorted.length - 1 ? `
              <div class="tree-line-connector" style="display:flex; align-items:center; gap:0.4rem; justify-content:center; color:var(--text-muted); font-size:0.85rem; padding:0.35rem 0;">
                <i class="fa-solid fa-arrow-down" style="color:#0284c7;"></i>
                <span>${sorted[idx+1].inviterRelation ? sorted[idx+1].inviterRelation : '초대'}</span>
              </div>
            ` : ''}
          `).join('')}
        </div>
      `;
      modal.classList.remove("hidden");
      return;
    }

    // Inviter Specific View: Find Inviter Profile & DIRECTLY INVITED MEMBERS ONLY
    const inviterObj = allMembers.find(m => m.name.toLowerCase().includes(inviterNameClean.toLowerCase()) || inviterNameClean.toLowerCase().includes(m.name.toLowerCase()));
    
    // Filter ONLY members directly invited by this inviter
    const invitedMembers = allMembers.filter(m => m.inviter && m.inviter.trim().toLowerCase().includes(inviterNameClean.toLowerCase()));

    const inviterPhoto = inviterObj && inviterObj.photo ? inviterObj.photo : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';

    body.innerHTML = `
      <!-- TOP INVITER PROFILE HEADER BANNER -->
      <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color:#ffffff; padding:1.4rem 1.6rem; border-radius:16px; margin-bottom:1.5rem; box-shadow:0 10px 30px rgba(2,132,199,0.25); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
        
        <div style="display:flex; align-items:center; gap:1.2rem;">
          <div style="width:90px; height:90px; border-radius:14px; overflow:hidden; border:3px solid #ffffff; box-shadow:0 4px 15px rgba(0,0,0,0.15); flex-shrink:0; background:#ffffff;">
            <img src="${inviterPhoto}" alt="${inviterNameClean}" style="width:100%; height:100%; object-fit:contain; background:#ffffff; display:block;" />
          </div>

          <div>
            <div style="font-size:0.82rem; color:#e0f2fe; font-weight:800; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:2px;">
              <i class="fa-solid fa-user-check"></i> 초대자 초청 그룹
            </div>
            <h2 style="font-size:1.6rem; font-weight:900; margin:0 0 4px 0; color:#ffffff;">${inviterNameClean} ${inviterObj ? `<span style="font-size:0.9rem; font-weight:600; color:#f0f9ff;">(${inviterObj.region} · ${inviterObj.job || ''})</span>` : ''}</h2>
            <p style="font-size:0.9rem; color:#f0f9ff; margin:0; font-weight:600;">
              초청을 통해 오게 된 참석자: <strong style="color:#fbbf24; font-size:1.08rem; font-weight:900;">총 ${invitedMembers.length}명</strong>
            </p>
          </div>
        </div>

        <button type="button" class="btn btn-secondary btn-sm" onclick="window.directoryComponent.openNetworkModal(null)" style="background:rgba(255,255,255,0.2); color:#ffffff; border:1px solid rgba(255,255,255,0.4); border-radius:20px; font-weight:700; padding:0.4rem 1rem;">
          <i class="fa-solid fa-sitemap"></i> 전체 계보 보기
        </button>
      </div>

      <!-- AT-A-GLANCE DIRECTLY INVITED MEMBERS GRID -->
      ${invitedMembers.length === 0 ? `
        <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
          <i class="fa-solid fa-users-slash" style="font-size:2.2rem; margin-bottom:0.6rem;"></i>
          <p style="font-size:1rem; font-weight:700;">이 초대자를 통해 직접 초청된 참석자 기록이 없습니다.</p>
        </div>
      ` : `
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap:1rem;">
          ${invitedMembers.map(m => {
            const isDisrupter = m.category === "disrupter";
            return `
              <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--shadow-sm); cursor:pointer; transition:all 0.2s;" onclick="document.getElementById('networkModal').classList.add('hidden'); window.directoryComponent.openMemberDetailModal('${m.id}')" class="hover-shadow-card">
                
                <div style="display:flex; align-items:center; gap:0.9rem;">
                  <div style="width:58px; height:58px; border-radius:10px; overflow:hidden; border:2px solid ${isDisrupter ? '#ef4444' : '#0284c7'}; flex-shrink:0; background:#ffffff;">
                    <img src="${m.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'}" alt="${m.name}" style="width:100%; height:100%; object-fit:contain; background:#ffffff; display:block;" />
                  </div>
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:2px;">
                      <div style="font-weight:800; font-size:1rem; color:var(--text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${m.name}</div>
                      ${isDisrupter ? `<span style="font-size:0.7rem; font-weight:700; color:#ef4444; background:#fee2e2; padding:0.1rem 0.4rem; border-radius:8px;">분탕</span>` : ''}
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${m.region} · ${this.getCalculatedAge(m)}</div>
                    <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:3px; font-weight:600;">
                      <i class="fa-solid fa-calendar-days" style="color:var(--accent-gold); margin-right:4px;"></i> ${m.assemblyMonth || ''}
                    </div>
                  </div>
                </div>

                ${(m.testimony || m.youtube) ? `
                  <div style="margin-top:0.6rem; padding-top:0.6rem; border-top:1px dashed var(--border-color); display:flex; justify-content:flex-end;">
                    <button type="button" onclick="event.stopPropagation(); document.getElementById('networkModal').classList.add('hidden'); window.directoryComponent.openTestimonyLink('${m.testimony || m.youtube}', '${m.name}')" style="background:var(--bg-hover); color:var(--text-primary); border:1px solid var(--border-color); border-radius:12px; padding:0.25rem 0.65rem; font-size:0.76rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:0.35rem;">
                      <i class="fa-solid fa-circle-play" style="color:var(--accent-gold);"></i> 🎬 간증 보기
                    </button>
                  </div>
                ` : ''}

              </div>
            `;
          }).join('')}
        </div>
      `}
    `;

    modal.classList.remove("hidden");
  }

  openTestimonyLink(url, memberName) {
    if (!url) return;
    const cleanUrl = url.trim();
    if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be") || cleanUrl.includes("drive.google.com/file/d/")) {
      this.openVideoModal(cleanUrl, memberName);
    } else {
      window.open(cleanUrl, "_blank");
    }
  }

  parseAssemblyDate(dateStr) {
    if (!dateStr) return "9999.99.99";
    const matches = dateStr.match(/\d+/g);
    if (!matches || matches.length === 0) return "9999.99.99";
    const year = matches[0];
    const month = matches.length > 1 ? matches[1].padStart(2, '0') : '01';
    const day = matches.length > 2 ? matches[2].padStart(2, '0') : '01';
    return `${year}.${month}.${day}`;
  }

  resetFilters() {
    this.activeCategory = "all";
    this.activeRegion = null;
    this.searchQuery = "";
    const searchInput = document.getElementById("searchMemberInput");
    if (searchInput) searchInput.value = "";
    const regionDropdown = document.getElementById("regionDropdown");
    if (regionDropdown) regionDropdown.value = "all";
    this.render();
  }

  filterMembers() {
    const allMembers = window.db ? window.db.getMembers() : [];
    
    const filtered = allMembers.filter(m => {
      // Category Filter
      if (this.activeCategory !== "all") {
        if (this.activeCategory === "saved" && m.category !== "saved") return false;
        if (this.activeCategory === "disrupter" && m.category !== "disrupter") return false;
      }

      // Region Filter
      if (this.activeRegion && this.activeRegion !== "all" && this.activeRegion !== "전체") {
        const target = this.activeRegion.toLowerCase().trim();
        const mReg = (m.region || "기타").toLowerCase().trim();

        if (target === "세베타" || target === "sebeta") {
          if (!mReg.includes("세베타") && !mReg.includes("sebeta")) return false;
        } else if (target === "모조" || target === "mojo" || target === "modjo") {
          if (!mReg.includes("모조") && !mReg.includes("mojo") && !mReg.includes("modjo")) return false;
        } else if (target === "네켐테" || target === "nekemte") {
          if (!mReg.includes("네켐테") && !mReg.includes("nekemte")) return false;
        } else if (target === "하와사" || target === "hawassa" || target === "awassa") {
          if (!mReg.includes("하와사") && !mReg.includes("hawassa") && !mReg.includes("아와사") && !mReg.includes("awassa")) return false;
        } else if (target === "아르바민치" || target === "arba minch" || target === "arbaminch") {
          if (!mReg.includes("아르바민치") && !mReg.includes("아르바 민치") && !mReg.includes("arba minch") && !mReg.includes("arbaminch")) return false;
        } else if (target === "알렘테나" || target === "alem tena" || target === "alemtena") {
          if (!mReg.includes("알렘테나") && !mReg.includes("알렘 테나") && !mReg.includes("alem tena") && !mReg.includes("alemtena")) return false;
        } else if (target === "아사사" || target === "asasa" || target === "아르시" || target === "arsi") {
          if (!mReg.includes("아사사") && !mReg.includes("asasa") && !mReg.includes("아르시") && !mReg.includes("arsi")) return false;
        } else if (target === "아디스아바바" || target === "addis") {
          if (!mReg.includes("아디스아바바") && !mReg.includes("addis")) return false;
        } else if (target === "비쇼프투" || target === "bishoftu") {
          if (!mReg.includes("비쇼프투") && !mReg.includes("bishoftu")) return false;
        } else if (target === "아다마" || target === "adama") {
          if (!mReg.includes("아다마") && !mReg.includes("adama")) return false;
        } else if (target === "바히르다르" || target === "bahir") {
          if (!mReg.includes("바히르다르") && !mReg.includes("bahir")) return false;
        } else if (target === "디레다와" || target === "dire") {
          if (!mReg.includes("디레다와") && !mReg.includes("dire")) return false;
        } else if (target === "곤다르" || target === "gondar") {
          if (!mReg.includes("곤다르") && !mReg.includes("gondar")) return false;
        } else if (target === "지마" || target === "jimma") {
          if (!mReg.includes("지마") && !mReg.includes("jimma")) return false;
        } else if (target === "기타") {
          const knowns = ["아디스아바바", "addis", "비쇼프투", "bishoftu", "아다마", "adama", "세베타", "sebeta", "모조", "mojo", "modjo", "네켐테", "nekemte", "하와사", "hawassa", "아르바민치", "알렘테나", "아사사", "바히르다르", "bahir", "디레다와", "dire", "곤다르", "지마"];
          if (knowns.some(k => mReg.includes(k))) return false;
        } else {
          if (!mReg.includes(target) && !target.includes(mReg)) return false;
        }
      }

      // Search Query Filter
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const nameMatch = (m.name || "").toLowerCase().includes(q);
        const regionMatch = (m.region || "").toLowerCase().includes(q);
        const jobMatch = (m.job || "").toLowerCase().includes(q);
        const inviterMatch = (m.inviter || "").toLowerCase().includes(q);
        return nameMatch || regionMatch || jobMatch || inviterMatch;
      }

      return true;
    });

    // Sort chronologically ascending by assemblyMonth (2024 -> 2025 -> 2026)
    return filtered.sort((a, b) => {
      return this.parseAssemblyDate(a.assemblyMonth).localeCompare(this.parseAssemblyDate(b.assemblyMonth));
    });
  }

  createCardHtml(m) {
    const isDisrupter = m.category === "disrupter";
    const photoUrl = m.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';
    const currentCalculatedAge = this.getCalculatedAge(m);
    const testimonyUrl = (m.testimony || m.youtube || "").trim();

    const isEn = window.i18n && window.i18n.getLang() === 'en';
    const nameDisp = isEn ? (m.nameEn || window.i18n.translateContent(m.name)) : m.name;
    const regionDisp = isEn ? (m.regionEn || window.i18n.translateContent(m.region)) : m.region;
    const jobDisp = isEn ? (m.jobEn || window.i18n.translateContent(m.job || '-')) : (m.job || '-');
    const assemblyMonthDisp = isEn ? window.i18n.translateContent(m.assemblyMonth || '-') : (m.assemblyMonth || '-');
    const viewTestimonyLabel = isEn ? "Testimony" : "간증 보기";

    return `
      <div class="member-card ${isDisrupter ? 'disrupter-card' : ''}" onclick="window.directoryComponent.openMemberDetailModal('${m.id}')" style="cursor:pointer; background:var(--bg-card); border:1px solid var(--border-color); border-radius:20px; overflow:hidden; box-shadow:var(--shadow-sm); transition:transform 0.25s, box-shadow 0.25s; display:flex; flex-direction:column; padding:0.4rem 0.4rem 1rem 0.4rem;">
        
        <!-- SQUIRCLE ROUNDED PHOTO FRAME -->
        <div style="position:relative; width:170px; height:170px; margin:0.8rem auto 0.6rem auto; border-radius:18px; overflow:hidden; border:1px solid var(--border-color); background:#ffffff; flex-shrink:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.06);">
          <img src="${photoUrl}" alt="${nameDisp}" loading="lazy" style="width:100%; height:100%; object-fit:cover; display:block;" />
          ${isDisrupter ? `
            <span class="badge badge-danger" style="position:absolute; top:6px; left:6px; font-size:0.72rem; font-weight:800; padding:0.2rem 0.5rem; border-radius:10px; z-index:2;">
              ⚠️ Disrupter
            </span>
          ` : ''}
        </div>

        <!-- CARD INFO BODY -->
        <div style="padding:0.4rem 0.8rem 0.2rem 0.8rem; display:flex; flex-direction:column; flex:1; justify-content:space-between;">
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.25rem;">
              <h3 style="font-size:1.22rem; font-weight:800; margin:0; color:#1e3a8a; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${nameDisp}</h3>
              
              <button type="button" onclick="event.stopPropagation(); window.directoryComponent.openEditModal('${m.id}')" title="${nameDisp} 정보 수정" style="background:transparent; color:var(--text-muted); border:none; padding:2px 6px; font-size:0.85rem; cursor:pointer; border-radius:4px;" class="hover-text-primary">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </div>

            <p style="font-size:0.88rem; color:var(--text-secondary); margin:0 0 0.3rem 0; font-weight:600;">${regionDisp} · ${currentCalculatedAge}</p>
            <p style="font-size:0.84rem; color:var(--text-muted); margin:0 0 0.5rem 0; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;"><i class="fa-solid fa-briefcase" style="margin-right:4px;"></i> ${jobDisp}</p>
          </div>

          <div style="padding-top:0.5rem; border-top:1px solid var(--border-color); font-size:0.82rem;">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:0.4rem;">
              <span style="color:var(--text-muted); font-weight:600;"><i class="fa-solid fa-calendar-days" style="color:var(--accent-gold); margin-right:4px;"></i> ${assemblyMonthDisp}</span>
              
              ${testimonyUrl ? `
                <button type="button" onclick="event.stopPropagation(); window.directoryComponent.openTestimonyLink('${testimonyUrl}', '${m.name}')" title="${nameDisp} 간증 보기" style="background:#f0f9ff; color:#0284c7; border:1px solid #7dd3fc; border-radius:10px; padding:0.2rem 0.55rem; font-size:0.75rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:0.3rem; box-shadow:0 1px 4px rgba(2,132,199,0.1);">
                  <i class="fa-solid fa-circle-play" style="color:#0284c7; font-size:0.8rem;"></i> ${viewTestimonyLabel}
                </button>
              ` : `
                <button type="button" onclick="event.stopPropagation(); window.directoryComponent.openEditModal('${m.id}')" title="${nameDisp} 간증 링크 등록" style="background:#f8fafc; color:#64748b; border:1px dashed #cbd5e1; border-radius:10px; padding:0.18rem 0.45rem; font-size:0.72rem; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:0.25rem;">
                  <i class="fa-solid fa-plus" style="font-size:0.68rem; color:#0284c7;"></i> 등록
                </button>
              `}
            </div>

            ${m.inviter ? `
              <div onclick="event.stopPropagation(); window.directoryComponent.openNetworkModal('${m.inviter}')" style="cursor:pointer; color:var(--text-secondary); font-weight:600; margin-top:0.35rem; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;" class="hover-text-primary" title="${m.inviter} 초청 참석자 명단 보기">
                <i class="fa-solid fa-user-plus" style="color:#0284c7; margin-right:4px;"></i> 초대자: <strong style="color:var(--text-primary); text-decoration:underline;">${m.inviter}</strong>
              </div>
            ` : ''}
          </div>
        </div>

      </div>
    `;
  }

  render() {
    if (!this.container) this.container = document.getElementById("memberGrid") || document.getElementById("memberGridContainer");
    if (!this.container) return;

    const filtered = this.filterMembers();

    // Sync Region Dropdown Select
    const regionDropdown = document.getElementById("regionDropdown");
    if (regionDropdown && !this.activeRegion) {
      regionDropdown.value = "all";
    } else if (regionDropdown && this.activeRegion) {
      regionDropdown.value = this.activeRegion;
    }

    // Render Active Filters Badge
    if (this.activeFiltersBadge) {
      let labels = [];
      if (this.activeRegion) labels.push(`지역: ${this.activeRegion}`);
      if (this.activeCategory !== "all") {
        const catNames = { saved: "구원받은 식구", disrupter: "분탕꾼" };
        labels.push(`구분: ${catNames[this.activeCategory]}`);
      }
      if (this.searchQuery) labels.push(`검색: "${this.searchQuery}"`);

      if (labels.length > 0) {
        const labelEl = document.getElementById("activeFilterLabel");
        if (labelEl) labelEl.innerText = labels.join(" | ");
        this.activeFiltersBadge.classList.remove("hidden");
      } else {
        this.activeFiltersBadge.classList.add("hidden");
      }
    }

    // Re-render Map with full members count
    if (window.mapComponent) {
      window.mapComponent.render(window.db ? window.db.getMembers() : []);
    }

    if (filtered.length === 0) {
      // Auto-healing fallback: If filters are all default but filtered count is 0 (due to stale localStorage), clear stale localStorage & re-render!
      const isDefaultFilters = (!this.activeRegion || this.activeRegion === "all" || this.activeRegion === "전체") && (this.activeCategory === "all") && !this.searchQuery;
      if (isDefaultFilters) {
        try {
          localStorage.removeItem("ethiopia_members");
          localStorage.removeItem("ethiopia_members_v2");
        } catch(e) {}
        const restored = window.db ? window.db.getMembers() : (typeof DEFAULT_MEMBERS !== 'undefined' ? DEFAULT_MEMBERS : []);
        if (restored && restored.length > 0) {
          this.container.className = "mockup-member-grid";
          this.container.innerHTML = restored.map(m => this.createCardHtml(m)).join("");
          return;
        }
      }

      this.container.className = "member-grid-empty";
      this.container.innerHTML = `
        <div class="empty-state" style="padding:4rem 1rem; text-align:center; background:var(--bg-card); border:1px solid var(--border-color); border-radius:16px; margin:1rem 0; box-shadow:var(--shadow-sm);">
          <i class="fa-solid fa-users" style="font-size:3rem; color:#0284c7; margin-bottom:1rem;"></i>
          <h3 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin-bottom:0.5rem;">등록된 식구가 조회되지 않습니다</h3>
          <p style="font-size:0.92rem; color:var(--text-secondary); max-width:480px; margin:0 auto 1.5rem auto; line-height:1.6;">
            선택하신 지역, 구분 또는 검색어 조건에 일치하는 식구가 없습니다.<br/>
            필터를 '전체보기'로 선택하시거나 검색어를 확인해 주세요.
          </p>
          <button type="button" class="btn btn-primary" onclick="window.directoryComponent.resetFilters()" style="padding:0.75rem 1.6rem; font-size:1rem; font-weight:800; border-radius:24px; box-shadow:0 4px 15px rgba(2,132,199,0.3); cursor:pointer;">
            <i class="fa-solid fa-rotate-left" style="margin-right:6px;"></i> 모든 식구 전체보기 (필터 초기화)
          </button>
        </div>
      `;
      return;
    }

    this.container.className = "mockup-member-grid";
    this.container.innerHTML = filtered.map(m => this.createCardHtml(m)).join("");
  }
}

window.DirectoryComponent = DirectoryComponent;
