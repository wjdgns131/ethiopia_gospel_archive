/**
 * 에티오피아 선교 아카이브 - 다국어(한국어 / English) i18n 지원 모듈
 */
(function() {
  const dictionary = {
    ko: {
      siteTitle: "에티오피아 선교",
      siteSubtitle: "전도집회 · 침례식 · 식구 기록",
      tabMembers: "식구 기록",
      tabHistory: "복음 역사",
      tabFellowship: "교제 & 선교 활동",
      tabCalendar: "선교 일정",
      adminLogin: "관리자 로그인",
      adminLogout: "로그아웃",
      
      // Header Banner
      bannerQuote: '"헬라인이나 야만이나 지혜 있는 자나 어리석은 자에게 다 내가 빚진 자라"',
      bannerRef: "(로마서 1:14)",

      // Members Tab
      membersTitle: "에티오피아 복음 식구 명단",
      membersSubtitle: "아디스아바바, 비쇼프투, 아다마 지역의 구원받은 식구와 연결된 분들의 기록입니다.",
      addMemberBtn: "새 식구 등록",
      searchPlaceholder: "이름, 추천인, 직업 검색...",
      categoryAll: "전체 식구",
      categorySaved: "✝️ 구원받은 식구",
      categorySeeking: "🌱 연결 / 말씀을 듣는 중",
      filterRegionAll: "전체 지역",
      filterAssemblyAll: "전체 집회 월",
      appliedFilterLabel: "적용된 필터:",
      resetFilterBtn: "필터 초기화",
      noMembersFound: "조건에 맞는 식구가 없습니다.",
      noMembersSubtitle: "검색어나 지역 필터를 변경해 보세요.",
      
      // Member Card Labels
      ageLabel: "나이",
      regionLabel: "지역",
      jobLabel: "직업 / 신분",
      inviterLabel: "추천인",
      assemblyMonthLabel: "구원 / 연결 월",
      viewTestimonyBtn: "🎬 구원 간증 영상 보기",
      editMemberBtn: "수정",
      deleteMemberBtn: "삭제",

      // Timeline Tab
      timelineTitle: "복음 선교 역사 타임라인",
      timelineSubtitle: "에티오피아 복음 전파의 발자취와 하나님의 놀라운 역사 기록입니다.",
      addHistoryBtn: "새 역사 기록 추가",
      restoreBackupBtn: "백업 파일 복원 (.json)",
      yearFilterAll: "전체 연도",
      photoGalleryTitle: "현장 활동 사진",
      
      // Fellowship Tab
      fellowshipTitle: "교제 & 선교 활동 아카이브",
      addFellowshipBtn: "새 활동 소식 작성하기",
      catAll: "📍 전체보기",
      catFellowship: "☕ 교제",
      catDaily: "🏠 일상",
      catVisit: "🚗 탐방",
      catBook: "📚 책자",
      
      // Footer
      footerTitle: "에티오피아 선교 아카이브",
      footerCopyright: "© 2026 에티오피아 선교 아카이브 | 복음 기록 및 식구 관리 시스템"
    },
    en: {
      siteTitle: "Ethiopia Mission",
      siteSubtitle: "Evangelical Seminar · Baptism · Member Directory",
      tabMembers: "Members",
      tabHistory: "Gospel History",
      tabFellowship: "Fellowship & Activities",
      tabCalendar: "Mission Calendar",
      adminLogin: "Admin Login",
      adminLogout: "Logout",
      
      // Header Banner
      bannerQuote: '"I am under obligation both to Greeks and to barbarians, both to the wise and to the foolish."',
      bannerRef: "(Romans 1:14 ESV)",

      // Members Tab
      membersTitle: "Ethiopia Gospel Member Directory",
      membersSubtitle: "Records of saved members and seekers in Addis Ababa, Bishoftu, and Adama.",
      addMemberBtn: "Add New Member",
      searchPlaceholder: "Search by name, inviter, job...",
      categoryAll: "All Members",
      categorySaved: "✝️ Saved Members",
      categorySeeking: "🌱 Seekers / Listening",
      filterRegionAll: "All Regions",
      filterAssemblyAll: "All Seminar Months",
      appliedFilterLabel: "Applied Filter:",
      resetFilterBtn: "Reset Filters",
      noMembersFound: "No members match your criteria.",
      noMembersSubtitle: "Try changing your search keywords or region filters.",

      // Member Card Labels
      ageLabel: "Age",
      regionLabel: "Region",
      jobLabel: "Occupation",
      inviterLabel: "Inviter",
      assemblyMonthLabel: "Saved / Connected",
      viewTestimonyBtn: "🎬 Watch Salvation Testimony Video",
      editMemberBtn: "Edit",
      deleteMemberBtn: "Delete",

      // Timeline Tab
      timelineTitle: "Gospel Mission History Timeline",
      timelineSubtitle: "Footsteps of spreading the Gospel in Ethiopia and records of God's amazing work.",
      addHistoryBtn: "Add New History Record",
      restoreBackupBtn: "Restore Backup (.json)",
      yearFilterAll: "All Years",
      photoGalleryTitle: "Field Activity Photos",

      // Fellowship Tab
      fellowshipTitle: "Fellowship & Mission Activity Archive",
      addFellowshipBtn: "Add New Activity Update",
      catAll: "📍 View All",
      catFellowship: "☕ Fellowship",
      catDaily: "🏠 Daily Life",
      catVisit: "🚗 Visits",
      catBook: "📚 Materials",

      // Footer
      footerTitle: "Ethiopia Mission Archive",
      footerCopyright: "© 2026 Ethiopia Mission Archive | Gospel Records & Member System"
    }
  };

  // Terminology mappings for custom user preferences
  const termReplacements = [
    { ko: /전도집회/g, en: "Evangelical Seminar" },
    { ko: /구원받은/g, en: "saved" },
    { ko: /구원받음/g, en: "saved" },
    { ko: /구원/g, en: "salvation" },
    { ko: /침례식/g, en: "Baptism Service" },
    { ko: /침례/g, en: "baptism" },
    { ko: /모임집/g, en: "Moim House" },
    { ko: /모임/g, en: "Moim" },
    { ko: /사모님/g, en: "Samonim" },
    { ko: /권 목사님/g, en: "Reverend Kwon" },
    { ko: /권목사님/g, en: "Reverend Kwon" },
    { ko: /이강현/g, en: "Kohen" },
    { ko: /이정훈/g, en: "Franco" },

    // Regions & Locations
    { ko: /아디스아바바/g, en: "Addis Ababa" },
    { ko: /비쇼프투/g, en: "Bishoftu" },
    { ko: /아다마/g, en: "Adama" },
    { ko: /지마/g, en: "Jimma" },
    { ko: /체코/g, en: "Czech" },
    { ko: /독일/g, en: "Germany" },
    { ko: /말타/g, en: "Malta" },
    { ko: /가나/g, en: "Ghana" },
    { ko: /토고/g, en: "Togo" },
    { ko: /영국/g, en: "UK" },
    { ko: /한국/g, en: "Korea" },

    // Months & Time
    { ko: /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/g, en: "$1-$2-$3" },
    { ko: /(\d{4})년\s*(\d{1,2})월/g, en: "$1-$2" },
    { ko: /년/g, en: "." },
    { ko: /월/g, en: "" },
    { ko: /일/g, en: "" }
  ];

  class I18nManager {
    constructor() {
      this.currentLang = localStorage.getItem("ethiopia_archive_lang") || "ko";
    }

    getLang() {
      return this.currentLang;
    }

    setLang(lang) {
      if (lang !== "ko" && lang !== "en") return;
      this.currentLang = lang;
      localStorage.setItem("ethiopia_archive_lang", lang);
      this.applyDOMTranslations();
      this.updateToggleButton();
      
      // Re-render active views
      if (window.directoryComponent && typeof window.directoryComponent.render === "function") {
        window.directoryComponent.render();
      }
      if (window.timelineComponent && typeof window.timelineComponent.render === "function") {
        window.timelineComponent.render();
      }
      if (window.fellowshipComponent && typeof window.fellowshipComponent.render === "function") {
        window.fellowshipComponent.render();
      }
    }

    toggleLang() {
      const nextLang = this.currentLang === "ko" ? "en" : "ko";
      this.setLang(nextLang);
    }

    t(key) {
      const dict = dictionary[this.currentLang] || dictionary.ko;
      return dict[key] || dictionary.ko[key] || key;
    }

    translateContent(text) {
      if (!text || typeof text !== "string") return text;
      if (this.currentLang === "ko") return text;

      let translated = text;
      termReplacements.forEach(rule => {
        translated = translated.replace(rule.ko, rule.en);
      });
      return translated;
    }

    applyDOMTranslations() {
      const dict = dictionary[this.currentLang] || dictionary.ko;
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
          if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
            el.placeholder = dict[key];
          } else {
            el.textContent = dict[key];
          }
        }
      });
    }

    updateToggleButton() {
      const btn = document.getElementById("langToggleBtn");
      if (btn) {
        btn.innerHTML = this.currentLang === "ko" 
          ? `<i class="fa-solid fa-globe"></i> English` 
          : `<i class="fa-solid fa-globe"></i> 한국어`;
      }
    }

    init() {
      this.applyDOMTranslations();
      this.updateToggleButton();
    }
  }

  window.i18n = new I18nManager();
  document.addEventListener("DOMContentLoaded", () => {
    window.i18n.init();
  });
})();
