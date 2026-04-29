import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sectionsDir = resolve(repoRoot, 'book/sections');
const outDir = resolve(repoRoot, 'book/structured');
await mkdir(outDir, { recursive: true });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
  console.error('GEMINI_API_KEY not set. Copy .env.example to .env and add your key.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const MODEL = 'gemini-2.5-flash';

// Load FTE lookup so we can inject the authoritative count into each prompt.
let positions = [];
try {
  positions = JSON.parse(await readFile(resolve(repoRoot, 'book/positions.json'), 'utf8'));
} catch {
  console.warn('book/positions.json not found — run `node scripts/extract-positions.mjs` first to inject FTE counts.');
}
const slugifyName = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/['']s?\b/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const ftesBySlug = new Map();
for (const r of positions) {
  const key = slugifyName(r.name);
  // First-wins: General Fund entries appear before Special Revenue duplicates.
  if (!ftesBySlug.has(key)) ftesBySlug.set(key, r.fy27);
  // Common aliases.
  if (r.name === 'The Eastern Iowa Airport') ftesBySlug.set('airport', r.fy27);
  if (r.name === 'City Council and Mayor') ftesBySlug.set('mayor-and-city-council', r.fy27);
  if (r.name === 'Memorial') ftesBySlug.set('veterans-memorial', r.fy27);
}

const SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    fundType: { type: 'string', description: 'e.g. "General Fund", "Enterprise Fund"' },
    budget: { type: 'number', description: 'Total budget in millions of dollars' },
    ftes: { type: 'number', description: 'Full-time equivalents' },
    description: { type: 'string', description: 'One sentence describing the department' },
    stats: {
      type: 'array',
      items: {
        type: 'object',
        properties: { label: { type: 'string' }, value: { type: 'string' } },
        required: ['label', 'value'],
      },
    },
    highlights: { type: 'array', items: { type: 'string' }, description: '3-5 notable items, budget changes, or achievements' },
    expenses: {
      type: 'array',
      description: 'Expense categories with amounts in millions',
      items: {
        type: 'object',
        properties: { name: { type: 'string' }, value: { type: 'number' } },
        required: ['name', 'value'],
      },
    },
  },
  required: ['name', 'fundType', 'budget', 'ftes', 'description', 'stats', 'highlights', 'expenses'],
};

const onlySlug = process.argv[2];
const files = (await readdir(sectionsDir))
  .filter((f) => f.endsWith('.txt'))
  .filter((f) => !onlySlug || basename(f, '.txt') === onlySlug);

if (!files.length) {
  console.error(onlySlug ? `No section file for slug "${onlySlug}"` : 'No section files found. Run npm run split first.');
  process.exit(1);
}

for (const file of files) {
  const slug = basename(file, '.txt');
  const text = await readFile(resolve(sectionsDir, file), 'utf8');
  const knownFte = ftesBySlug.get(slug);
  const fteHint = knownFte != null
    ? `\n[AUTHORITATIVE FTE for "${slug}" from citywide Positions table = ${knownFte}. Use this value for "ftes".]\n`
    : '';
  const prompt =
    `Extract structured data about a Cedar Rapids city department from the FY27 budget book section below.\n\n` +
    `Rules:\n` +
    `- Numbers must come VERBATIM from the FY 2027 column of the section. Do not estimate, sum across sections, or hallucinate.\n` +
    `- "budget" is the FY 2027 Total Expenditures, in millions, rounded to one decimal (e.g. 52,428,067 -> 52.4).\n` +
    `- "ftes" is the FY 2027 Authorized Position count. Use the value provided in the [AUTHORITATIVE FTE] block if present; otherwise look in the section text and return 0 if not found.\n` +
    `- "expenses" should list the specific named line items with their FY 2027 values in millions. Prefer the granular categories that appear in the FINANCIAL SUMMARY chart or the largest individual rows of the Discretionary Expenses table (e.g. "Salaries", "Benefits", "Fleet/Fuel", "Professional Services", "Facilities/Rent", "Insurance"). Do NOT use rolled-up subtotals like "Personal Services" or "Discretionary Expenses" alone.\n` +
    `- "stats" should be 3-4 operational metrics from the "Did You Know" section, formatted as short labels with compact values like "144K".\n` +
    `- "highlights" should be 4-5 budget-change bullets from "Budget Highlights".\n` +
    `- If a field is genuinely absent, return "" / 0 / [].\n` +
    fteHint +
    `\n--- SECTION (${text.length.toLocaleString()} chars) ---\n${text}`;

  process.stdout.write(`${slug.padEnd(15)} ... `);
  const t0 = Date.now();
  const res = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: { responseMimeType: 'application/json', responseSchema: SCHEMA },
  });
  const json = JSON.parse(res.text);
  await writeFile(resolve(outDir, `${slug}.json`), JSON.stringify(json, null, 2), 'utf8');
  console.log(`${json.name ?? '?'} (${Date.now() - t0}ms)`);
}

console.log(`\nWrote ${files.length} files to book/structured/.`);
