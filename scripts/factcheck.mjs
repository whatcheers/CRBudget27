#!/usr/bin/env node
// Final fact-check + auto-sourcing for FY27 department infographics.
//
// For each dept with `supplementalFY27` in src/data.ts, this script:
//   1. Slices a per-dept section out of book/extracted/FY27_Supplemental_layout.txt.
//   2. For every numeric claim (revenueSources, didYouKnow, notableChanges,
//      totals), picks the best matching source line — token-overlap on the
//      label, then column-by-column dollar match against the claim's value.
//   3. Resolves the line back to a printed PDF page via the layout txt's
//      footer markers ("FISCAL YEAR 2027 BUDGET | ... <page#>").
//   4. Writes a markdown fact-check report to book/factcheck/<slug>.md
//      with each claim's chosen source ("p.78 · 531104 · $805,000")
//      plus alternate grep candidates for review.
//   5. Writes a JSON sources sidecar to src/sources/<deptId>.json that
//      DepartmentDetail.tsx imports to render a citation chip beside each
//      claim in the live infographic.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const DATA_TS = resolve(ROOT, 'src/data.ts');
const STRUCTURED_DIR = resolve(ROOT, 'book/structured');
const EXTRACTED_DIR = resolve(ROOT, 'book/extracted');
const OUT_DIR = resolve(ROOT, 'book/factcheck');
const SOURCES_DIR = resolve(ROOT, 'src/sources');
const LAYOUT_TXT = resolve(EXTRACTED_DIR, 'FY27_Supplemental_layout.txt');
const SOURCE_PDF_LABEL = 'FY27 Adopted Supplemental';

// data.ts dept id  →  { structured JSON slug, per-dept extract slug,
// line range in FY27_Supplemental_layout.txt (1-indexed, inclusive) }
const DEPTS = {
  police:               { slug: 'police',                     extract: 'FY27_police_supplemental.txt',     start: 3716, end: 3857 },
  fire:                 { slug: 'fire',                       extract: 'FY27_fire_supplemental.txt',       start: 2853, end: 3023 },
  publicWorks:          { slug: 'public-works',               extract: 'FY27_PW_supplemental.txt',         start: 3910, end: 4092 },
  parks:                { slug: 'parks-and-recreation',       extract: 'FY27_parks_supplemental.txt',      start: 3554, end: 3715 },
  solidWaste:           { slug: 'solid-waste-and-recycling',  extract: 'FY27_solidwaste_supplemental.txt', start: 5686, end: 5813 },
  airport:              { slug: 'airport',                    extract: 'FY27_airport_supplemental.txt',    start: 5934, end: 6098 },
  doubletreePowerhouse: { slug: 'doubletree-powerhouse',      extract: 'FY27_powerhouse_supplemental.txt', start: 5057, end: 5099 },
  fleetServices:        { slug: 'fleet-services',             extract: 'FY27_fleet_supplemental.txt',      start: 4472, end: 4583 },
  riskServices:         { slug: 'risk-services',              extract: 'FY27_risk_supplemental.txt',       start: 4681, end: 4783 },
};

// ---------------------------------------------------------------------------
// 1. Slice per-dept extracts from the full layout txt if not already present.
// ---------------------------------------------------------------------------
function ensureExtracts(layoutLines) {
  for (const d of Object.values(DEPTS)) {
    const path = resolve(EXTRACTED_DIR, d.extract);
    if (existsSync(path)) continue;
    const slice = layoutLines.slice(d.start - 1, d.end).join('\n') + '\n';
    writeFileSync(path, slice, 'utf8');
    console.log(`  wrote ${d.extract} (${d.end - d.start + 1} lines)`);
  }
}

// ---------------------------------------------------------------------------
// 2. Line → printed PDF page map. Footer pattern:
//    "FISCAL YEAR 2027 BUDGET | CITY OF CEDAR RAPIDS, IOWA            <N>"
//    Footer line is the LAST line of page N. Pages with no printed
//    number get inferred from the previous footer + 1.
// ---------------------------------------------------------------------------
function buildPageMap(lines) {
  const FOOTER = /FISCAL YEAR 2027 BUDGET \| CITY OF CEDAR RAPIDS, IOWA\s*(\d+)?\s*$/;
  const footers = [];
  for (let i = 0; i < lines.length; i++) {
    const m = FOOTER.exec(lines[i]);
    if (m) footers.push({ lineIdx: i, page: m[1] ? parseInt(m[1], 10) : null });
  }
  for (let i = 0; i < footers.length; i++) {
    if (footers[i].page == null) {
      footers[i].page = i === 0 ? 1 : footers[i - 1].page + 1;
    }
  }
  const map = new Array(lines.length + 1).fill(null);
  let prev = -1;
  for (const f of footers) {
    for (let j = prev + 1; j <= f.lineIdx; j++) map[j + 1] = f.page;
    prev = f.lineIdx;
  }
  const tailPage = footers.length ? footers[footers.length - 1].page + 1 : 1;
  for (let j = prev + 1; j < lines.length; j++) map[j + 1] = tailPage;
  return map;
}

// ---------------------------------------------------------------------------
// 3. Parse supplementalFY27 blocks out of src/data.ts.
//    supplementalFY27 contains only literals, so eval is safe.
// ---------------------------------------------------------------------------
function parseSupplementals() {
  const src = readFileSync(DATA_TS, 'utf8');
  const out = {};
  for (const id of Object.keys(DEPTS)) {
    const deptRe = new RegExp(`^  ${id}: \\{$`, 'm');
    const m = deptRe.exec(src);
    if (!m) { console.warn(`  ! no top-level dept block for "${id}"`); continue; }
    const deptStart = m.index;
    const deptEnd = matchBrace(src, src.indexOf('{', deptStart));
    const block = src.slice(deptStart, deptEnd + 1);
    const supIdx = block.indexOf('supplementalFY27:');
    if (supIdx < 0) { console.warn(`  ! no supplementalFY27 for "${id}"`); continue; }
    const objStart = block.indexOf('{', supIdx);
    const objEnd = matchBrace(block, objStart);
    const objText = block.slice(objStart, objEnd + 1);
    out[id] = (new Function(`return (${objText})`))();
  }
  return out;
}
function matchBrace(s, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < s.length; i++) {
    const c = s[i];
    if (c === '"' || c === "'" || c === '`') { i = skipString(s, i); continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  throw new Error('unbalanced braces');
}
function skipString(s, i) {
  const quote = s[i]; i++;
  while (i < s.length) {
    if (s[i] === '\\') { i += 2; continue; }
    if (s[i] === quote) return i;
    i++;
  }
  throw new Error('unterminated string');
}

// ---------------------------------------------------------------------------
// 4. Helpers — tokens, value parsing, line parsing, best-source matching.
// ---------------------------------------------------------------------------
const STOP = new Set(['and','the','of','for','to','in','on','&','-','—','services','service','supplies','supply','revenue','charges','charge','from','with','at','by','de','dept','department','total','net']);
function tokens(label) {
  return label.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 4 && !STOP.has(t));
}
function parseAmount(s) {
  if (!s) return null;
  if (s === '-' || s === '—') return 0;
  const neg = /^\(.+\)$/.test(s);
  const n = Number(s.replace(/[(),$]/g, ''));
  return Number.isFinite(n) ? (neg ? -n : n) : null;
}
// Parse a supplemental table line. The format is:
//   [account#]  Label                                 FY25actual    FY26adopted    FY27req    Change  [pct]
function parseBudgetLine(text) {
  const trimmed = text.replace(/\s+$/, '');
  if (!trimmed.trim()) return null;
  // Strip trailing percent (e.g. "  -13%" or "  2%")
  const pctStripped = trimmed.replace(/\s+-?\d+%\s*$/, '');
  // Trailing numeric columns (2+ spaces between)
  const m = /^(.+?)\s{2,}((?:[-—()$,\d]+\s{2,}){0,4}[-—()$,\d]+)\s*$/.exec(pctStripped);
  if (!m) return null;
  const head = m[1].trim();
  const numTokens = m[2].trim().split(/\s{2,}/);
  const amounts = numTokens.map(parseAmount).filter(n => n != null);
  if (!amounts.length) return null;
  // Optional 6-digit account at start of head
  const headM = /^(\d{6})\s+(.+)$/.exec(head);
  return {
    account: headM ? headM[1] : null,
    label: headM ? headM[2].trim() : head,
    amounts,
  };
}
// Convert a claim value (number in $M or string like "$805K"/"+$440K") to dollars.
function claimDollars(value) {
  if (typeof value === 'number') return value * 1_000_000;
  if (typeof value !== 'string') return null;
  const s = value.replace(/[−–—]/g, '-').replace(/\s/g, '');
  const m = /^([+\-]?)\$?([\d.]+)([KMB]?)$/.exec(s);
  if (!m) return null;
  const sign = m[1] === '-' ? -1 : 1;
  const n = parseFloat(m[2]);
  const mult = m[3] === 'K' ? 1_000 : m[3] === 'M' ? 1_000_000 : m[3] === 'B' ? 1_000_000_000 : 1;
  return sign * n * mult;
}
const fmtMoney = (cents) => {
  const n = Math.abs(cents);
  if (n >= 1_000_000) return `$${(cents / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${Math.round(cents / 1_000).toLocaleString()}K`;
  return `$${cents.toLocaleString()}`;
};
const COL_NAMES = ['FY25 Actual', 'FY26 Adopted', 'FY27 Request', 'Change'];

// Score: best line is the one whose label tokens match AND one of whose
// columns is closest in dollars to the claim value.
function bestSourceLine(extractLines, label, claimValue, opts = {}) {
  const { tolerance = 0.10 } = opts;
  const toks = tokens(label);
  if (!toks.length || claimValue == null) return null;
  const target = Math.abs(claimValue);
  if (target === 0) return null;
  let best = null;
  for (let i = 0; i < extractLines.length; i++) {
    const lower = extractLines[i].toLowerCase();
    const tokenScore = toks.reduce((s, t) => s + (lower.includes(t) ? 1 : 0), 0);
    if (tokenScore === 0) continue;
    const parsed = parseBudgetLine(extractLines[i]);
    if (!parsed) continue;
    for (let c = 0; c < parsed.amounts.length; c++) {
      const v = Math.abs(parsed.amounts[c]);
      if (v === 0) continue;
      const diff = Math.abs(v - target) / target;
      if (diff > tolerance) continue;
      // Composite score: lower diff is better; more token matches breaks ties
      const score = diff - tokenScore * 0.001;
      if (!best || score < best.score) {
        best = { lineIdx: i, parsed, colIdx: c, diff, tokenScore, score };
      }
    }
  }
  return best;
}

// All grep candidates (for the markdown report's alternates list).
function grepLines(extractLines, label, max = 3) {
  const toks = tokens(label);
  if (!toks.length) return [];
  const hits = [];
  for (let i = 0; i < extractLines.length; i++) {
    const lower = extractLines[i].toLowerCase();
    if (toks.some(t => lower.includes(t))) {
      hits.push({ line: i + 1, text: extractLines[i].trimEnd() });
      if (hits.length >= max) break;
    }
  }
  return hits;
}

// Build the small object the app will render and the report will cite.
function buildSource(best, deptInfo, pageMap) {
  if (!best) return null;
  const layoutLine = deptInfo.start + best.lineIdx; // 1-indexed in layout txt
  return {
    page: pageMap[layoutLine] ?? null,
    account: best.parsed.account,
    label: best.parsed.label,
    amount: best.parsed.amounts[best.colIdx],
    amountFormatted: fmtMoney(best.parsed.amounts[best.colIdx]),
    column: COL_NAMES[best.colIdx] || `col ${best.colIdx + 1}`,
    diffPct: +(best.diff * 100).toFixed(2),
    extractLine: best.lineIdx + 1,
    layoutLine,
    document: SOURCE_PDF_LABEL,
  };
}
function citationChip(src) {
  if (!src) return '_(no source matched)_';
  const bits = [`p.${src.page}`];
  if (src.account) bits.push(`acct ${src.account}`);
  bits.push(src.amountFormatted);
  return `**${bits.join(' · ')}**  _${src.column}_`;
}

// ---------------------------------------------------------------------------
// 5. Helpers for cross-checks / report only.
// ---------------------------------------------------------------------------
function loadStructured(slug) {
  const path = resolve(STRUCTURED_DIR, `${slug}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
}
function loadExtract(file) {
  return readFileSync(resolve(EXTRACTED_DIR, file), 'utf8').split('\n');
}
function bestStructuredMatch(label, expenses) {
  if (!expenses?.length) return null;
  const a = new Set(tokens(label));
  if (!a.size) return null;
  let best = null, bestScore = 0;
  for (const e of expenses) {
    const b = new Set(tokens(e.name));
    let score = 0;
    for (const t of a) if (b.has(t)) score++;
    if (score > bestScore) { bestScore = score; best = e; }
  }
  return bestScore > 0 ? best : null;
}
const fmtM = (v) => `$${Number(v).toFixed(2)}M`;
const sumKey = (arr, k='value') => arr.reduce((a, x) => a + Number(x[k] || 0), 0);
const pctDiff = (a, b) => b === 0 ? (a === 0 ? 0 : 100) : Math.abs((a - b) / b) * 100;

// ---------------------------------------------------------------------------
// 6. Per-dept report + sources sidecar.
// ---------------------------------------------------------------------------
function reportFor(id, supp, structured, extract, pageMap) {
  const d = DEPTS[id];
  const L = [];
  const flags = [];
  const sources = {
    deptId: id,
    document: SOURCE_PDF_LABEL,
    pdf: 'book/fy27-adopted/FY27_Adopted_Supplemental.pdf',
    extract: `book/extracted/${d.extract}`,
    totalExpenditures: null,
    totalRevenues: null,
    revenueSources: [],
    expenditureBuckets: [], // bucket-level rollups have no single source line
    didYouKnow: [],
    notableChanges: [],
  };

  L.push(`# Fact Check — ${id} (\`${d.slug}\`)`);
  L.push('');
  L.push(`Source PDF: \`book/fy27-adopted/FY27_Adopted_Supplemental.pdf\` (${SOURCE_PDF_LABEL})`);
  L.push(`Per-dept extract: \`book/extracted/${d.extract}\` (lines ${d.start}–${d.end} of FY27_Supplemental_layout.txt)`);
  L.push(`Structured JSON:  \`book/structured/${d.slug}.json\``);
  L.push(`Hand-curated:     \`src/data.ts\` → \`DEPARTMENTS.${id}.supplementalFY27\``);
  L.push('');

  // ---- Totals & Gap ----
  L.push('## Totals & Gap');
  L.push('');
  const gapMath = supp.totalExpenditures - supp.totalRevenues;
  const gapOk = Math.abs(gapMath - supp.generalFundGap) < 0.05;
  if (!gapOk) flags.push(`gap math off: ${supp.totalExpenditures} − ${supp.totalRevenues} = ${gapMath.toFixed(2)} ≠ ${supp.generalFundGap}`);

  const totExpBest = bestSourceLine(extract, 'Total Expenditures', supp.totalExpenditures * 1_000_000, { tolerance: 0.05 });
  const totRevBest = bestSourceLine(extract, 'Total Revenues', supp.totalRevenues * 1_000_000, { tolerance: 0.05 });
  sources.totalExpenditures = buildSource(totExpBest, d, pageMap);
  sources.totalRevenues = buildSource(totRevBest, d, pageMap);

  L.push(`- [ ] **totalExpenditures** = ${fmtM(supp.totalExpenditures)}  →  ${citationChip(sources.totalExpenditures)}`);
  if (structured?.budget != null) {
    const diff = pctDiff(supp.totalExpenditures, structured.budget);
    if (diff > 5) flags.push(`totalExpenditures (${supp.totalExpenditures}) differs from structured.budget (${structured.budget}) by ${diff.toFixed(1)}%`);
    L.push(`      structured.budget: ${fmtM(structured.budget)} (${diff.toFixed(1)}% diff${diff > 5 ? ' ⚠️' : ''})`);
  }
  L.push(`- [ ] **totalRevenues** = ${fmtM(supp.totalRevenues)}  →  ${citationChip(sources.totalRevenues)}`);
  L.push(`- [ ] **generalFundGap** = ${fmtM(supp.generalFundGap)}  ${gapOk ? '✓ matches expenditures − revenues' : `⚠️ expected ${fmtM(gapMath)}`}`);
  L.push('');

  // ---- Revenue Sources ----
  L.push('## Where the Money Comes From');
  L.push('');
  const revSum = sumKey(supp.revenueSources);
  const revDiff = pctDiff(revSum, supp.totalRevenues);
  if (revDiff > 5) flags.push(`revenueSources sum ${fmtM(revSum)} ≠ totalRevenues ${fmtM(supp.totalRevenues)} (${revDiff.toFixed(1)}% off)`);
  L.push(`Sum check: items total ${fmtM(revSum)} vs totalRevenues ${fmtM(supp.totalRevenues)} (${revDiff.toFixed(1)}% diff)${revDiff > 5 ? ' ⚠️' : ' ✓'}`);
  L.push('');
  for (const r of supp.revenueSources) {
    const best = bestSourceLine(extract, r.name, r.value * 1_000_000);
    const src = buildSource(best, d, pageMap);
    sources.revenueSources.push(src);
    L.push(`- [ ] **${r.name}** — ${fmtM(r.value)}  →  ${citationChip(src)}`);
    const alts = grepLines(extract, r.name);
    for (const h of alts) if (!best || h.line !== best.lineIdx + 1) {
      L.push(`      _alt_ \`L${h.line}\` ${h.text.trim()}`);
    }
  }
  L.push('');

  // ---- Expenditure Buckets ----
  L.push('## Where the Money Goes');
  L.push('');
  const shareSum = supp.expenditureBuckets.reduce((a, b) => a + (b.share || 0), 0);
  const valueSum = sumKey(supp.expenditureBuckets);
  const valueDiff = pctDiff(valueSum, supp.totalExpenditures);
  if (Math.abs(shareSum - 100) > 1) flags.push(`expenditureBuckets shares sum to ${shareSum}%, not 100%`);
  if (valueDiff > 5) flags.push(`expenditureBuckets values sum ${fmtM(valueSum)} ≠ totalExpenditures ${fmtM(supp.totalExpenditures)}`);
  L.push(`Share check: ${shareSum}%${Math.abs(shareSum - 100) > 1 ? ' ⚠️' : ' ✓'}   |   Value check: ${fmtM(valueSum)} vs ${fmtM(supp.totalExpenditures)} (${valueDiff.toFixed(1)}% diff)${valueDiff > 5 ? ' ⚠️' : ' ✓'}`);
  L.push('');
  for (const b of supp.expenditureBuckets) {
    sources.expenditureBuckets.push(null); // bucket totals are roll-ups, not single line items
    L.push(`- [ ] **${b.name}** — ${b.share}%  (${fmtM(b.value)})  _(rollup — no single source line)_`);
  }
  L.push('');

  // ---- Did You Know ----
  L.push('## Did You Know?');
  L.push('');
  if (supp.didYouKnow.length < 6) flags.push(`didYouKnow has only ${supp.didYouKnow.length} items (target: 6+)`);
  for (const item of supp.didYouKnow) {
    const cv = claimDollars(item.value);
    const best = bestSourceLine(extract, item.label, cv);
    const src = buildSource(best, d, pageMap);
    sources.didYouKnow.push(src);
    L.push(`- [ ] **${item.label}** — ${item.value}  →  ${citationChip(src)}`);
    const match = bestStructuredMatch(item.label, structured?.expenses);
    if (match) L.push(`      structured.expenses: \`${match.name}\` = $${match.value}M`);
    const alts = grepLines(extract, item.label);
    for (const h of alts) if (!best || h.line !== best.lineIdx + 1) {
      L.push(`      _alt_ \`L${h.line}\` ${h.text.trim()}`);
    }
  }
  L.push('');

  // ---- Notable Changes ----
  L.push('## Notable Budget Changes');
  L.push('');
  for (const c of supp.notableChanges) {
    const cv = claimDollars(c.delta);
    const best = bestSourceLine(extract, c.name, cv, { tolerance: 0.15 });
    const src = buildSource(best, d, pageMap);
    sources.notableChanges.push(src);
    L.push(`- [ ] **${c.name}** — ${c.delta}  _${c.note}_  →  ${citationChip(src)}`);
    const alts = grepLines(extract, c.name);
    for (const h of alts) if (!best || h.line !== best.lineIdx + 1) {
      L.push(`      _alt_ \`L${h.line}\` ${h.text.trim()}`);
    }
    const highlightHits = (structured?.highlights || []).filter(h =>
      tokens(c.name).some(t => h.toLowerCase().includes(t)));
    for (const h of highlightHits) L.push(`      structured.highlights: ${h}`);
  }
  L.push('');

  // ---- Source coverage summary ----
  const all = [
    sources.totalExpenditures, sources.totalRevenues,
    ...sources.revenueSources, ...sources.didYouKnow, ...sources.notableChanges,
  ];
  const cited = all.filter(s => s != null).length;
  const total = all.length;
  L.push(`## Source Coverage`);
  L.push('');
  L.push(`Auto-sourced ${cited} of ${total} citable claims (${Math.round(cited / total * 100)}%). Unsourced claims are listed above with _(no source matched)_ — verify by hand and adjust the claim wording so its label tokens overlap a source line.`);
  L.push('');

  // ---- Coverage flags ----
  L.push('## Coverage / Auto-Flags');
  L.push('');
  if (flags.length === 0) L.push('_None — all arithmetic and coverage checks passed._');
  else for (const f of flags) L.push(`- ⚠️ ${f}`);
  L.push('');

  return { md: L.join('\n'), flags, sources, cited, total };
}

// ---------------------------------------------------------------------------
// 7. Main
// ---------------------------------------------------------------------------
function main() {
  const onlyArg = process.argv[2];
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  if (!existsSync(SOURCES_DIR)) mkdirSync(SOURCES_DIR, { recursive: true });

  const layoutLines = readFileSync(LAYOUT_TXT, 'utf8').split('\n');
  const pageMap = buildPageMap(layoutLines);
  console.log('Slicing per-dept extracts...');
  ensureExtracts(layoutLines);
  console.log('Parsing supplementalFY27 from data.ts...');
  const supps = parseSupplementals();

  const summary = [];
  for (const id of Object.keys(DEPTS)) {
    if (onlyArg && id !== onlyArg && DEPTS[id].slug !== onlyArg) continue;
    const supp = supps[id];
    if (!supp) continue;
    const d = DEPTS[id];
    const structured = loadStructured(d.slug);
    const extract = loadExtract(d.extract);
    const { md, flags, sources, cited, total } = reportFor(id, supp, structured, extract, pageMap);

    writeFileSync(resolve(OUT_DIR, `${d.slug}.md`), md, 'utf8');
    writeFileSync(resolve(OUT_DIR, `${d.slug}.sources.json`), JSON.stringify(sources, null, 2), 'utf8');
    writeFileSync(resolve(SOURCES_DIR, `${id}.json`), JSON.stringify(sources, null, 2), 'utf8');
    console.log(`  ${d.slug.padEnd(30)} ${cited}/${total} sourced  ${flags.length} flag${flags.length === 1 ? '' : 's'}`);
    summary.push({ id, slug: d.slug, flags: flags.length, cited, total });
  }

  const idx = [
    '# FY27 Infographic Fact-Check',
    '',
    `Generated by \`npm run factcheck\`. Each report puts every \`supplementalFY27\` claim next to its auto-derived source citation (PDF page · account # · amount), the corresponding value from \`book/structured/<slug>.json\`, and alternate matching lines from \`book/extracted/FY27_Supplemental_layout.txt\`. Tick checkboxes as you verify; edit \`src/data.ts\` where claims don't trace.`,
    '',
    'Sources are also written to `src/sources/<deptId>.json` and consumed by `DepartmentDetail.tsx` to render a small citation chip beside each claim in the live infographic.',
    '',
    '| Department | Report | Sourced | Auto-flags |',
    '|---|---|---|---|',
    ...summary.map(s => `| \`${s.id}\` | [${s.slug}.md](${s.slug}.md) | ${s.cited}/${s.total} | ${s.flags === 0 ? '✓' : `⚠️ ${s.flags}`} |`),
    ''
  ].join('\n');
  writeFileSync(resolve(OUT_DIR, 'README.md'), idx, 'utf8');
  console.log(`\nWrote ${summary.length} reports + index + sources sidecars`);
}

main();
