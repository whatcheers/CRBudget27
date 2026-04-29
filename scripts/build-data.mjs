// Generate TypeScript entries for the 41 new departments not already in data.ts.
// Reads book/structured/<slug>.json files, applies an icon/color override map,
// emits valid TS code on stdout. Pipe / paste into src/data.ts.

import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const structuredDir = resolve(repoRoot, 'book/structured');

// Slugs already covered by hand-curated entries in src/data.ts.
const EXISTING = new Set([
  'police', 'fire', 'public-works', 'parks-and-recreation',
  'information-technology', 'water', 'water-pollution-control',
  'solid-waste-and-recycling', 'transit', 'airport',
]);

// camelCase id used as the DEPARTMENTS key.
const idFor = (slug) =>
  slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

// Per-slug overrides: lucide icon name + accent color + light bg.
// Any slug not listed gets the DEFAULT below.
const DEFAULT = { icon: 'Building2', color: '#475569', light: '#f1f5f9' };
const META = {
  'agricultural-lands':       { icon: 'Sprout',         color: '#65a30d', light: '#f7fee7' },
  'amphitheater':             { icon: 'Music',          color: '#7c3aed', light: '#f5f3ff' },
  'animal-control':           { icon: 'PawPrint',       color: '#a16207', light: '#fefce8' },
  'band':                     { icon: 'Music',          color: '#c026d3', light: '#fdf4ff' },
  'bridge-maintenance':       { icon: 'Hammer',         color: '#475569', light: '#f1f5f9' },
  'building-demolition':      { icon: 'Building2',      color: '#94a3b8', light: '#f8fafc' },
  'building-services':        { icon: 'Building',       color: '#0e7490', light: '#ecfeff' },
  'capital-replacement':      { icon: 'RotateCw',       color: '#4338ca', light: '#eef2ff' },
  'cedar-rapids-tourism':     { icon: 'MapPin',         color: '#db2777', light: '#fdf2f8' },
  'cedar-rapids-tourism-2':   { icon: 'MapPin',         color: '#be185d', light: '#fdf2f8' },
  'city-attorney':            { icon: 'Scale',          color: '#1e40af', light: '#eff6ff' },
  'city-clerk':               { icon: 'FileText',       color: '#475569', light: '#f1f5f9' },
  'city-manager':             { icon: 'Briefcase',      color: '#064e3b', light: '#ecfdf5' },
  'civil-rights':             { icon: 'Scale',          color: '#be185d', light: '#fdf2f8' },
  'community-development':    { icon: 'Users',          color: '#7c3aed', light: '#f5f3ff' },
  'contingent':               { icon: 'PiggyBank',      color: '#6b7280', light: '#f3f4f6' },
  'development-services':     { icon: 'Hammer',         color: '#b45309', light: '#fffbeb' },
  'doubletree-powerhouse':    { icon: 'Building',       color: '#4338ca', light: '#eef2ff' },
  'downtown-district':        { icon: 'Landmark',       color: '#4338ca', light: '#eef2ff' },
  'facility-maintenance':     { icon: 'Wrench',         color: '#475569', light: '#f1f5f9' },
  'finance':                  { icon: 'DollarSign',     color: '#166534', light: '#f0fdf4' },
  'fleet-services':           { icon: 'Truck',          color: '#475569', light: '#f1f5f9' },
  'gateway-maintenance':      { icon: 'Signpost',       color: '#65a30d', light: '#f7fee7' },
  'golf':                     { icon: 'Flag',           color: '#15803d', light: '#f0fdf4' },
  'human-resources':          { icon: 'Heart',          color: '#e11d48', light: '#fff1f2' },
  'imon-ice':                 { icon: 'Snowflake',      color: '#0891b2', light: '#ecfeff' },
  'investment-earnings':      { icon: 'TrendingUp',     color: '#15803d', light: '#f0fdf4' },
  'joint-communications':     { icon: 'Radio',          color: '#6d28d9', light: '#f5f3ff' },
  'library':                  { icon: 'BookOpen',       color: '#4f46e5', light: '#eef2ff' },
  'mayor-and-city-council':   { icon: 'Landmark',       color: '#be185d', light: '#fdf2f8' },
  'paramount-theatre':        { icon: 'Theater',        color: '#be185d', light: '#fdf2f8' },
  'parking':                  { icon: 'CircleParking',  color: '#475569', light: '#f1f5f9' },
  'pooled-revenues':          { icon: 'DollarSign',     color: '#166534', light: '#f0fdf4' },
  'risk-services':            { icon: 'Shield',         color: '#b91c1c', light: '#fef2f2' },
  'sanitary-sewer':           { icon: 'Waves',          color: '#0e7490', light: '#ecfeff' },
  'school-crossing-guards':   { icon: 'TrafficCone',    color: '#f59e0b', light: '#fffbeb' },
  'short-term-funding':       { icon: 'Clock',          color: '#94a3b8', light: '#f8fafc' },
  'solid-waste-agency':       { icon: 'Trash2',         color: '#ca8a04', light: '#fefce8' },
  'stormwater':               { icon: 'CloudRain',      color: '#0369a1', light: '#f0f9ff' },
  'street-lighting':          { icon: 'Lightbulb',      color: '#ca8a04', light: '#fefce8' },
  'veterans-memorial':        { icon: 'Flag',           color: '#1e40af', light: '#eff6ff' },
};

const tsString = (s) => `'${String(s).replace(/'/g, "\\'")}'`;

const renderEntry = (id, json, meta) => {
  const stats = (json.stats ?? []).slice(0, 3)
    .map((s) => `      { label: ${tsString(s.label)}, value: ${tsString(s.value)} }`).join(',\n');
  const highlights = (json.highlights ?? []).slice(0, 5)
    .map((h) => `      ${tsString(h)}`).join(',\n');
  const expenses = (json.expenses ?? [])
    .map((e) => `      { name: ${tsString(e.name)}, value: ${e.value} }`).join(',\n');

  return `  ${id}: {
    id: '${id}',
    name: ${tsString(json.name)},
    fundType: ${tsString(json.fundType)},
    budget: ${json.budget},
    icon: ${meta.icon},
    color: '${meta.color}',
    lightColor: '${meta.light}',
    description: ${tsString(json.description)},
    stats: [
${stats}
    ],
    highlights: [
${highlights}
    ],
    expenses: [
${expenses}
    ]
  }`;
};

const files = (await readdir(structuredDir)).filter((f) => f.endsWith('.json'));
const entries = [];
const usedIcons = new Set();

for (const file of files.sort()) {
  const slug = file.replace(/\.json$/, '');
  if (EXISTING.has(slug)) continue;
  const json = JSON.parse(await readFile(resolve(structuredDir, file), 'utf8'));
  const meta = META[slug] ?? DEFAULT;
  usedIcons.add(meta.icon);
  entries.push(renderEntry(idFor(slug), json, meta));
}

const iconImports = [...usedIcons].sort().join(', ');

console.log(`// Auto-appended ${entries.length} entries from book/structured/`);
console.log(`// Add to the lucide-react import in data.ts: ${iconImports}`);
console.log('');
console.log(entries.join(',\n'));
