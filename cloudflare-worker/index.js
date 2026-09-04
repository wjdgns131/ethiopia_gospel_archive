/**
 * 에티오피아 선교 아카이브 - Cloudflare Worker 원본 이미지 업로드 보안 프록시
 * 
 * GitHub PAT 및 관리자 패스코드는 Cloudflare Worker Secret 환경변수에 보관됩니다.
 * - env.GITHUB_PAT: fine-grained Personal Access Token (Contents Read/Write)
 * - env.ADMIN_PASSCODE: 관리자 인증 암호
 */

export default {
  async fetch(request, env, ctx) {
    const allowedOrigin = "https://wjdgns131.github.io";
    const origin = request.headers.get("Origin");

    // 1. Strict Origin Validation (Reject unauthorized origins with 403)
    if (origin && origin !== allowedOrigin) {
      return new Response(JSON.stringify({ error: "Forbidden: Origin not allowed." }), {
        status: 403,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    // 2. CORS Preflight (OPTIONS) Handling
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Admin-Passcode",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Content-Type": "application/json; charset=utf-8"
    };

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: corsHeaders });
    }

    try {
      // 3. Admin Passcode Secret Configuration Check
      const validPasscode = env.ADMIN_PASSCODE || env.ADMIN_PASSWORD || env.X_ADMIN_PASSCODE;
      if (!validPasscode) {
        return new Response(JSON.stringify({ error: "Server Configuration Error: ADMIN_PASSCODE secret missing." }), { status: 500, headers: corsHeaders });
      }

      // 4. Admin Passcode Verification
      const adminPasscode = request.headers.get("X-Admin-Passcode");
      if (!adminPasscode || adminPasscode !== validPasscode) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid admin passcode." }), { status: 401, headers: corsHeaders });
      }

      // 5. Parse Multipart Form Data
      const formData = await request.formData();
      const file = formData.get("file");
      const historyId = formData.get("historyId") || "hist-general";

      if (!file || !(file instanceof File)) {
        return new Response(JSON.stringify({ error: "Bad Request: Missing image file." }), { status: 400, headers: corsHeaders });
      }

      // 6. File Size Limit Check (Max 15MB)
      const MAX_BYTES = 15 * 1024 * 1024;
      if (file.size > MAX_BYTES) {
        return new Response(JSON.stringify({ error: `File size exceeds 15MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB).` }), { status: 400, headers: corsHeaders });
      }

      // 7. Allowed MIME Type Verification
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        return new Response(JSON.stringify({ error: `Unsupported file type: ${file.type}` }), { status: 400, headers: corsHeaders });
      }

      // 8. Generate Collision-Proof Filename
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:T.]/g, "").substring(0, 14); // YYYYMMDDHHMMSS
      const randomHash = Math.random().toString(36).substring(2, 6);
      const extOverride = formData.get("extOverride");
      const extMatch = file.name.match(/\.[a-zA-Z0-9]+$/);
      const ext = extOverride || (extMatch ? extMatch[0].toLowerCase() : ".jpg");
      const cleanHistoryId = String(historyId).replace(/[^a-zA-Z0-9_-]/g, "");

      const subFolder = formData.get("subFolder");
      let folderPath = "images/history";
      if (subFolder === "original" || subFolder === "thumb") {
        folderPath = `images/history/${subFolder}`;
      }

      const filename = `hist-${cleanHistoryId}-${timestamp}-${randomHash}${ext}`;
      const repoPath = `${folderPath}/${filename}`;

      // 9. Convert Original File ArrayBuffer to Base64 for GitHub API
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binaryString = "";
      for (let i = 0; i < uint8Array.byteLength; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
      }
      const base64Content = btoa(binaryString);

      // 10. Commit Original Image to GitHub Repository via REST API
      const githubPat = env.GITHUB_PAT || env.GITHUB_TOKEN;
      if (!githubPat) {
        return new Response(JSON.stringify({ error: "Server Configuration Error: GITHUB_PAT secret missing." }), { status: 500, headers: corsHeaders });
      }

      const githubApiUrl = `https://api.github.com/repos/wjdgns131/ethiopia_gospel_archive/contents/${repoPath}`;
      const githubRes = await fetch(githubApiUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${githubPat}`,
          "Content-Type": "application/json",
          "User-Agent": "Ethiopia-Archive-Worker"
        },
        body: JSON.stringify({
          message: `Upload original Gospel History image: ${filename}`,
          content: base64Content,
          branch: "main"
        })
      });

      if (!githubRes.ok) {
        const ghErrText = await githubRes.text();
        return new Response(JSON.stringify({ error: `GitHub API error: ${ghErrText}` }), { status: 502, headers: corsHeaders });
      }

      const ghData = await githubRes.json();

      // 11. Return Relative Path for Frontend Storage
      return new Response(JSON.stringify({
        success: true,
        path: repoPath,
        filename: filename,
        bytes: file.size,
        downloadUrl: ghData.content ? ghData.content.download_url : null
      }), { status: 200, headers: corsHeaders });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || "Internal Worker Error" }), { status: 500, headers: corsHeaders });
    }
  }
};
