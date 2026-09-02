// Generates one static case-study HTML page per project that has a `caseStudy`
// field in data/proof-data.json. Mirrors the gen_cv.js pattern: read data, render
// from a shared template, write plain static files — no server/build step needed,
// and each output page gets its own <title>/og:image/og:description so shared
// links (WhatsApp, LinkedIn) preview correctly instead of showing generic meta.
//
// Usage: node gen_case_studies.js
// Re-run any time data/proof-data.json's `caseStudy` fields change, then commit
// the generated output folders like any other static asset.

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const DATA_PATH = path.join(ROOT, "data", "proof-data.json");
const TEMPLATE_PATH = path.join(ROOT, "templates", "case-study.template.html");

const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
const template = fs.readFileSync(TEMPLATE_PATH, "utf8");

// project id -> output folder slug (clean URL, e.g. /evermos/ not /project/?id=proj-evermos)
const SLUGS = {
  "proj-jbtb-casting": "casting-jbtb",
  "proj-evermos": "evermos",
  "proj-core-initiative": "core-initiative",
  "proj-nobel": "nobel-akademi",
  "proj-cms": "cms-project",
  "proj-ypkb": "ypkb",
  "proj-groomy": "groomy",
};

// project id -> i18n key namespace (short, stable — used as "cs.<ns>.field" keys in
// i18n.js so case-study body content actually translates on language toggle).
const NS = {
  "proj-jbtb-casting": "jbtb",
  "proj-evermos": "evermos",
  "proj-core-initiative": "core",
  "proj-nobel": "nobel",
  "proj-cms": "cms",
  "proj-ypkb": "ypkb",
  "proj-groomy": "groomy",
};

function esc(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderChecklist(items, ns) {
  return (items || [])
    .map((t, i) => `            <li><span class="msym">check_circle</span><span data-i18n="cs.${ns}.step${i}">${esc(t)}</span></li>`)
    .join("\n");
}

function renderScreens(screens, ns) {
  return (screens || [])
    .map(
      (s, i) => `        <div class="cs-screen glass-card">
            <div class="cs-screen-head"><span class="msym">${esc(s.icon || "dashboard")}</span><h4 data-i18n="cs.${ns}.screen${i}Title">${esc(s.title)}</h4></div>
            <p data-i18n="cs.${ns}.screen${i}Desc">${esc(s.desc)}</p>
            ${s.images && s.images[0] ? `<img src="${esc(s.images[0])}" alt="${esc(s.title)}" loading="lazy">` : ""}
        </div>`
    )
    .join("\n");
}

function renderHero(heroImage, title) {
  if (heroImage) {
    return `            <img src="${esc(heroImage)}" alt="${esc(title)} screenshot" fetchpriority="high">`;
  }
  return `            <div class="cs-hero--placeholder">
                <span class="msym">photo_camera</span>
                <span class="cs-hero-label" data-i18n="cs.screenshotSoon">Screenshot coming soon</span>
            </div>`;
}

function renderLinks(item) {
  const buttons = [];
  if (item.github) {
    buttons.push(`            <a href="${esc(item.github)}" target="_blank" rel="noopener" class="cs-link-btn"><i class="devicon-github-original colored"></i> ${esc(item["github-label"] || "GitHub")}</a>`);
  }
  if (item.youtube) {
    buttons.push(`            <a href="${esc(item.youtube)}" target="_blank" rel="noopener" class="cs-link-btn"><span class="msym">play_circle</span> ${esc(item["youtube-label"] || "YouTube")}</a>`);
  }
  if (item.instagram) {
    buttons.push(`            <a href="${esc(item.instagram)}" target="_blank" rel="noopener" class="cs-link-btn"><span class="msym">photo_camera</span> ${esc(item["instagram-label"] || "Instagram")}</a>`);
  }
  if (item.link && !item.github && !item.youtube) {
    buttons.push(`            <a href="${esc(item.link)}" target="_blank" rel="noopener" class="cs-link-btn"><span class="msym">open_in_new</span> ${esc(item["link-label"] || "View")}</a>`);
  }
  if (!buttons.length) return "";
  return `        <div class="cs-links">\n${buttons.join("\n")}\n        </div>`;
}

function renderTechChips(tags) {
  return (tags || [])
    .map((t) => `            <span class="skill-chip">${esc(t)}</span>`)
    .join("\n");
}

let built = 0;
let skipped = [];

for (const item of data.projects || []) {
  if (!item.caseStudy) {
    skipped.push(item.id);
    continue;
  }
  const slug = SLUGS[item.id];
  if (!slug) {
    console.warn(`No output slug mapped for "${item.id}" — add it to SLUGS in gen_case_studies.js. Skipping.`);
    continue;
  }
  const ns = NS[item.id];
  if (!ns) {
    console.warn(`No i18n namespace mapped for "${item.id}" — add it to NS in gen_case_studies.js. Skipping.`);
    continue;
  }

  const cs = item.caseStudy;
  const heroImage = (item.images && item.images[0]) || "";
  const ogUrl = `https://fakrul.netlify.app/${slug}/`;

  let html = template
    .replace(/{{NS}}/g, ns)
    .replace(/{{TITLE}}/g, esc(item.title))
    .replace(/{{META_DESCRIPTION}}/g, esc(item.desc))
    .replace(/{{OG_IMAGE}}/g, heroImage ? `https://fakrul.netlify.app/${heroImage.replace("../", "")}` : "https://fakrul.netlify.app/image/og-image.webp")
    .replace(/{{OG_URL}}/g, ogUrl)
    .replace(/{{PROJECT_TITLE}}/g, esc(item.title))
    .replace(/{{PROJECT_SUMMARY}}/g, esc(item.desc))
    .replace(/{{PROJECT_LINKS}}/g, renderLinks(item))
    .replace(/{{HERO_BLOCK}}/g, renderHero(heroImage ? heroImage.replace("../", "/") : "", item.title))
    .replace(/{{WHY_BUILT}}/g, esc(cs.whyBuilt))
    .replace(/{{GOAL}}/g, esc(cs.goal))
    .replace(/{{OVERVIEW_ROLE}}/g, esc(cs.overview?.role))
    .replace(/{{OVERVIEW_PERIOD}}/g, esc(cs.overview?.period))
    .replace(/{{OVERVIEW_TYPE}}/g, esc(cs.overview?.type))
    .replace(/{{OVERVIEW_ARCH}}/g, esc(cs.overview?.architecture))
    .replace(/{{WHAT_IT_DOES}}/g, renderChecklist(cs.whatItDoes, ns))
    .replace(/{{SCREENS}}/g, renderScreens(cs.screens, ns))
    .replace(/{{TECH_CHIPS}}/g, renderTechChips(item.tags))
    .replace(/{{TECH_NOTE}}/g, esc(cs.techNote));

  const outDir = path.join(ROOT, slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`Generated /${slug}/index.html (from ${item.id})`);
  built++;
}

console.log(`\nDone. ${built} case study page(s) generated.`);
if (skipped.length) console.log(`Skipped (no "caseStudy" data yet): ${skipped.join(", ")}`);
