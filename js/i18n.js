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
        { ko: /김재용 형제/g, en: "Brother Jay Kim" },
    { ko: /이강현 형제/g, en: "Brother Kohen" },
    { ko: /이정훈 형제/g, en: "Brother Franco" },
    { ko: /이강현/g, en: "Kohen" },
    { ko: /이정훈/g, en: "Franco" },
    { ko: /김재용/g, en: "Jay Kim" },

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


    // Holidays & Calendar Mappings
    { ko: /엔쿠타타시\s*\([^)]*\)/g, en: "Enkutatash (Ethiopian New Year)" },
    { ko: /메스켈\s*\([^)]*\)/g, en: "Meskel (Finding of the True Cross)" },
    { ko: /게나\s*\([^)]*\)/g, en: "Genna (Ethiopian Christmas)" },
    { ko: /팀캇\s*둘째\s*날\s*\([^)]*\)/g, en: "Timkat Day 2" },
    { ko: /팀캇\s*\([^)]*\)/g, en: "Timkat (Ethiopian Epiphany)" },
    { ko: /아드와\s*승전일\s*\([^)]*\)/g, en: "Adwa Victory Day" },
    { ko: /애국자의\s*날\s*\([^)]*\)/g, en: "Patriots' Victory Day" },
    { ko: /에티오피아\s*국회의\s*날\s*\([^)]*\)/g, en: "Ethiopian National Day" },
    { ko: /에티오피아 새해/g, en: "Ethiopian New Year" },
    { ko: /십자가 발견 축제/g, en: "Finding of the True Cross" },
    { ko: /주현절/g, en: "Epiphany" },

    // Statistics & History Labels
    { ko: /신규 참석\s*:\s*(\d+)/g, en: "New Attendees: $1" },
    { ko: /식구\s*:\s*(\d+)명/g, en: "Saved Members: $1" },
    { ko: /신규 참석/g, en: "New Attendees" },
    { ko: /문구 및 사진 수정/g, en: "Edit Text & Photos" },
    { ko: /역사 기록 삭제/g, en: "Delete Record" },
    { ko: /새 역사 기록 추가/g, en: "Add New History Record" },
    { ko: /백업 파일 복원/g, en: "Restore Backup" },

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

  // 3. Region English Lookup Map
  const REGION_EN_MAP = {
    "아디스아바바": "Addis Ababa",
    "비쇼프투": "Bishoftu",
    "아다마": "Adama",
    "세베타": "Sebeta",
    "모조": "Mojo",
    "네켐테": "Nekemte",
    "하와사": "Hawassa",
    "아르바민치": "Arba Minch",
    "알렘테나": "Alem Tena",
    "알렘 테나": "Alem Tena",
    "아사사": "Asasa",
    "바히르다르": "Bahir Dar",
    "디레다와": "Dire Dawa",
    "곤다르": "Gondar",
    "지마": "Jimma",
    "기타": "Other Regions",
    "기타 지역": "Other Regions",
    "에티오피아": "Ethiopia"
  };

  // 4. Member Specific English Overlay Map (Indexed by member id or name)
  const MEMBER_EN_MAP = {
    "mem-gudina2026-1": {
      name: "Eliyana",
      region: "Addis Ababa",
      job: "High School Student",
      inviter: "Etsub (not currently attending)"
    },
    "mem-gudina2026-2": {
      name: "Sena",
      region: "Addis Ababa",
      job: "Domestic Worker",
      inviter: "Fikru & Eden"
    },
    "mem-gudina2026-3": {
      name: "Helen Abebe",
      region: "Addis Ababa",
      job: "Clothing Sales",
      inviter: "Eliyana"
    },
    "mem-gudina2026-4": {
      name: "Sitota",
      region: "Adama",
      job: "High School Student",
      inviter: "Etsub (not currently attending)"
    },
    "mem-gudina2026-5": {
      name: "Nunu Abera",
      region: "Addis Ababa",
      job: "Evangelist",
      inviter: "Ahimed Seid"
    },
    "mem-gudina2026-6": {
      name: "Mhirat",
      region: "Adama",
      job: "Student",
      inviter: ""
    },
    "mem-gudina2026-7": {
      name: "Firehiwot Fikadu",
      region: "Addis Ababa",
      job: "Evangelist",
      inviter: "Ahimed Seid"
    },
    "mem-gudina2026-8": {
      name: "Atsede Addis",
      region: "Addis Ababa",
      job: "Evangelist",
      inviter: "Abdissa Ketema"
    },
    "mem-gudina2026-9": {
      name: "Shambel",
      region: "Adama",
      job: "Evangelist",
      inviter: "Ahimed Seid"
    },
    "mem-gudina2026-10": {
      name: "Atalu Zelega",
      region: "Adama",
      job: "Unemployed",
      inviter: "Yewbdar Hailu"
    },
    "mem-gudina2026-11": {
      name: "Ashenafi Maru",
      region: "Adama",
      job: "Student",
      inviter: "Tigist Eliyas"
    },
    "mem-gudina2026-12": {
      name: "Gabriel",
      region: "Adama",
      job: "Pastor",
      inviter: "Yewbdar Hailu"
    },
    "mem-gudina2026-13": {
      name: "Mesfin",
      region: "Adama",
      job: "Church Volunteer",
      inviter: ""
    },
    "mem-gudina2026-14": {
      name: "Abdissa Ketema",
      region: "Addis Ababa",
      job: "Former Evangelist, now ELC Staff",
      inviter: "Ahimed Seid"
    },

    "pdf-mem-1": {
      name: "Nathinael",
      region: "Addis Ababa",
      job: "Anesthesiologist",
      inviter: "Czech ELC"
    },
    "pdf-mem-2": {
      name: "Eden Megersa",
      region: "Addis Ababa",
      job: "Accountant",
      inviter: "Fikru Tesfaye"
    },
    "pdf-mem-3": {
      name: "Fikru Tesfaye",
      region: "Addis Ababa",
      job: "Former OB/GYN, now ELC Staff",
      inviter: "Nathinael"
    },
    "pdf-mem-4": {
      name: "Biniam Alemu",
      region: "Adama",
      job: "Pharmacist",
      inviter: "Fikru Tesfaye"
    },
    "pdf-mem-5": {
      name: "Ruth Genetu",
      region: "Addis Ababa",
      job: "Private Business Owner",
      inviter: "Bekalwa Tadesse (Getachew's wife)"
    },
    "pdf-mem-6": {
      name: "Yemarshet Elfiyos",
      region: "Addis Ababa",
      job: "Private Business Owner",
      inviter: "Bekalwa Tadesse"
    },
    "pdf-mem-7": {
      name: "Bekalwa Tadesse (Getachew's wife)",
      region: "Addis Ababa",
      job: "Private Business Owner",
      inviter: "Brother Jaeyong Kim"
    },
    "pdf-mem-8": {
      name: "Ephrem Gezahegn",
      region: "Addis Ababa",
      job: "Taxi Driver",
      inviter: "Kanghyun Lee & Junghoon Lee"
    },
    "pdf-mem-9": {
      name: "Gemechu Endale",
      region: "Addis Ababa",
      job: "Unemployed",
      inviter: "Facebook Ad"
    },
    "pdf-mem-10": {
      name: "Samrawit Megersa",
      region: "Addis Ababa",
      job: "University Student (Civil Engineering)",
      inviter: "Eden Megersa"
    },
    "pdf-mem-11": {
      name: "Ahimed Seid",
      region: "Adama",
      job: "Former Prophet, now ELC Staff",
      inviter: "Biniam Alemu"
    },
    "pdf-mem-12": {
      name: "Mekdes Adunga",
      region: "Addis Ababa",
      job: "Nurse",
      inviter: "Fikru Tesfaye"
    },
    "pdf-mem-13": {
      name: "Masresha Lamrot",
      region: "Adama",
      job: "Church Singer",
      inviter: "Biniam Alemu"
    },
    "pdf-mem-14": {
      name: "Yosef Solomon",
      region: "Adama",
      job: "Church Singer",
      inviter: "Biniam Alemu"
    },
    "pdf-mem-15": {
      name: "Yewbdar Hailu",
      region: "Adama",
      job: "Teacher / Leader at a Welfare Organization",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-16": {
      name: "Elsa Damtew",
      region: "Addis Ababa",
      job: "Homemaker",
      inviter: "Psawilos Tadese"
    },
    "pdf-mem-17": {
      name: "Psawilos Tadese",
      region: "Addis Ababa",
      job: "Former Government Employee, now Engineer",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-18": {
      name: "Mebrat Alemu",
      region: "Adama",
      job: "Church Volunteer",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-19": {
      name: "Aregash Abera",
      region: "Adama",
      job: "Day Laborer",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-20": {
      name: "Betelhem Abayneh",
      region: "Adama",
      job: "Day Laborer",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-21": {
      name: "Rae Shifera",
      region: "Adama",
      job: "Student",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-22": {
      name: "Nigist Daniel",
      region: "Adama",
      job: "Student",
      inviter: "Yosef Solomon"
    },
    "pdf-mem-23": {
      name: "Habtamu Mokonin",
      region: "Adama",
      job: "Singer",
      inviter: "Yosef Solomon"
    },
    "pdf-mem-24": {
      name: "Etsub Hailu",
      region: "Adama",
      job: "Day Laborer",
      inviter: "Yosef Solomon"
    },
    "pdf-mem-25": {
      name: "Tigist Eliyas",
      region: "Adama",
      job: "Day Laborer",
      inviter: "Ahimed Seid"
    },

    "pdf-mem-40": {
      name: "Markos Buta",
      region: "Hawassa",
      job: "Bishop / Pastor",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-41": {
      name: "Wasihun Tamirat",
      region: "Hawassa",
      job: "Lawyer",
      inviter: "Markos Buta"
    },
    "pdf-mem-42": {
      name: "Yakob Buta",
      region: "Hawassa",
      job: "Pastor",
      inviter: "Markos Buta"
    },
    "pdf-mem-43": {
      name: "Arfasa Beyene",
      region: "Hawassa",
      job: "Pastor",
      inviter: "Markos Buta"
    },
    "pdf-mem-44": {
      name: "Aynalem",
      region: "Addis Ababa",
      job: "Church Worker",
      inviter: "Abdissa Ketema"
    },
    "pdf-mem-45": {
      name: "Geletu Ganta",
      region: "Addis Ababa",
      job: "Pastor",
      inviter: "Atsede Addis"
    },
    "pdf-mem-46": {
      name: "Tilahun Woldemadhin",
      region: "Addis Ababa",
      job: "Pastor",
      inviter: "Abdissa Ketema"
    },
    "pdf-mem-47": {
      name: "Akawak Tufa",
      region: "Adama",
      job: "Singer",
      inviter: "Abdissa Ketema"
    },
    "pdf-mem-48": {
      name: "Dave Daimo",
      region: "Addis Ababa",
      job: "Pastor",
      inviter: "Atsede Addis"
    },
    "pdf-mem-49": {
      name: "Woyinishet Wondimu",
      region: "Addis Ababa",
      job: "Former Laboratory Technician, now Unemployed",
      inviter: "Nunu Abera"
    },
    "pdf-mem-50": {
      name: "Abel Alemayehu",
      region: "Addis Ababa",
      job: "Church Worker",
      inviter: "Abdissa Ketema"
    },
    "pdf-mem-51": {
      name: "Abenezer Agasa",
      region: "Addis Ababa",
      job: "Unemployed",
      inviter: "Nunu Abera"
    },
    "pdf-mem-52": {
      name: "Asefa Ambe",
      region: "Addis Ababa, China Camp",
      job: "Security Guard",
      inviter: "Abdissa Ketema"
    },
    "pdf-mem-53": {
      name: "Abenezer Tadese",
      region: "Addis Ababa",
      job: "Former Elementary School English Teacher, now ELC Staff",
      inviter: "Abdissa Ketema"
    },
    "pdf-mem-54": {
      name: "Tefelagi Matiwos",
      region: "Adama",
      job: "Security Guard",
      inviter: "Mesfin"
    },
    "pdf-mem-55": {
      name: "Nahom Gule",
      region: "Addis Ababa",
      job: "Singer",
      inviter: "Habtamu Mokonin"
    },
    "pdf-mem-56": {
      name: "Anteneh Mulat",
      region: "Sebeta",
      job: "Church Volunteer",
      inviter: "Abdissa Ketema"
    },
    "pdf-mem-57": {
      name: "Zed Fantahun",
      region: "Adama",
      job: "Private Business Owner",
      inviter: "Mesfin"
    },
    "pdf-mem-58": {
      name: "Samuel Tamiru",
      region: "Asasa",
      job: "Student",
      inviter: "Habtamu Mokonin"
    },
    "pdf-mem-59": {
      name: "Kurse Teso",
      region: "Arsi",
      job: "",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-60": {
      name: "Tewodros Tewolde",
      region: "Adama",
      job: "Dairy Worker / Church Volunteer",
      inviter: "Yewbdar Hailu"
    },
    "pdf-mem-61": {
      name: "Zeleke Zewde",
      region: "Adama",
      job: "Church Volunteer",
      inviter: "Abdissa Ketema"
    },
    "pdf-mem-62": {
      name: "Tefera Dare",
      region: "Adama",
      job: "Chemical Products Sales",
      inviter: "Yewbdar Hailu"
    },
    "pdf-mem-63": {
      name: "Tokuma",
      region: "Adama",
      job: "Church Minister",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-64": {
      name: "Teshome Tiksa",
      region: "Mojo",
      job: "Church Volunteer",
      inviter: "Shambel"
    },
    "pdf-mem-65": {
      name: "Melese Turich",
      region: "Addis Ababa (from Arba Minch)",
      job: "Church Volunteer",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-66": {
      name: "Admasu Alemayehu",
      region: "Addis Ababa",
      job: "Church Volunteer",
      inviter: "Zeleke Zewde"
    },
    "pdf-mem-67": {
      name: "Mikal Ermiyas",
      region: "Adama",
      job: "Unemployed",
      inviter: "Nigist Daniel"
    },
    "pdf-mem-68": {
      name: "Mengistu Chala",
      region: "Addis Ababa",
      job: "Church Worker",
      inviter: "Kurse Teso"
    },
    "pdf-mem-69": {
      name: "Jerusalem",
      region: "Sebeta",
      job: "Food Processing Worker",
      inviter: "Anteneh"
    },
    "pdf-mem-70": {
      name: "Zelalem Worku",
      region: "Sebeta",
      job: "",
      inviter: "Anteneh"
    },
    "pdf-mem-71": {
      name: "Abebe Tafese",
      region: "Bishoftu",
      job: "Private Business Owner (Electronics Sales)",
      inviter: "Tewodros Tewolde"
    },
    "pdf-mem-72": {
      name: "Ahimed Kedir",
      region: "Adama",
      job: "Church Volunteer",
      inviter: "Tokuma"
    },
    "pdf-mem-73": {
      name: "Samuel Sisay",
      region: "Addis Ababa",
      job: "Church Volunteer / Construction Worker",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-74": {
      name: "Zinabu Fikadu",
      region: "Bishoftu",
      job: "Former Church Volunteer, now Poultry Farmer",
      inviter: "Tewodros Tewolde"
    },
    "pdf-mem-75": {
      name: "Hailu Deribe",
      region: "Adama",
      job: "",
      inviter: "Ahimed Seid"
    },
    "pdf-mem-76": {
      name: "Naol Mesfin",
      region: "Adama",
      job: "Singer",
      inviter: "Nigist Daniel"
    },
    "pdf-mem-77": {
      name: "Eliyas Adane",
      region: "Addis Ababa",
      job: "Bible School Student",
      inviter: "Samuel Sisay"
    },
    "pdf-mem-78": {
      name: "Rekik Zewde",
      region: "Adama",
      job: "Homemaker",
      inviter: "Ahmed Kedir"
    },
    "pdf-mem-79": {
      name: "Abebe Fikadu",
      region: "Sebeta",
      job: "",
      inviter: "Zelalem Worku"
    },
    "pdf-mem-80": {
      name: "Debora Mebratu",
      region: "Adama",
      job: "",
      inviter: "Ahimed Kedir"
    },
    "pdf-mem-81": {
      name: "Rhema Gezahange",
      region: "Bishoftu",
      job: "University Student (Computer Science)",
      inviter: "Abebe Tafese"
    },
    "pdf-mem-82": {
      name: "Beemnet Mohammed",
      region: "Adama",
      job: "Unemployed",
      inviter: "Nigist Daniel"
    },
    "pdf-mem-83": {
      name: "Tsega Serum",
      region: "Bishoftu",
      job: "Self-employed",
      inviter: "Abebe Tafese"
    },
    "pdf-mem-84": {
      name: "Haregeweyin Solomon",
      region: "Adama",
      job: "Evangelist",
      inviter: "Yewbdar Hailu"
    },
    "pdf-mem-85": {
      name: "Addishiwot Ambesa",
      region: "Adama",
      job: "Evangelist",
      inviter: "Yewbdar Hailu"
    },
    "pdf-mem-86": {
      name: "Chocolate Gezahange",
      region: "Bishoftu",
      job: "Student",
      inviter: "Rhema Gezahange"
    },
    "pdf-mem-87": {
      name: "Betelhem Dinku",
      region: "Adama",
      job: "Food & Beauty Specialist",
      inviter: "Tewodros Tewolde"
    },
    "pdf-mem-88": {
      name: "Tsihon Tesfaye",
      region: "Adama",
      job: "Student",
      inviter: "Mikal Ermiyas"
    },
    "pdf-mem-89": {
      name: "Teshalew Tafesse",
      region: "Nekemte",
      job: "Ethiopian Orthodox Priest / Legal Officer",
      inviter: "Abebe Tafese"
    },
    "pdf-mem-90": {
      name: "Betse'lotAbraham",
      region: "Adama",
      job: "Student",
      inviter: "Rekik Zewde"
    },
    "pdf-mem-91": {
      name: "Wude Degefa",
      region: "Adama",
      job: "Domestic Worker",
      inviter: "Rekik Zewde"
    },
    "pdf-mem-92": {
      name: "Biruk Tsagaye",
      region: "Adama",
      job: "Driver",
      inviter: "Yewbdar Hailu"
    },
    "pdf-mem-93": {
      name: "Tadesse Degaga",
      region: "Alem Tena",
      job: "Church Volunteer",
      inviter: "Tewodros Tewolde"
    },
    "pdf-mem-94": {
      name: "Ermiyas Mohammed",
      region: "Adama",
      job: "Driver",
      inviter: "Beemnet Mohammed"
    }
  };

  // 5. History Specific English Overlay Map (Indexed by history id)
  const HISTORY_EN_MAP = {
  "hist-202308": {
    date: "August 2023",
    title: "The Beginning of Gospel Outreach to Ethiopia from the Czech Republic",
    location: "Czech ELC",
    desc: `While Czech ELC was recruiting staff members online, Eden, an Ethiopian who was studying in the Czech Republic at the time, applied and joined the staff after an online interview. This led Samonim to entrust Eden with the Amharic translation of The Bible Is True in order to preach the gospel in Ethiopia, marking the beginning of preparations for gospel outreach in Ethiopia.

However, due to Eden's preparation for her doctoral dissertation and plans to return to Ethiopia, progress on the translation was slow and only the first lecture was completed. The existing work was therefore discontinued, and under Samonim's direction, new local translators and interpreters were recruited online to continue the translation.

Missionary Jaehan Park and Brother Andrei then recruited two to three translators and interpreters for each of Ethiopia's three major languages—Amharic, Tigrinya, and Oromo. Together with them, they began the full-scale translation of The Bible Is True in April 2024. As a result, the Amharic translation was completed about four months later, in August 2024.`
  },

  "hist-202404": {
    date: "April 2024",
    title: "Online Seminar & the First Fruit of Salvation in Ethiopia",
    location: "Online (BIT Channel)",
    desc: `Before translating The Bible Is True into Amharic, one of Ethiopia's major languages, an English online Evangelical Seminar was held in April 2024 for the interpreters recruited through online platforms and their acquaintances, so that the interpreters could first gain a sufficient understanding of the message.

Through this seminar, Brother Nathinael, an anesthesiologist, was the first to give a clear confession and testimony of salvation, becoming the first person in Ethiopia to receive salvation through this gospel outreach.`
  },

  "hist-202408": {
    date: "August 2024",
    title: "First Online Seminar After Completion of the Amharic Dubbing",
    location: "Online (BIT Channel)",
    desc: `After the Amharic translation of The Bible Is True was completed, an online seminar using the Amharic voice dubbing was held in August 2024.

During this second seminar, Brother Fikru, a doctor working in the same hospital who had been invited by Brother Nathinael, who was in charge of the Tigrinya dubbing, received salvation after listening to the seminar messages.`
  },

  "hist-202410": {
    date: "October 2024",
    title: "Visit by the West Africa Team",
    location: "Addis Ababa, Ethiopia",
    desc: `In late October 2024, Samonim said that she hoped the brothers and sisters in Ethiopia who had received salvation could be given a more detailed explanation of the precious blood of Jesus. Brother Eunwoo Lee and his wife, together with Brother Jaewon Kim from the West Africa team, stopped in Ethiopia on their way back after completing seminar schedules in Tanzania and Congo.

During this visit, they shared The Bible Is True once again with Brother Fikru and his wife, Nathinael, an anesthesiologist, and Mark, and spent time explaining the precious blood of Jesus to them in greater detail.`
  },

  "hist-202412": {
    date: "December 29, 2024 – January 13, 2025",
    title: "Brother Kanghyun Lee and His Wife Visit Ethiopia & Search for a Moim House",
    location: "Addis Ababa (Mekanisa Yotek Compound, Nifas Silk Lafto)",
    desc: `Brother Kanghyun Lee and his wife visited Ethiopia from December 29, 2024, to January 13, 2025, to look for a Moim House.

They personally visited and inspected a potential Moim House in the Mekanisa Yotek Compound in the Nifas Silk Lafto area of Addis Ababa, and also spent time in fellowship with the brothers and sisters who had received salvation (Nathinael, Fikru, and Eden).

(After the 2024 European Retreat in the Czech Republic, it was decided around November, following a phone conversation with Samonim, that Brother Kanghyun Lee would be sent to Ethiopia as a missionary.)`
  },

  "hist-202505": {
    date: "May 2025",
    title: "Arrival to Move into the Moim House and Prepare for the In-Person Seminar (Brothers Kanghyun Lee & Junghoon Lee)",
    location: "",
    desc: `The move-in date for the Moim House had been set, but Brother Kanghyun Lee was unable to enter Ethiopia immediately. Therefore, Brother Junghoon Lee, who was in Ghana, entered Ethiopia first and began preparing for the move.

- May 12, 2025: Brother Junghoon Lee entered Ethiopia from Ghana.
- May 16, 2025: Brother Kanghyun Lee entered Ethiopia from the United Kingdom.

The two brothers worked together to complete the move into the Moim House and prepared for the Evangelical Seminar scheduled for the end of May.`
  },

  "hist-20250528": {
    date: "May 28 – June 1, 2025",
    title: "Ethiopia's First In-Person Seminar",
    location: "Vibes Hotel, Addis Ababa",
    desc: `- Lectures: The Bible Is True (Amharic dubbing)
- Supplementary explanations of the seminar messages: Eunwoo Lee, Hyunsik Jeon
- Moderators: Kanghyun Lee, Junghoon Lee
- Interpretation: Yokabet, Biniam [English ↔ Amharic], Deborah (Good News Church staff) [Korean ↔ Amharic]
- New attendees: approximately 15

Brothers and sisters from Korea and other countries who supported the seminar (9): Eunwoo Lee, Kyungsoon Han, Soon Ryu (Korea), Hyunsik Jeon (U.S.), Youngsung Park (Germany), Geonyang Park (Germany), Lee Benjamin Hae (Malta), Kanghyun Lee (U.K.), Junghoon Lee (Ghana)`
  },

  "hist-20250623": {
    date: "June 23 – July 13, 2025",
    title: "Brothers Kanghyun Lee & Junghoon Lee Depart & Brother Jaewon Kim Visits Ethiopia",
    location: "Moim House, Addis Ababa, Ethiopia",
    desc: `After the May seminar, Brothers Kanghyun Lee and Junghoon Lee returned to Ethiopia after supporting an Evangelical Seminar in Dar es Salaam, Tanzania, and continued having fellowship with the local brothers and sisters.

With their wives approaching childbirth, Brother Junghoon Lee departed for Korea on June 23, 2025, and Brother Kanghyun Lee departed for the United Kingdom on June 24.

While the two brothers were away, Brother Jaewon Kim came to Ethiopia from Togo and stayed for about two weeks (June 27–July 13, 2025), spending time in fellowship with the brothers and sisters before returning to Korea.`
  },

  "hist-20250819": {
    date: "August 19 – October 13, 2025",
    title: "Brother Jaewon Kim and His Family Visit and Stay in Ethiopia After the Korea Retreat",
    location: "Moim House, Addis Ababa, Ethiopia",
    desc: `After attending the retreat in Korea, Brother Jaewon Kim stopped in Ethiopia before returning to Ghana. He continued holding weekend meetings centered on the Seven Covenants booklet and also held one small seminar. It was a period in which he continued the meetings alone through various difficulties, without any staff members available to help him.`
  },

  "hist-20250914": {
    date: "September 14, 2025",
    title: "Ethiopia's First Baptism",
    location: "Moim House, Addis Ababa",
    desc: `Four brothers and sisters who had received salvation since the gospel work began in Ethiopia were baptized. (From left: Eden, Fikru, Jerihun, Getachew / Baptism conducted by: Missionary Jaewon Kim)

Because of the strong influence of the Ethiopian Orthodox Church in Ethiopian society, it was not easy to conduct baptisms in swimming pools, rivers, or lakes where they would attract public attention. Therefore, a portable swimming pool brought from Ghana was filled with water and used for the baptisms.`
  },

  "hist-20251103": {
    date: "November 3, 2025",
    title: "Brother Junghoon Lee Re-enters Ethiopia & Preparations for the December Seminar",
    location: "Bole International Airport / Addis Ababa, Ethiopia",
    desc: `Brother Junghoon Lee entered Ethiopia on November 3 and continued weekly fellowship with the brothers and sisters who had already received salvation, centered on the messages of The Bible Is True, while planning and preparing for the next Evangelical Seminar. During this process, Brother Fikru, who had left his work as a doctor and joined ELC as a staff member, accompanied him and worked together in preparing for the seminar.`
  },

  "hist-20251212": {
    date: "December 12–14, 2025",
    title: "First Evangelical Seminar at the Moim House, Kindling the Flame of the Gospel",
    location: "Moim House, Addis Ababa, Ethiopia",
    desc: `The first Evangelical Seminar at the Moim House was held after carefully preparing the interior of the house and inviting people to attend.

Brother Biniam, a pharmacist who had attended the May seminar at Brother Fikru's invitation, continued to regularly attend fellowship afterward. For the December seminar, he invited five pastors from the Adama area. In addition, one of Brother Fikru's coworkers, who was working as a nurse, and Sister Eden's younger sister were invited and attended the seminar.

[Meal Preparation] Since it was too much for Sister Eden alone to prepare meals for 12 people and wash all the dishes, a house helper was hired for three days to assist her.

(On December 12, 2025, the first day of the seminar, Brother Kanghyun Lee came from the United Kingdom and joined the seminar.

- Both Brother Kanghyun Lee and Brother Junghoon Lee came to Ethiopia when their babies were around 90 days old.)`
  },

  "hist-20251221": {
    date: "December 21, 2025",
    title: "Baptism",
    location: "Moim House, Addis Ababa",
    desc: `Five brothers and sisters who received salvation through the December seminar were baptized (Ahmed, Samrawit, Yosef, Masresha, Dereje).`
  },

  "hist-20260117": {
    date: "January 17–19, 2026",
    title: "Evangelical Seminar — The Flame of the Gospel Spreads More Powerfully",
    location: "Gudina Tumsa Retreat Center, Addis Ababa",
    desc: `During the holiday period for Timkat, one of Ethiopia's major religious festivals commemorating the baptism of Jesus, a three-day Evangelical Seminar was held from Saturday, January 17, through Monday, January 19. A total of 16 new people were invited and attended the seminar.

The nearby Gudina Tumsa Retreat Center was used as the seminar venue. Gudina Tumsa was one of Ethiopia's prominent Christian leaders and a former General Secretary of the Ethiopian Evangelical Church Mekane Yesus (EECMY), the world's largest Lutheran denomination. He was martyred during Ethiopia's communist regime.`
  },

  "hist-1788440866029": {
    date: "February 1, 2026",
    title: "Baptism",
    location: "Moim House, Addis Ababa",
    desc: `A brother or sister who received salvation through the January seminar was baptized.

Around this time, work also began on editing hymn sheet music, translating materials for the meetings, and printing them.`
  },

  "hist-20260206": {
    date: "February 6–8, 2026",
    title: "Evangelical Seminar at Gudina Tumsa Retreat Center",
    location: "Gudina Tumsa, Addis Ababa",
    desc: `Originally, we had planned to skip the Evangelical Seminar in early February. However, when Samonim said, "Time is passing so quickly, isn't it?" the brothers did not simply let those words pass by, but immediately began preparing for the seminar. Although they had less than a week to invite attendees and arrange a venue, remarkably, more than 50 new people were invited and filled the seminar venue.

Around this time, their extended stay in Ethiopia on tourist visas became an issue with Immigration. As a result, Brothers Kanghyun Lee and Junghoon Lee decided to return to Korea, complete the registration process for the Ethiopian church, and then re-enter Ethiopia. From the seminar period until their departure, they gathered the brothers every night to study the Bible together and discuss how to continue the seminars and fellowship. Beginning with the February seminar, Brother Fikru started taking the lead in conducting the seminars.

(Through this seminar, Brother Abdissa, who is now serving as an ELC staff member, and Sena, who works as a house helper in Brother Fikru's home, received salvation.)`
  },

  "hist-20260226": {
    date: "February 26 – March 2, 2026",
    title: "Evangelical Seminar at the Moim House (Pastor Marcos Invites Church Board Members)",
    location: "Moim House, Addis Ababa",
    desc: `Pastor Marcos, who lives in Hawassa, is the chairman and overseeing pastor of Gospel Change International, a denomination with more than 2,000 members in the Sidama Region.

After the seminar in early February, Pastor Marcos was invited to the Moim House. While watching Lesson 8 of The Bible Is True together, which deals with baptism, he said, "I realized that if a person has truly received salvation, it is right for that person to be baptized," and personally asked to be baptized. A baptism pool was therefore quickly set up and filled with water, and he was baptized.

Afterward, Pastor Marcos expressed his desire to invite the board members of his church so that they could also hear the Word. This led to the Evangelical Seminar being held at the end of February.`
  },

  "hist-1788349055531": {
    date: "March 13–16, 2026",
    title: "Evangelical Seminar",
    location: "Moim House, Addis Ababa",
    desc: `Brother Abdissa, who received salvation through the February Evangelical Seminar, began actively inviting people around him to the seminars and taking part in spreading the gospel.`
  },

  "hist-20260424": {
    date: "April 24–27, 2026",
    title: "April Evangelical Seminar",
    location: "Moim House, Addis Ababa",
    desc: `Through the April Evangelical Seminar, Brother Abenezer Tadese, who was working as an English teacher at the time, received salvation. He has since joined ELC as a staff member and is now working together with us.`
  },

  "hist-1788369048749": {
    date: "May 15–18, 2026",
    title: "Evangelical Seminar",
    location: "Gudina Tumsa, Addis Ababa",
    desc: `The Evangelical Seminars continued without interruption even as the absence of Brothers Kanghyun Lee and Junghoon Lee became prolonged.`
  },

  "hist-1788369145959": {
    date: "June 5–8 / June 18–22, 2026",
    title: "Evangelical Seminar",
    location: "Gudina Tumsa, Addis Ababa",
    desc: `Two Evangelical Seminars were held in June as well, as the gospel continued to be preached steadily.`
  },

  "hist-1788369417375": {
    date: "July 16–20, 2026",
    title: "Evangelical Seminar",
    location: "ODA NABEE Hotel, Bishoftu",
    desc: `Although the church registration with the Ethiopian Gospel Believers' Churches Council (EGBCC) had been completed, registration with Immigration (ICS) was delayed. Brother Kanghyun Lee therefore entered Ethiopia on a tourist visa and, while handling the necessary administrative work, prepared and held this Evangelical Seminar.`
  },

  "hist-1788369801465": {
    date: "August 16, 2026",
    title: "Baptism",
    location: "Moim House, Addis Ababa",
    desc: `After completing all the procedures required for the registration of the church in Ethiopia and attending the retreat in Korea, Brothers Kanghyun Lee and Junghoon Lee returned to Ethiopia on August 6 together with Brother Fikru and his family. On August 16, those who had received salvation through the Evangelical Seminars were baptized.

A total of 28 people were baptized.`
  },

  "hist-1788370209650": {
    date: "August 20–24, 2026",
    title: "Evangelical Seminar",
    location: "ODA NABEE Hotel, Bishoftu",
    desc: `(New attendees: 29 / Brothers and sisters: 25) After all legal and administrative procedures had been completed and official status had been secured, full-scale gospel outreach began without restrictions. It was an Evangelical Seminar in which many attendees gave clear testimonies of salvation.`
  }
};

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
        window.mapComponent.render(window.db ? window.db.getMembers() : []);
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

    getRegionTranslation(region) {
      if (!region) return region;
      const clean = String(region).trim();
      return REGION_EN_MAP[clean] || this.translateContent(clean);
    }

    getTranslatedMember(member) {
      if (!member) return member;
      if (this.currentLang === "ko") return member;

      const idKey = member.id || member.name;
      const customEn = (idKey && MEMBER_EN_MAP[idKey]) ? MEMBER_EN_MAP[idKey] : {};

      const translatedRegion = customEn.region || (member.region ? this.getRegionTranslation(member.region) : member.region);
      const translatedJob = customEn.job || (member.job ? (occupationTranslations[member.job.trim()] || this.translateContent(member.job)) : member.job);
      // member.inviter is a person/group name: keep raw original unless explicitly set in MEMBER_EN_MAP
      const translatedInviter = customEn.inviter || (member.inviter ? this.translateContent(member.inviter) : member.inviter);
      const translatedName = customEn.name || member.name;

      return {
        ...member,
        name: translatedName,
        region: translatedRegion,
        job: translatedJob,
        inviter: translatedInviter
      };
    }

    getTranslatedHistory(historyItem) {
      if (!historyItem) return historyItem;
      if (this.currentLang === "ko") return historyItem;

      const idKey = historyItem.id;
      const customEn = (idKey && HISTORY_EN_MAP[idKey]) ? HISTORY_EN_MAP[idKey] : {};

      const translatedTitle = customEn.title || this.translateContent(historyItem.title);
      // Location: prefer customEn.location -> translateContent -> raw location
      const translatedLocation = customEn.location || (historyItem.location ? this.translateContent(historyItem.location) : historyItem.location);
      const translatedDesc = customEn.desc || historyItem.desc; // Fallback to raw desc
      // Date: keep raw original date as-is (do NOT translate)
      const translatedDate = customEn.date || historyItem.date;

      return {
        ...historyItem,
        title: translatedTitle,
        location: translatedLocation,
        desc: translatedDesc,
        date: translatedDate
      };
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
      if (REGION_EN_MAP[trimmed]) {
        return REGION_EN_MAP[trimmed];
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

      // Verse Banner toggle
      const verseKr = document.querySelector(".verse-kr");
      const verseEn = document.querySelector(".verse-en");
      if (verseKr && verseEn) {
        verseKr.style.display = this.currentLang === "en" ? "none" : "block";
        verseEn.style.display = this.currentLang === "en" ? "block" : "none";
      }

      // Search Input Placeholder
      const searchInput = document.getElementById("searchInput") || document.getElementById("memberSearchInput");
      if (searchInput) {
        searchInput.placeholder = this.currentLang === "en" 
          ? "Search by name, occupation, inviter, region..." 
          : "이름, 직업, 초대자, 지역 검색...";
      }

      // Category Tabs
      const catTabs = document.querySelectorAll("#categoryTabs .cat-tab");
      catTabs.forEach(tab => {
        const cat = tab.getAttribute("data-category");
        if (cat === "all") tab.textContent = this.currentLang === "en" ? "View All" : "전체보기";
        else if (cat === "saved") tab.textContent = this.currentLang === "en" ? "🍇 Saved Members" : "🍇 구원받은 식구";
        else if (cat === "disrupter") tab.textContent = this.currentLang === "en" ? "⚠️ Disrupters" : "⚠️ 분탕꾼";
      });

      // Active Filter Bar
      const activeFilterBar = document.getElementById("activeFilterBar");
      if (activeFilterBar) {
        const labelSpan = activeFilterBar.querySelector("span");
        if (labelSpan) {
          const strong = document.getElementById("activeFilterLabel");
          const strongText = strong ? strong.textContent : "";
          const trStrong = (this.currentLang === "en" && (strongText === "전체" || strongText === "all")) ? "All" : strongText;
          labelSpan.innerHTML = `${this.currentLang === "en" ? "Applied Filter:" : "적용된 필터:"} <strong id="activeFilterLabel">${trStrong}</strong>`;
        }
        const resetBtn = document.getElementById("resetFilterBtn");
        if (resetBtn) {
          resetBtn.innerHTML = `<i class="fa-solid fa-rotate-left"></i> ${this.currentLang === "en" ? "Reset Filters" : "필터 초기화"}`;
        }
      }

      // Fellowship Tabs
      const felTabs = document.querySelectorAll("#assembliesCategoryTabs .cat-tab");
      felTabs.forEach(tab => {
        const cat = tab.getAttribute("data-category");
        if (cat === "all") tab.textContent = this.currentLang === "en" ? "📍 View All" : "📍 전체보기";
        else if (cat === "fellowship") tab.textContent = this.currentLang === "en" ? "☕ Fellowship" : "☕ 교제";
        else if (cat === "daily") tab.textContent = this.currentLang === "en" ? "🏠 Daily Life" : "🏠 일상";
        else if (cat === "visit") tab.textContent = this.currentLang === "en" ? "🚗 Visits" : "🚗 탐방";
        else if (cat === "book") tab.textContent = this.currentLang === "en" ? "📚 Materials" : "📚 책자";
      });

      // Fellowship Action Button
      const addFelBtn = document.getElementById("addNewFellowshipBtn");
      if (addFelBtn) {
        addFelBtn.innerHTML = `<i class="fa-solid fa-plus"></i> ${this.currentLang === "en" ? "Add New Activity Update" : "새 활동 소식 작성하기"}`;
      }

      // Timeline Nav Buttons
      const hzPrevBtn = document.getElementById("hzPrevBtn");
      if (hzPrevBtn) hzPrevBtn.title = this.currentLang === "en" ? "Previous Event" : "이전 사건";
      const hzNextBtn = document.getElementById("hzNextBtn");
      if (hzNextBtn) hzNextBtn.title = this.currentLang === "en" ? "Next Event" : "다음 사건";

      // Footer & Admin Login Translations
      const footerH4 = document.querySelector(".footer-brand h4");
      if (footerH4) footerH4.textContent = this.currentLang === "en" ? "Ethiopia Mission Archive" : "에티오피아 선교 아카이브";

      const footerP = document.querySelector(".footer-brand p");
      if (footerP) footerP.textContent = this.currentLang === "en" ? '"I am under obligation both to Greeks and to barbarians, both to the wise and to the foolish." (Rom 1:14)' : '"헬라인이나 야만이나 지혜 있는 자나 어리석은 자에게 다 내가 빚진 자라" (롬 1:14)';

      const footerCopy = document.querySelector(".footer-copy");
      if (footerCopy) footerCopy.textContent = this.currentLang === "en" ? "© 2026 Ethiopia Mission Archive | Gospel Records & Member System" : "© 2026 에티오피아 선교 아카이브 | 복음 기록 및 식구 관리 시스템";

      const adminText = document.querySelector(".admin-btn-text");
      if (adminText) adminText.textContent = this.currentLang === "en" ? "Admin Login" : "관리자 로그인";

      const sidebarTitle = document.querySelector(".sidebar-title");
      if (sidebarTitle) {
        const cntEl = document.getElementById("totalMembersCount");
        const cnt = cntEl ? cntEl.innerText : "94";
        const isEn = this.currentLang === "en";
        sidebarTitle.innerHTML = `<span data-i18n="selectRegionTitle">${isEn ? "Select Region" : "지역 선택"}</span> (${cnt}${isEn ? " members" : "명"})`;
      }

      // Calendar Event Category Dropdown Option Labels
      const eventCategorySelect = document.getElementById("fieldEventCategory");
      if (eventCategorySelect) {
        const opts = eventCategorySelect.querySelectorAll("option");
        opts.forEach(opt => {
          const val = opt.value;
          if (val === "assembly") {
            opt.textContent = this.currentLang === "en" ? "📢 Evangelical Seminar" : "📢 전도집회";
          } else if (val === "baptism") {
            opt.textContent = this.currentLang === "en" ? "🌊 Baptism Service" : "🌊 침례식";
          } else if (val === "other") {
            opt.textContent = this.currentLang === "en" ? "📌 Other Events" : "📌 기타 일정";
          }
        });
      }

      // Update Region Dropdown Option Labels dynamically
      const regionDropdown = document.getElementById("regionDropdown");
      if (regionDropdown) {
        const opts = regionDropdown.querySelectorAll("option");
        opts.forEach(opt => {
          const val = opt.value;
          if (val === "all") {
            opt.textContent = this.currentLang === "en" ? "All Regions ∨" : "모든 지역 ∨";
          } else if (val === "기타") {
            opt.textContent = this.currentLang === "en" ? "Other Regions" : "기타 지역";
          } else {
            const tr = REGION_EN_MAP[val] || val;
            opt.textContent = (this.currentLang === "en" && tr) ? tr : val;
          }
        });
      }
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
