import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { PDFParse } from 'pdf-parse';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pdfPath = resolve(repoRoot, process.env.BUDGET_PDF_PATH ?? './FY 2027 Council Book.pdf');
const outDir = resolve(repoRoot, 'book');
await mkdir(outDir, { recursive: true });

const buf = await readFile(pdfPath);
const parser = new PDFParse({ data: new Uint8Array(buf) });
const result = await parser.getText();
await parser.destroy();

const pages = result.pages.map((p) => p.text);

const joined = pages.map((p, i) => `\n\n===== PAGE ${i + 1} =====\n${p}`).join('');
await writeFile(resolve(outDir, 'raw.txt'), joined, 'utf8');
await writeFile(resolve(outDir, 'pages.json'), JSON.stringify(pages), 'utf8');

console.log(`Wrote ${pages.length} pages, ${joined.length.toLocaleString()} chars to book/raw.txt`);
