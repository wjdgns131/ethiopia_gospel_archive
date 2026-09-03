/**
 * 에티오피아 선교 아카이브 - 실시간 구글 지도(Google Maps) 대화형 연동 엔진
 * Google Maps Roadmap / Satellite / Terrain 타일 지원 + GPS 100% 밀착
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
  { id: "기타", name: "기타 지역", lat: 8.0000, lng: 37.5000 }
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
    this.currentTileLayer = null;
    this.currentLayerMode = 'roadmap';
    this.markers = [];
  }

  openMapLightbox() {
    let modal = document.getElementById("mapLightboxModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "mapLightboxModal";
      modal.className = "modal-backdrop";
      modal.style.zIndex = "99999";
      modal.innerHTML = `
        <div style="position:relative; width:92vw; max-width:1100px; max-height:92vh; background:#0f172a; padding:1.25rem; border-radius:16px; display:flex; flex-direction:column; align-items:center; box-shadow:0 25px 50px rgba(0,0,0,0.6);">
          <button style="position:absolute; top:-12px; right:-12px; background:#ef4444; color:#fff; border:none; border-radius:50%; width:34px; height:34px; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center;" onclick="document.getElementById('mapLightboxModal').classList.add('hidden')"><i class="fa-solid fa-xmark"></i></button>
          
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:0.75rem; color:#fff;">
            <h3 style="font-size:1.15rem; font-weight:700; margin:0;"><i class="fa-solid fa-map-location-dot" style="color:var(--accent-gold);"></i> 에티오피아 Google Maps 정밀 지도</h3>
            <span style="font-size:0.8rem; color:#94a3b8;"><i class="fa-solid fa-circle-info"></i> 클릭 및 줌으로 자유 확대</span>
          </div>

          <div style="position:relative; width:100%; max-height:80vh; overflow:auto; border-radius:12px; background:#f1f5f9; border:1px solid #334155;">
            <img src="images/ethiopia_map_clean.png?v=20260902_85" alt="Ethiopia Map Zoomed" style="width:100%; min-width:900px; display:block;" />
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
      });
    }
    modal.classList.remove("hidden");
  }

  render(members) {
    if (!this.container) this.container = document.getElementById(this.containerId || "ethiopiaMapContainer");
    if (!this.pillsContainer) this.pillsContainer = document.getElementById(this.pillsContainerId || "regionPillsList");
    
    if (!this.container || !this.pillsContainer) return;

    members = members || (window.db ? window.db.getMembers() : []);

    const totalCntEl = document.getElementById("totalMembersCount");
    if (totalCntEl) totalCntEl.innerText = members ? members.length : 0;

    // Compute member counts per region
    const counts = {};
    ETHIOPIA_REGIONS.forEach(r => counts[r.id] = 0);
    members.forEach(m => {
      const regId = normalizeRegionId(m.region);
      counts[regId] = (counts[regId] || 0) + 1;
    });

    // Render Google Maps Engine
    if (typeof L !== 'undefined') {
      this.renderGoogleMap(counts, members);
    }

    // Render Sidebar Region Pills (ONLY for regions with count > 0)
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
      if (cnt === 0) return; // Hide regions with 0 members!

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

    // Attach Listener to Pills
    this.pillsContainer.querySelectorAll('.region-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const reg = pill.getAttribute('data-region');
        this.selectRegion(reg === 'all' ? null : reg);
      });
    });
  }

  renderGoogleMap(counts, members) {
    let mapDiv = document.getElementById("googleMapDiv");
    if (!mapDiv) {
      this.container.innerHTML = `
        <div style="position:relative; width:100%; height:350px; border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--border-color); box-shadow:var(--shadow-sm);">
          <div id="googleMapDiv" style="width:100%; height:100%; z-index:1;"></div>
          
          <!-- Top Right Toolbar: Google Map Layer Switcher + External Link -->
          <div style="position:absolute; top:10px; right:10px; z-index:400; display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
            <!-- Layer Switcher -->
            <div style="background:rgba(255,255,255,0.96); padding:3px; border-radius:8px; border:1px solid #cbd5e1; display:flex; gap:2px; box-shadow:0 2px 8px rgba(0,0,0,0.12);">
              <button type="button" onclick="window.mapComponent.switchMapLayer('roadmap')" id="btnLayerRoadmap" style="padding:4px 9px; font-size:11px; font-weight:700; border-radius:6px; border:none; background:#0284c7; color:#fff; cursor:pointer; transition:all 0.15s ease;">🗺️ Google 지도</button>
              <button type="button" onclick="window.mapComponent.switchMapLayer('satellite')" id="btnLayerSatellite" style="padding:4px 9px; font-size:11px; font-weight:700; border-radius:6px; border:none; background:transparent; color:#334155; cursor:pointer; transition:all 0.15s ease;">🛰️ Google 위성</button>
              <button type="button" onclick="window.mapComponent.switchMapLayer('terrain')" id="btnLayerTerrain" style="padding:4px 9px; font-size:11px; font-weight:700; border-radius:6px; border:none; background:transparent; color:#334155; cursor:pointer; transition:all 0.15s ease;">⛰️ Google 지형</button>
            </div>

            <!-- Open in Google Maps App Button -->
            <a href="https://www.google.com/maps/@9.0300,38.7400,7.5z" target="_blank" rel="noopener noreferrer" style="background:#ffffff; color:#15803d; border:1px solid #86efac; border-radius:8px; padding:0.35rem 0.65rem; font-weight:700; font-size:0.75rem; text-decoration:none; display:flex; align-items:center; gap:4px; box-shadow:0 2px 8px rgba(0,0,0,0.12);" title="Google Maps 외부 앱에서 큰 화면으로 열기">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Google Maps 앱
            </a>
          </div>

          <!-- Bottom Left Powered by Google Maps Badge -->
          <div style="position:absolute; bottom:8px; left:8px; z-index:400; background:rgba(255,255,255,0.9); color:#0f172a; padding:3px 8px; border-radius:6px; font-size:10.5px; font-weight:700; border:1px solid rgba(0,0,0,0.15); display:flex; align-items:center; gap:5px; pointer-events:none; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
            <i class="fa-brands fa-google" style="color:#4285F4;"></i> Google Maps 실시간 연동 (GPS 100% 정밀 밀착)
          </div>
        </div>
      `;
      mapDiv = document.getElementById("googleMapDiv");
    }

    if (!this.leafletMap && mapDiv) {
      // Initialize Leaflet Map with Google Maps Tiles centered over Ethiopia
      this.leafletMap = L.map('googleMapDiv', {
        center: [8.8, 38.8],
        zoom: 7,
        minZoom: 5,
        maxZoom: 18,
        zoomControl: true
      });

      // Default: Google Maps Roadmap Tile Layer
      this.switchMapLayer(this.currentLayerMode || 'roadmap');
    }

    if (!this.leafletMap) return;

    // Clear previous markers
    this.markers.forEach(m => this.leafletMap.removeLayer(m));
    this.markers = [];

    // Add Markers with Exact Google Maps GPS Coordinates
    ETHIOPIA_REGIONS.forEach(reg => {
      const cnt = counts[reg.id] || 0;
      if (cnt === 0) return;

      const isActive = this.activeRegion === reg.id;
      const isCap = reg.isCapital;

      // Custom Google Maps Pin Icon
      const pinIcon = L.divIcon({
        className: 'google-custom-pin',
        html: `
          <div style="position:relative; display:flex; flex-direction:column; align-items:center; cursor:pointer;">
            <div style="width:${isCap ? 32 : 26}px; height:${isCap ? 32 : 26}px; border-radius:50%; background:${isActive ? '#1d4ed8' : '#d97706'}; border:2.5px solid #ffffff; color:#ffffff; font-weight:800; font-size:${isCap ? 13 : 11}px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.4); transform:${isActive ? 'scale(1.18)' : 'scale(1)'}; transition:all 0.2s ease;">
              ${cnt}
            </div>
            <div style="background:${isActive ? 'rgba(30, 58, 138, 0.95)' : 'rgba(255, 255, 255, 0.95)'}; color:${isActive ? '#ffffff' : '#0f172a'}; padding:2px 8px; border-radius:6px; border:1px solid ${isActive ? '#3b82f6' : 'rgba(0,0,0,0.25)'}; font-size:10.5px; font-weight:700; white-space:nowrap; margin-top:3px; box-shadow:0 2px 6px rgba(0,0,0,0.25);">
              ${reg.id}
            </div>
          </div>
        `,
        iconSize: [80, 50],
        iconAnchor: [40, 15]
      });

      const marker = L.marker([reg.lat, reg.lng], { icon: pinIcon }).addTo(this.leafletMap);
      marker.on('click', () => {
        this.selectRegion(reg.id);
      });

      this.markers.push(marker);
    });
  }

  switchMapLayer(mode) {
    if (!this.leafletMap) return;
    this.currentLayerMode = mode;

    if (this.currentTileLayer) {
      this.leafletMap.removeLayer(this.currentTileLayer);
    }

    let url = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'; // Roadmap
    if (mode === 'satellite') {
      url = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'; // Satellite Hybrid
    } else if (mode === 'terrain') {
      url = 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'; // Terrain
    }

    this.currentTileLayer = L.tileLayer(url, {
      attribution: '&copy; Google Maps',
      maxZoom: 20
    }).addTo(this.leafletMap);

    // Update active button styles
    ['Roadmap', 'Satellite', 'Terrain'].forEach(type => {
      const btn = document.getElementById(`btnLayer${type}`);
      if (btn) {
        const isMatch = type.toLowerCase() === mode;
        btn.style.background = isMatch ? '#0284c7' : 'transparent';
        btn.style.color = isMatch ? '#ffffff' : '#334155';
      }
    });
  }

  selectRegion(regionId) {
    this.activeRegion = regionId;
    if (this.onRegionSelect) {
      this.onRegionSelect(regionId);
    }
    // Re-render markers to highlight selected pin
    if (window.db) {
      const members = window.db.getMembers();
      const counts = {};
      ETHIOPIA_REGIONS.forEach(r => counts[r.id] = 0);
      members.forEach(m => {
        const regId = normalizeRegionId(m.region);
        counts[regId] = (counts[regId] || 0) + 1;
      });
      if (this.leafletMap) {
        this.renderGoogleMap(counts, members);
      }
    }
  }
}

window.EthiopiaMapComponent = EthiopiaMapComponent;
