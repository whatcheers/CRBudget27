// One-shot: read src/data.ts, drop ftes, splice in book/new-entries.ts.txt, rewrite.
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = resolve(repoRoot, 'src/data.ts');
const entriesPath = resolve(repoRoot, 'book/new-entries.ts.txt');

const src = await readFile(dataPath, 'utf8');
const entriesRaw = await readFile(entriesPath, 'utf8');

// Strip the leading comment lines (start with //) from the entries file.
const entries = entriesRaw
  .split('\n')
  .filter((l, i, arr) => {
    // keep all lines except the leading comment block
    if (i < 3 && (l.startsWith('//') || l.trim() === '')) return false;
    return true;
  })
  .join('\n')
  .trimEnd();

// Build new lucide-react import. Union of original + new icons.
const ICON_NAMES = [
  'ShieldCheck', 'Flame', 'Wrench', 'Leaf', 'Droplets', 'Recycle', 'Bus', 'Plane',
  'Building2', 'Landmark', 'Waves', 'Activity',
  // From new entries:
  'BookOpen', 'Briefcase', 'Building', 'CircleParking', 'Clock', 'CloudRain',
  'DollarSign', 'FileText', 'Flag', 'Hammer', 'Heart', 'Lightbulb', 'MapPin',
  'Music', 'PawPrint', 'PiggyBank', 'Radio', 'RotateCw', 'Scale', 'Shield',
  'Signpost', 'Snowflake', 'Sprout', 'Theater', 'TrafficCone', 'Trash2',
  'TrendingUp', 'Truck', 'Users',
];
const importLine = `import { \n  ${[...new Set(ICON_NAMES)].sort().join(', ')}\n} from 'lucide-react';`;

// 1. Replace the original import block.
let out = src.replace(/^import \{[\s\S]*?\} from 'lucide-react';/m, importLine);

// 2. Drop every `ftes: ...,` line including its trailing newline.
out = out.replace(/[ \t]*ftes:\s*[\d.]+,[ \t]*\r?\n/g, '');

// 3. Splice the 41 new entries before the LAST `};` in the file.
const lastClose = out.lastIndexOf('};');
if (lastClose === -1) throw new Error('Could not find closing }; in data.ts');
// Find the matching `}` line above it (the last entry's closing brace).
const before = out.slice(0, lastClose);
const after = out.slice(lastClose);
out = before.trimEnd() + ',\n' + entries + '\n' + after;

await writeFile(dataPath, out, 'utf8');
console.log(`Wrote ${out.length.toLocaleString()} chars to src/data.ts`);
