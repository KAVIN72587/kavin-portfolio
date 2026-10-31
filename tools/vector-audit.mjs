// Vector-image audit: finds site images that are drawn (flat vector art) rather than photographic.
// Usage: node tools/vector-audit.mjs   -> writes vector-tracker.md at the repo root
// Heuristic: photos have many distinct colours and soft gradients; vector art is dominated by a few flat fills.
// Images built from image-sources/<NN>/ that contain a photos/ folder are treated as photo-based.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'Portfolio redesign and SEO structure');
const OUT = join(ROOT, 'vector-tracker.md');

const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(SITE);
const pages = files.filter((f) => f.endsWith('.html'));
const images = files.filter((f) => /\.(webp|jpe?g|png)$/i.test(f) && f.includes(join(SITE, 'assets')) && !/favicon|apple-touch|logo-(512|mark)/.test(f));

// where each image is used
const usedOn = new Map();
for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  const url = '/' + relative(SITE, p).split('\\').join('/').replace(/index\.html$/, '').replace(/\.html$/, '/');
  for (const img of images) {
    const name = basename(img);
    if (html.includes(name)) { if (!usedOn.has(img)) usedOn.set(img, []); usedOn.get(img).push(url); }
  }
}

// which images were rendered from image-sources, and whether that source uses photos
const srcDirs = existsSync(join(ROOT, 'image-sources')) ? readdirSync(join(ROOT, 'image-sources')) : [];
const brief = existsSync(join(ROOT, 'image-brief.md')) ? readFileSync(join(ROOT, 'image-brief.md'), 'utf8') : '';
// Files whose brief line does not name their source folder.
const SOURCE_BY_PREFIX = { 'branding-rebrand-': '06b-rebrands', 'portfolio-noyyal': '01-textile', 'portfolio-chellam': '02-clinic' };
function sourceFor(name) {
  const pre = Object.keys(SOURCE_BY_PREFIX).find((p) => name.startsWith(p));
  if (pre) return SOURCE_BY_PREFIX[pre];
  for (const d of srcDirs) {
    const line = brief.split('\n').find((l) => l.includes(name) && l.includes(`image-sources/${d}`));
    if (line) return d;
  }
  return null;
}

async function flatness(file) {
  const { data } = await sharp(file).resize(160, 160, { fit: 'inside' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const counts = new Map();
  let n = 0;
  for (let i = 0; i < data.length; i += 3) {
    const k = ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3); // 15-bit colour
    counts.set(k, (counts.get(k) || 0) + 1); n++;
  }
  const top = [...counts.values()].sort((a, b) => b - a);
  const top12 = top.slice(0, 12).reduce((s, v) => s + v, 0) / n;
  return { distinct: counts.size, top12 };
}

// Older assets were checked by eye (contact sheets): almost all are photographic mockups.
// Flat UI screen boards (interface designs) are tracked separately from illustrations. The 11 there were
// (Mira Care, Nexora, Tripora, AI Metrics, Flowbase) now sit on real device photos: image-sources/flat-ui.
const FLAT_UI = [];

// A source counts as photo-based when it reads real photos (a photos/ folder, or an existing photo asset).
function photoBased(src) {
  const dir = join(ROOT, 'image-sources', src);
  if (existsSync(join(dir, 'photos'))) return true;
  return readdirSync(dir).filter((f) => /\.(html|mjs)$/.test(f))
    .some((f) => /assets.{1,4}slots|case-study-wedding-film-2/.test(readFileSync(join(dir, f), 'utf8')));
}

const rows = [];
for (const img of images) {
  const name = basename(img);
  const { distinct, top12 } = await flatness(img);
  const src = sourceFor(name);
  let kind;
  if (src) kind = photoBased(src) ? 'photo' : 'vector';
  else kind = FLAT_UI.includes(name.replace(/\.\w+$/, '')) ? 'flat-ui' : 'photo';
  rows.push({ name, pages: usedOn.get(img) || [], distinct, top12, src, kind });
}
rows.sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind.localeCompare(b.kind)));

const pagesCell = (r) => r.pages.length > 6 ? `${r.pages.length} pages` : (r.pages.join(', ') || '(unused)');
const count = (k) => rows.filter((r) => r.kind === k).length;
const L = [];
L.push('# Vector image tracker', '', `Generated ${new Date().toISOString().slice(0, 10)} by \`node tools/vector-audit.mjs\`. Goal: replace drawn (vector) artwork with real free stock photos (Unsplash License). Re-run after each conversion; an image moves to "Photographic" once its source in \`image-sources/\` uses real photos.`, '');
L.push('| Group | Count |', '|---|---|',
  `| ⬜ Drawn / vector, to convert | ${count('vector')} |`,
  `| 🟨 Flat UI screen boards (interface designs, optional) | ${count('flat-ui')} |`,
  `| ✅ Photographic | ${count('photo')} |`, '');
L.push('## ⬜ Drawn images to convert', '', '| Image | Used on | Source | Flat-colour share |', '|---|---|---|---|');
for (const r of rows.filter((r) => r.kind === 'vector')) L.push(`| \`${r.name}\` | ${pagesCell(r)} | \`image-sources/${r.src}\` | ${(r.top12 * 100).toFixed(0)}% |`);
L.push('', '## 🟨 Flat UI screen boards', '', 'Older assets showing app and web screens. The screens are the deliverable, so they are not illustrations; optionally present them on real device photos later.', '', '| Image | Used on |', '|---|---|');
for (const r of rows.filter((r) => r.kind === 'flat-ui')) L.push(`| \`${r.name}\` | ${pagesCell(r)} |`);
L.push('', '## ✅ Photographic', '', '| Image | Used on | Source |', '|---|---|---|');
for (const r of rows.filter((r) => r.kind === 'photo')) L.push(`| \`${r.name}\` | ${pagesCell(r)} | ${r.src ? '`image-sources/' + r.src + '`' : 'older photo mockup'} |`);
writeFileSync(OUT, L.join('\n') + '\n');
console.log(`vector ${count('vector')} · flat-ui ${count('flat-ui')} · photo ${count('photo')}`);
console.log(rows.filter((r) => r.kind === 'vector').map((r) => `  ${r.name}  ${pagesCell(r)}`).join('\n'));
