/**
 * ??믨퀡堉???덈룛????ル맪爰??熬곣뫖異?????- Cloudflare Worker ?곌랜?삯뇡??筌뤾쑴理??????沅?????嶺뚯솘? ???놁Ŧ???熬곣뫁夷??
 * 
 * Cloudflare Worker Secret ???삵렱?곌떠???
 * - env.ADMIN_PASSCODE: ??㉱?洹먮봿???????뺢퀡???
 * - env.COWORKER_PASSCODE: ???덉뿴???????뺢퀡???
 * - env.AUTH_SESSION_SECRET: HMAC-SHA256 ?筌뤾쑬????類ㅺ뎄?????れ씩??
 * - env.GITHUB_PAT: GitHub Fine-grained Personal Access Token
 */

function applyFallbackDomainGlossary(text) {
  if (!text || typeof text !== "string") return text || "";
  if (text.startsWith("http://") || text.startsWith("https://")) return text;

  let result = text;
  const termsMap = [
    { kr: "?熬곣뫀利꿰춯?뚯탴??, en: "Evangelical Seminar" },
    { kr: "??뚮봿?싩뛾?녿즴??, en: "receive salvation" },
    { kr: "??뚮봿????꾩룇猷??, en: "receive salvation" },
    { kr: "??뚮봿???띠룄?닷폑?, en: "salvation testimony" },
    { kr: "??뚮봿?싨뤆?꾩뫒凉?, en: "salvation testimony" },
    { kr: "??뚮봿??, en: "salvation" },
    { kr: "?곸굹維????꾩룇猷??, en: "be baptized" },
    { kr: "?곸굹維???뽯닑???, en: "be baptized" },
    { kr: "?곸굹維?", en: "baptism" },
    { kr: "?곌랜踰????熬곥굥由??, en: "preach the gospel" },
    { kr: "?곌랜踰??熬곣뫗???濡ル펲", en: "preach the gospel" },
    { kr: "?貫?꾥린???뉖Ц", en: "Elementary School Student" },
    { kr: "繞벿살탴???, en: "Middle School Student" },
    { kr: "??μ쪚甕???뉖Ц", en: "High School Student" },
    { kr: "?????뉖Ц", en: "University Student" },
    { kr: "?熬곣뫀利??, en: "Evangelist" },
    { kr: "嶺뚮ㅄ維쀦쾮?, en: "Pastor" },
    { kr: "?띠럾??筌?", en: "Housekeeper" },
    { kr: "??흮亦?, en: "Teacher" },
    { kr: "嶺뚯솘???, en: "acquaintance" },
    { kr: "??????, en: "mother" },
    { kr: "?熬곣뫁?붺춯?뼿", en: "father" },
    { kr: "?곸궡裕??, en: "friend" }
  ];

  for (const item of termsMap) {
    result = result.split(item.kr).join(item.en);
  }
  return result;
}

function postProcessDomainTerms(text) {
  if (!text || typeof text !== "string") return text || "";
  let result = text;
  result = result.replace(/evangelism meeting|gospel rally|gospel meeting/gi, "Evangelical Seminar");
  result = result.replace(/salvation testimony/gi, "salvation testimony");
  return result;
}

function base64UrlEncode(arrayBufferOrUint8Array) {
  const uint8 = new Uint8Array(arrayBufferOrUint8Array);
  let binary = "";
  for (let i = 0; i < uint8.byteLength; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) {
    b64 += "=";
  }
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function getCryptoKey(secretStr) {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secretStr),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function createHMACSessionToken(role, secretStr) {
  const nowSec = Math.floor(Date.now() / 1000);
  const expSec = nowSec + (12 * 3600); // 12??蹂?뜟 嶺뚮씭??쭩?
  const nonceBytes = crypto.getRandomValues(new Uint8Array(8));
  let nonceHex = "";
  for (let i = 0; i < nonceBytes.length; i++) {
    nonceHex += nonceBytes[i].toString(16).padStart(2, "0");
  }

  const payloadObj = {
    role: role,
    iat: nowSec,
    exp: expSec,
    nonce: nonceHex
  };

  const payloadJson = JSON.stringify(payloadObj);
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(payloadJson));

  const key = await getCryptoKey(secretStr);
  const sigBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  const sigB64 = base64UrlEncode(sigBuffer);

  return `${payloadB64}.${sigB64}`;
}

async function verifyHMACSessionToken(tokenStr, secretStr) {
  if (!tokenStr || typeof tokenStr !== "string") return null;
  const parts = tokenStr.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, sigB64] = parts;
  try {
    const key = await getCryptoKey(secretStr);
    const sigBuffer = base64UrlDecode(sigB64);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBuffer,
      new TextEncoder().encode(payloadB64)
    );

    if (!isValid) return null;

    const payloadJsonStr = new TextDecoder().decode(base64UrlDecode(payloadB64));
    const payload = JSON.parse(payloadJsonStr);

    if (!payload || typeof payload !== "object") return null;
    if (payload.role !== "admin" && payload.role !== "coworker") return null;
    if (typeof payload.exp !== "number" || typeof payload.iat !== "number") return null;

    const nowSec = Math.floor(Date.now() / 1000);
    if (nowSec >= payload.exp) return null;

    return payload;
  } catch (ex) {
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin");
    const allowedOrigin = (origin && (origin.includes("localhost") || origin.includes("127.0.0.1"))) 
      ? origin 
      : "https://wjdgns131.github.io";

    // 1. CORS Preflight (OPTIONS) Handling
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

    const url = new URL(request.url);
    const contentType = request.headers.get("Content-Type") || "";

    // Extract Authorization Header if present
    const authHeader = request.headers.get("Authorization") || "";
    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    const bearerToken = bearerMatch ? bearerMatch[1].trim() : "";

    // 2. Token Verify Endpoint (POST /auth/verify)
    const isVerifyReq = url.pathname === "/auth/verify" || url.pathname.endsWith("/auth/verify");
    if (isVerifyReq) {
      if (!env.AUTH_SESSION_SECRET) {
        return new Response(JSON.stringify({ ok: false, error: "Server Configuration Error: AUTH_SESSION_SECRET missing." }), { status: 500, headers: corsHeaders });
      }

      if (!bearerToken) {
        return new Response(JSON.stringify({ ok: false, error: "Missing token" }), { status: 401, headers: corsHeaders });
      }

      const payload = await verifyHMACSessionToken(bearerToken, env.AUTH_SESSION_SECRET);
      if (!payload) {
        return new Response(JSON.stringify({ ok: false, error: "Invalid or expired token" }), { status: 401, headers: corsHeaders });
      }

      return new Response(JSON.stringify({ ok: true, role: payload.role }), { status: 200, headers: corsHeaders });
    }

    // 3. Login Auth Endpoint (POST /auth)
    let jsonBody = null;
    if (contentType.includes("application/json")) {
      try {
        jsonBody = await request.clone().json();
      } catch (ex) {}
    }

    const isAuthReq = url.pathname === "/auth" || url.pathname.endsWith("/auth") || (jsonBody && (jsonBody.action === "auth" || jsonBody.passcode !== undefined || jsonBody.password !== undefined));

    if (isAuthReq) {
      if (!env.AUTH_SESSION_SECRET) {
        return new Response(JSON.stringify({ error: "Server Configuration Error: AUTH_SESSION_SECRET missing." }), { status: 500, headers: corsHeaders });
      }
      const validAdminPasscode = env.ADMIN_PASSCODE || env.ADMIN_PASSWORD || env.X_ADMIN_PASSCODE;
      if (!validAdminPasscode) {
        return new Response(JSON.stringify({ error: "Server Configuration Error: ADMIN_PASSCODE missing." }), { status: 500, headers: corsHeaders });
      }
      const validCoworkerPasscode = env.COWORKER_PASSCODE;
      if (!validCoworkerPasscode) {
        return new Response(JSON.stringify({ error: "Server Configuration Error: COWORKER_PASSCODE missing." }), { status: 500, headers: corsHeaders });
      }

      const passcode = jsonBody ? (jsonBody.passcode || jsonBody.password || "") : "";
      const cleanPasscode = String(passcode).trim();

      if (cleanPasscode === String(validAdminPasscode).trim()) {
        const token = await createHMACSessionToken("admin", env.AUTH_SESSION_SECRET);
        return new Response(JSON.stringify({ ok: true, role: "admin", token: token }), { status: 200, headers: corsHeaders });
      }

      if (cleanPasscode === String(validCoworkerPasscode).trim()) {
        const token = await createHMACSessionToken("coworker", env.AUTH_SESSION_SECRET);
        return new Response(JSON.stringify({ ok: true, role: "coworker", token: token }), { status: 200, headers: corsHeaders });
      }

      return new Response(JSON.stringify({ ok: false, error: "Invalid passcode" }), { status: 401, headers: corsHeaders });
    }

    // 3.4 Translation Endpoint (POST /translate)
    const isTranslateReq = url.pathname === "/translate" || url.pathname.endsWith("/translate") || (jsonBody && jsonBody.action === "translate");
    if (isTranslateReq) {
      try {
        const fields = (jsonBody && jsonBody.fields && typeof jsonBody.fields === "object") ? jsonBody.fields : {};
        
        const systemPrompt = `You are translating Korean content into natural English for a Christian mission archive.

Translate the entire Korean text into fluent, natural English.
Do not leave Korean words or Korean grammar in the output.
Do not perform word-for-word substitution.
Return only the English translation.

Use the following terminology consistently:
- ?熬곣뫀利꿰춯?뚯탴??= Evangelical Seminar
- ??뚮봿??= salvation
- ??뚮봿?싩뛾?녿즴??= be saved / receive salvation according to context
- ??뚮봿???띠룄?닷폑?= salvation testimony
- ?곸굹維? = baptism
- ?곸굹維????꾩룇猷??= be baptized
- ?곌랜踰????熬곥굥由??= preach the gospel / share the gospel
- ELC = ELC
- WELC = WELC

Preserve personal names and established place names.
Write clear, natural English suitable for a mission history archive.
Return a valid JSON object mapping each input field key to its translated English string.`;

        let translations = {};
        try {
          if (env.AI) {
            const promptInput = `${systemPrompt}\n\nInput JSON to translate:\n${JSON.stringify(fields)}`;
            const aiRes = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
              messages: [{ role: "user", content: promptInput }]
            });
            const rawText = (aiRes && aiRes.response) ? aiRes.response : "";
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              translations = JSON.parse(jsonMatch[0]);
            }
          }
        } catch(e) {
          console.error("Workers AI translation error:", e);
        }

        const finalTranslations = {};
        for (const [key, rawVal] of Object.entries(fields)) {
          if (typeof rawVal !== "string" || !rawVal.trim()) {
            finalTranslations[key] = rawVal || "";
            continue;
          }
          if (rawVal.startsWith("http://") || rawVal.startsWith("https://")) {
            finalTranslations[key] = rawVal;
            continue;
          }

          let translated = translations[key];
          if (translated && typeof translated === "string" && !/[?띠럾?-??/.test(translated)) {
            finalTranslations[key] = postProcessDomainTerms(translated);
          } else {
            // Free-form fields should remain empty if AI translation fails or contains Korean
            finalTranslations[key] = "";
          }
        }

        return new Response(JSON.stringify({ ok: true, translations: finalTranslations }), { status: 200, headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message || "Translation processing error" }), { status: 200, headers: corsHeaders });
      }
    }

    // 3.5 Shared Data Sync Endpoint (POST /sync)
    const isSyncReq = url.pathname === "/sync" || url.pathname === "/sync/" || url.pathname.endsWith("/sync") || (jsonBody && (jsonBody.action === "sync_events" || jsonBody.action === "sync_members" || jsonBody.action === "sync_history" || jsonBody.action === "sync_fellowship" || jsonBody.action === "sync_data"));
    if (isSyncReq) {
      if (!env.AUTH_SESSION_SECRET) {
        return new Response(JSON.stringify({ error: "Server Configuration Error: AUTH_SESSION_SECRET missing." }), { status: 500, headers: corsHeaders });
      }
      if (!bearerToken) {
        return new Response(JSON.stringify({ error: "Unauthorized: Missing authentication token." }), { status: 401, headers: corsHeaders });
      }
      const payload = await verifyHMACSessionToken(bearerToken, env.AUTH_SESSION_SECRET);
      if (!payload || payload.role !== "admin") {
        return new Response(JSON.stringify({ error: "Forbidden: Admin privileges required." }), { status: 403, headers: corsHeaders });
      }

      const action = jsonBody ? jsonBody.action : "";
      let repoPath = "";
      let commitData = null;
      let commitMessage = "";

      if (action === "sync_events") {
        repoPath = "data/events.json";
        commitData = jsonBody.events || [];
        commitMessage = "Sync shared calendar events data";
      } else if (action === "sync_members") {
        repoPath = "data/members.json";
        commitData = jsonBody.members || [];
        commitMessage = "Sync shared member directory data and translations";
      } else if (action === "sync_history") {
        repoPath = "data/history.json";
        commitData = jsonBody.history || [];
        commitMessage = "Sync shared gospel history timeline data and translations";
      } else if (action === "sync_fellowship") {
        repoPath = "data/fellowship.json";
        commitData = jsonBody.fellowship || [];
        commitMessage = "Sync shared fellowship and ministry activity data";
      }

      if (repoPath && commitData) {
        const githubPat = env.GITHUB_PAT || env.GITHUB_TOKEN;
        if (!githubPat) {
          return new Response(JSON.stringify({ error: "Server Configuration Error: GITHUB_PAT missing." }), { status: 500, headers: corsHeaders });
        }

        const githubApiUrl = `https://api.github.com/repos/wjdgns131/ethiopia_gospel_archive/contents/${repoPath}`;
        let commitSuccess = false;
        let lastErrorMsg = "";

        for (let attempt = 0; attempt < 3; attempt++) {
          let sha = "";
          try {
            const getRes = await fetch(githubApiUrl, {
              headers: {
                "Authorization": `Bearer ${githubPat}`,
                "User-Agent": "Ethiopia-Archive-Worker",
                "Accept": "application/vnd.github.v3+json"
              }
            });
            if (getRes.ok) {
              const getData = await getRes.json();
              sha = getData.sha || "";
            }
          } catch(e) {}

          const jsonStr = JSON.stringify(commitData, null, 2);
          const uint8 = new TextEncoder().encode(jsonStr);
          let binary = "";
          for (let i = 0; i < uint8.byteLength; i++) {
            binary += String.fromCharCode(uint8[i]);
          }
          const base64Content = btoa(binary);

          const commitBody = {
            message: commitMessage,
            content: base64Content,
            branch: "main"
          };
          if (sha) commitBody.sha = sha;

          const putRes = await fetch(githubApiUrl, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${githubPat}`,
              "Content-Type": "application/json",
              "User-Agent": "Ethiopia-Archive-Worker",
              "Accept": "application/vnd.github.v3+json"
            },
            body: JSON.stringify(commitBody)
          });

          if (putRes.ok) {
            commitSuccess = true;
            break;
          }

          const errTxt = await putRes.text();
          lastErrorMsg = errTxt;

          if (putRes.status === 409 || putRes.status === 422) {
            await new Promise(r => setTimeout(r, 500));
            continue;
          } else {
            break;
          }
        }

        if (!commitSuccess) {
          return new Response(JSON.stringify({ error: `GitHub Sync Failed: ${lastErrorMsg}` }), { status: 502, headers: corsHeaders });
        }

        return new Response(JSON.stringify({ ok: true, synced: true }), { status: 200, headers: corsHeaders });
      }

      return new Response(JSON.stringify({ error: "Bad Request: Invalid sync action or payload." }), { status: 400, headers: corsHeaders });
    }

    // 4. Image Upload Proxy Endpoint (Requires Valid Admin Session Token)
    try {
      if (!env.AUTH_SESSION_SECRET) {
        return new Response(JSON.stringify({ error: "Server Configuration Error: AUTH_SESSION_SECRET missing." }), { status: 500, headers: corsHeaders });
      }

      if (!bearerToken) {
        return new Response(JSON.stringify({ error: "Unauthorized: Missing authentication token." }), { status: 401, headers: corsHeaders });
      }

      const payload = await verifyHMACSessionToken(bearerToken, env.AUTH_SESSION_SECRET);
      if (!payload) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid or expired token." }), { status: 401, headers: corsHeaders });
      }

      if (payload.role !== "admin") {
        return new Response(JSON.stringify({ error: "Forbidden: Admin privileges required." }), { status: 403, headers: corsHeaders });
      }

      // Parse Multipart Form Data
      const formData = await request.formData();
      const file = formData.get("file");
      const historyId = formData.get("historyId") || "hist-general";

      if (!file || !(file instanceof File)) {
        return new Response(JSON.stringify({ error: "Bad Request: Missing image file." }), { status: 400, headers: corsHeaders });
      }

      // File Size Limit Check (Max 15MB)
      const MAX_BYTES = 15 * 1024 * 1024;
      if (file.size > MAX_BYTES) {
        return new Response(JSON.stringify({ error: `File size exceeds 15MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB).` }), { status: 400, headers: corsHeaders });
      }

      // Allowed MIME Type Verification
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        return new Response(JSON.stringify({ error: `Unsupported file type: ${file.type}` }), { status: 400, headers: corsHeaders });
      }

      // Generate Collision-Proof Filename
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:T.]/g, "").substring(0, 14); // YYYYMMDDHHMMSS
      const randomHash = Math.random().toString(36).substring(2, 6);
      const extOverride = formData.get("extOverride");
      const extMatch = file.name.match(/\.[a-zA-Z0-9]+$/);
      const ext = extOverride || (extMatch ? extMatch[0].toLowerCase() : ".jpg");
      const cleanHistoryId = String(historyId).replace(/[^a-zA-Z0-9_-]/g, "");
      const normalizedId = cleanHistoryId.startsWith("hist-") ? cleanHistoryId.substring(5) : cleanHistoryId;

      const subFolder = formData.get("subFolder");
      const contentType = formData.get("contentType") || "history";
      let folderPath = "images/history";
      let filePrefix = "hist";
      if (contentType === "fellowship") {
        folderPath = "images/fellowship";
        filePrefix = "fel";
      } else if (subFolder === "highres" || subFolder === "original" || subFolder === "thumb") {
        folderPath = `images/history/${subFolder}`;
      }


      const filename = `${filePrefix}-${normalizedId}-${timestamp}-${randomHash}${ext}`;
      const repoPath = `${folderPath}/${filename}`;

      // Convert Original File ArrayBuffer to Base64 for GitHub API
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binaryString = "";
      for (let i = 0; i < uint8Array.byteLength; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
      }
      const base64Content = btoa(binaryString);

      // Commit Original Image to GitHub Repository via REST API
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

      // Return Relative Path for Frontend Storage
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

