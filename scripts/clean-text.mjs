import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagesPath = resolve(repoRoot, 'book/pages.json');
const outPath = resolve(repoRoot, 'book/clean.txt');
const reportPath = resolve(repoRoot, 'book/clean-report.json');

const pages = JSON.parse(await readFile(pagesPath, 'utf8'));

// 1. Drop image-only / very low text pages.
const MIN_CHARS = 80;
const dropped = [];

// 2. Identify repeating header/footer lines (appear on many pages, near top or bottom).
const lineCounts = new Map();
for (const p of pages) {
  const lines = p.split('\n').map((l) => l.trim()).filter(Boolean);
  const probe = [...lines.slice(0, 3), ...lines.slice(-3)];
  for (const l of probe) lineCounts.set(l, (lineCounts.get(l) ?? 0) + 1);
}
const REPEAT_THRESHOLD = Math.max(5, Math.floor(pages.length * 0.2));
const repeating = new Set(
  [...lineCounts.entries()].filter(([, c]) => c >= REPEAT_THRESHOLD).map(([l]) => l)
);

// 3. Drop page-number / footer lines.
const isPageNumber = (l) => {
  const t = l.trim();
  if (/^(?:page\s+)?\d{1,4}(?:\s*\/\s*\d{1,4})?$/i.test(t)) return true;
  // "148 FISCAL YEAR 2027 BUDGET | CITY OF CEDAR RAPIDS, IOWA"
  if (/^\d{1,4}\s+FISCAL\s+YEAR\s+\d{4}\s+BUDGET\b/i.test(t)) return true;
  if (/^FISCAL\s+YEAR\s+\d{4}\s+BUDGET\b.*\d{1,4}\s*$/i.test(t)) return true;
  return false;
};

const cleanedPages = pages.map((p, idx) => {
  const lines = p.split('\n');
  const kept = lines.filter((l) => {
    const t = l.trim();
    if (!t) return true; // preserve blank lines for structure
    if (repeating.has(t)) return false;
    if (isPageNumber(t)) return false;
    return true;
  });
  const text = kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  if (text.length < MIN_CHARS) {
    dropped.push({ page: idx + 1, chars: text.length });
    return null;
  }
  return { page: idx + 1, text };
});

const out = cleanedPages
  .filter(Boolean)
  .map(({ page, text }) => `\n\n===== PAGE ${page} =====\n${text}`)
  .join('');

await writeFile(outPath, out, 'utf8');
await writeFile(
  reportPath,
  JSON.stringify({
    inputPages: pages.length,
    droppedPages: dropped,
    repeatingLinesRemoved: [...repeating],
    outputChars: out.length,
  }, null, 2),
  'utf8'
);

console.log(
  `Kept ${pages.length - dropped.length}/${pages.length} pages; ` +
  `removed ${repeating.size} repeating lines; ` +
  `output ${out.length.toLocaleString()} chars.`
);
