// Netlify Function: proxy Umami Cloud API so the admin can show stats inline.
// The API key stays server-side (Netlify env var UMAMI_API_KEY) — never exposed to the browser.
// Set UMAMI_API_KEY in Netlify → Site settings → Environment variables.

const WEBSITE_ID = "b47339d6-c2d4-42f9-bfed-19a95a9ffc48";
const API = "https://api.umami.is/v1";

function json(statusCode, body) {
    return {
        statusCode,
        headers: { "content-type": "application/json", "cache-control": "no-store" },
        body: JSON.stringify(body),
    };
}

exports.handler = async (event) => {
    const key = process.env.UMAMI_API_KEY;
    if (!key) return json(500, { error: "UMAMI_API_KEY env var is not set in Netlify." });

    const range = (event.queryStringParameters && event.queryStringParameters.range) || "7d";
    const days = range === "30d" ? 30 : range === "24h" ? 1 : 7;
    const endAt = Date.now();
    const startAt = endAt - days * 24 * 60 * 60 * 1000;

    const headers = { "x-umami-api-key": key, accept: "application/json" };
    const base = `${API}/websites/${WEBSITE_ID}`;
    const qs = `startAt=${startAt}&endAt=${endAt}`;

    try {
        const [statsR, urlsR, refsR] = await Promise.all([
            fetch(`${base}/stats?${qs}`, { headers }),
            fetch(`${base}/metrics?${qs}&type=url&limit=8`, { headers }),
            fetch(`${base}/metrics?${qs}&type=referrer&limit=8`, { headers }),
        ]);
        if (!statsR.ok) {
            return json(statsR.status, { error: "Umami API error", detail: await statsR.text() });
        }
        const stats = await statsR.json();
        const urls = urlsR.ok ? await urlsR.json() : [];
        const refs = refsR.ok ? await refsR.json() : [];
        return json(200, { range, days, stats, urls, refs });
    } catch (e) {
        return json(502, { error: "Failed to reach Umami API", detail: String(e) });
    }
};
