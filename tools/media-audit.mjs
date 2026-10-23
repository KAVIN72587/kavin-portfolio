// Media audit for the portfolio site.
// Usage: node tools/media-audit.mjs            -> writes media-audit.md at the repo root
// Reports: empty "drop image" slots, broken media references, images missing alt,
// images reused across many pages, and asset files no page uses.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'Portfolio redesign and SEO structure');
const OUT = join(ROOT, 'media-audit.md');
const MEDIA_EXT = /\.(png|jpe?g|webp|avif|gif|svg|ico|mp4|webm|mov|pdf)$/i;
const REUSE_LIMIT = 3;

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const p = join(dir, name);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

const files = walk(SITE);
const pages = files.filter((f) => f.endsWith('.html'));
const mediaFiles = files.filter((f) => MEDIA_EXT.test(f) && f.includes(join(SITE, 'assets')));

const toUrl = (file) => {
  const rel = relative(SITE, file).split('\\').join('/');
  return '/' + rel.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '/');
};
const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const slots = [];      // { page, label, project }
const broken = [];     // { page, ref }
const noAlt = [];      // { page, src }
const usage = new Map(); // site path -> Set(page urls)

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const page = toUrl(file);

  // 1. Empty placeholder slots: striped div with a "— drop image" label.
  const slotRe = /repeating-linear-gradient\(135deg[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/g;
  let m;
  while ((m = slotRe.exec(html))) {
    const label = stripTags(m[1]).replace(/\s*—\s*drop image\s*$/i, '');
    const after = html.slice(m.index, m.index + 2500);
    const title = after.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/);
    slots.push({ page, label, project: title ? stripTags(title[1]) : '' });
  }

  // 2. Collect every media reference (src, srcset, href to media, poster, CSS url(), meta content).
  const refs = new Set();
  for (const r of html.matchAll(/\b(?:src|poster|href|content)\s*=\s*"([^"]+)"/g)) refs.add(r[1]);
  for (const r of html.matchAll(/\bsrcset\s*=\s*"([^"]+)"/g))
    r[1].split(',').forEach((part) => refs.add(part.trim().split(/\s+/)[0]));
  for (const r of html.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) refs.add(r[1]);
  // Quoted media paths anywhere else, e.g. JSON-LD "logo"/"image" fields.
  for (const r of html.matchAll(/"((?:https?:\/\/[^"\s]+)?\/[^"\s<>]+)"/g)) refs.add(r[1]);

  for (let ref of refs) {
    ref = ref.replace(/^https?:\/\/(www\.)?kavinarulraj\.com/i, '');
    if (/^(https?:|data:|mailto:|tel:|#)/i.test(ref)) continue;
    const clean = decodeURI(ref.split(/[?#]/)[0]);
    if (!MEDIA_EXT.test(clean)) continue;
    const sitePath = clean.startsWith('/') ? clean : posix.join(posix.dirname(page), clean);
    if (!existsSync(join(SITE, sitePath))) broken.push({ page, ref });
    if (!usage.has(sitePath)) usage.set(sitePath, new Set());
    usage.get(sitePath).add(page);
  }

  // 3. <img> tags without meaningful alt text.
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    const alt = img[0].match(/\balt\s*=\s*"([^"]*)"/);
    if (!alt || !alt[1].trim()) {
      const src = (img[0].match(/\bsrc\s*=\s*"([^"]+)"/) || [])[1] || '(no src)';
      noAlt.push({ page, src });
    }
  }
}

// 4. Images reused on many pages (excluding site chrome like logo/og/favicons).
const chrome = /logo|favicon|og-default|apple-touch/i;
const reused = [...usage].filter(([p, s]) => s.size > REUSE_LIMIT && !chrome.test(p))
  .sort((a, b) => b[1].size - a[1].size);

// 5. Asset files no page references.
const orphans = mediaFiles.map((f) => '/' + relative(SITE, f).split('\\').join('/'))
  .filter((p) => !usage.has(p));

// ---- Report ----
const byPage = Object.groupBy(slots, (s) => s.page);
const L = [];
L.push(`# Media audit`, ``, `Generated ${new Date().toISOString().slice(0, 10)} by \`node tools/media-audit.mjs\`.`, ``);
L.push(`| Check | Count |`, `|---|---|`,
  `| Empty image slots ("drop image") | ${slots.length} |`,
  `| Broken media references | ${broken.length} |`,
  `| Images missing alt text | ${noAlt.length} |`,
  `| Images reused on >${REUSE_LIMIT} pages | ${reused.length} |`,
  `| Unused files in /assets | ${orphans.length} |`, ``);

L.push(`## 1. Empty image slots — media to add`, ``);
if (!slots.length) L.push(`None.`, ``);
for (const [page, list] of Object.entries(byPage).sort((a, b) => b[1].length - a[1].length)) {
  L.push(`### ${page} (${list.length})`, ``, `| Project / section | Image needed |`, `|---|---|`);
  list.forEach((s) => L.push(`| ${s.project || '—'} | ${s.label} |`));
  L.push(``);
}

L.push(`## 2. Broken media references`, ``);
L.push(broken.length ? broken.map((b) => `- ${b.page} → \`${b.ref}\``).join('\n') : `None.`, ``);

L.push(`## 3. Images missing alt text`, ``);
L.push(noAlt.length ? noAlt.map((n) => `- ${n.page} → \`${n.src}\``).join('\n') : `None.`, ``);

L.push(`## 4. Images reused on more than ${REUSE_LIMIT} pages`, ``,
  `Same picture on many pages reads as filler — consider page-specific work.`, ``);
L.push(reused.length ? reused.map(([p, s]) => `- \`${p}\` — ${s.size} pages: ${[...s].slice(0, 6).join(', ')}${s.size > 6 ? ', …' : ''}`).join('\n') : `None.`, ``);

L.push(`## 5. Unused files in /assets`, ``);
L.push(orphans.length ? orphans.map((o) => `- \`${o}\``).join('\n') : `None.`, ``);

writeFileSync(OUT, L.join('\n'));
console.log(`Slots ${slots.length} · broken ${broken.length} · no-alt ${noAlt.length} · reused ${reused.length} · orphans ${orphans.length}`);
console.log(`Report: ${OUT}`);
