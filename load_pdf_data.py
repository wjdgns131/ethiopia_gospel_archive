import json, re

with open('parsed_pdf_members.json', 'r', encoding='utf-8') as f:
    pdf_members = json.load(f)

js_members_str = 'const DEFAULT_MEMBERS = ' + json.dumps(pdf_members, ensure_ascii=False, indent=2) + ';'

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# Replace DEFAULT_MEMBERS
data_js = re.sub(r'const DEFAULT_MEMBERS = \[[\s\S]*?\];', js_members_str, data_js)

# Update init and getMembers
old_init = 'localStorage.setItem("ethiopia_members", JSON.stringify([]));'
new_init = 'localStorage.setItem("ethiopia_members", JSON.stringify(DEFAULT_MEMBERS));'
data_js = data_js.replace(old_init, new_init)

old_init2 = 'localStorage.setItem("ethiopia_members_v2", JSON.stringify([]));'
new_init2 = 'localStorage.setItem("ethiopia_members_v2", JSON.stringify(DEFAULT_MEMBERS));'
data_js = data_js.replace(old_init2, new_init2)

old_get = 'if (!members || !Array.isArray(members)) {\n      return [];\n    }'
new_get = 'if (!members || !Array.isArray(members) || members.length === 0) {\n      localStorage.setItem("ethiopia_members", JSON.stringify(DEFAULT_MEMBERS));\n      return DEFAULT_MEMBERS;\n    }'
data_js = data_js.replace(old_get, new_get)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print(f"Successfully loaded {len(pdf_members)} official PDF members into js/data.js!")
