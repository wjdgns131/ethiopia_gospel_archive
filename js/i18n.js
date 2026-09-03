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
      membersTitle: "식구 기록 아카이브",
      membersSubtitle: "구원받은 식구들의 귀한 소식과 프로필입니다.",
      addMemberBtn: "➕ 새로운 식구 등록하기",
      syncCodeBtn: "⚡ 소스코드 파일에 영구 동기화",
      exportBackupBtn: "💾 백업 다운로드 (.json)",
      mapTitle: "에티오피아 지역별 식구 분포 지도",
      mapSubtitle: "지도의 핀을 클릭하면 필터링됩니다.",
      selectRegionTitle: "지역 선택",
      allRegionsLabel: "📍 전체 지역",
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
      viewTestimonyBtn: "Testimony",
      editMemberBtn: "수정",
      deleteMemberBtn: "삭제",

      // Calendar Sidebar
      addCalendarEventBtn: "+ 일정 등록",
      keyHolidaysTitle: "이번 달 주요 명절",
      ethiopianNoteLabel: "에티오피아 명절",
      holidayEnkutatash: "11일 : 엔쿠타타시 (Enkutatash / 에티오피아 새해)",
      holidayMeskel: "27일 : 메스켈 (Meskel / 십자가 발견 축제)",
      dayMon: "월", dayTue: "화", dayWed: "수", dayThu: "목", dayFri: "금", daySat: "토", daySun: "일",

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
      siteSubtitle: "Evangelical Seminar · Baptism · Directory",
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
      membersTitle: "Member Directory Archive",
      membersSubtitle: "Records and profiles of saved members and seekers.",
      addMemberBtn: "➕ Add New Member",
      syncCodeBtn: "⚡ Sync to Code File",
      exportBackupBtn: "💾 Export Backup (.json)",
      mapTitle: "Ethiopia Member Map",
      mapSubtitle: "Click map pins to filter members by region.",
      selectRegionTitle: "Select Region",
      allRegionsLabel: "📍 All Regions",
      searchPlaceholder: "Search by name, inviter, occupation...",
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
      viewTestimonyBtn: "Testimony",
      editMemberBtn: "Edit",
      deleteMemberBtn: "Delete",

      // Calendar Sidebar
      addCalendarEventBtn: "+ Add Event",
      keyHolidaysTitle: "Key Holidays This Month",
      ethiopianNoteLabel: "Ethiopian Holidays",
      holidayEnkutatash: "11th: Enkutatash (Ethiopian New Year)",
      holidayMeskel: "27th: Meskel (Finding of True Cross)",
      dayMon: "Mon", dayTue: "Tue", dayWed: "Wed", dayThu: "Thu", dayFri: "Fri", daySat: "Sat", daySun: "Sun",

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

  // 1. Direct Occupation Translation Lookup Table
  const occupationTranslations = {
    "회계사": "Accountant",
    "마취과 의사": "Anesthesiologist",
    "의사": "Doctor",
    "간호사": "Nurse",
    "대학생": "University Student",
    "고등학교생": "High School Student",
    "고등학생": "High School Student",
    "초등학생": "Elementary Student",
    "학생": "Student",
    "교사": "Teacher",
    "선생님": "Teacher",
    "교수": "Professor",
    "자영업": "Self-employed",
    "가정부": "Housekeeper",
    "가사 도우미": "Housekeeper",
    "식당 운영": "Restaurant Owner",
    "음식점 운영": "Restaurant Owner",
    "직물 사업": "Textile Business",
    "섬유 사업": "Textile Business",
    "공무원": "Civil Servant",
    "엔지니어": "Engineer",
    "기술자": "Engineer",
    "건축가": "Architect",
    "변호사": "Lawyer",
    "운전기사": "Driver",
    "운전사": "Driver",
    "농부": "Farmer",
    "무직": "Unemployed",
    "전도사": "Evangelist",
    "목사": "Pastor",
    "선교사": "Missionary",
    "형제": "Brother",
    "자매": "Sister",
    "음식&미용 전문가": "Food & Beauty Specialist",
    "직업 정보 없음": "No Occupation Listed"
  };

  // 2. Comprehensive Terminology & Sentence Replacements
  const termReplacements = [
    // Core User Term Mappings
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

    // Core Phrases & Titles
    { ko: /성경은 사실이다/g, en: "The Bible is True" },
    { ko: /체코에서의 시작/g, en: "Beginning in Czech" },
    { ko: /에티오피아 3대 언어/g, en: "3 Main Languages of Ethiopia" },
    { ko: /번역 추진/g, en: "Translation Initiative" },
    { ko: /온라인 집회 개시/g, en: "Launch of Online Seminars" },
    { ko: /첫 구원 열매/g, en: "First Fruit of Salvation" },
    { ko: /구원 열매/g, en: "Fruit of Salvation" },
    { ko: /구원의 고백/g, en: "Confession of Salvation" },
    { ko: /간증 발표/g, en: "Testimony Presentation" },
    { ko: /간증/g, en: "testimony" },
    { ko: /더빙/g, en: "dubbing" },
    { ko: /번역 작업/g, en: "translation work" },
    { ko: /번역/g, en: "translation" },
    { ko: /동역자/g, en: "fellow worker" },
    { ko: /초청/g, en: "invitation" },
    { ko: /참석/g, en: "attendance" },
    { ko: /서아프리카팀/g, en: "West Africa Team" },
    { ko: /현장 활동 사진/g, en: "Field Activity Photos" },
    { ko: /화살표 클릭 또는 좌우 드래그로 2줄 사진 감상/g, en: "Click arrows or drag left/right to view photo gallery" },
    { ko: /이전 사진 보기/g, en: "Previous Photo" },
    { ko: /다음 사진 보기/g, en: "Next Photo" },
    { ko: /문구 및 사진 수정/g, en: "Edit Content & Photos" },
    { ko: /소식 & 구원 간증/g, en: "News & Salvation Testimony" },

    // Connectors & Grammar Terms
    { ko: /에서/g, en: " in " },
    { ko: /에서의/g, en: " in " },
    { ko: /으로/g, en: " via " },
    { ko: /으로/g, en: " with " },
    { ko: /까지/g, en: " to " },
    { ko: /부터/g, en: " from " },
    { ko: /합류했습니다/g, en: "joined as staff" },
    { ko: /시작되었습니다/g, en: "began" },
    { ko: /완료했습니다/g, en: "was completed" },
    { ko: /개최했습니다/g, en: "was held" },
    { ko: /방문했습니다/g, en: "visited" },
    { ko: /진행하여/g, en: "progressed and" },
    { ko: /추진하였습니다/g, en: "was initiated" },
    { ko: /물색하였으며/g, en: "was recruited" },

    // Relationships
    { ko: /지인/g, en: "acquaintance" },
    { ko: /동료/g, en: "colleague" },
    { ko: /부부/g, en: "couple" },
    { ko: /남편/g, en: "husband" },
    { ko: /아내/g, en: "wife" },
    { ko: /여동생/g, en: "younger sister" },
    { ko: /남동생/g, en: "younger brother" },
    { ko: /친구/g, en: "friend" },

    // Cities
    { ko: /아디스아바바\s*\([^)]*\)/g, en: "Addis Ababa" },
    { ko: /비쇼프투\s*\([^)]*\)/g, en: "Bishoftu" },
    { ko: /아다마\s*\([^)]*\)/g, en: "Adama" },
    { ko: /세베타\s*\([^)]*\)/g, en: "Sebeta" },
    { ko: /지마\s*\([^)]*\)/g, en: "Jimma" },
    { ko: /아디스아바바/g, en: "Addis Ababa" },
    { ko: /비쇼프투/g, en: "Bishoftu" },
    { ko: /아다마/g, en: "Adama" },
    { ko: /지마/g, en: "Jimma" },
    { ko: /세베타/g, en: "Sebeta" },
    { ko: /기타 지역|기타/g, en: "Other Regions" },
    { ko: /체코/g, en: "Czech" },
    { ko: /독일/g, en: "Germany" },
    { ko: /말타/g, en: "Malta" },
    { ko: /가나/g, en: "Ghana" },
    { ko: /토고/g, en: "Togo" },
    { ko: /영국/g, en: "UK" },
    { ko: /한국/g, en: "Korea" },
    { ko: /에티오피아/g, en: "Ethiopia" },

    // Dates
    { ko: /(\d{4})년\s*12월/g, en: "December $1" },
    { ko: /(\d{4})년\s*11월/g, en: "November $1" },
    { ko: /(\d{4})년\s*10월/g, en: "October $1" },
    { ko: /(\d{4})년\s*9월/g, en: "September $1" },
    { ko: /(\d{4})년\s*8월/g, en: "August $1" },
    { ko: /(\d{4})년\s*7월/g, en: "July $1" },
    { ko: /(\d{4})년\s*6월/g, en: "June $1" },
    { ko: /(\d{4})년\s*5월/g, en: "May $1" },
    { ko: /(\d{4})년\s*4월/g, en: "April $1" },
    { ko: /(\d{4})년\s*3월/g, en: "March $1" },
    { ko: /(\d{4})년\s*2월/g, en: "February $1" },
    { ko: /(\d{4})년\s*1월/g, en: "January $1" },
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
      if (window.calendarComponent && typeof window.calendarComponent.render === "function") {
        window.calendarComponent.render();
      }
      if (window.mapComponent && typeof window.mapComponent.render === "function") {
        window.mapComponent.render();
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

    // Dynamic Live Translator Engine
    translateContent(text) {
      if (!text || typeof text !== "string") return text;
      if (this.currentLang === "ko") return text;

      const trimmed = text.trim();
      // Check direct occupation dictionary match first!
      if (occupationTranslations[trimmed]) {
        return occupationTranslations[trimmed];
      }

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
