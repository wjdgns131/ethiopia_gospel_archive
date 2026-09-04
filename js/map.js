/**
 * 에티오피아 선교 아카이브 - 실시간 구글 지도(Google Maps) 대화형 연동 엔진 v26000
 * 구글 공식 라이브 지도 Iframe + 전 지역 실시간 줌인 & 핀 배지 연동
 */

const ETHIOPIA_REGIONS = [
  { id: "아디스아바바", name: "아디스아바바 (Addis Ababa)", query: "Addis+Ababa,Ethiopia", lat: 9.0300, lng: 38.7400, isCapital: true },
  { id: "아다마", name: "아다마 (Adama / Nazret)", query: "Adama,Ethiopia", lat: 8.5400, lng: 39.2700 },
  { id: "비쇼프투", name: "비쇼프투 (Bishoftu)", query: "Bishoftu,Ethiopia", lat: 8.7500, lng: 38.9833 },
  { id: "세베타", name: "세베타 (Sebeta)", query: "Sebeta,Ethiopia", lat: 8.9167, lng: 38.6167 },
  { id: "네켐테", name: "네켐테 (Nekemte)", query: "Nekemte,Ethiopia", lat: 9.0833, lng: 36.5500 },
  { id: "하와사", name: "하와사 (Hawassa)", query: "Hawassa,Ethiopia", lat: 7.0620, lng: 38.4763 },
  { id: "모조", name: "모조 (Mojo)", query: "Mojo,Ethiopia", lat: 8.5900, lng: 39.1200 },
  { id: "아르바민치", name: "아르바 민치 (Arba Minch)", query: "Arba+Minch,Ethiopia", lat: 6.0333, lng: 37.5500 },
  { id: "알렘테나", name: "알렘 테나 (Alem Tena)", query: "Alem+Tena,Ethiopia", lat: 8.3000, lng: 38.9500 },
  { id: "아사사", name: "아사사 / 아르시 (Asasa)", query: "Asasa,Ethiopia", lat: 7.1000, lng: 39.2000 },
  { id: "바히르다르", name: "바히르다르 (Bahir Dar)", query: "Bahir+Dar,Ethiopia", lat: 11.5936, lng: 37.3908 },
  { id: "디레다와", name: "디레다와 (Dire Dawa)", query: "Dire+Dawa,Ethiopia", lat: 9.5931, lng: 41.8661 },
  { id: "곤다르", name: "곤다르 (Gondar)", query: "Gondar,Ethiopia", lat: 12.6000, lng: 37.4667 },
  { id: "지마", name: "지마 (Jimma)", query: "Jimma,Ethiopia", lat: 7.6667, lng: 36.8333 },
  { id: "기타", name: "기타 지역", query: "Ethiopia", lat: 8.8000, lng: 38.8000 }
];

function normalizeRegionId(rawRegion) {
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

class EthiopiaMapComponent {
  constructor(containerId, pillsContainerId, onRegionSelect) {
    this.containerId = containerId || "ethiopiaMapContainer";
    this.pillsContainerId = pillsContainerId || "regionPillsList";
    this.container = document.getElementById(this.containerId);
    this.pillsContainer = document.getElementById(this.pillsContainerId);
    this.onRegionSelect = onRegionSelect;
    this.activeRegion = null;
  }

  render(members) {
    if (!this.pillsContainer) this.pillsContainer = document.getElementById(this.pillsContainerId || "regionPillsList");
    members = members || (window.db ? window.db.getMembers() : []);

    const totalCntEl = document.getElementById("totalMembersCount");
    if (totalCntEl) totalCntEl.innerText = members ? members.length : 0;

    const counts = {};
    ETHIOPIA_REGIONS.forEach(r => counts[r.id] = 0);
    members.forEach(m => {
      const regId = normalizeRegionId(m.region);
      counts[regId] = (counts[regId] || 0) + 1;
    });

    // Render Dynamic Overlay Map Pins right inside Google Map Container
    this.renderDynamicMapPins(counts);

    // Render Sidebar Region Pills
    if (this.pillsContainer) {
      const isEn = window.i18n && window.i18n.getLang() === 'en';
      const unitDisp = isEn ? '' : '명';
      let pillsHtml = `
        <button class="region-pill ${!this.activeRegion ? 'active' : ''}" data-region="all">
          <span>${isEn ? '📍 All Regions' : '📍 전체 지역'}</span>
          <span class="region-badge">${members.length}${unitDisp}</span>
        </button>
      `;

      ETHIOPIA_REGIONS.forEach(reg => {
        const cnt = counts[reg.id] || 0;
        if (cnt === 0) return;

        const isActive = this.activeRegion === reg.id;
        const regNameDisp = isEn ? window.i18n.translateContent(reg.name) : reg.name;
        pillsHtml += `
          <button class="region-pill ${isActive ? 'active' : ''}" data-region="${reg.id}">
            <span>📍 ${regNameDisp}</span>
            <span class="region-badge">${cnt}${unitDisp}</span>
          </button>
        `;
      });

      this.pillsContainer.innerHTML = pillsHtml;

      this.pillsContainer.querySelectorAll('.region-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const reg = pill.getAttribute('data-region');
          this.selectRegion(reg === 'all' ? null : reg);
        });
      });
    }
  }

  renderDynamicMapPins(counts) {
    const pinsContainer = document.getElementById("googleMapOverlayPins");
    if (!pinsContainer) return;

    let pinsHtml = "";
    ETHIOPIA_REGIONS.forEach(reg => {
      const cnt = counts[reg.id] || 0;
      if (cnt === 0) return;

      const isActive = this.activeRegion === reg.id;
      pinsHtml += `
        <button type="button" onclick="if(window.mapComponent) window.mapComponent.selectRegion('${reg.id}')" style="background:${isActive ? '#2563eb' : '#d97706'}; color:#ffffff; font-weight:900; font-size:11.5px; padding:4px 10px; border-radius:14px; border:2px solid #ffffff; box-shadow:0 4px 15px rgba(0,0,0,0.5); cursor:pointer; display:inline-flex; align-items:center; gap:4px; transform:${isActive ? 'scale(1.12)' : 'scale(1)'}; transition:all 0.2s;">
          <i class="fa-solid fa-location-dot" style="color:#fbbf24;"></i> 📍 ${reg.id} (${cnt}명)
        </button>
      `;
    });

    pinsContainer.innerHTML = pinsHtml;
  }

  selectRegion(regionId) {
    this.activeRegion = regionId;

    const iframe = document.getElementById("liveGoogleMapsIframe");
    let mapQuery = "Addis+Ababa,Ethiopia";
    let zoomLevel = 7;

    const targetReg = ETHIOPIA_REGIONS.find(r => r.id === regionId);
    if (targetReg && targetReg.query) {
      mapQuery = targetReg.query;
      zoomLevel = regionId === "아디스아바바" ? 11 : 12;
    }

    if (iframe) {
      iframe.src = `https://maps.google.com/maps?q=${mapQuery}&t=m&z=${zoomLevel}&output=embed`;
    }

    // Update Region Pills UI
    document.querySelectorAll(".region-pill").forEach(p => {
      const regAttr = p.getAttribute("data-region");
      const isMatch = (!regionId && regAttr === "all") || (regionId === regAttr);
      p.classList.toggle("active", isMatch);
    });

    if (window.directoryComponent) {
      window.directoryComponent.activeRegion = regionId;
      window.directoryComponent.render();
    }

    if (this.onRegionSelect) {
      try { this.onRegionSelect(regionId); } catch(e) {}
    }

    this.render(window.db ? window.db.getMembers() : []);
  }
}

if (typeof window !== 'undefined') {
  window.EthiopiaMapComponent = EthiopiaMapComponent;
}
