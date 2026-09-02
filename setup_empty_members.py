import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# Set DEFAULT_MEMBERS = [];
data_js = re.sub(r'const DEFAULT_MEMBERS = \[[\s\S]*?\];', 'const DEFAULT_MEMBERS = [];', data_js)

# Update init() in DataStore
new_init = """  init() {
    try {
      let historyData = null;
      try { historyData = JSON.parse(localStorage.getItem("ethiopia_history")); } catch(e) {}
      if (!historyData || !Array.isArray(historyData) || historyData.length === 0) {
        localStorage.setItem("ethiopia_history", JSON.stringify(DEFAULT_HISTORY));
      }

      // Member list empty by default
      localStorage.setItem("ethiopia_members", JSON.stringify([]));
      localStorage.setItem("ethiopia_members_v2", JSON.stringify([]));

      if (!localStorage.getItem("ethiopia_assemblies")) {
        localStorage.setItem("ethiopia_assemblies", JSON.stringify(DEFAULT_ASSEMBLIES));
      }
      if (!localStorage.getItem("ethiopia_events")) {
        localStorage.setItem("ethiopia_events", JSON.stringify(DEFAULT_EVENTS));
      }
    } catch(e) {
      console.error("DataStore init error:", e);
    }
  }"""

new_get_members = """  getMembers() {
    let members = null;
    try { members = JSON.parse(localStorage.getItem("ethiopia_members")); } catch(e) {}
    if (!members || !Array.isArray(members)) {
      return [];
    }
    return members;
  }"""

data_js = re.sub(r'init\(\)\s*\{[\s\S]*?console\.error\("DataStore init error:", e\);\s*\}\s*\}', new_init, data_js)
data_js = re.sub(r'getMembers\(\)\s*\{[\s\S]*?return members;\s*\}', new_get_members, data_js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("Successfully set DEFAULT_MEMBERS to [] and preserved DEFAULT_HISTORY in js/data.js!")
