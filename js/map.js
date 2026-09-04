/**
 * 에티오피아 선교 아카이브 - 실시간 구글 지도(Google Maps) 대화형 연동 엔진 v29000
 * 3D 입체 빨간 구형 침 핀(Glossy 3D Red Sphere Needle Pin) + 위도/경도 100% 고정 연동
 */

const ETHIOPIA_REGIONS = [
  { id: "아디스아바바", name: "아디스아바바 (Addis Ababa)", lat: 9.0300, lng: 38.7400, isCapital: true },
  { id: "비쇼프투", name: "비쇼프투 (Bishoftu)", lat: 8.7500, lng: 38.9833 },
  { id: "아다마", name: "아다마 (Adama)", lat: 8.5400, lng: 39.2700 },
  { id: "세베타", name: "세베타 (Sebeta)", lat: 8.9167, lng: 38.6167 },
  { id: "모조", name: "모조 (Mojo)", lat: 8.5900, lng: 39.1200 },
  { id: "네켐테", name: "네켐테 (Nekemte)", lat: 9.0833, lng: 36.5500 },
  { id: "하와사", name: "하와사 (Hawassa)", lat: 7.0620, lng: 38.4763 },
  { id: "아르바민치", name: "아르바 민치 (Arba Minch)", lat: 6.0333, lng: 37.5500 },
  { id: "알렘테나", name: "알렘 테나 (Alem Tena)", lat: 8.3000, lng: 38.9500 },
  { id: "아사사", name: "아사사 / 아르시 (Asasa)", lat: 7.1000, lng: 39.2000 },
  { id: "바히르다르", name: "바히르다르 (Bahir Dar)", lat: 11.5936, lng: 37.3908 },
  { id: "디레다와", name: "디레다와 (Dire Dawa)", lat: 9.5931, lng: 41.8661 },
  { id: "곤다르", name: "곤다르 (Gondar)", lat: 12.6000, lng: 37.4667 },
  { id: "지마", name: "지마 (Jimma)", lat: 7.6667, lng: 36.8333 },
  { id: "기타", name: "기타 지역", lat: 8.8000, lng: 38.8000 }
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
    this.leafletMap = null;
    this.markers = [];
    this.currentTileLayer = null;
    this.currentLayerMode = 'roadmap';
  }

  render(members) {
    if (!this.container) this.container = document.getElementById(this.containerId || "ethiopiaMapContainer");
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

    // Render Real Geographical Leaflet Google Map Engine
    this.renderGoogleMapEngine(counts);

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

  renderGoogleMapEngine(counts) {
    const container = document.getElementById("ethiopiaMapContainer");
    if (!container) return;

    let mapDiv = document.getElementById("googleMapDiv");
    if (!mapDiv) {
      container.style.position = "relative";
      container.style.background = "#0f172a";
      container.innerHTML = `
        <div id="googleMapDiv" style="width:100%; height:360px; z-index:1; border-radius:14px; overflow:hidden;"></div>
        <div style="position:absolute; top:10px; right:10px; z-index:1000; display:flex; gap:6px; align-items:center;">
          <a href="https://www.google.com/maps/@9.0300,38.7400,7.5z" target="_blank" rel="noopener noreferrer" style="background:#0284c7; color:#ffffff; border:none; border-radius:8px; padding:0.4rem 0.8rem; font-weight:800; font-size:0.8rem; text-decoration:none; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(2,132,199,0.4);" title="Google Maps 외부 앱에서 열기">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> 🗺️ Google Maps 앱에서 열기
          </a>
        </div>
        <div style="position:absolute; bottom:8px; left:8px; right:8px; z-index:1000; background:rgba(15,23,42,0.92); color:#ffffff; padding:4px 10px; border-radius:8px; font-size:10.5px; font-weight:700; border:1px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px; box-shadow:0 4px 12px rgba(0,0,0,0.3); pointer-events:none;">
          <span style="display:flex; align-items:center; gap:6px;"><i class="fa-brands fa-google" style="color:#4285F4; font-size:12px;"></i> Google Maps 실시간 위도/경도 100% 고정 핀 연동</span>
          <span style="color:#fbbf24;">📍 지도 드래그/줌 시 핀이 지형 위치에 100% 따라 움직입니다</span>
        </div>
      `;
      mapDiv = document.getElementById("googleMapDiv");
    }

    if (typeof L !== 'undefined') {
      try {
        if (!this.leafletMap) {
          this.leafletMap = L.map('googleMapDiv', {
            center: [8.8, 38.8],
            zoom: 7,
            minZoom: 5,
            maxZoom: 18,
            zoomControl: true,
            scrollWheelZoom: true
          });

          // Google Maps Roadmap Layer
          this.currentTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            attribution: '&copy; Google Maps',
            maxZoom: 20
          }).addTo(this.leafletMap);
        }

        setTimeout(() => {
          if (this.leafletMap) this.leafletMap.invalidateSize();
        }, 200);

        // Clear previous markers
        this.markers.forEach(m => {
          try { this.leafletMap.removeLayer(m); } catch(e) {}
        });
        this.markers = [];

        // Render SVG Classic Google Maps Red Teardrop Pins matching user image media_1788507499881.png!
        ETHIOPIA_REGIONS.forEach(reg => {
          const cnt = counts[reg.id] || 0;
          if (cnt === 0) return;

          const isActive = this.activeRegion === reg.id;
          const pinFillColor = isActive ? "#2563eb" : "#e11d48";
          const nameColor = isActive ? "#fbbf24" : "#ffffff";
          const scaleTransform = isActive ? "scale(1.25)" : "scale(1)";

          const customPinHtml = `
            <div onclick="if(window.mapComponent) window.mapComponent.selectRegion('${reg.id}')" style="display:flex; flex-direction:column; align-items:center; cursor:pointer; transform-origin:bottom center; transform:${scaleTransform}; transition:all 0.2s ease;">
              <!-- Classic Google Red Teardrop Pin with White Center Circle -->
              <svg width="28" height="36" viewBox="0 0 28 36" style="filter:drop-shadow(0 4px 8px rgba(0,0,0,0.6));">
                <path d="M14 0 C6.268 0 0 6.268 0 14 C0 24.5 14 36 14 36 C14 36 28 24.5 28 14 C28 6.268 21.732 0 14 0 Z" fill="${pinFillColor}"/>
                <circle cx="14" cy="13" r="5.5" fill="#ffffff"/>
              </svg>
              <!-- Transparent City Name -->
              <span style="color:${nameColor}; font-size:11.5px; font-weight:800; text-shadow:0 2px 5px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.9); white-space:nowrap; margin-top:2px;">${reg.id}</span>
            </div>
          `;

          const pinIcon = L.divIcon({
            className: 'custom-google-teardrop-pin',
            html: customPinHtml,
            iconSize: [60, 56],
            iconAnchor: [30, 36] // Exact Teardrop Tip Anchor Point!
          });

          const marker = L.marker([reg.lat, reg.lng], { icon: pinIcon }).addTo(this.leafletMap);
          marker.on('click', () => {
            this.selectRegion(reg.id);
          });
          this.markers.push(marker);
        });

      } catch(e) {
        console.error("Leaflet map render error:", e);
      }
    }
  }

  selectRegion(regionId) {
    this.activeRegion = regionId;

    if (this.leafletMap) {
      if (!regionId) {
        this.leafletMap.flyTo([8.8, 38.8], 7, { duration: 1.2 });
      } else {
        const reg = ETHIOPIA_REGIONS.find(r => r.id === regionId);
        if (reg) {
          const zoomLvl = regionId === "아디스아바바" ? 11 : 12;
          this.leafletMap.flyTo([reg.lat, reg.lng], zoomLvl, { duration: 1.2 });
        }
      }
    }

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
