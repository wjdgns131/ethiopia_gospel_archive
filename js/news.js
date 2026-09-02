/**
 * 에티오피아 선교 아카이브 - 에티오피아 현지 일일 뉴스 & 생활 정보 위젯
 */

const DEFAULT_ETHIOPIA_NEWS = {
  date: "2026년 9월 1일 (화)",
  weather: "🌤️ 아디스아바바 22°C (소나기 후 갬)",
  usdRate: "1 USD ≒ 124.8 ETB (비르)",
  articles: [
    {
      id: "news-1",
      category: "교통·안전",
      badgeClass: "news-badge-danger",
      title: "아디스아바바 - 비쇼프투 구간 도로 정비 및 안전 운행",
      desc: "우기 막바지 도로 정비 작업 진행 중. 야간 운전 시 빗길 서행 요망.",
      time: "오늘 09:30"
    },
    {
      category: "생활·행정",
      badgeClass: "news-badge-info",
      title: "에티오피아 이민청 온라인 비자(e-Visa) 시스템 점검",
      desc: "거주비자 및 연장 시스템 최적화 작업 진행. 출국 전 사전 발급 확인 권장.",
      time: "오늘 08:15"
    },
    {
      category: "경제·유류",
      badgeClass: "news-badge-success",
      title: "수도 아디스아바바 주유소 유류 공급 원활 및 물가 안정",
      desc: "시내 주요 주유소 유류 대기선 해소. 농산물 공급망 개선으로 물가 안정세.",
      time: "어제 18:40"
    },
    {
      category: "명절·문화",
      badgeClass: "news-badge-gold",
      title: "9월 11일 에티오피아 새해(Enkutatash) 맞이 연휴 안내",
      desc: "에티오피아 달력 기준 2019년 새해(엔쿠타타시) 전국 연휴 및 대중교통 일정 공지.",
      time: "어제 14:00"
    }
  ]
};

class EthiopiaNewsComponent {
  constructor(containerId) {
    this.containerId = containerId || "ethiopiaNewsContainer";
    this.container = document.getElementById(this.containerId);
  }

  getNewsData() {
    const saved = localStorage.getItem("ethiopia_daily_news");
    if (saved) {
      try { return JSON.parse(saved); } catch(e){}
    }
    localStorage.setItem("ethiopia_daily_news", JSON.stringify(DEFAULT_ETHIOPIA_NEWS));
    return DEFAULT_ETHIOPIA_NEWS;
  }

  refreshNewsTest() {
    const news = this.getNewsData();
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Add a fresh updated daily news item
    news.articles.unshift({
      id: "news-" + Date.now(),
      category: "실시간 소식",
      badgeClass: "news-badge-live",
      title: "실시간 테스트: 아디스아바바 기온 및 시내 유류 공급 정상 공지",
      desc: "선교 사역 이동 시 수도권 도로 통행 원활. 안전한 동역 및 이동이 진행 중입니다.",
      time: `오늘 ${timeStr}`
    });

    if (news.articles.length > 5) news.articles.pop();

    localStorage.setItem("ethiopia_daily_news", JSON.stringify(news));
    this.render();
    alert("📢 실시간 에티오피아 현지 뉴스가 업데이트되었습니다!");
  }

  render() {
    if (!this.container) this.container = document.getElementById(this.containerId || "ethiopiaNewsContainer");
    if (!this.container) return;

    const data = this.getNewsData();

    this.container.innerHTML = `
      <div class="news-widget-card">
        <!-- Header -->
        <div class="news-header">
          <div class="news-title-group">
            <i class="fa-solid fa-newspaper news-icon"></i>
            <div>
              <h3 class="news-widget-title">에티오피아 일일 소식</h3>
              <p class="news-sub-date">${data.date}</p>
            </div>
          </div>
          <button type="button" class="news-refresh-btn" onclick="window.newsComponent.refreshNewsTest()" title="뉴스 실시간 테스트 갱신">
            <i class="fa-solid fa-arrows-rotate"></i> 갱신
          </button>
        </div>

        <!-- Weather & Currency Bar -->
        <div class="news-ticker-bar">
          <span class="ticker-item"><i class="fa-solid fa-cloud-sun"></i> ${data.weather}</span>
          <span class="ticker-item"><i class="fa-solid fa-coins"></i> ${data.usdRate}</span>
        </div>

        <!-- News Articles Feed -->
        <div class="news-articles-list">
          ${data.articles.map(art => `
            <div class="news-article-item">
              <div class="article-top">
                <span class="news-cat-badge ${art.badgeClass}">${art.category}</span>
                <span class="article-time">${art.time}</span>
              </div>
              <h4 class="article-title">${art.title}</h4>
              <p class="article-desc">${art.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

window.EthiopiaNewsComponent = EthiopiaNewsComponent;
