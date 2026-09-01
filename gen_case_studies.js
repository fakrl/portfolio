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
  "proj-evermos": "evermos",
  "proj-core-initiative": "core-initiative",
  "proj-nobel": "nobel-akademi",
};

function esc(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderChecklist(items) {
  return (items || [])
    .map((t) => `            <li><span class="msym">check_circle</span>${esc(t)}</li>`)
    .join("\n");
}

function renderScreens(screens) {
  return (screens || [])
    .map(
      (s) => `        <div class="cs-screen glass-card visible">
            <div class="cs-screen-head"><span class="msym">${esc(s.icon || "dashboard")}</span><h4>${esc(s.title)}</h4></div>
            <p>${esc(s.desc)}</p>
            ${s.images && s.images[0] ? `<img src="${esc(s.images[0])}" alt="${esc(s.title)}" loading="lazy">` : ""}
        </div>`
    )
    .join("\n");
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

  const cs = item.caseStudy;
  const heroImage = (item.images && item.images[0]) || "";
  const ogUrl = `https://fakrul.netlify.app/${slug}/`;

  let html = template
    .replace(/{{TITLE}}/g, esc(item.title))
    .replace(/{{META_DESCRIPTION}}/g, esc(item.desc))
    .replace(/{{OG_IMAGE}}/g, heroImage ? `https://fakrul.netlify.app/${heroImage.replace("../", "")}` : "https://fakrul.netlify.app/image/og-image.webp")
    .replace(/{{OG_URL}}/g, ogUrl)
    .replace(/{{PROJECT_TITLE}}/g, esc(item.title))
    .replace(/{{PROJECT_SUMMARY}}/g, esc(item.desc))
    .replace(/{{HERO_IMAGE}}/g, esc(heroImage.replace("../", "/")))
    .replace(/{{WHY_BUILT}}/g, esc(cs.whyBuilt))
    .replace(/{{GOAL}}/g, esc(cs.goal))
    .replace(/{{OVERVIEW_ROLE}}/g, esc(cs.overview?.role))
    .replace(/{{OVERVIEW_PERIOD}}/g, esc(cs.overview?.period))
    .replace(/{{OVERVIEW_TYPE}}/g, esc(cs.overview?.type))
    .replace(/{{OVERVIEW_ARCH}}/g, esc(cs.overview?.architecture))
    .replace(/{{WHAT_IT_DOES}}/g, renderChecklist(cs.whatItDoes))
    .replace(/{{SCREENS}}/g, renderScreens(cs.screens))
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
