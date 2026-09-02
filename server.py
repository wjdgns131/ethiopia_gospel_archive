import http.server
import socketserver
import json
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class BulletproofAutoSaveHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy", "version": "2.5"}).encode('utf-8'))
            return
        super().do_GET()

    def do_POST(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            data = json.loads(body.decode('utf-8'))
            data_js_path = os.path.join(DIRECTORY, 'js', 'data.js')

            if self.path == '/api/save-data':
                members = data.get('members', [])
                if os.path.exists(data_js_path):
                    with open(data_js_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    m_start = content.find("const DEFAULT_MEMBERS = [")
                    m_next = content.find("const DEFAULT_HISTORY = [")

                    if m_start != -1 and m_next != -1:
                        json_formatted = json.dumps(members, ensure_ascii=False, indent=2)
                        new_content = content[:m_start] + "const DEFAULT_MEMBERS = " + json_formatted + ";\n\n" + content[m_next:]
                        with open(data_js_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        
                        print(f"[AutoSave Members] Successfully updated {len(members)} members into js/data.js!")
                        res = json.dumps({"status": "ok", "count": len(members)}).encode('utf-8')
                        self.send_response(200)
                        self.send_header('Content-Type', 'application/json; charset=utf-8')
                        self.send_header('Content-Length', str(len(res)))
                        self.end_headers()
                        self.wfile.write(res)
                        return

            elif self.path == '/api/save-history':
                history = data.get('history', [])
                if os.path.exists(data_js_path):
                    with open(data_js_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    h_start = content.find("const DEFAULT_HISTORY = [")
                    h_next = content.find("const DEFAULT_ASSEMBLIES = [")

                    if h_start != -1 and h_next != -1:
                        json_formatted = json.dumps(history, ensure_ascii=False, indent=2)
                        new_content = content[:h_start] + "const DEFAULT_HISTORY = " + json_formatted + ";\n\n" + content[h_next:]
                        with open(data_js_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        
                        print(f"[AutoSave History] Successfully updated {len(history)} history items into js/data.js!")
                        res = json.dumps({"status": "ok", "count": len(history)}).encode('utf-8')
                        self.send_response(200)
                        self.send_header('Content-Type', 'application/json; charset=utf-8')
                        self.send_header('Content-Length', str(len(res)))
                        self.end_headers()
                        self.wfile.write(res)
                        return

            # Backup to data_backup.json if needed
            backup_path = os.path.join(DIRECTORY, 'data_backup.json')
            with open(backup_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            res = json.dumps({"status": "ok", "message": "backed up to data_backup.json"}).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(res)))
            self.end_headers()
            self.wfile.write(res)

        except Exception as e:
            print(f"[AutoSave Exception] {e}")
            err_msg = json.dumps({"status": "error", "message": str(e)}).encode('utf-8')
            self.send_response(500)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(err_msg)))
            self.end_headers()
            self.wfile.write(err_msg)

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), BulletproofAutoSaveHandler) as httpd:
        print(f"[Server] Ethiopia Gospel Archive Fail-Safe Server running on http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
