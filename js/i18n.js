/**
 * 에티오피아 선교 아카이브 - 다국어(i18n) 번역 및 언어 전환 제어 엔진
 */

class I18NManager {
  constructor() {
    this.currentLang = localStorage.getItem("ethiopia_lang") || "ko";
    this.listeners = [];

    // 사용자 지정 사역 용어 및 영문 변환 사전 (최우선 순위 적용)
    this.userTerms = [
      { kr: "전도집회", en: "Evangelical Seminar" },
      { kr: "구원", en: "salvation" },
      { kr: "침례", en: "baptism" },
      { kr: "모임집", en: "Moim House" },
      { kr: "모임", en: "Moim" },
      { kr: "사모님", en: "Samonim" },
      { kr: "권 목사님", en: "Reverend Kwon" },
      { kr: "권목사님", en: "Reverend Kwon" },
      { kr: "이강현", en: "Kohen" },
      { kr: "이정훈", en: "Franco" },
      { kr: "강현", en: "Kohen" },
      { kr: "정훈", en: "Franco" },
      { kr: "아디스아바바", en: "Addis Ababa" },
      { kr: "에티오피아", en: "Ethiopia" },
      { kr: "볼레", en: "Bole" },
      { kr: "구디나 툼사", en: "Gudina Tumsa" },
      { kr: "수양관", en: "Retreat Center" },
      { kr: "마르코스 목사", en: "Pastor Marcos" },
      { kr: "마르코스", en: "Marcos" },
      { kr: "이사진", en: "Board of Directors" },
      { kr: "입국", en: "Arrival" },
      { kr: "재입국", en: "Re-entry" },
      { kr: "오프라인 집회", en: "In-person Seminar" },
      { kr: "첫 오프라인 집회", en: "First In-person Seminar" },
      { kr: "첫 전도집회", en: "First Evangelical Seminar" },
      { kr: "입주", en: "Moving in" },
      { kr: "준비", en: "Preparation" },
      { kr: "가나", en: "Ghana" },
      { kr: "영국", en: "UK" },
      { kr: "형제", en: "Brother" },
      { kr: "자매", en: "Sister" }
    ];

    // UI 고정 레이블 번역 사전
    this.translations = {
      ko: {
        site_title: "에티오피아 선교",
        site_subtitle: "전도집회 · 장례식 · 식구 기록",
        tab_members: "식구 기록",
        tab_history: "복음 역사",
        tab_assemblies: "교제 & 선교 활동",
        tab_calendar: "선교 일정 캘린더",
        admin_login: "선교사 마스터",
        admin_logout: "로그아웃",
        search_placeholder: "이름, 지명, 내용 검색...",
        filter_all: "전체",
        filter_year: "연도별 구분:",
        backup_download: "💾 백업 다운로드 (.json)",
        backup_restore: "📂 백업 파일 복원",
        add_new_history: "새 복음 역사 작성",
        add_new_member: "새 식구 등록",
        edit: "수정",
        delete: "삭제",
        saved: "구원",
        baptized: "침례",
        location: "장소",
        date: "일시",
        attendance: "참석",
        saved_count: "구원 인원",
        baptized_count: "침례 인원",
        field_photos: "현장 활동 사진",
        photo_count: "장",
        prev_event: "이전 사건",
        next_event: "다음 사건",
        fullscreen: "화면 꽉 차게 확대",
        close: "닫기",
        save: "저장하기",
        cancel: "취소",
        lang_switch: "🌐 English"
      },
      en: {
        site_title: "Ethiopia Mission",
        site_subtitle: "Evangelical Seminars · Funerals · Member Records",
        tab_members: "Member Directory",
        tab_history: "Gospel History",
        tab_assemblies: "Moim & Mission Activities",
        tab_calendar: "Mission Calendar",
        admin_login: "Missionary Master",
        admin_logout: "Logout",
        search_placeholder: "Search name, location, content...",
        filter_all: "All",
        filter_year: "Filter by Year:",
        backup_download: "💾 Backup Download (.json)",
        backup_restore: "📂 Restore Backup",
        add_new_history: "Add Gospel History",
        add_new_member: "Register New Member",
        edit: "Edit",
        delete: "Delete",
        saved: "salvation",
        baptized: "baptism",
        location: "Location",
        date: "Date",
        attendance: "Attendance",
        saved_count: "Salvation Count",
        baptized_count: "Baptism Count",
        field_photos: "Activity Photos",
        photo_count: "photos",
        prev_event: "Previous Event",
        next_event: "Next Event",
        fullscreen: "Fullscreen",
        close: "Close",
        save: "Save",
        cancel: "Cancel",
        lang_switch: "🌐 한국어"
      }
    };
  }

  isEn() {
    return this.currentLang === "en";
  }

  setLang(lang) {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    try { localStorage.setItem("ethiopia_lang", lang); } catch(e) {}
    this.notifyListeners();
  }

  toggleLang() {
    const nextLang = this.currentLang === "ko" ? "en" : "ko";
    this.setLang(nextLang);
  }

  subscribe(listener) {
    if (typeof listener === "function") this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach(fn => {
      try { fn(this.currentLang); } catch(e) {}
    });
    if (window.renderAppCurrentTab) {
      window.renderAppCurrentTab();
    }
  }

  t(key) {
    const dict = this.translations[this.currentLang] || this.translations.ko;
    return dict[key] || this.translations.ko[key] || key;
  }

  translateDynamic(text) {
    if (!text || typeof text !== "string") return text;
    if (this.currentLang !== "en") return text;

    let translated = text;

    // 사용자 정의 단어 치환 우선 적용
    this.userTerms.forEach(term => {
      if (term.kr && term.en) {
        const regex = new RegExp(term.kr, "g");
        translated = translated.replace(regex, term.en);
      }
    });

    // 날짜 서식 영문 변환 (예: 2025년 5월 12일 -> May 12, 2025)
    translated = translated.replace(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/g, (m, y, mo, d) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthName = months[parseInt(mo, 10) - 1] || mo;
      return `${monthName} ${d}, ${y}`;
    });

    translated = translated.replace(/(\d{4})년\s*(\d{1,2})월/g, (m, y, mo) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthName = months[parseInt(mo, 10) - 1] || mo;
      return `${monthName} ${y}`;
    });

    return translated;
  }
}

window.i18n = new I18NManager();
