import json, re

# Load 94 parsed members from PDF
with open('parsed_pdf_members.json', 'r', encoding='utf-8') as f:
    pdf_members = json.load(f)

print(f"Loaded {len(pdf_members)} members from PDF")

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# Replace DEFAULT_MEMBERS
js_members_str = 'const DEFAULT_MEMBERS = ' + json.dumps(pdf_members, ensure_ascii=False, indent=2) + ';'
data_js = re.sub(r'const DEFAULT_MEMBERS = \[[\s\S]*?\];', js_members_str, data_js)

# Fix init() in DataStore
data_js = data_js.replace(
    'localStorage.setItem("ethiopia_members", JSON.stringify([]));',
    'localStorage.setItem("ethiopia_members", JSON.stringify(DEFAULT_MEMBERS));'
)
data_js = data_js.replace(
    'localStorage.setItem("ethiopia_members_v2", JSON.stringify([]));',
    'localStorage.setItem("ethiopia_members_v2", JSON.stringify(DEFAULT_MEMBERS));'
)

# Force getMembers() to overwrite cached empty array in browser localStorage
get_members_func = """  getMembers() {
    let members = null;
    try {
      members = JSON.parse(localStorage.getItem("ethiopia_members"));
    } catch(e) {}

    if (!members || !Array.isArray(members) || members.length < 10) {
      localStorage.setItem("ethiopia_members", JSON.stringify(DEFAULT_MEMBERS));
      localStorage.setItem("ethiopia_members_v2", JSON.stringify(DEFAULT_MEMBERS));
      return DEFAULT_MEMBERS;
    }
    return members;
  }"""

data_js = re.sub(r'getMembers\(\)\s*\{[\s\S]*?return members;\s*\}', get_members_func, data_js)

# Ensure init() forces fresh loading of DEFAULT_HISTORY and DEFAULT_MEMBERS
init_func = """  init() {
    try {
      if (!localStorage.getItem("ethiopia_history") || JSON.parse(localStorage.getItem("ethiopia_history")).length === 0) {
        localStorage.setItem("ethiopia_history", JSON.stringify(DEFAULT_HISTORY));
      }
      if (!localStorage.getItem("ethiopia_members") || JSON.parse(localStorage.getItem("ethiopia_members")).length < 10) {
        localStorage.setItem("ethiopia_members", JSON.stringify(DEFAULT_MEMBERS));
        localStorage.setItem("ethiopia_members_v2", JSON.stringify(DEFAULT_MEMBERS));
      }
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

data_js = re.sub(r'init\(\)\s*\{[\s\S]*?console\.error\("DataStore init error:", e\);\s*\}\s*\}', init_func, data_js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("Successfully updated js/data.js with 94 members and restored Gospel History!")
