import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagesPath = resolve(repoRoot, 'book/pages.json');
const overridesPath = resolve(repoRoot, 'scripts/section-slugs.json');
const outDir = resolve(repoRoot, 'book/sections');
const reportPath = resolve(repoRoot, 'book/sections-report.json');
await mkdir(outDir, { recursive: true });

for (const f of await readdir(outDir)) await unlink(resolve(outDir, f));

const pages = JSON.parse(await readFile(pagesPath, 'utf8'));
const overrides = JSON.parse(await readFile(overridesPath, 'utf8'));

const isFooter = (s) =>
  /^\s*\d+\s+FISCAL\s+YEAR/i.test(s) || /^FISCAL\s+YEAR/i.test(s) || /^\s*\d{1,4}\s*$/.test(s);

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['']s?\b/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Banner pages are short title pages with a long underscore divider line.
// They appear BETWEEN groups of department sections (Internal Service Funds, Enterprise
// Funds, Capital Improvement Projects, Supplemental, Glossary, etc.) and at the very
// start (Introduction, Property Taxes, ...). A banner truncates the preceding section
// and is itself NOT a department.
const isBanner = (t) => {
  // Banner pages are short title-only pages with an underscore divider.
  // Budget-table pages with the same underscore decoration are 1KB+ of digits.
  if (t.length > 300) return false;
  return /_{20,}/.test(t);
};

// Final department-block end anchor (everything after this is CIP/glossary/etc.).
const isEndAnchor = (t) => {
  if (!isBanner(t)) return false;
  const head = t.slice(0, 250);
  return (
    /^\s*Capital\s+Improvement\s+Projects\b/i.test(head) ||
    /^\s*Supplemental\s+Information\b/i.test(head) ||
    /^\s*Glossary\b/i.test(head)
  );
};

// First end-anchor AFTER we've seen at least one AREA DESCRIPTION.
let cutoff = pages.length;
let seenStart = false;
for (let i = 0; i < pages.length; i++) {
  if (pages[i].trimStart().startsWith('AREA DESCRIPTION')) seenStart = true;
  if (seenStart && isEndAnchor(pages[i])) { cutoff = i; break; }
}

// Restrict regex to the FIRST PARAGRAPH of the page so we don't drift into later prose.
const firstParagraph = (t) => {
  const lines = t.split('\n');
  // Skip the AREA DESCRIPTION header line(s); take everything up to first blank line OR
  // up to a known section header like FINANCIAL SUMMARY / GOALS.
  const out = [];
  let started = false;
  for (const l of lines) {
    if (/^\s*AREA\s+DESCRIPTION\s*$/i.test(l)) { started = true; continue; }
    if (!started) continue;
    if (!l.trim()) {
      if (out.length) break;
      else continue;
    }
    if (/^(FINANCIAL\s+SUMMARY|GOALS|CHALLENGES)\b/i.test(l.trim())) break;
    out.push(l);
  }
  return out.join(' ').replace(/\s+/g, ' ');
};

const NAME_RE = /\bthe\s+([A-Z][A-Za-z0-9&'’\s\-]{1,60}?)\s+(Department|Division|Office|Commission|Bureau|Programs?|business unit|funds|Funds|Agency)\b/;

const starts = [];
for (let i = 0; i < cutoff; i++) {
  const t = pages[i];
  if (!t.trimStart().startsWith('AREA DESCRIPTION')) continue;
  const para = firstParagraph(t);
  const m = NAME_RE.exec(para);
  const rawName = m ? m[1].trim().replace(/\s+/g, ' ') : '';
  const auto = rawName ? slugify(rawName) : `section-${i + 1}`;
  const override = overrides[String(i + 1)];
  starts.push({
    page: i,
    pageNumber: i + 1,
    name: rawName || `(no name match) page ${i + 1}`,
    autoSlug: auto,
    slug: override ?? auto,
    overridden: Boolean(override),
  });
}

// Detect duplicate slugs (after overrides) and warn.
const slugCount = new Map();
for (const s of starts) slugCount.set(s.slug, (slugCount.get(s.slug) ?? 0) + 1);
const dupes = [...slugCount.entries()].filter(([, c]) => c > 1).map(([s]) => s);

const written = [];
for (let i = 0; i < starts.length; i++) {
  const start = starts[i].page;
  let end = starts[i + 1]?.page ?? cutoff;
  // Truncate at the first banner between this start and the next start.
  for (let j = start + 1; j < end; j++) {
    if (isBanner(pages[j])) { end = j; break; }
  }
  const body = pages
    .slice(start, end)
    .join('\n\n')
    .split('\n')
    .filter((l) => !isFooter(l))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const outPath = resolve(outDir, `${starts[i].slug}.txt`);
  await writeFile(outPath, body, 'utf8');
  written.push({
    slug: starts[i].slug,
    name: starts[i].name,
    pageRange: `${start + 1}-${end}`,
    pages: end - start,
    chars: body.length,
    overridden: starts[i].overridden,
  });
}

await writeFile(reportPath, JSON.stringify({ cutoff: cutoff + 1, dupes, starts, written }, null, 2), 'utf8');

console.log(`End anchor at page ${cutoff + 1}; ${starts.length} section starts before it.`);
console.log(`Wrote ${written.length} sections (${written.filter((w) => w.overridden).length} via override map):`);
for (const w of written) {
  const tag = w.overridden ? ' ' : '*';
  console.log(`  ${tag} ${w.slug.padEnd(28)} pages ${w.pageRange.padEnd(7)} ${String(w.pages).padStart(2)}p ${w.chars.toLocaleString().padStart(7)}c  ${w.name}`);
}
if (dupes.length) console.log(`\nWARNING: duplicate slugs: ${dupes.join(', ')}`);
console.log(`\n* = auto slug (no override). Edit scripts/section-slugs.json to lock in a name.`);
