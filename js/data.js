// Ethiopia Gospel Mission Database (Optimized for GitHub Server Hosting v16000)
const DEFAULT_MEMBERS = [
  {
    "id": "pdf-mem-1",
    "name": "Nathinael",
    "category": "saved",
    "age": "30세",
    "region": "아디스아바바",
    "job": "마취과 의사",
    "assemblyMonth": "2024.04.08~18",
    "inviter": "체코 ELC",
    "inviterRelation": "BIT 번역자 모집 공고",
    "photo": "images/members/mem_pdf-mem-1.jpg",
    "youtube": "https://www.youtube.com/watch?v=ovUvgqqSMRo",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Anesthesiologist",
    "inviterRelationEn": "BIT 번역자 모집 공고"
  },
  {
    "id": "pdf-mem-3",
    "name": "Fikru Tesfaye",
    "category": "saved",
    "age": "34세",
    "region": "아디스아바바",
    "job": "(전) 산부인과 의사, (현) elc스테프",
    "assemblyMonth": "2024.8.19~29",
    "inviter": "Nathinael",
    "inviterRelation": "직장 동료",
    "photo": "images/members/mem_pdf-mem-3.jpg",
    "youtube": "https://youtu.be/lAKqGKrhgBI?si=UQi35q2nraGAhsmi",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "(전) 산부인과 Doctor, (현) elc스테프",
    "inviterRelationEn": "직장 colleague"
  },
  {
    "id": "pdf-mem-2",
    "name": "Eden Megersa",
    "category": "saved",
    "age": "26세",
    "region": "아디스아바바",
    "job": "회계사",
    "assemblyMonth": "2025. 3",
    "inviter": "Fikru Tesfaye",
    "inviterRelation": "아내",
    "photo": "images/members/mem_pdf-mem-2.jpg",
    "youtube": "https://www.youtube.com/watch?v=fTwqLehQ8dw",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Accountant",
    "inviterRelationEn": "wife"
  },
  {
    "id": "pdf-mem-4",
    "name": "Biniam Alemu",
    "category": "saved",
    "age": "34세",
    "region": "아다마",
    "job": "약사",
    "assemblyMonth": "2025. 5.28~6.01",
    "inviter": "Fikru Tesfaye",
    "inviterRelation": "(전) 직장 동료",
    "photo": "images/members/mem_pdf-mem-4.jpg",
    "youtube": "https://www.youtube.com/watch?v=lQAtY5G7Hs4",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "약사",
    "inviterRelationEn": "(전) 직장 colleague"
  },
  {
    "id": "pdf-mem-5",
    "name": "Ruth Genetu",
    "category": "saved",
    "age": "33세",
    "region": "아디스아바바",
    "job": "개인 사업",
    "assemblyMonth": "2025. 5.28~6.01",
    "inviter": "Bekalwa Tadesse (게타추 형제 아내)",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-5.jpg",
    "youtube": "https://www.youtube.com/watch?v=y8jhFssYp_k",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "개인 사업",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-6",
    "name": "Yemarshet Elfiyos",
    "category": "saved",
    "age": "31세",
    "region": "아디스아바바",
    "job": "개인 사업",
    "assemblyMonth": "2025. 5.28~6.01",
    "inviter": "Bekalwa Tadesse",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-6.jpg",
    "youtube": "https://www.youtube.com/watch?v=ie0Qw5NTrUI",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "개인 사업",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-7",
    "name": "Bekalwa Tadesse(게타추 형제 아내)",
    "category": "saved",
    "age": "37세",
    "region": "아디스아바바",
    "job": "개인 사업",
    "assemblyMonth": "2025. 5.28~6.01",
    "inviter": "김재용 형제",
    "inviterRelation": "사업 파트너의 아내",
    "photo": "images/members/mem_pdf-mem-7.jpg",
    "youtube": "https://www.youtube.com/watch?v=PdwOZRGL0pg",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "개인 사업",
    "inviterRelationEn": "사업 파트너의 wife"
  },
  {
    "id": "pdf-mem-8",
    "name": "Ephrem Gezahegn",
    "category": "saved",
    "age": "43세",
    "region": "아디스아바바",
    "job": "택시 기사",
    "assemblyMonth": "2025. 5.28~6.01",
    "inviter": "이강현 & 이정훈",
    "inviterRelation": "택시에서의 만남",
    "photo": "images/members/mem_pdf-mem-8.jpg",
    "youtube": "https://www.youtube.com/watch?v=p-OGi_jBKR8",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "택시 기사",
    "inviterRelationEn": "택시에서의 만남"
  },
  {
    "id": "pdf-mem-9",
    "name": "Gemechu Endale",
    "category": "saved",
    "age": "27세",
    "region": "아디스아바바",
    "job": "무직",
    "assemblyMonth": "2025. 5.28~6.01",
    "inviter": "Facebook 광고",
    "inviterRelation": ":",
    "photo": "images/members/mem_pdf-mem-9.jpg",
    "youtube": "https://www.youtube.com/watch?v=yvWCDVY2BwU",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Unemployed",
    "inviterRelationEn": ":"
  },
  {
    "id": "pdf-mem-10",
    "name": "Samrawit Megersa",
    "category": "saved",
    "age": "22세",
    "region": "아디스아바바",
    "job": "대학생 [전공: Civil engineering ]",
    "assemblyMonth": "2025.12.12~14",
    "inviter": "Eden Megersa",
    "inviterRelation": "여동생",
    "photo": "images/members/mem_pdf-mem-10.jpg",
    "youtube": "https://www.youtube.com/watch?v=gwFGDbYTCP0",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "University Student [전공: Civil engineering ]",
    "inviterRelationEn": "younger sister"
  },
  {
    "id": "pdf-mem-11",
    "name": "Ahimed Seid",
    "category": "saved",
    "age": "32세",
    "region": "아다마",
    "job": "(전) 선지자 현) elc staff",
    "assemblyMonth": "2025.12.12~14",
    "inviter": "Biniam Alemu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-11.jpg",
    "youtube": "https://www.youtube.com/watch?v=4GIbe_-4oSY",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "(전) 선지자 현) elc staff",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-12",
    "name": "Mekdes Adunga",
    "category": "saved",
    "age": "31세",
    "region": "아디스아바바",
    "job": "간호사",
    "assemblyMonth": "2025.12.12~14",
    "inviter": "Fikru Tesfaye",
    "inviterRelation": "직장 동료",
    "photo": "images/members/mem_pdf-mem-12.jpg",
    "youtube": "https://youtu.be/XN1c_RSDBpo?si=g-b93VLghc0rHQZG",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Nurse",
    "inviterRelationEn": "직장 colleague"
  },
  {
    "id": "pdf-mem-13",
    "name": "Masresha Lamrot",
    "category": "disrupter",
    "age": "24세",
    "region": "아다마",
    "job": "교회 가수",
    "assemblyMonth": "2025.12.12~14",
    "inviter": "Biniam Alemu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-13.jpg",
    "youtube": "https://youtu.be/vWR9IjL-mkc?si=vkioKwHNdKMnrcS3",
    "testimony": "https://youtu.be/vWR9IjL-mkc?si=vkioKwHNdKMnrcS3",
    "registeredYear": 2026,
    "jobEn": "교회 가수",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://youtu.be/vWR9IjL-mkc?si=vkioKwHNdKMnrcS3"
  },
  {
    "id": "pdf-mem-14",
    "name": "Yosef Solomon",
    "category": "disrupter",
    "age": "28세",
    "region": "아다마",
    "job": "교회 가수",
    "assemblyMonth": "2025.12.12~14",
    "inviter": "Biniam Alemu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-14.jpg",
    "youtube": "https://youtu.be/kcLCroLtkr8?si=C0aOU138BPSB9nih",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회 가수",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-15",
    "name": "Yewbdar Hailu",
    "category": "saved",
    "age": "32세",
    "region": "아다마",
    "job": "복지단체 교사/ 리더",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-15.jpg",
    "youtube": "https://www.youtube.com/watch?v=vBHnvz3svgQ",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "복지단체 Teacher/ 리더",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-16",
    "name": "Elsa Damtew",
    "category": "saved",
    "age": "32세",
    "region": "아디스아바바",
    "job": "가정주부",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Psawilos Tadese",
    "inviterRelation": "아내",
    "photo": "images/members/mem_pdf-mem-16.jpg",
    "youtube": "https://www.youtube.com/watch?v=L--83dpDxy4",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "가정주부",
    "inviterRelationEn": "wife"
  },
  {
    "id": "pdf-mem-17",
    "name": "Psawilos Tadese",
    "category": "saved",
    "age": "37세",
    "region": "아디스아바바",
    "job": "전) 공무원/ 현) 엔지니어",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-17.jpg",
    "youtube": "https://www.youtube.com/watch?v=3fPof2WcX1U",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "전) Civil Servant/ 현) Engineer",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-18",
    "name": "Mebrat Alemu",
    "category": "saved",
    "age": "35세",
    "region": "아다마",
    "job": "교회 봉사자",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-18.jpg",
    "youtube": "https://www.youtube.com/watch?v=3rgSWtPEAb8&feature=youtu.be",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회 봉사자",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-19",
    "name": "Aregash Abera",
    "category": "saved",
    "age": "35세",
    "region": "아다마",
    "job": "일용직",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-19.jpg",
    "youtube": "https://www.youtube.com/watch?v=pycp09otXf0&feature=youtu.be",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "일용직",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-20",
    "name": "Betelhem Abayneh",
    "category": "saved",
    "age": "32세",
    "region": "아다마",
    "job": "일용직",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-20.jpg",
    "youtube": "https://www.youtube.com/watch?v=clqpUP4zgwg&feature=youtu.be",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "일용직",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-21",
    "name": "Rae Shifera",
    "category": "saved",
    "age": "20세",
    "region": "아다마",
    "job": "학생",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-21.jpg",
    "youtube": "https://www.youtube.com/watch?v=rX1sk-CE1xA",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Student",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-22",
    "name": "Nigist Daniel",
    "category": "saved",
    "age": "19세",
    "region": "아다마",
    "job": "학생",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Yosef Solomon",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-22.jpg",
    "youtube": "https://www.youtube.com/watch?v=vTxZyYTqUGg",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Student",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-23",
    "name": "Habtamu Mokonin",
    "category": "saved",
    "age": "25세",
    "region": "아다마",
    "job": "가수",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Yosef Solomon",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-23.jpg",
    "youtube": "https://youtube.com/watch?v=Gi5J3A6M4N4",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "가수",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-24",
    "name": "Etsub Hailu",
    "category": "disrupter",
    "age": "26세",
    "region": "아다마",
    "job": "일용직",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Yosef Solomon",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-24.jpg",
    "youtube": "https://www.youtube.com/watch?v=v1yJmPSA-qM",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "일용직",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-25",
    "name": "Tigist Eliyas",
    "category": "saved",
    "age": "28세",
    "region": "아다마",
    "job": "일용직",
    "assemblyMonth": "2026.1.17~19",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-25.jpg",
    "youtube": "https://www.youtube.com/watch?v=4y3XN18GxFU",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "일용직",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "mem-gudina2026-1",
    "name": "Eliyana",
    "category": "saved",
    "age": "17세",
    "region": "아디스아바바",
    "job": "고등학교생, 고등학생",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Etsub (모임 안 나옴)",
    "inviterRelation": "지인",
    "photo": "images/members/mem_mem-gudina2026-1.jpg",
    "youtube": "https://youtu.be/hsgp1m3f8As?si=sO0d1qlZ0_Bt0DZk",
    "testimony": "https://youtu.be/hsgp1m3f8As?si=sO0d1qlZ0_Bt0DZk",
    "registeredYear": 2026,
    "jobEn": "High School Student, High School Student",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://youtu.be/hsgp1m3f8As?si=sO0d1qlZ0_Bt0DZk"
  },
  {
    "id": "mem-gudina2026-2",
    "name": "Sena",
    "category": "saved",
    "age": "20세",
    "region": "아디스아바바",
    "job": "가정부",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Fikru & Eden",
    "inviterRelation": "가사 도우미",
    "photo": "images/members/mem_mem-gudina2026-2.jpg",
    "youtube": "https://youtu.be/gprJQ7BNu88?si=cSm4ykZ4GVouEEwQ",
    "testimony": "https://youtu.be/gprJQ7BNu88?si=cSm4ykZ4GVouEEwQ",
    "registeredYear": 2026,
    "jobEn": "Housekeeper",
    "inviterRelationEn": "가사 도우미",
    "testimonyEn": "https://youtu.be/gprJQ7BNu88?si=cSm4ykZ4GVouEEwQ"
  },
  {
    "id": "mem-gudina2026-3",
    "name": "Helen Abebe",
    "category": "saved",
    "age": "38세",
    "region": "아디스아바바",
    "job": "의류 판매",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "엘리야나",
    "inviterRelation": "어머니",
    "photo": "images/members/mem_mem-gudina2026-3.jpg",
    "youtube": "https://drive.google.com/file/d/12vOaKVYGJEtXI7fSBI3TeUrRLHprgyOZ/view?usp=sharing",
    "testimony": "https://drive.google.com/file/d/12vOaKVYGJEtXI7fSBI3TeUrRLHprgyOZ/view?usp=sharing",
    "registeredYear": 2026,
    "jobEn": "의류 판매",
    "inviterRelationEn": "어머니",
    "testimonyEn": "https://drive.google.com/file/d/12vOaKVYGJEtXI7fSBI3TeUrRLHprgyOZ/view?usp=sharing"
  },
  {
    "id": "mem-gudina2026-4",
    "name": "Sitota",
    "category": "saved",
    "age": "18세",
    "region": "아다마",
    "job": "고등학교생, 고등학생",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Etsub (모임 안 나옴)",
    "inviterRelation": "지인(찬양대 멤버), 지인(찬양대 맴버)",
    "photo": "images/members/mem_mem-gudina2026-4.jpg",
    "youtube": "https://youtu.be/VWIAOEAHw5Y?si=dAO4Ai1LJdL0xW5t",
    "testimony": "https://youtu.be/VWIAOEAHw5Y?si=dAO4Ai1LJdL0xW5t",
    "registeredYear": 2026,
    "jobEn": "High School Student, High School Student",
    "inviterRelationEn": "acquaintance(찬양대 멤버), acquaintance(찬양대 맴버)",
    "testimonyEn": "https://youtu.be/VWIAOEAHw5Y?si=dAO4Ai1LJdL0xW5t"
  },
  {
    "id": "mem-gudina2026-5",
    "name": "Nunu Abera",
    "category": "saved",
    "age": "44세",
    "region": "아디스아바바",
    "job": "전도사",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_mem-gudina2026-5.jpg",
    "youtube": "https://youtu.be/vj9O6DoY9fA?si=UaizsvaAJM2lZDRX",
    "testimony": "https://youtu.be/vj9O6DoY9fA?si=UaizsvaAJM2lZDRX",
    "registeredYear": 2026,
    "jobEn": "Evangelist",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://youtu.be/vj9O6DoY9fA?si=UaizsvaAJM2lZDRX"
  },
  {
    "id": "mem-gudina2026-6",
    "name": "Mhirat",
    "category": "saved",
    "age": "17세",
    "region": "아다마",
    "job": "학생",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "",
    "inviterRelation": "지인",
    "photo": "images/members/mem_mem-gudina2026-6.jpg",
    "youtube": "https://drive.google.com/file/d/18OwC1_kHPzKZaXAYJnTOFO70elo9ylS7/view?usp=sharing",
    "testimony": "https://drive.google.com/file/d/18OwC1_kHPzKZaXAYJnTOFO70elo9ylS7/view?usp=sharing",
    "registeredYear": 2026,
    "jobEn": "Student",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://drive.google.com/file/d/18OwC1_kHPzKZaXAYJnTOFO70elo9ylS7/view?usp=sharing"
  },
  {
    "id": "mem-gudina2026-7",
    "name": "Firehiwot Fikadu",
    "category": "saved",
    "age": "23세",
    "region": "아디스아바바",
    "job": "전도사",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_mem-gudina2026-7.jpg",
    "youtube": "https://www.youtube.com/watch?v=AWWOoKLDvpE",
    "testimony": "https://www.youtube.com/watch?v=AWWOoKLDvpE",
    "registeredYear": 2026,
    "jobEn": "Evangelist",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://www.youtube.com/watch?v=AWWOoKLDvpE"
  },
  {
    "id": "mem-gudina2026-8",
    "name": "Atsede Addis",
    "category": "saved",
    "age": "28세",
    "region": "아디스아바바",
    "job": "전도사",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Abdissa Ketema",
    "inviterRelation": "지인",
    "photo": "images/members/mem_mem-gudina2026-8.jpg",
    "youtube": "https://www.youtube.com/watch?v=rU2IAEFeuwE",
    "testimony": "https://www.youtube.com/watch?v=rU2IAEFeuwE",
    "registeredYear": 2026,
    "jobEn": "Evangelist",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://www.youtube.com/watch?v=rU2IAEFeuwE"
  },
  {
    "id": "mem-gudina2026-9",
    "name": "Shambel",
    "category": "saved",
    "age": "25세",
    "region": "아다마",
    "job": "전도사",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_shambel.png",
    "youtube": "",
    "testimony": "https://drive.google.com/drive/folders/1y1XlOHT4TUzggSq22GynlAhRiuTTOALh",
    "jobEn": "Evangelist",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://drive.google.com/drive/folders/1y1XlOHT4TUzggSq22GynlAhRiuTTOALh"
  },
  {
    "id": "mem-gudina2026-10",
    "name": "Atalu Zelega",
    "category": "saved",
    "age": "27세",
    "region": "아다마",
    "job": "무직",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Yewbdar Hailu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_mem-gudina2026-10.jpg",
    "youtube": "https://www.youtube.com/watch?v=a1psKZbTdIA",
    "testimony": "https://www.youtube.com/watch?v=a1psKZbTdIA",
    "registeredYear": 2026,
    "jobEn": "Unemployed",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://www.youtube.com/watch?v=a1psKZbTdIA"
  },
  {
    "id": "mem-gudina2026-11",
    "name": "Ashenafi Maru",
    "category": "saved",
    "age": "18세",
    "region": "아다마",
    "job": "학생",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Tigist Eliyas",
    "inviterRelation": "지인",
    "photo": "images/members/mem_mem-gudina2026-11.jpg",
    "youtube": "https://www.youtube.com/watch?v=a8ilcTuuvhc",
    "testimony": "https://www.youtube.com/watch?v=a8ilcTuuvhc",
    "registeredYear": 2026,
    "jobEn": "Student",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://www.youtube.com/watch?v=a8ilcTuuvhc"
  },
  {
    "id": "mem-gudina2026-12",
    "name": "Gabriel",
    "category": "saved",
    "age": "42세",
    "region": "아다마",
    "job": "목사",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Yewbdar Hailu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_mem-gudina2026-12.jpg",
    "youtube": "https://youtu.be/xSv09J5YaD0?si=MfafSzpiNYDMYGZ0",
    "testimony": "https://youtu.be/xSv09J5YaD0?si=MfafSzpiNYDMYGZ0",
    "registeredYear": 2026,
    "jobEn": "Pastor",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://youtu.be/xSv09J5YaD0?si=MfafSzpiNYDMYGZ0"
  },
  {
    "id": "mem-gudina2026-13",
    "name": "Mesfin",
    "category": "saved",
    "age": "23세",
    "region": "아다마",
    "job": "교회 봉사자",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "",
    "inviterRelation": "",
    "photo": "images/members/mem_mem-gudina2026-13.jpg",
    "youtube": "https://www.youtube.com/watch?v=gkf0tAvAvjk&feature=youtu.be",
    "testimony": "https://www.youtube.com/watch?v=gkf0tAvAvjk&feature=youtu.be",
    "registeredYear": 2026,
    "jobEn": "교회 봉사자",
    "inviterRelationEn": "",
    "testimonyEn": "https://www.youtube.com/watch?v=gkf0tAvAvjk&feature=youtu.be"
  },
  {
    "id": "mem-gudina2026-14",
    "name": "Abdissa Ketema",
    "category": "saved",
    "age": "45세",
    "region": "아디스아바바",
    "job": "전) 전도사, 현) elc staff",
    "assemblyMonth": "2026.2.06~08",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_mem-gudina2026-14.jpg",
    "youtube": "https://www.youtube.com/watch?v=yAmkrpUsWBs&feature=youtu.be",
    "testimony": "https://www.youtube.com/watch?v=yAmkrpUsWBs&feature=youtu.be",
    "registeredYear": 2026,
    "jobEn": "전) Evangelist, 현) elc staff",
    "inviterRelationEn": "acquaintance",
    "testimonyEn": "https://www.youtube.com/watch?v=yAmkrpUsWBs&feature=youtu.be"
  },
  {
    "id": "pdf-mem-40",
    "name": "Markos Buta",
    "category": "saved",
    "age": "40세",
    "region": "하와사",
    "job": "감독 목사",
    "assemblyMonth": "2026.2.26~3.02",
    "inviter": "Ahimed Seid",
    "inviterRelation": "교단 이사진",
    "photo": "images/members/mem_pdf-mem-40.jpg",
    "youtube": "https://youtu.be/ozRl20smAfA?si=70qVgCz-63x5qRIh",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "감독 Pastor",
    "inviterRelationEn": "교단 이사진"
  },
  {
    "id": "pdf-mem-41",
    "name": "Wasihun Tamirat",
    "category": "saved",
    "age": "39세",
    "region": "하와사",
    "job": "변호사",
    "assemblyMonth": "2026.2.26~3.02",
    "inviter": "Markos Buta",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-41.jpg",
    "youtube": "https://youtu.be/RfI1RSJo-1M?si=zdAap864qzLCHioN",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Lawyer",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-42",
    "name": "Yakob Buta",
    "category": "saved",
    "age": "50세",
    "region": "하와사",
    "job": "목사",
    "assemblyMonth": "2026.2.26~3.02",
    "inviter": "Markos Buta",
    "inviterRelation": "가족(형)",
    "photo": "images/members/mem_pdf-mem-42.jpg",
    "youtube": "https://drive.google.com/file/d/1OeuFlU2hbhX019SW9Eb9cUKXdcq6WrSH/view?usp=sharing",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Pastor",
    "inviterRelationEn": "family(형)"
  },
  {
    "id": "pdf-mem-43",
    "name": "Arfasa Beyene",
    "category": "saved",
    "age": "65세",
    "region": "하와사",
    "job": "목사",
    "assemblyMonth": "2026.2.26~3.02",
    "inviter": "Markos Buta",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-43.jpg",
    "youtube": "https://drive.google.com/file/d/1G2XZ5cQQKLaD-E0_MWE6w1iHUTAZpD1L/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Pastor",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-44",
    "name": "Aynalem",
    "category": "saved",
    "age": "22세",
    "region": "아디스아바바",
    "job": "교회 근무자",
    "assemblyMonth": "2026.3.13~16",
    "inviter": "Abdissa Ketema",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-44.jpg",
    "youtube": "https://www.youtube.com/watch?v=AijfyhXWUQE",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회 근무자",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-45",
    "name": "Geletu Ganta",
    "category": "saved",
    "age": "29세",
    "region": "아디스아바바",
    "job": "목사",
    "assemblyMonth": "2026.3.13~16",
    "inviter": "Atsede Addis",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-45.jpg",
    "youtube": "https://drive.google.com/file/d/1fAZe4mMFxcPvalNFASQoIrg2PpnqnDIP/view?usp=sharing",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Pastor",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-46",
    "name": "Tilahun Woldemadhin",
    "category": "saved",
    "age": "38세",
    "region": "아디스아바바",
    "job": "목사",
    "assemblyMonth": "2026.3.13~16",
    "inviter": "Abdissa Ketema",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-46.jpg",
    "youtube": "https://drive.google.com/file/d/1-c8wjkGiIABHPDiNjuh1sg-AP-rnWhKR/view?usp=sharing",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Pastor",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-47",
    "name": "Akawak Tufa",
    "category": "saved",
    "age": "25세",
    "region": "아다마",
    "job": "가수",
    "assemblyMonth": "2026.3.13~16",
    "inviter": "Abdissa Ketema",
    "inviterRelation": "이웃",
    "photo": "images/members/mem_pdf-mem-47.jpg",
    "youtube": "https://drive.google.com/file/d/1edij73UYu659QTuNL3h0mxny6if-5my6/view?usp=sharing",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "가수",
    "inviterRelationEn": "이웃"
  },
  {
    "id": "pdf-mem-48",
    "name": "Dave Daimo",
    "category": "saved",
    "age": "24세",
    "region": "아디스아바바",
    "job": "목사",
    "assemblyMonth": "2026.3.13~16",
    "inviter": "Atsede Addis",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-48.jpg",
    "youtube": "https://drive.google.com/file/d/1i0I0JhhaXy21HIh0u6FtHLdEuMb24Cfy/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Pastor",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-49",
    "name": "Woyinishet Wondimu",
    "category": "saved",
    "age": "43세",
    "region": "아디스아바바",
    "job": "전) Laboratory Technican, 현) 무직",
    "assemblyMonth": "2026.3.13~16",
    "inviter": "Nunu Abera",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-49.jpg",
    "youtube": "http://aiteam.tplinkdns.com:11002/translation/edit/686cd4d8-54bd-4b31-b58e-37356baae655",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "전) Laboratory Technican, 현) Unemployed",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-50",
    "name": "Abel Alemayehu",
    "category": "saved",
    "age": "33세",
    "region": "아디스아바바",
    "job": "교회 근무자",
    "assemblyMonth": "2026.3.13~16",
    "inviter": ":Abdissa Ketema",
    "inviterRelation": ":지인",
    "photo": "images/members/mem_pdf-mem-50.jpg",
    "youtube": "",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회 근무자",
    "inviterRelationEn": ":acquaintance"
  },
  {
    "id": "pdf-mem-51",
    "name": "Abenezer Agasa",
    "category": "saved",
    "age": "24세",
    "region": "아디스아바바",
    "job": "무직",
    "assemblyMonth": "2026.3.13~16",
    "inviter": "Nunu Abera",
    "inviterRelation": ":지인",
    "photo": "images/members/mem_pdf-mem-51.jpg",
    "youtube": "https://youtu.be/OSkjhJMojDg?si=9nLEJ-nPvc61v7ss",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Unemployed",
    "inviterRelationEn": ":acquaintance"
  },
  {
    "id": "pdf-mem-52",
    "name": "Asefa Ambe",
    "category": "saved",
    "age": "48세",
    "region": "아디스아바바, 차이나 캠프",
    "job": "경비",
    "assemblyMonth": "2026.4.24~27",
    "inviter": "Abdissa Ketema",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-52.jpg",
    "youtube": "https://youtu.be/3q0QLJfbGlw?si=3wutbvu4ZHspdFsI",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "경비",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-53",
    "name": "Abenezer Tadese",
    "category": "saved",
    "age": "26세",
    "region": "아디스아바바",
    "job": "전) 초등학교 영어 선생 / 현) elc 스텝",
    "assemblyMonth": "2026.4.24~27",
    "inviter": "Abdissa Ketema",
    "inviterRelation": "이웃",
    "photo": "images/members/mem_pdf-mem-53.jpg",
    "youtube": "https://youtu.be/p2XkuZsoFpU?si=7lhiS8-C74kpjavU",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "전) 초등학교 영어 선생 / 현) elc 스텝",
    "inviterRelationEn": "이웃"
  },
  {
    "id": "pdf-mem-54",
    "name": "Tefelagi Matiwos",
    "category": "saved",
    "age": "27세",
    "region": "아다마",
    "job": "경비",
    "assemblyMonth": "2026.4.24~27",
    "inviter": "Mesfin",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-54.jpg",
    "youtube": "https://youtu.be/Bmeq5ms1jYY?si=CjRGZtifsByBqdKA",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "경비",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-55",
    "name": "Nahom Gule",
    "category": "saved",
    "age": "22세",
    "region": "아디스아바바",
    "job": "가수",
    "assemblyMonth": "2026.4.24~27",
    "inviter": "Habtamu Mokonin",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-55.jpg",
    "youtube": "https://youtu.be/tnpwjIWTDtY?si=BnYMlEPGLhpkmVEW",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "가수",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-56",
    "name": "Anteneh Mulat",
    "category": "saved",
    "age": "45세",
    "region": "Sebeta",
    "job": "교회 봉사자",
    "assemblyMonth": "2026.4.24~27",
    "inviter": "Abdissa Ketema",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-56.jpg",
    "youtube": "https://youtu.be/t3wbTgi46wk?si=LNzKWq4OiaLt9pkd",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회 봉사자",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-57",
    "name": "Zed Fantahun",
    "category": "saved",
    "age": "45세",
    "region": "아다마",
    "job": "개인 사업",
    "assemblyMonth": "2026.5.15~18",
    "inviter": "Mesfin",
    "inviterRelation": "지인",
    "photo": "images/members/pdf_member_57.png",
    "youtube": "",
    "testimony": "",
    "jobEn": "개인 사업",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-58",
    "name": "Samuel Tamiru",
    "category": "saved",
    "age": "22세",
    "region": "아사사",
    "job": "학생",
    "assemblyMonth": "2026.5.15~18",
    "inviter": "Habtamu Mokonin",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-58.jpg",
    "youtube": "https://youtu.be/6-iT5dOsYXU?si=RajFavcT8UK-9zy0",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Student",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-59",
    "name": "Kurse Teso",
    "category": "saved",
    "age": "32세",
    "region": "아르시",
    "job": "",
    "assemblyMonth": "2026.5.15~18",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-59.jpg",
    "youtube": "https://youtu.be/qf2zq-QbUK0?si=DOoA4t5kvclok84O",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-60",
    "name": "Tewodros Tewolde",
    "category": "saved",
    "age": "39세",
    "region": "아다마",
    "job": "낙농업 종사자 / 봉사자",
    "assemblyMonth": "2026.5.15~18",
    "inviter": "Yewbdar Hailu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-60.jpg",
    "youtube": "https://youtu.be/w2n0Awd2lNo?si=avxs36HcEm2dPVtW",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "낙농업 종사자 / 봉사자",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-61",
    "name": "Zeleke Zewde",
    "category": "saved",
    "age": "40세",
    "region": "아다마",
    "job": "교회 봉사자",
    "assemblyMonth": "2026.5.15~18",
    "inviter": "Abdissa Ketema",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-61.jpg",
    "youtube": "http://aiteam.tplinkdns.com:11002/translation/edit/d3885351-5dc1-409a-bee1-098eed62936c",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회 봉사자",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-62",
    "name": "Tefera Dare",
    "category": "saved",
    "age": "58세",
    "region": "아다마",
    "job": "Chemical 제품 판매",
    "assemblyMonth": "2026.5.15~18",
    "inviter": "Yewbdar Hailu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-62.jpg",
    "youtube": "",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Chemical 제품 판매",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-63",
    "name": "Tokuma",
    "category": "saved",
    "age": "38세",
    "region": "아다마",
    "job": "교회 사역자",
    "assemblyMonth": "2026.5.15~18",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-63.jpg",
    "youtube": "",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회 사역자",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-64",
    "name": "Teshome Tiksa",
    "category": "saved",
    "age": "34세",
    "region": "모조",
    "job": "교회봉사",
    "assemblyMonth": "2026.06.05~08",
    "inviter": "Shambel",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-64.jpg",
    "youtube": "https://drive.google.com/file/d/12GYEsKocKKO8S9snC17ZDVbvo48BiUB0/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회봉사",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-65",
    "name": "Melese Turich",
    "category": "saved",
    "age": "27세",
    "region": "아디스아바바, 아르바민치 출신",
    "job": "교회봉사",
    "assemblyMonth": "2026.06.05~08",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-65.jpg",
    "youtube": "https://drive.google.com/file/d/1Zc-8lB4xOHA9hDnea241xtB3THU318kG/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회봉사",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-66",
    "name": "Admasu Alemayehu",
    "category": "saved",
    "age": "30세",
    "region": "아디스아바바",
    "job": "교회봉사",
    "assemblyMonth": "2026.06.05~08",
    "inviter": "Zeleke Zewde",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-66.jpg",
    "youtube": "https://drive.google.com/file/d/1JcgJBCawU5DY6ZLrqFkWqLAb_oet8RGe/view?usp=sharing",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회봉사",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-67",
    "name": "Mikal Ermiyas",
    "category": "saved",
    "age": "19세",
    "region": "아다마",
    "job": "무직",
    "assemblyMonth": "2026.06.05~08",
    "inviter": "Nigist Daniel",
    "inviterRelation": "친구",
    "photo": "images/members/mem_pdf-mem-67.jpg",
    "youtube": "https://drive.google.com/file/d/1UTVNEOHQm_A96HoyC9pRevzbg9eWF840/view?usp=sharing",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Unemployed",
    "inviterRelationEn": "friend"
  },
  {
    "id": "pdf-mem-68",
    "name": "Mengistu Chala",
    "category": "saved",
    "age": "34세",
    "region": "아디스아바바",
    "job": "Church worker",
    "assemblyMonth": "2026.06.18~22",
    "inviter": "Kurse Teso",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-68.jpg",
    "youtube": "https://youtu.be/_s_Z99z-YOQ?si=Wepq5szNTKd1OMpj",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Church worker",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-69",
    "name": "Jerusalem",
    "category": "saved",
    "age": ":",
    "region": "Sebeta",
    "job": "식자재 가공업자",
    "assemblyMonth": "2026.06.18~22",
    "inviter": "Anteneh",
    "inviterRelation": "아내",
    "photo": "images/members/mem_pdf-mem-69.jpg",
    "youtube": "https://drive.google.com/file/d/1to-_UusaWf-zSW3iJnctq6IsadzQUKfM/view?usp=sharing",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "식자재 가공업자",
    "inviterRelationEn": "wife"
  },
  {
    "id": "pdf-mem-70",
    "name": "Zelalem Worku",
    "category": "saved",
    "age": "32세",
    "region": "Sebeta",
    "job": "",
    "assemblyMonth": "2026.06.18~22",
    "inviter": "Anteneh",
    "inviterRelation": "사촌",
    "photo": "images/members/mem_pdf-mem-70.jpg",
    "youtube": "https://youtu.be/NNwcK8GqwOg?si=VxT3rfDRdyRFlRfW",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "",
    "inviterRelationEn": "사촌"
  },
  {
    "id": "pdf-mem-71",
    "name": "Abebe Tafese",
    "category": "saved",
    "age": "43세",
    "region": "비쇼프투",
    "job": "개인 사업 (전자 제품 판매)",
    "assemblyMonth": "2026.06.18~22",
    "inviter": "Tewodros Tewolde",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-71.jpg",
    "youtube": "https://youtu.be/MuVuFfD3RGM?si=d0XAsPVxLcfv19XV",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "개인 사업 (전자 제품 판매)",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-72",
    "name": "Ahimed Kedir",
    "category": "saved",
    "age": "38세",
    "region": "아다마",
    "job": "교회봉사",
    "assemblyMonth": "2026.06.18~22",
    "inviter": "Tokuma",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-72.jpg",
    "youtube": "https://youtu.be/RMuSiTpvFvc?si=KsdJ8FJ6Pw9WCu8F",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회봉사",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-73",
    "name": "Samuel Sisay",
    "category": "saved",
    "age": "34세",
    "region": "아디스아바바",
    "job": "교회봉사/ 건설",
    "assemblyMonth": "2026.06.18~22",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-73.jpg",
    "youtube": "https://drive.google.com/file/d/1lzhVPLSA9IQlqXqlr6mWavVfpXRqzXvP/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "교회봉사/ 건설",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-74",
    "name": "Zinabu Fikadu",
    "category": "saved",
    "age": "45세",
    "region": "비쇼프투",
    "job": "전) 교회봉사 현) 양계 사업",
    "assemblyMonth": "2026.06.18~22",
    "inviter": "Tewodros Tewolde",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-74.jpg",
    "youtube": "https://drive.google.com/file/d/1AvlVYor-G1eOuA5KfT5anD6Um2aklzSw/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "전) 교회봉사 현) 양계 사업",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-75",
    "name": "Hailu Deribe",
    "category": "saved",
    "age": "33세",
    "region": "아다마",
    "job": ":",
    "assemblyMonth": "2026.06.18~22",
    "inviter": "Ahimed Seid",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-75.jpg",
    "youtube": "https://drive.google.com/file/d/18n74sqMBQsSjUK7Fx9LFx7bB3Sp7w6hE/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": ":",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-76",
    "name": "Naol Mesfin",
    "category": "saved",
    "age": "21세",
    "region": "아다마",
    "job": "가수",
    "assemblyMonth": "2026.7.16-20",
    "inviter": "Nigist Daniel",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-76.jpg",
    "youtube": "https://youtu.be/bAkzGxHUGDQ?si=JhU1oBidJKsbo16e",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "가수",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-77",
    "name": "Eliyas Adane",
    "category": "saved",
    "age": "22세",
    "region": "아디스아바바",
    "job": "성경 학교 학생",
    "assemblyMonth": "2026.7.16-20",
    "inviter": "Samuel Sisay",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-77.jpg",
    "youtube": "https://drive.google.com/file/d/1urAQNnAUnGqPkT6_QemH4RZpYILKzz8o/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "성경 학교 Student",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-78",
    "name": "Rekik Zewde",
    "category": "saved",
    "age": "34세",
    "region": "아다마",
    "job": "가정주부",
    "assemblyMonth": "2026.7.16-20",
    "inviter": "Ahmed Kedir",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-78.jpg",
    "youtube": "https://drive.google.com/file/d/1AEgAffcoFy6-F086h6AA5pNnfJRtOa0X/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "가정주부",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-79",
    "name": "Abebe Fikadu",
    "category": "saved",
    "age": "28세",
    "region": "Sebeta",
    "job": "",
    "assemblyMonth": "2026.7.16-20",
    "inviter": "Zelalem Worku",
    "inviterRelation": "사촌",
    "photo": "images/members/mem_pdf-mem-79.jpg",
    "youtube": "https://drive.google.com/file/d/1lDXaOdilE8DzkhaIEdBBC1OhrsLZ458U/view?usp=drive_link",
    "testimony": "정교회 출신",
    "registeredYear": 2026,
    "jobEn": "",
    "inviterRelationEn": "사촌",
    "testimonyEn": "정교회 출신"
  },
  {
    "id": "pdf-mem-80",
    "name": "Debora Mebratu",
    "category": "saved",
    "age": "32세",
    "region": "아다마",
    "job": "",
    "assemblyMonth": "2026.7.16-20",
    "inviter": "Ahimed Kedir",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-80.jpg",
    "youtube": "https://drive.google.com/file/d/1A-9u_RcvHvXIBNK9NiM4j0nckKXePfQ_/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-81",
    "name": "Rhema Gezahange",
    "category": "saved",
    "age": "21세",
    "region": "비쇼프투",
    "job": "대학생 (컴퓨터 전공)",
    "assemblyMonth": "2026.7.16-20",
    "inviter": "Abebe Tafese",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-81.jpg",
    "youtube": "http://aiteam.tplinkdns.com:11002/translation/edit/20e3466a-d03a-485c-99d9-03f020b42edd",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "University Student (컴퓨터 전공)",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-82",
    "name": "Beemnet Mohammed",
    "category": "saved",
    "age": "21세",
    "region": "아다마",
    "job": "무직",
    "assemblyMonth": "2026.7.16-20",
    "inviter": "Nigist Daniel",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-82.jpg",
    "youtube": "https://drive.google.com/file/d/1ix8I0zgk6le90WYaJ6eQC88SZJyIW2t0/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Unemployed",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-83",
    "name": "Tsega Serum",
    "category": "saved",
    "age": "27세",
    "region": "비쇼프투",
    "job": "자영업",
    "assemblyMonth": "2026.7.16-20",
    "inviter": "Abebe Tafese",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-83.jpg",
    "youtube": "https://drive.google.com/file/d/1BUu2DtOI7JU3qIQDh892QJ4PX-Lm5s_B/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Self-employed",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-84",
    "name": "Haregeweyin Solomon",
    "category": "saved",
    "age": "55세",
    "region": "아다마",
    "job": "전도사",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Yewbdar Hailu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-84.jpg",
    "youtube": "https://drive.google.com/file/d/19Su_l5At2HlbZADgvJoolq8BJzJ8fhhg/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Evangelist",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-85",
    "name": "Addishiwot Ambesa",
    "category": "saved",
    "age": "30세",
    "region": "아다마",
    "job": "전도사",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Yewbdar Hailu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-85.jpg",
    "youtube": "https://drive.google.com/file/d/1CS2xBGHEnjUQi-vrajMgPczNBrPZcI7y/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Evangelist",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-86",
    "name": "Chocolate Gezahange",
    "category": "saved",
    "age": "16세",
    "region": "비쇼프투",
    "job": "학생",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Rhema Gezahange",
    "inviterRelation": "여동생",
    "photo": "images/members/mem_pdf-mem-86.jpg",
    "youtube": "https://drive.google.com/file/d/146VufFM9kgQqV3jmvT4yNXmqlvixjmJg/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Student",
    "inviterRelationEn": "younger sister"
  },
  {
    "id": "pdf-mem-87",
    "name": "Betelhem Dinku",
    "category": "saved",
    "age": "30세",
    "region": "아다마",
    "job": "음식&미용 전문가",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Tewodros Tewolde",
    "inviterRelation": "아내",
    "photo": "images/members/mem_pdf-mem-87.jpg",
    "youtube": "https://drive.google.com/file/d/1CtLiAdboLHmlRynORlNpO371Q-pB8wIs/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Food & Beauty Specialist",
    "inviterRelationEn": "wife"
  },
  {
    "id": "pdf-mem-88",
    "name": "Tsihon Tesfaye",
    "category": "saved",
    "age": "20세",
    "region": "아다마",
    "job": "학생",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Mikal Ermiyas",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-88.jpg",
    "youtube": "https://drive.google.com/file/d/19Su_l5At2HlbZADgvJoolq8BJzJ8fhhg/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Student",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-89",
    "name": "Teshalew Tafesse",
    "category": "saved",
    "age": "54세",
    "region": "네켐테",
    "job": "정교회 사제, Legal Officer",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Abebe Tafese",
    "inviterRelation": "형님",
    "photo": "images/members/mem_pdf-mem-89.jpg",
    "youtube": "https://drive.google.com/file/d/1MGf5bSXg5YMpp3FZ4jFn-gtuN2QxU5i7/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "정교회 사제, Legal Officer",
    "inviterRelationEn": "형님"
  },
  {
    "id": "pdf-mem-90",
    "name": "Betse'lotAbraham",
    "category": "saved",
    "age": "16세",
    "region": "아다마",
    "job": "학생",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Rekik Zewde",
    "inviterRelation": "큰 딸",
    "photo": "images/members/mem_pdf-mem-90.jpg",
    "youtube": "https://drive.google.com/file/d/1bh6QnSvpf4lsOnAkugbItqHKBzbWetZF/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Student",
    "inviterRelationEn": "큰 딸"
  },
  {
    "id": "pdf-mem-91",
    "name": "Wude Degefa",
    "category": "saved",
    "age": "51세",
    "region": "아다마",
    "job": "가정부",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Rekik Zewde",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-91.jpg",
    "youtube": "https://drive.google.com/file/d/12OwjjJFzHifO6GeU4emBpd4nT8pYAjDB/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Housekeeper",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-92",
    "name": "Biruk Tsagaye",
    "category": "saved",
    "age": "60세",
    "region": "아다마",
    "job": "운전기사",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Yewbdar Hailu",
    "inviterRelation": "지인",
    "photo": "images/members/mem_pdf-mem-92.jpg",
    "youtube": "https://drive.google.com/file/d/1Y9LUYpAuhIhW2EZvmbTYOAMdElbkpCXY/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Driver",
    "inviterRelationEn": "acquaintance"
  },
  {
    "id": "pdf-mem-93",
    "name": "Tadesse Degaga",
    "category": "saved",
    "age": "40세",
    "region": "Alem Tena",
    "job": "봉사자",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Tewodros Tewolde",
    "inviterRelation": "친구",
    "photo": "images/members/mem_pdf-mem-93.jpg",
    "youtube": "https://drive.google.com/file/d/1sMOfUzOY5Sst6US9jooSOPaUm01KHDXq/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "봉사자",
    "inviterRelationEn": "friend"
  },
  {
    "id": "pdf-mem-94",
    "name": "Ermiyas Mohammed",
    "category": "saved",
    "age": "26세",
    "region": "아다마",
    "job": "운전기사",
    "assemblyMonth": "2026.8.20~24",
    "inviter": "Beemnet Mohammed",
    "inviterRelation": "남매",
    "photo": "images/members/mem_pdf-mem-94.jpg",
    "youtube": "https://drive.google.com/file/d/1eYvjpkVUfJsa8wz8JlFpiPDGen6h4kiz/view?usp=drive_link",
    "testimony": "",
    "registeredYear": 2026,
    "jobEn": "Driver",
    "inviterRelationEn": "남매"
  }
];

const DEFAULT_HISTORY = [
  {
    "id": "hist-202308",
    "date": "2023년 8월",
    "title": "체코에서 시작된 에티오피아 복음 전파",
    "location": "체코",
    "images": [
      "images/history/hist-202308_1.jpg",
      "images/history_202308_czech_eden.jpg"
    ],
    "desc": "체코 ELC에서 함께 일할 스태프를 온라인으로 모집하던 중, 당시 체코에서 유학 중이던 에티오피아인 Eden이 지원하여 온라인 면접을 거쳐 스태프로 합류하였습니다. \n\n이를 계기로 사모님께서 에티오피아에도 복음을 전하고자 「성경은 사실이다」의 암하라어 번역을 Eden에게 맡기면서 에티오피아 복음 전파를 위한 준비가 시작되었습니다.\n\n그러나 Eden의 박사논문 준비와 귀국 일정 등으로 번역 작업이 1편에 머물 만큼 진행이 더뎌지면서 기존 작업을 중단하고, 사모님의 지시에 따라 온라인을 통해 현지 번역·통역자를 새롭게 모집하여 번역을 이어가기로 하였습니다.\n\n이에 박재한 선교사와 안드레이 형제가 에티오피아의 주요 3개 언어인 암하라어·티그리냐어·오로모어별로 2~3명의 번역·통역자를 모집하였고, 이들과 함께 2024년 4월부터 「성경은 사실이다」 번역 작업을 본격적으로 진행하였습니다. 그 결과 암하라어 번역은 약 4개월 만인 2024년 8월에 완료되었습니다.",
    "titleEn": "Beginning in Czech & Spreading Gospel in 3 Main Languages of Ethiopia",
    "descEn": "At ELC Czech, Eden (an Ethiopian student studying in Czech) joined as staff via an online interview. Opportunity arose to preach the Gospel in Ethiopia as Samonim assigned the Amharic translation of 'The Bible is True' to Eden, marking the beginning of the Ethiopia Mission.\n\nHowever, progress stalled after chapter 1, so per Samonim's direction, local interpreters were recruited online.\n\nTogether with Missionary Jaehan Park and Brother Andrei in Czech, 2-3 interpreters were recruited for each of the 3 main languages. Amharic translation began in April 2024 and was completed 4 months later in August 2024.\n\nAfterward, freelancers were searched online as Eden prepared her doctoral thesis. Translation was expanded simultaneously to all 3 main languages (Amharic, Tigrinya, and Oromo), successfully concluding in August 2024."
  },
  {
    "id": "hist-202404",
    "date": "2024년 4월",
    "title": "온라인 집회 진행 & 에티오피아 첫 구원 열매",
    "location": "온라인 (BIT channel)",
    "images": [
      "images/history/hist-202404_1.jpg"
    ],
    "desc": "에티오피아의 공용어인 암하라어로 「성경은 사실이다」를 번역하기에 앞서, 온라인 플랫폼을 통해 모집한 통역자들이 말씀의 내용을 먼저 충분히 숙지할 수 있도록 이들과 그 지인들을 대상으로 2024년 4월 영어 온라인 전도집회를 진행하였습니다.\n\n이 집회를 통해 마취과 의사인 나티나엘 형제(Nathinael)가 처음으로 분명한 구원의 고백과 간증을 하며, 에티오피아에서 첫 번째로 구원받은 식구가 되었습니다.",
    "titleEn": "Launch of Online Seminars & First Fruit of Salvation in Ethiopia (Sister Atis)",
    "descEn": "With the completion of Amharic translation and online platforms, the first online seminar was held in April 2024.\n\nAmong the first attendees, Sister Atis miraculously received salvation after listening to the Word, becoming the very first fruit of salvation in Ethiopia.\n\nSister Atis became a foundational pillar for the Addis Ababa Moim House, guiding her family and friends to the Gospel."
  },
  {
    "id": "hist-202408",
    "date": "2024년 8월",
    "title": "암하라어 더빙 완성 후 첫 온라인 집회",
    "location": "온라인 (BIT channel)",
    "images": [
      "images/history/hist-202408_1.jpg"
    ],
    "desc": "'성경은 사실이다' 암하라어 번역 완료 후 2024년 8월 암하라어 음성 더빙으로 진행되는 온라인 집회를 개최했습니다.\n\n이 2차 집회 중 티그리냐어 더빙을 담당하던 나티나엘 형제가 초청한 병동 의사 동료 피크루(Fikru) 형제가 집회 말씀을 들은 후 구원을 받았습니다.",
    "titleEn": "2nd Online Seminar Celebrating Amharic Word & Salvation of Brother Kursa",
    "descEn": "Celebrating the completion of 'The Bible is True' in Amharic, the 2nd Online Seminar was held in August 2024.\n\nBrother Kursa, who served as the Tigrinya interpreter, personally accepted the salvation of Jesus Christ while listening to the Word.\n\nAfter his salvation, Brother Kursa became a passionate fellow worker, dedicating himself fully to the Gospel in Ethiopia."
  },
  {
    "id": "hist-202410",
    "date": "2024년 10월",
    "title": "서아프리카팀 방문",
    "location": "에티오피아 (아디스아바바)",
    "images": [
      "images/history_202410_west_africa_team.jpg"
    ],
    "desc": "2024년 10월 말, 사모님께서 에티오피아에서 구원받은 식구들에게 예수님의 보혈에 대해 자세히 설명해 주었으면 좋겠다는 말씀을 하셨고, 서아프리카팀 이은우 형제 부부와 김재원 형제가 탄자니아·콩고 집회 일정을 마치고 귀국하는 길에 에티오피아에 들렀습니다.\n\n이 방문을 통해 피크루 형제 부부와 마취과 의사 나티나엘, 마크에게 『성경은 사실이다』 말씀을 다시 한번 들려주고 예수님의 보혈에 대해 설명하는 시간을 가졌습니다.",
    "titleEn": "Sebeta Visit & Establishing Foundation for Local Fellowship",
    "descEn": "Visited Sebeta to meet local contacts and establish a foundation for regular fellowship meetings and Bible study sessions."
  },
  {
    "id": "hist-202412",
    "date": "2024년 12월 29일 - 2025년 1월 13일",
    "title": "이강현 형제 부부 에티오피아 방문 & 모임집 답사",
    "location": "Addis Ababa (Mekanisa Yotek compound, Nifas Silk Lafto)",
    "images": [
      "images/history/hist-202412_1.jpg",
      "images/history/hist-202412_2.jpg",
      "images/history/hist-202412_3.jpg",
      "images/history/hist-202412_4.jpg"
    ],
    "desc": "이강현 형제 부부가 에티오피아 모임집 답사를 위해 2024년 12월 29일부터 2025년 1월 13일까지 에티오피아를 방문했습니다.\n\n아디스아바바 Mekanisa Yotek compound (Nifas Silk Lafto) 구역의 모임집 후보 장소를 직접 둘러보고 답사했으며, 구원받은 식구들(Nathinael, Fikru, Eden)과 함께 교제를 나누는 시간도 가졌습니다.\n\n(2024년 유럽 체코 수양회 이후, 11월경 사모님과의 통화를 거쳐 이강현 형제가 에티오피아 선교사로 파송되게 됨.)",
    "titleEn": "Missionary Kohen & Wife Visit Ethiopia & Local Seminar",
    "descEn": "Missionary Kohen and his wife visited Ethiopia from Dec 29, 2024 to Jan 13, 2025, holding intensive seminars and strengthening local fellowship."
  },
  {
    "id": "hist-202505",
    "date": "2025년 5월",
    "title": "모임집 입주 및 오프라인 집회 준비를 위한 입국 (이강현 & 이정훈 형제)",
    "images": [
      "images/history_202505_airport_entry.jpg",
      "images/history_user_uploaded_1.jpg",
      "images/history_user_uploaded_2.jpg",
      "images/history_user_uploaded_3.jpg",
      "images/history_user_uploaded_4.jpg",
      "images/history_user_uploaded_5.jpg",
      "images/history_user_uploaded_6.jpg",
      "images/history_user_uploaded_7.jpg",
      "images/history_user_uploaded_8.jpg",
      "images/history_user_uploaded_9.jpg",
      "images/history_user_uploaded_10.jpg"
    ],
    "desc": "- 2025년 5월 12일: 이정훈 형제 가나에서 에티오피아로 입국\n- 2025년 5월 16일: 이강현 형제 영국에서 에티오피아로 입국",
    "titleEn": "Preparation for First Offline Seminar & Arrival of Mission Team (Kohen & Franco)",
    "descEn": "In May 2025, Missionaries Kohen and Franco entered Ethiopia to prepare for the first large-scale offline Evangelical Seminar."
  },
  {
    "id": "hist-20250528",
    "date": "2025.5.28 ~ 6.01",
    "title": "에티오피아 첫 오프라인 집회",
    "location": "Vibes Hotel, 아디스아바바",
    "images": [
      "images/history_202505_first_offline_assembly_group.jpg",
      "images/history_202505_vibes_hotel.png",
      "images/history_202505_offline_support_fellowship.png",
      "images/history_202505_vibes_table.jpg",
      "images/history_user_uploaded_1.jpg",
      "images/history_user_uploaded_2.jpg",
      "images/history_user_uploaded_3.jpg",
      "images/history_user_uploaded_4.jpg",
      "images/history_user_uploaded_5.jpg",
      "images/history_user_uploaded_6.jpg",
      "images/history_user_uploaded_7.jpg",
      "images/history_user_uploaded_8.jpg",
      "images/history_user_uploaded_9.jpg",
      "images/history_user_uploaded_10.jpg"
    ],
    "desc": "장소: Vibes Hotel, 아디스아바바\n일시: 2025.5.28~6.01\n\n- 강연 : 성경은 사실이다 (암하라어 더빙)\n- 집회 말씀 보충 설명 : 이은우, 전현식\n- 사회 : 이강현, 이정훈 \n- 통역 : 요카벳, 비니암 [영어<->암하라어], 데보라(good news church staff)[한국어<->암하라어] \n- 신규 참석 인원 : 15명 대략\n\n\n집회 지원한 한국 식구들 (9명)  :\n이은우, 한경순, 류순 (Korea), 전현식(U.S), 박영성(Germany), 박건양(Germany), \nLee Benjamin Hae (Malta), 이강현(U.K), 이정훈(Ghana)",
    "titleEn": "First Offline Evangelical Seminar in Ethiopia (May 28 ~ June 01, 2025)",
    "descEn": "Location: Vibes Hotel, Addis Ababa\nDate: May 28 ~ June 01, 2025\n\n- Total Attendance: ~80 seekers & members (including visitors from outer regions)\n- Speakers: Missionary Kohen, Missionary Franco\n- Interpreters: Barka, William [English <-> Amharic], Eden (good news church staff) [Korean <-> Amharic]\n- Newly Saved Souls: ~15 souls received salvation\n\nAttending Korea Assembly Members (9 members):\nKohen, Franco, Kangwoo Han, Jaehan Park (Korea), Jongae Lee (U.S), Eunyung Zhang (Germany), Gunyung Zhang (Germany), Lee Benjamin Hae (Malta), Kohen (U.K), Franco (Ghana)"
  },
  {
    "id": "hist-20250623",
    "date": "2025.6.23 ~ 7.13",
    "title": "이강현·이정훈 형제 출국 & 김재원 형제 에티오피아 방문",
    "location": "에티오피아 (아디스아바바 모임집)",
    "images": [
      "images/history_202506_jaewon_kim_visit.png"
    ],
    "desc": "아내의 출산을 앞둔 이강현, 이정훈 형제는 2025년 6월 23일, 6월 24일 각각 한국, 영국으로 출국하게 되었고, 두 형제가 자리를 비운 동안 김재원 형제가 토고에서 에티오피아로 넘어와 잠시 머문 후 한국으로 귀국하였습니다 (2025.6.27 ~ 7.13).",
    "titleEn": "Missionary Kohen Return & Missionary Franco Visit to Ethiopia",
    "descEn": "Missionary Kohen returned to Korea while Missionary Franco visited Ethiopia from June 23 to July 13, 2025 for follow-up teaching and fellowship."
  },
  {
    "id": "hist-20250819",
    "date": "2025.8.19 ~ 10.13",
    "title": "김재원 형제 가족, 한국 수양회 후 에티오피아 방문 및 체류",
    "location": "에티오피아 (아디스아바바 모임집)",
    "images": [
      "images/history_202508_jaewon_kim_family_stay.jpg"
    ],
    "desc": "김재원 형제 부부, \n한국 수양회 후 에티오피아 방문 및 체류, 7언약을 책자 내용을 중심으로 주말 모임을 이어갔고, 한 번의 소집회를 진행하였으나 여러모로 어려운 시기였습니다.",
    "titleEn": "Reverend Kwon & Wife, Korea Assembly Team Visit Ethiopia & Seminars",
    "descEn": "Reverend Kwon, his wife, and the Korea Assembly team visited Ethiopia from Aug 19 to Oct 13, 2025, holding powerful seminars across multiple regions."
  },
  {
    "id": "hist-20250914",
    "date": "2025.9.14",
    "title": "에티오피아 첫 침례식 (4명 형제자매 결신 침례)",
    "location": "에티오피아 (아디스아바바 모임집 조립식 수영장)",
    "images": [
      "images/history_20250914_baptism_group.jpg",
      "images/history_20250914_baptism_pool.jpg"
    ],
    "desc": "에티오피아에 복음이 시작된 이후 구원받은 4명의 형제자매가 침례를 받았습니다.\n(왼쪽부터 에덴, 피크루, 제리훈, 게타추 / 침례식 진행 : 김재원 선교사)\n\n정교회의 영향력이 강한 에티오피아 사회에서는 사람들의 시선이 집중되는 수영장이나 강, 호수에서 침례를 베풀기가 쉽지 않았습니다. 그래서 가나에서 가져온 조립식 수영장에 물을 받아 그곳에서 은혜롭게 침례를 베풀었습니다.",
    "titleEn": "First Baptism Service in Ethiopia (4 Sisters Baptized)",
    "descEn": "On September 14, 2025, the historic first Baptism Service was conducted in Ethiopia, baptizing 4 saved sisters into the Lord."
  },
  {
    "id": "hist-20251103",
    "date": "2025.11.03",
    "title": "아빠가 된 이정훈 형제 재입국 & 12월 집회 준비",
    "location": "에티오피아 (볼레 국제공항 / 아디스아바바)",
    "images": [
      "images/history_20251103_jeonghoon_arrival.jpg"
    ],
    "desc": "아빠가 된 이정훈 형제가 에티오피아로 넘어와 기존에 구원받은 형제들과 매주 말씀 교제를 나누며 12월 전도집회를 계획하고 준비하였습니다 (2025.11.03).",
    "titleEn": "Brother Abebe Mission Team Arrival & Preparation for December Seminar",
    "descEn": "On November 3, 2025, Brother Abebe and the mission team arrived in Ethiopia to prepare for the upcoming December Evangelical Seminar."
  },
  {
    "id": "hist-20251212",
    "date": "2025.12.12 ~ 12.14",
    "title": "모임집에서의 첫 전도집회",
    "location": "에티오피아 (아디스아바바 모임집)",
    "images": [
      "images/history_20251212_meeting_house_assembly_group.jpg",
      "images/history_20251212_auditorium_lecture.jpg",
      "images/history_20251212_kitchen_eden.png",
      "images/history_20251212_preaching_speakers.png",
      "images/history_user_uploaded_1.jpg",
      "images/history_user_uploaded_2.jpg",
      "images/history_user_uploaded_3.jpg",
      "images/history_user_uploaded_4.jpg",
      "images/history_user_uploaded_5.jpg",
      "images/history_user_uploaded_6.jpg",
      "images/history_user_uploaded_7.jpg",
      "images/history_user_uploaded_8.jpg",
      "images/history_user_uploaded_9.jpg",
      "images/history_user_uploaded_10.jpg"
    ],
    "desc": "내부를 정성스럽게 가꾸고 사람들을 단란하게 초대하여 진행한 모임집에서의 첫 전도집회\n\n의사 일을 모두 내려놓고 ELC 스태프로 전심 헌신하게 된 피크루 형제가 이정훈 형제와 함께 움직이며 집회를 온 마음으로 준비하였습니다.\n\n[식사 준비]\n에덴 자매 혼자 12명의 식사 준비와 설거지를 맡기에는 벅차기에, 가사 도우미를 3일 동안 고용하여 에덴 자매를 돕게 하였습니다.\n\n2025년 12월 12일 (집회 첫날) 영국에 있던 이강현 형제가 에티오피아로 입국하였습니다.\n\n* 이강현 형제, 이정훈 형제 둘 다 아기가 90일쯤 됐을 때 에티오피아로 넘어옴.",
    "titleEn": "First Evangelical Seminar in Bishoftu",
    "descEn": "Conducted the first Evangelical Seminar in Bishoftu from Dec 12 to Dec 14, 2025, gathering local seekers and sharing the Gospel of salvation."
  },
  {
    "id": "hist-20251221",
    "date": "2025.12.21",
    "title": "침례식",
    "location": "에티오피아 (아디스아바바 모임집)",
    "images": [
      "images/history_20251221_baptism_samrawit.jpg",
      "images/history_20251221_baptism_ahimed.jpg"
    ],
    "desc": "12월 집회에서 구원받은 5명의 형제자매에게 침례를 줌\n(아흐메드, 삼라윗, 요셉, 마스레샤, 데레제)",
    "titleEn": "Baptism Service",
    "descEn": "Conducted a sacred Baptism Service for newly saved believers in Ethiopia on December 21, 2025."
  },
  {
    "id": "hist-20260117",
    "date": "2026.1.17 ~ 1.19",
    "title": "전도집회",
    "location": "구디나 툼사 수양관, 아디스아바바",
    "images": [
      "images/history_20260117_gudina_group.jpg",
      "images/history_20260117_gudina_map.jpg",
      "images/history_20260117_gudina_lecture.jpg",
      "images/history_20260117_gudina_meal.jpg"
    ],
    "desc": "전도집회\n장소: 구디나 툼사 수양관, 아디스아바바\n일시 : 2026.1.17~19",
    "titleEn": "Evangelical Seminar",
    "descEn": "Held an Evangelical Seminar from Jan 17 to Jan 19, 2026, nurturing local believers and inviting new seekers."
  },
  {
    "id": "hist-20260206",
    "date": "2026.02.06 ~ 02.08",
    "title": "구디나 툼사 수양관 전도집회",
    "location": "구디나 툼사, 아디스아바바",
    "images": [
      "images/history_20260206_gudina_assembly.jpg"
    ],
    "desc": "에티오피아에 관광비자로 장기간 체류한 것이 이민국에서 문제가 되면서, 이강현·이정훈 두 형제는 한국으로 귀국하여 에티오피아 교회 등록 절차를 진행한 후 재입국하기로 결정하였습니다. 이에 따라 2월 집회부터는 피크루 형제가 본격적으로 집회를 인도하기 시작하였습니다.",
    "titleEn": "First Evangelical Seminar in Adama",
    "descEn": "Conducted the first Evangelical Seminar in Adama from Feb 6 to Feb 8, 2026, establishing a new foothold for the Gospel."
  },
  {
    "date": "2026.2.26 ~ 3.02",
    "title": "모임집 전도집회 (마르코스 목사 이사진 초청)",
    "location": "모임집, 아디스아바바",
    "desc": "*마르코스 목사의 이사진과 지인들을 초청하여 은혜롭게 진행한 모임집 전도집회입니다.",
    "images": [
      "images/hist_auto_1.jpg",
      "images/hist_auto_2.jpg",
      "images/history_user_uploaded_1.jpg",
      "images/history_user_uploaded_2.jpg",
      "images/history_user_uploaded_3.jpg",
      "images/history_user_uploaded_4.jpg",
      "images/history_user_uploaded_5.jpg",
      "images/history_user_uploaded_6.jpg",
      "images/history_user_uploaded_7.jpg",
      "images/history_user_uploaded_8.jpg",
      "images/history_user_uploaded_9.jpg",
      "images/history_user_uploaded_10.jpg"
    ],
    "id": "hist-20260226",
    "titleEn": "Moim House Evangelical Seminar (Pastor Marcos Board Invited)",
    "descEn": "Held an Evangelical Seminar at the Moim House from Feb 26 to Mar 2, 2026, inviting Pastor Marcos and board members to participate."
  },
  {
    "date": "2026.3.13~16",
    "title": "전도집회",
    "location": "모임집, 아디스아바바",
    "desc": "2월 전도집회에서 구원받은 압디사 형제가 이후 본격적으로 주변 사람들을 집회에 초대하며 전도에 함께하기 시작하였음.",
    "images": [
      "images/hist_auto_3.jpg"
    ],
    "id": "hist-1788349055531",
    "titleEn": "Evangelical Seminar",
    "descEn": "Conducted a 4-day Evangelical Seminar from Mar 13 to Mar 16, 2026, strengthening the fellowship of saved members."
  },
  {
    "id": "hist-20260424",
    "date": "2026.4.24 ~ 4.27",
    "title": "4월 전도집회 & 아베네제르 타데세 형제 구원",
    "location": "모임집, 아디스아바바",
    "images": [
      "images/hist_auto_4.jpg",
      "images/hist_auto_5.jpg"
    ],
    "desc": "4월 집회를 통해 영어 선생님으로 재직중이던 Abenezer Tadese 형제가 구원을 받음.",
    "titleEn": "April Evangelical Seminar & Salvation of Brother Abenezer Tadese",
    "descEn": "Held the April Evangelical Seminar from Apr 24 to Apr 27, 2026, where Brother Abenezer Tadese miraculously received salvation."
  },
  {
    "date": "2026.5.15~18",
    "title": "전도집회",
    "location": "구디나툼사, 아디스아바바",
    "desc": "이강현·이정훈 형제의 부재가 장기화되는 가운데서도 끊임없이 이어진 전도집회",
    "images": [
      "images/hist_auto_6.jpg",
      "images/hist_auto_7.jpg"
    ],
    "id": "hist-1788369048749",
    "titleEn": "Evangelical Seminar",
    "descEn": "Conducted an Evangelical Seminar from May 15 to May 18, 2026, continuing to spread the truth of salvation."
  },
  {
    "date": "2026.06.05~08 / 2026.06.18~22",
    "title": "전도집회",
    "location": "구디나툼사, 아디스아바바",
    "desc": "6월에도 두 차례의 전도집회를 이어가며 꾸준히 복음을 전함",
    "images": [
      "images/hist_auto_8.jpg"
    ],
    "id": "hist-1788369145959",
    "titleEn": "Evangelical Seminars in June",
    "descEn": "Conducted two rounds of Evangelical Seminars (Jun 5-8 & Jun 18-22, 2026) for regional growth and member spiritual fellowship."
  },
  {
    "date": "2026.7.16~20",
    "title": "전도집회",
    "location": "ODA NABEE 호텔, 비쇼프투",
    "desc": "기독교협회(EGBCC) 교회 등록은 완료되었으나 이민국(ICS) 등록 절차가 지연됨에 따라, 이강현 형제가 여행비자로 에티오피아에 입국하여 행정업무를 진행하는 가운데 준비하여 개최한 전도집회.",
    "images": [
      "images/hist_auto_9.jpg",
      "images/hist_auto_10.jpg",
      "images/hist_auto_11.jpg"
    ],
    "id": "hist-1788369417375",
    "titleEn": "Evangelical Seminar",
    "descEn": "Conducted an Evangelical Seminar from Jul 16 to Jul 20, 2026, focusing on deep Bible study and salvation testimony presentations."
  },
  {
    "date": "2026.08.16",
    "title": "침례식",
    "location": "모임집, 아디스아바바",
    "desc": "에티오피아 교회 등록에 필요한 모든 절차를 마치고 한국 수양회를 치른 뒤 8월 6일 이강현·이정훈 형제는 피크루 형제 가족과 함께 에티오피아로 복귀하였으며, 8월 16일 그동안 전도집회를 통해 구원받은 식구들에게 침례를 주었습니다.",
    "images": [
      "images/hist_auto_12.jpg",
      "images/hist_auto_13.jpg",
      "images/hist_auto_14.jpg",
      "images/hist_auto_15.jpg"
    ],
    "id": "hist-1788369801465",
    "titleEn": "Baptism Service",
    "descEn": "Held a joyful Baptism Service on August 16, 2026, confirming the faith and salvation of newly saved brothers and sisters."
  },
  {
    "date": "2026.8.20~24",
    "title": "전도집회",
    "location": "ODA NABEE 호텔, 비쇼프투",
    "desc": "(신규 참석 : 29, 식구 : 25명)\n모든 법적·행정적 절차를 마치고 정식 자격을 갖추게 되면서, 제약 없이 본격적으로 복음을 전하기 시작함. 많은 참석자들이 분명한 구원 간증을 쏟아냈던 전도집회",
    "images": [
      "images/hist_auto_16.jpg",
      "images/hist_auto_17.jpg",
      "images/hist_auto_18.jpg",
      "images/hist_auto_19.jpg",
      "images/hist_auto_20.jpg",
      "images/hist_auto_21.jpg",
      "images/hist_auto_22.jpg",
      "images/hist_auto_23.jpg"
    ],
    "id": "hist-1788370209650",
    "titleEn": "Evangelical Seminar",
    "descEn": "Conducted an Evangelical Seminar from Aug 20 to Aug 24, 2026, advancing God's work in Ethiopia."
  }
];

const DEFAULT_ASSEMBLIES = [];

const DEFAULT_EVENTS = [
  { id: "evt-1", date: "2026-02-06", endDate: "2026-02-08", title: "구디나 툼사 수양관 전도집회", category: "seminar", location: "아디스아바바" },
  { id: "evt-2", date: "2026-03-13", endDate: "2026-03-16", title: "복음 전도집회", category: "seminar", location: "아디스아바바" },
  { id: "evt-3", date: "2026-04-24", endDate: "2026-04-27", title: "4월 복음 전도집회", category: "seminar", location: "아디스아바바" }
];

if (typeof window !== 'undefined') {
  window.DEFAULT_MEMBERS = DEFAULT_MEMBERS;
  window.DEFAULT_HISTORY = DEFAULT_HISTORY;
  window.DEFAULT_ASSEMBLIES = [];
  window.DEFAULT_EVENTS = DEFAULT_EVENTS;
  window.DATA_VERSION = "20260904_V16000_100PCT_REAL_LIVE_GOOGLE_MAPS_IFRAME";

  // Force-clear old localStorage
  try {
    const currentVer = localStorage.getItem("ethiopia_archive_data_ver");
    if (currentVer !== window.DATA_VERSION) {
      localStorage.clear();
      localStorage.setItem("ethiopia_archive_data_ver", window.DATA_VERSION);
    }
  } catch(e) {
    console.error("Cache flush check error:", e);
  }

  window.db = {
    getMembers() {
      try {
        const stored = localStorage.getItem("ethiopia_members_v16000");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch(e) {}
      return window.DEFAULT_MEMBERS || [];
    },
    saveMembers(mems) {
      try {
        if (Array.isArray(mems) && mems.length > 0) {
          localStorage.setItem("ethiopia_members_v16000", JSON.stringify(mems));
        }
      } catch(e) {}
    },
    getHistory() {
      try {
        const stored = localStorage.getItem("ethiopia_history_v16000");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch(e) {}
      return window.DEFAULT_HISTORY || [];
    },
    saveHistory(hists) {
      try {
        if (Array.isArray(hists) && hists.length > 0) {
          localStorage.setItem("ethiopia_history_v16000", JSON.stringify(hists));
        }
      } catch(e) {}
    },
    getFellowship() {
      try {
        const stored = localStorage.getItem("ethiopia_assemblies_v16000");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch(e) {}
      return [];
    },
    saveFellowship(items) {
      try {
        localStorage.setItem("ethiopia_assemblies_v16000", JSON.stringify(items));
      } catch(e) {}
    },
    getEvents() {
      try {
        const stored = localStorage.getItem("ethiopia_events_v16000");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch(e) {}
      return window.DEFAULT_EVENTS || [];
    },
    saveEvents(evts) {
      try {
        localStorage.setItem("ethiopia_events_v16000", JSON.stringify(evts));
      } catch(e) {}
    },
    addEvent(e) {
      const evts = this.getEvents();
      evts.unshift(e);
      this.saveEvents(evts);
    },
    deleteEvent(id) {
      const evts = this.getEvents().filter(x => x.id !== id);
      this.saveEvents(evts);
    },
    addMember(m) {
      const mems = this.getMembers();
      mems.unshift(m);
      this.saveMembers(mems);
    },
    updateMember(m) {
      const mems = this.getMembers();
      const idx = mems.findIndex(x => x.id === m.id);
      if (idx !== -1) mems[idx] = m;
      else mems.unshift(m);
      this.saveMembers(mems);
    },
    deleteMember(id) {
      const mems = this.getMembers().filter(x => x.id !== id);
      this.saveMembers(mems);
    },
    addHistory(h) {
      const hists = this.getHistory();
      hists.unshift(h);
      this.saveHistory(hists);
    },
    updateHistory(h) {
      const hists = this.getHistory();
      const idx = hists.findIndex(x => x.id === h.id);
      if (idx !== -1) hists[idx] = h;
      else hists.unshift(h);
      this.saveHistory(hists);
    },
    deleteHistory(id) {
      const hists = this.getHistory().filter(x => x.id !== id);
      this.saveHistory(hists);
    },
    addFellowship(f) {
      const items = this.getFellowship();
      items.unshift(f);
      this.saveFellowship(items);
    },
    updateFellowship(f) {
      const items = this.getFellowship();
      const idx = items.findIndex(x => x.id === f.id);
      if (idx !== -1) items[idx] = f;
      else items.unshift(f);
      this.saveFellowship(items);
    },
    deleteFellowship(id) {
      const items = this.getFellowship().filter(x => x.id !== id);
      this.saveFellowship(items);
    },
    resetToDefaults() {
      try {
        localStorage.clear();
        localStorage.setItem("ethiopia_archive_data_ver", window.DATA_VERSION);
      } catch(e) {}
      if (window.showToast) window.showToast("⚡ GitHub 서버 최신 사진 및 데이터로 동기화되었습니다!");
      setTimeout(() => location.reload(), 400);
    }
  };
}
