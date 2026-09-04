/**
 * 에티오피아 선교 아카이브 - 에티오피아 달력 & 명절 위젯
 */

// Major Ethiopian Holidays (Gregorian Month-Day mapping for easy reference)
const ETHIOPIAN_HOLIDAYS = [
  { month: 1, day: 7, name: "게나 (Genna / 에티오피아 크리스마스)", type: "holiday" },
  { month: 1, day: 19, name: "팀캇 (Timkat / 에티오피아 침례/주현절)", type: "holiday" },
  { month: 1, day: 20, name: "팀캇 둘째 날 (Timkat Day 2)", type: "holiday" },
  { month: 3, day: 2, name: "아드와 승전일 (Adwa Victory Day)", type: "holiday" },
  { month: 5, day: 5, name: "애국자의 날 (Patriots' Victory Day)", type: "holiday" },
  { month: 9, day: 11, name: "엔쿠타타시 (Enkutatash / 에티오피아 새해)", type: "holiday" },
  { month: 9, day: 27, name: "메스켈 (Meskel / 십자가 발견 축제)", type: "holiday" },
  { month: 11, day: 2, name: "에티오피아 국회의 날 (National Day)", type: "holiday" }
];

class CalendarComponent {
  constructor(containerId) {
    this.containerId = containerId || "calendarContainer";
    this.container = document.getElementById(this.containerId);
    this.currentDate = new Date();
    this.initEvents();
  }

  initEvents() {
    try {
      const calendarEventForm = document.getElementById("calendarEventForm");
      if (calendarEventForm) {
        calendarEventForm.addEventListener("submit", (e) => {
          e.preventDefault();
          this.saveEventFromForm();
        });
      }
    } catch (e) {
      console.error("Calendar initEvents error:", e);
    }
  }

  openAddEventModal(dateStr = "") {
    const modal = document.getElementById("calendarEventModal");
    if (!modal) return;

    const startInput = document.getElementById("fieldEventStartDate");
    const endInput = document.getElementById("fieldEventEndDate");

    if (startInput) {
      startInput.value = dateStr || new Date().toISOString().slice(0, 10);
    }
    if (endInput) {
      endInput.value = dateStr || "";
    }

    document.getElementById("fieldEventTitle").value = "";
    document.getElementById("fieldEventLocation").value = "";
    document.getElementById("fieldEventDesc").value = "";

    modal.classList.remove("hidden");
  }

  saveEventFromForm() {
    const startVal = document.getElementById("fieldEventStartDate").value;
    let endVal = document.getElementById("fieldEventEndDate").value;
    const titleVal = document.getElementById("fieldEventTitle").value.trim();
    const categoryVal = document.getElementById("fieldEventCategory").value;
    const locationVal = document.getElementById("fieldEventLocation").value.trim();
    const descVal = document.getElementById("fieldEventDesc").value.trim();

    if (!startVal || !titleVal) {
      alert("시작일과 일정 제목을 입력해 주세요.");
      return;
    }

    if (!endVal || endVal < startVal) {
      endVal = startVal;
    }

    const newEvt = {
      id: "evt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      date: startVal,
      endDate: endVal,
      title: titleVal,
      category: categoryVal,
      location: locationVal,
      desc: descVal
    };

    if (window.db && typeof window.db.addEvent === 'function') {
      window.db.addEvent(newEvt);
    } else {
      let events = [];
      try {
        const local = localStorage.getItem("ethiopia_events");
        events = local ? JSON.parse(local) : (window.DEFAULT_EVENTS ? [...window.DEFAULT_EVENTS] : []);
      } catch(e) { events = []; }
      events.push(newEvt);
      localStorage.setItem("ethiopia_events", JSON.stringify(events));
      window.DEFAULT_EVENTS = events;
    }

    document.getElementById("calendarEventModal").classList.add("hidden");
    if (window.showToast) window.showToast("✨ 일정이 성공적으로 등록되었습니다!");
    else alert("일정이 달력에 등록되었습니다!");
    this.render();
  }

  deleteEvent(id) {
    if (!id) return;
    if (confirm("정말로 이 일정을 삭제하시겠습니까?")) {
      if (window.db && typeof window.db.deleteEvent === "function") {
        window.db.deleteEvent(id);
      } else {
        let events = JSON.parse(localStorage.getItem("ethiopia_events") || "[]");
        events = events.filter(e => e.id !== id);
        localStorage.setItem("ethiopia_events", JSON.stringify(events));
        window.DEFAULT_EVENTS = events;
      }
      this.render();
    }
  }

  render() {
    if (!this.container) this.container = document.getElementById(this.containerId || "calendarContainer");
    if (!this.container) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth(); // 0-indexed (0 = Jan)

    const rawFirstDayIndex = new Date(year, month, 1).getDay();
    // Shift so Monday = 0, Tuesday = 1, ..., Sunday = 6
    const firstDayIndex = (rawFirstDayIndex + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();

    const monthNamesKo = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const isEn = window.i18n && window.i18n.getLang() === 'en';
    const monthDisp = isEn ? `${monthNamesEn[month]} ${year}` : `${year}년 ${monthNamesKo[month]}`;

    // Ethiopian Holidays in current month
    const currentMonthHolidays = ETHIOPIAN_HOLIDAYS.filter(h => h.month === (month + 1));

    // Custom Mission Events in current month (including multi-day date range matches!)
    let allEvents = [];
    try {
      if (window.db && typeof window.db.getEvents === 'function') {
        allEvents = window.db.getEvents();
      } else {
        const local = localStorage.getItem("ethiopia_events");
        allEvents = local ? JSON.parse(local) : (window.DEFAULT_EVENTS || []);
      }
    } catch(e) { console.error('getEvents error:', e); }
    const currentMonthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
    const currentMonthEvents = allEvents.filter(e => {
      const s = e.date;
      const end = e.endDate || e.date;
      return (s && s.startsWith(currentMonthStr)) || (end && end.startsWith(currentMonthStr)) || (s <= `${currentMonthStr}-31` && end >= `${currentMonthStr}-01`);
    });

    const isEventOnDay = (e, dateStr) => {
      const s = e.date;
      const end = e.endDate || e.date;
      return s <= dateStr && dateStr <= end;
    };

    let daysHtml = "";

    // Blank cells before day 1
    for (let i = 0; i < firstDayIndex; i++) {
      daysHtml += `<div class="cal-day empty"></div>`;
    }

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();

    // Render calendar days
    for (let day = 1; day <= totalDays; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const holiday = currentMonthHolidays.find(h => h.day === day);
      const dayEvents = currentMonthEvents.filter(e => isEventOnDay(e, dateString));
      const isToday = isCurrentMonth && day === todayDate;

      let dayClasses = "cal-day";
      if (isToday) dayClasses += " today";
      if (holiday) dayClasses += " has-holiday";
      if (dayEvents.length > 0) dayClasses += " has-event";

      let dotsHtml = "";
      if (dayEvents.length > 0) {
        dotsHtml += `<span class="event-badge-dot" title="${dayEvents[0].title}">📌</span>`;
      }

      daysHtml += `
        <div class="${dayClasses}" data-date="${dateString}" title="${holiday ? (isEn ? window.i18n.translateContent(holiday.name) : holiday.name) : (dayEvents.length > 0 ? dayEvents[0].title : '')}">
          <span class="day-num">${day}</span>
          ${dotsHtml}
        </div>
      `;
    }

    const formatEventRangeText = (e) => {
      if (!e || !e.date) return "";
      const sDay = parseInt(e.date.split('-')[2], 10);
      if (e.endDate && e.endDate !== e.date) {
        const eDay = parseInt(e.endDate.split('-')[2], 10);
        const sMonth = parseInt(e.date.split('-')[1], 10);
        const eMonth = parseInt(e.endDate.split('-')[1], 10);
        if (sMonth === eMonth) {
          return isEn ? `${sDay}~${eDay}` : `${sDay}일~${eDay}일`;
        } else {
          return `${sMonth}.${sDay}~${eMonth}.${eDay}`;
        }
      }
      return isEn ? `${sDay}` : `${sDay}일`;
    };

    this.container.innerHTML = `
      <div class="calendar-widget">
        <div class="cal-header">
          <button id="calPrevBtn" class="cal-nav-btn"><i class="fa-solid fa-chevron-left"></i></button>
          <div class="cal-title-group">
            <span class="cal-year-month">${monthDisp}</span>
            <span class="cal-ethiopian-note">${isEn ? 'Ethiopian Holidays' : '에티오피아 명절'}</span>
          </div>
          <button id="calNextBtn" class="cal-nav-btn"><i class="fa-solid fa-chevron-right"></i></button>
        </div>

        <!-- Add Event Button -->
        <div class="cal-action-bar">
          <button id="openAddEventBtn" class="btn btn-primary btn-block" style="padding:0.35rem 0.75rem; font-size:0.8rem;">
            <i class="fa-solid fa-plus"></i> ${isEn ? '+ Add Event' : '+ 일정 등록'}
          </button>
        </div>

        <!-- Monday to Sunday Header -->
        <div class="cal-grid" style="margin-top:0.6rem;">
          <div class="cal-weekday">${isEn ? 'Mon' : '월'}</div>
          <div class="cal-weekday">${isEn ? 'Tue' : '화'}</div>
          <div class="cal-weekday">${isEn ? 'Wed' : '수'}</div>
          <div class="cal-weekday">${isEn ? 'Thu' : '목'}</div>
          <div class="cal-weekday">${isEn ? 'Fri' : '금'}</div>
          <div class="cal-weekday sat">${isEn ? 'Sat' : '토'}</div>
          <div class="cal-weekday sun">${isEn ? 'Sun' : '일'}</div>
          ${daysHtml}
        </div>

        <div class="cal-holidays-footer">
          <div class="cal-footer-title"><i class="fa-solid fa-calendar-check"></i> ${isEn ? 'Key Holidays This Month' : '이번 달 주요 명절'}</div>
          
          <!-- Custom Mission Events List -->
          ${currentMonthEvents.length > 0 ? `
            <div class="custom-events-list">
              ${currentMonthEvents.map(e => `
                <div class="custom-event-item">
                  <div class="evt-item-title">
                    <span>📌 <strong>${formatEventRangeText(e)}</strong>: ${isEn ? window.i18n.translateContent(e.title) : e.title}</span>
                    <button class="evt-delete-btn" onclick="event.stopPropagation(); window.calendarComponent.deleteEvent('${e.id}')" title="삭제"><i class="fa-solid fa-xmark"></i></button>
                  </div>
                  ${e.location ? `<p class="evt-item-sub"><i class="fa-solid fa-location-dot"></i> ${isEn ? window.i18n.translateContent(e.location) : e.location}</p>` : ''}
                </div>
              `).join("")}
            </div>
          ` : ''}

          <!-- Ethiopian Holidays List -->
          ${currentMonthHolidays.length > 0 ? `
            <ul class="cal-holiday-list" style="margin-top:0.4rem;">
              ${currentMonthHolidays.map(h => `
                <li><strong>${h.day}${isEn ? 'th' : '일'}</strong>: ${isEn ? window.i18n.translateContent(h.name) : h.name}</li>
              `).join("")}
            </ul>
          ` : (currentMonthEvents.length === 0 ? `<p class="no-holiday-msg">${isEn ? 'No events scheduled for this month.' : '등록된 일정 및 공휴일이 없습니다.'}</p>` : '')}
        </div>
      </div>
    `;

    // Attach Event Listeners
    document.getElementById("calPrevBtn")?.addEventListener("click", () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
    });

    document.getElementById("calNextBtn")?.addEventListener("click", () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
    });

    document.getElementById("openAddEventBtn")?.addEventListener("click", () => {
      this.openAddEventModal();
    });

    // Day Cell Click Listener
    this.container.querySelectorAll(".cal-day:not(.empty)").forEach(cell => {
      cell.addEventListener("click", () => {
        const dateStr = cell.getAttribute("data-date");
        this.openAddEventModal(dateStr);
      });
    });
  }
}

window.CalendarComponent = CalendarComponent;
