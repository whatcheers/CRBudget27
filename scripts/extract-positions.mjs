import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagesPath = resolve(repoRoot, 'book/pages.json');
const outPath = resolve(repoRoot, 'book/positions.json');

const pages = JSON.parse(await readFile(pagesPath, 'utf8'));

// Find the Positions chapter page (the one starting with "POSITIONS" all caps).
const idx = pages.findIndex((p) => p.trimStart().startsWith('POSITIONS\nOne full-time equivalent'));
if (idx < 0) {
  console.error('Could not locate Positions table page.');
  process.exit(1);
}

const lines = pages[idx].split('\n').map((l) => l.trim()).filter(Boolean);

// Each row: "<Dept Name> <FY25> <FY26> <FY27> <Change>"
// Numbers may include decimal and commas. Stop at "Total FTEs" line.
const ROW_RE = /^([A-Za-z][A-Za-z &']+?)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,()-]+)\s*$/;

const rows = [];
for (const l of lines) {
  // Skip narrative bullets.
  if (l.startsWith('•') || l.startsWith('FY 20') || /Total FTEs|Total$|Funds Total/.test(l) || /Department Name/.test(l)) continue;
  const m = ROW_RE.exec(l);
  if (!m) continue;
  const [, name, fy25, fy26, fy27] = m;
  rows.push({ name: name.trim(), fy25: parseFloat(fy25.replace(/,/g, '')), fy26: parseFloat(fy26.replace(/,/g, '')), fy27: parseFloat(fy27.replace(/,/g, '')) });
}

await writeFile(outPath, JSON.stringify(rows, null, 2), 'utf8');
console.log(`Parsed ${rows.length} departments from Positions table:`);
for (const r of rows) console.log(`  ${r.name.padEnd(28)} FY27: ${r.fy27}`);
