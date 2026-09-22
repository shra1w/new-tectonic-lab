// -----------------------------------------------------------------------------
// Branded syllabus-PDF generator for TECHTONIC LAB.
//
// Renders one light-theme, on-brand PDF per course (Data Analytics, Data Science
// and SAP) from the SAME source of truth the website uses — `courseDetail` in
// src/lib/courses.js — so the downloadable syllabus can never drift from the
// live syllabus page. Output lands in public/syllabi/<slug>.pdf.
//
// Run:  node scripts/generate-syllabi.mjs
// Needs: google-chrome (system) + puppeteer-core (devDependency).
// -----------------------------------------------------------------------------

import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const { courseDetail } = await import(new URL("../src/lib/courses.js", import.meta.url));

// --- Brand (mirrors src/lib/site.js `brand`; stable build-time constants) -----
const BRAND = {
  name: "TECHTONIC LAB",
  tagline: "Unlocking Potential · IT Training Institute in Nagpur",
  phone: "+91 87660 69947",
  email: "admin@techtoniccorporate.com",
  website: "techtoniccorporate.com",
  address:
    "SAI NIT-JIT Plaza, 3rd Floor, Beltarodi Road, Manish Nagar, Somalwada, Nagpur 440037",
};

const COLORS = {
  acid: "#EAFD56",
  acidDeep: "#C9DE2F",
  olive: "#5c6b07", // darkened acid, readable on white
  oliveSoft: "#7c8a1e",
  ink: "#0F0F11",
  ink2: "#33333a",
  paper: "#ffffff",
  paperAlt: "#f6f7f1",
  line: "#e6e7de",
  grayText: "#565964",
};

// --- Per-course summary meta (mirrors src/lib/site.js `courses`) ---------------
const META = {
  "data-analytics-course": {
    name: "Data Analytics",
    fullName: "Data Analyst Course in Nagpur",
    code: "TL-DA-001",
    fee: "₹49,999",
    feeNote: "all-inclusive · 3 instalments",
    duration: "6 months",
    level: "Beginner to intermediate",
    mode: "Classroom / Online / Weekend",
    accentTag: "Most enrolled track",
  },
  "data-science-course": {
    name: "Data Science",
    fullName: "Data Science Course in Nagpur",
    code: "TL-DS-001",
    fee: "₹89,999",
    feeNote: "all-inclusive · 3 instalments",
    duration: "9 months",
    level: "Intermediate",
    mode: "Classroom / Online / Weekend",
    accentTag: "Advanced AI track",
  },
  "sap-course": {
    name: "SAP S/4HANA",
    fullName: "SAP Course in Nagpur",
    code: "TL-SAP-001",
    fee: "₹49,999",
    feeNote: "per module · all-inclusive",
    duration: "4 months / module",
    level: "Beginner to intermediate",
    mode: "Classroom / Online / Weekend",
    accentTag: "Highest demand",
  },
};

const ORDER = ["data-analytics-course", "data-science-course", "sap-course"];

// --- Assets -------------------------------------------------------------------
const logoB64 = readFileSync(resolve(ROOT, "public/logo.png")).toString("base64");
const LOGO = `data:image/png;base64,${logoB64}`;

// --- Helpers ------------------------------------------------------------------
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const chip = (t) => `<span class="chip">${esc(t)}</span>`;

function factCard(label, value) {
  return `<div class="fact"><div class="fact-k">${esc(label)}</div><div class="fact-v">${esc(value)}</div></div>`;
}

function moduleBlock(m) {
  const topics = m.topics
    .map((t) => `<li><span class="tick">✓</span><span>${esc(t)}</span></li>`)
    .join("");
  const tools = (m.tools || [])
    .filter((t) => t && t !== "—")
    .map(chip)
    .join("");
  return `
  <article class="mod">
    <div class="mod-head">
      <div class="mod-id">${esc(m.n)}</div>
      <div class="mod-title-wrap">
        <h3 class="mod-title">${esc(m.title)}</h3>
        <div class="mod-hours">⏱ ${esc(m.hours)}</div>
      </div>
    </div>
    <div class="mod-body">
      <div class="mod-topics">
        <div class="eyebrow">Topics</div>
        <ul class="ticklist">${topics}</ul>
      </div>
      <div class="mod-side">
        ${tools ? `<div class="eyebrow">Tools</div><div class="chips">${tools}</div>` : ""}
        <div class="eyebrow mt">You finish with</div>
        <p class="mod-project">${esc(m.project)}</p>
      </div>
    </div>
  </article>`;
}

function projectCard(p) {
  return `
  <article class="proj">
    <h4 class="proj-title">${esc(p.title)}</h4>
    <p class="proj-body">${esc(p.body)}</p>
    <div class="proj-meta">
      <div><span class="proj-k">Tools</span> ${esc((p.tools || []).join(", "))}</div>
      ${p.dataset ? `<div><span class="proj-k">Dataset</span> ${esc(p.dataset)}</div>` : ""}
    </div>
  </article>`;
}

function careerRows(careers = []) {
  return careers
    .map(
      (c) =>
        `<tr><td class="role">${esc(c.role)}</td><td>${esc(c.entry)}</td><td>${esc(c.mid)}</td></tr>`
    )
    .join("");
}

function buildHtml(slug) {
  const d = courseDetail[slug];
  const m = META[slug];
  const totalTopics = d.modules.reduce((n, x) => n + x.topics.length, 0);
  const allTools = [
    ...new Set(d.modules.flatMap((x) => x.tools).filter((t) => t && t !== "—")),
  ];

  const facts = [
    factCard("Duration", m.duration),
    factCard("Fee", `${m.fee}`),
    factCard("Mode", m.mode),
    factCard("Level", m.level),
    factCard("Modules", String(d.modules.length)),
    factCard("Topics", String(totalTopics)),
    factCard("Tools", String(allTools.length)),
    factCard("Projects", String(d.projects.length)),
  ].join("");

  const modules = d.modules.map(moduleBlock).join("");
  const projects = d.projects.map(projectCard).join("");
  const toolPills = allTools.map(chip).join("");
  const careers = careerRows(d.careers);

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<style>
  :root { --acid:${COLORS.acid}; --acid-deep:${COLORS.acidDeep}; --olive:${COLORS.olive};
          --ink:${COLORS.ink}; --ink2:${COLORS.ink2}; --paper:${COLORS.paper};
          --paper-alt:${COLORS.paperAlt}; --line:${COLORS.line}; --gray:${COLORS.grayText}; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Helvetica Neue", Arial, "Liberation Sans", system-ui, sans-serif;
    color: var(--ink); background: var(--paper);
    font-size: 10.2px; line-height: 1.5; -webkit-font-smoothing: antialiased;
  }
  .wrap { padding: 0 15mm; }

  /* faint repeating watermark */
  .watermark {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    display: flex; align-items: center; justify-content: center;
  }
  .watermark img { width: 118mm; opacity: 0.035; filter: grayscale(1); }
  .content { position: relative; z-index: 1; }

  h1,h2,h3,h4 { margin: 0; font-weight: 800; letter-spacing: -0.02em; }
  p { margin: 0; }

  .eyebrow { font-size: 8px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--olive); }
  .eyebrow.mt { margin-top: 9px; }

  /* ---------------- COVER ---------------- */
  .cover { position: relative; padding: 16mm 15mm 12mm; }
  .cover-tag {
    display: inline-block; background: var(--ink); color: var(--acid);
    font-size: 8.5px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase;
    padding: 5px 11px; border-radius: 999px;
  }
  .cover h1 { font-size: 40px; line-height: 1.02; margin: 14px 0 6px; }
  .cover .full { font-size: 13px; font-weight: 700; color: var(--ink2); }
  .cover .summary { margin-top: 12px; max-width: 158mm; color: var(--gray); font-size: 10.8px; line-height: 1.6; }
  .accent-rule { height: 6px; width: 62mm; margin: 16px 0 0; border-radius: 6px;
    background: linear-gradient(90deg, var(--acid), var(--acid-deep)); }

  .facts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; margin-top: 16px; }
  .fact { border: 1px solid var(--line); border-radius: 10px; padding: 9px 10px; background: var(--paper-alt); }
  .fact-k { font-size: 7.6px; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase; color: var(--olive); }
  .fact-v { font-size: 12.5px; font-weight: 800; margin-top: 3px; color: var(--ink); }

  .cover-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; }
  .meta-line { border-left: 3px solid var(--acid-deep); padding: 2px 0 2px 9px; }
  .meta-line .mk { font-size: 8px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--olive); }
  .meta-line .mv { font-size: 10px; color: var(--ink2); margin-top: 1px; }

  .feepill { display:inline-flex; align-items: baseline; gap: 8px; margin-top: 16px;
    background: var(--ink); color: #fff; border-radius: 12px; padding: 11px 16px; }
  .feepill .amt { font-size: 22px; font-weight: 800; color: var(--acid); letter-spacing: -0.02em; }
  .feepill .note { font-size: 9px; color: #cfd0c6; }

  /* ---------------- SECTIONS ---------------- */
  .section { padding: 9mm 15mm 0; }
  .section-title { font-size: 18px; margin: 0 0 2px; }
  .section-intro { color: var(--gray); font-size: 9.6px; margin: 3px 0 11px; max-width: 165mm; }

  .chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px; }
  .chip { display: inline-block; border: 1px solid var(--line); background: #fff;
    border-radius: 999px; padding: 3px 9px; font-size: 8.6px; font-weight: 600; color: var(--ink2); }

  .toolwrap .chip { background: var(--paper-alt); }

  /* modules */
  .mod { border: 1px solid var(--line); border-radius: 12px; padding: 11px 13px 12px;
    margin-bottom: 8px; background: #fff; break-inside: avoid; }
  .mod-head { display: flex; align-items: center; gap: 11px; padding-bottom: 9px; border-bottom: 1px solid var(--line); }
  .mod-id { font-size: 17px; font-weight: 800; color: #fff; background: var(--ink);
    width: 30px; height: 30px; border-radius: 8px; display:flex; align-items:center; justify-content:center;
    box-shadow: inset 0 0 0 2px var(--acid-deep); flex: 0 0 auto; }
  .mod-title { font-size: 13px; }
  .mod-hours { font-size: 8.6px; color: var(--gray); margin-top: 2px; }
  .mod-body { display: grid; grid-template-columns: 1.45fr 1fr; gap: 14px; margin-top: 10px; }
  .ticklist { list-style: none; margin: 5px 0 0; padding: 0; }
  .ticklist li { display: flex; gap: 6px; align-items: flex-start; margin-bottom: 4px; font-size: 9.4px; color: var(--ink2); }
  .tick { color: var(--olive); font-weight: 800; font-size: 9px; line-height: 1.5; flex: 0 0 auto; }
  .mod-project { font-size: 9.2px; color: var(--gray); margin-top: 5px; line-height: 1.5; }

  /* projects */
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .proj { border: 1px solid var(--line); border-radius: 12px; padding: 11px 13px; background: var(--paper-alt); break-inside: avoid; }
  .proj-title { font-size: 11.5px; }
  .proj-body { font-size: 9.2px; color: var(--gray); margin-top: 5px; line-height: 1.5; }
  .proj-meta { margin-top: 8px; font-size: 8.8px; color: var(--ink2); display: grid; gap: 2px; }
  .proj-k { font-weight: 800; color: var(--olive); text-transform: uppercase; letter-spacing: 0.1em; font-size: 7.6px; margin-right: 5px; }

  /* careers */
  .careers { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 9.4px; break-inside: avoid; }
  .careers th { text-align: left; font-size: 7.8px; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--olive); padding: 6px 8px; border-bottom: 2px solid var(--ink); }
  .careers td { padding: 7px 8px; border-bottom: 1px solid var(--line); color: var(--ink2); }
  .careers td.role { font-weight: 700; color: var(--ink); }
  .careers tr:nth-child(even) td { background: var(--paper-alt); }

  /* closing */
  .closing { margin: 10mm 15mm 0; background: var(--ink); color: #fff; border-radius: 14px; padding: 15px 18px;
    display: flex; justify-content: space-between; align-items: center; gap: 14px; break-inside: avoid; }
  .closing h3 { font-size: 14px; color: #fff; }
  .closing p { font-size: 9px; color: #c9cabf; margin-top: 4px; }
  .closing .cta { background: var(--acid); color: var(--ink); font-weight: 800; font-size: 10px;
    padding: 9px 14px; border-radius: 10px; white-space: nowrap; }
  .closing .contact { font-size: 8.6px; color: var(--acid); margin-top: 6px; font-weight: 700; }

  .spacer { height: 6mm; }
</style></head>
<body>
  <div class="watermark"><img src="${LOGO}" alt=""/></div>
  <div class="content">

    <!-- COVER -->
    <section class="cover">
      <span class="cover-tag">${esc(m.accentTag)}</span>
      <h1>${esc(m.name)}<br/>Course Syllabus</h1>
      <div class="full">${esc(m.fullName)}</div>
      <div class="accent-rule"></div>
      <p class="summary">${esc(d.summary)}</p>

      <div class="facts">${facts}</div>

      <div class="cover-meta">
        <div class="meta-line"><div class="mk">Prerequisites</div><div class="mv">${esc(d.prerequisites)}</div></div>
        <div class="meta-line"><div class="mk">Certification</div><div class="mv">${esc(d.certification)}</div></div>
        <div class="meta-line"><div class="mk">Language</div><div class="mv">${esc(d.language)}</div></div>
        <div class="meta-line"><div class="mk">Course code</div><div class="mv">${esc(m.code)}</div></div>
      </div>

      <div class="feepill"><span class="amt">${esc(m.fee)}</span><span class="note">${esc(m.feeNote)}</span></div>
    </section>

    <!-- TOOLS -->
    <section class="section toolwrap">
      <div class="eyebrow">Tool stack</div>
      <h2 class="section-title">Everything you will touch</h2>
      <p class="section-intro">Named in full — a syllabus that says only “BI tools” is hiding something.</p>
      <div class="chips">${toolPills}</div>
    </section>

    <!-- MODULES -->
    <section class="section">
      <div class="eyebrow">Module by module</div>
      <h2 class="section-title">The whole thing, in order</h2>
      <p class="section-intro">Modules run in this sequence deliberately — each one assumes the last.</p>
      ${modules}
    </section>

    <!-- PROJECTS -->
    <section class="section">
      <div class="eyebrow">Portfolio</div>
      <h2 class="section-title">The projects you leave with</h2>
      <p class="section-intro">Documented, reviewed and defended out loud — the part of the syllabus that gets you interviews.</p>
      <div class="grid2">${projects}</div>
    </section>

    ${
      careers
        ? `<!-- CAREERS -->
    <section class="section">
      <div class="eyebrow">Where it leads</div>
      <h2 class="section-title">Roles &amp; indicative salaries</h2>
      <table class="careers">
        <thead><tr><th>Role</th><th>Entry (per year)</th><th>Mid-level (per year)</th></tr></thead>
        <tbody>${careers}</tbody>
      </table>
    </section>`
        : ""
    }

    <!-- CLOSING -->
    <div class="closing">
      <div>
        <h3>Compare this syllabus against anyone in Nagpur.</h3>
        <p>Classroom, online &amp; weekend batches · individual project reviews · placement preparation included.</p>
        <div class="contact">${esc(BRAND.phone)} &nbsp;·&nbsp; ${esc(BRAND.email)} &nbsp;·&nbsp; ${esc(BRAND.website)}</div>
      </div>
      <div class="cta">Book a free consultation</div>
    </div>
    <div class="spacer"></div>

  </div>
</body></html>`;
}

function headerTemplate(slug) {
  const m = META[slug];
  return `
  <div style="width:100%; font-family: 'Helvetica Neue', Arial, sans-serif; -webkit-print-color-adjust: exact;
              padding: 0 15mm; box-sizing: border-box;">
    <div style="display:flex; align-items:center; justify-content:space-between;
                border-bottom:1.5px solid ${COLORS.acidDeep}; padding-bottom:5px;">
      <div style="display:flex; align-items:center; gap:7px;">
        <img src="${LOGO}" style="width:16px; height:16px; border-radius:4px;"/>
        <span style="font-size:9px; font-weight:800; letter-spacing:0.12em; color:${COLORS.ink};">${BRAND.name}</span>
      </div>
      <span style="font-size:7.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:${COLORS.olive};">
        ${esc(m.name)} · Syllabus
      </span>
    </div>
  </div>`;
}

function footerTemplate() {
  return `
  <div style="width:100%; font-family: 'Helvetica Neue', Arial, sans-serif; -webkit-print-color-adjust: exact;
              padding: 0 15mm; box-sizing: border-box;">
    <div style="display:flex; align-items:center; justify-content:space-between;
                border-top:1px solid ${COLORS.line}; padding-top:5px; font-size:7px; color:${COLORS.grayText};">
      <span>${BRAND.website} &nbsp;·&nbsp; ${BRAND.phone}</span>
      <span>© ${new Date().getFullYear()} ${BRAND.name} · Skillcloud Solutions Pvt. Ltd.</span>
      <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>
  </div>`;
}

async function main() {
  const outDir = resolve(ROOT, "public/syllabi");
  mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  for (const slug of ORDER) {
    const page = await browser.newPage();
    await page.setContent(buildHtml(slug), { waitUntil: "load" });
    await page.pdf({
      path: resolve(outDir, `${slug}.pdf`),
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate(slug),
      footerTemplate: footerTemplate(),
      margin: { top: "20mm", bottom: "16mm", left: "0mm", right: "0mm" },
    });
    await page.close();
    console.log(`✓ public/syllabi/${slug}.pdf`);
  }

  await browser.close();
}

export { buildHtml, META, ORDER };

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
