import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

new_datastore_code = """// Data Store Manager Class
class DataStore {
  constructor() {
    this.init();
  }

  init() {
    try {
      let historyData = null;
      try { historyData = JSON.parse(localStorage.getItem("ethiopia_history")); } catch(e) {}
      if (!historyData || !Array.isArray(historyData) || historyData.length === 0) {
        localStorage.setItem("ethiopia_history", JSON.stringify(DEFAULT_HISTORY));
      }

      let membersData = null;
      try { membersData = JSON.parse(localStorage.getItem("ethiopia_members")); } catch(e) {}
      if (!membersData || !Array.isArray(membersData) || membersData.length < 10) {
        localStorage.setItem("ethiopia_members", JSON.stringify(DEFAULT_MEMBERS));
        localStorage.setItem("ethiopia_members_v2", JSON.stringify(DEFAULT_MEMBERS));
      }

      let assembliesData = null;
      try { assembliesData = JSON.parse(localStorage.getItem("ethiopia_assemblies")); } catch(e) {}
      if (!assembliesData || !Array.isArray(assembliesData) || assembliesData.length === 0) {
        localStorage.setItem("ethiopia_assemblies", JSON.stringify(DEFAULT_ASSEMBLIES));
      }

      let eventsData = null;
      try { eventsData = JSON.parse(localStorage.getItem("ethiopia_events")); } catch(e) {}
      if (!eventsData || !Array.isArray(eventsData) || eventsData.length === 0) {
        localStorage.setItem("ethiopia_events", JSON.stringify(DEFAULT_EVENTS));
      }
    } catch(e) {
      console.error("DataStore init error:", e);
    }
  }

  getHistory() {
    let history = null;
    try { history = JSON.parse(localStorage.getItem("ethiopia_history")); } catch(e) {}
    if (!history || !Array.isArray(history) || history.length === 0) {
      localStorage.setItem("ethiopia_history", JSON.stringify(DEFAULT_HISTORY));
      return DEFAULT_HISTORY;
    }
    return history;
  }

  saveHistory(historyList) {
    localStorage.setItem("ethiopia_history", JSON.stringify(historyList));
  }

  addHistory(item) {
    const list = this.getHistory();
    item.id = "hist-" + Date.now();
    list.unshift(item);
    this.saveHistory(list);
  }

  getMembers() {
    let members = null;
    try { members = JSON.parse(localStorage.getItem("ethiopia_members")); } catch(e) {}
    if (!members || !Array.isArray(members) || members.length < 10) {
      localStorage.setItem("ethiopia_members", JSON.stringify(DEFAULT_MEMBERS));
      localStorage.setItem("ethiopia_members_v2", JSON.stringify(DEFAULT_MEMBERS));
      return DEFAULT_MEMBERS;
    }
    return members;
  }

  saveMembers(membersList) {
    localStorage.setItem("ethiopia_members", JSON.stringify(membersList));
    localStorage.setItem("ethiopia_members_v2", JSON.stringify(membersList));
  }

  addMember(memberData) {
    const list = this.getMembers();
    memberData.id = "mem-" + Date.now();
    list.push(memberData);
    this.saveMembers(list);
  }

  updateMember(memberData) {
    let list = this.getMembers();
    list = list.map(m => m.id === memberData.id ? { ...m, ...memberData } : m);
    this.saveMembers(list);
  }

  deleteMember(id) {
    let list = this.getMembers();
    list = list.filter(m => m.id !== id);
    this.saveMembers(list);
  }

  getAssemblies() {
    let assemblies = null;
    try { assemblies = JSON.parse(localStorage.getItem("ethiopia_assemblies")); } catch(e) {}
    if (!assemblies || !Array.isArray(assemblies) || assemblies.length === 0) {
      localStorage.setItem("ethiopia_assemblies", JSON.stringify(DEFAULT_ASSEMBLIES));
      return DEFAULT_ASSEMBLIES;
    }
    return assemblies;
  }

  saveAssemblies(list) {
    localStorage.setItem("ethiopia_assemblies", JSON.stringify(list));
  }

  addAssembly(item) {
    const list = this.getAssemblies();
    item.id = "assm-" + Date.now();
    list.unshift(item);
    this.saveAssemblies(list);
  }

  getEvents() {
    let events = null;
    try { events = JSON.parse(localStorage.getItem("ethiopia_events")); } catch(e) {}
    if (!events || !Array.isArray(events) || events.length === 0) {
      localStorage.setItem("ethiopia_events", JSON.stringify(DEFAULT_EVENTS));
      return DEFAULT_EVENTS;
    }
    return events;
  }

  saveEvents(list) {
    localStorage.setItem("ethiopia_events", JSON.stringify(list));
  }

  addEvent(item) {
    const list = this.getEvents();
    item.id = "evt-" + Date.now();
    list.push(item);
    this.saveEvents(list);
  }
}"""

data_js = re.sub(r'// Data Store Manager Class[\s\S]*?window\.db = new DataStore\(\);', new_datastore_code + '\n\nwindow.db = new DataStore();', data_js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("Successfully updated DataStore class in js/data.js!")
