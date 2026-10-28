// Image-gap audit: for every page, count content images and find long text-only stretches.
// Usage: node tools/image-gap-audit.mjs   -> writes image-gaps.md at the repo root

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'Portfolio redesign and SEO structure');
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(SITE).filter((f) => f.endsWith('.html') && !/404|thank-you|privacy/.test(f));
const toUrl = (f) => '/' + relative(SITE, f).split('\\').join('/').replace(/index\.html$/, '').replace(/\.html$/, '/');
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const rows = [];
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0];
  const imgs = [...main.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((m) => m[1]).filter((s) => !/logo-mark/.test(s));
  const bgs = [...main.matchAll(/url\('?(\/assets\/[^')]+)'?\)/g)].map((m) => m[1]);
  const slots = (main.match(/drop image/g) || []).length;
  const words = strip(main).split(' ').length;
  // longest run of words between two images (or page start/end)
  const parts = main.split(/<img\b[^>]*>|url\('?\/assets\//);
  const longest = Math.max(...parts.map((p) => strip(p).split(' ').length));
  const sections = (main.match(/<section\b/g) || []).length;
  const h1 = strip((main.match(/<h1[\s\S]*?<\/h1>/) || [''])[0]);
  rows.push({ url: toUrl(f), type: toUrl(f).startsWith('/blog/') && toUrl(f) !== '/blog/' ? 'blog' : toUrl(f).startsWith('/areas/') ? 'area' : 'page',
    images: imgs.length + bgs.length, slots, words, longest, sections, h1 });
}

const by = (t) => rows.filter((r) => r.type === t);
const fmt = (r) => `| ${r.url} | ${r.images} | ${r.slots || ''} | ${r.words} | ${r.longest} | ${r.h1.slice(0, 60)} |`;
const head = '| Page | Images | Empty slots | Words | Longest text run | Heading |\n|---|---|---|---|---|---|';
const L = ['# Image gap analysis', '', `Generated ${new Date().toISOString().slice(0, 10)} by \`node tools/image-gap-audit.mjs\`.`, '',
  '"Longest text run" = most words in a row with no image. Over ~600 reads as a wall of text.', ''];
for (const [t, title] of [['page', 'Main and service pages'], ['area', 'Area pages'], ['blog', 'Blog posts']]) {
  const list = by(t).sort((a, b) => a.images - b.images || b.longest - a.longest);
  L.push(`## ${title} (${list.length})`, '', `No images: **${list.filter((r) => r.images === 0).length}** · 1 image: **${list.filter((r) => r.images === 1).length}** · 2+ images: **${list.filter((r) => r.images >= 2).length}**`, '', head, ...list.map(fmt), '');
}
writeFileSync(join(ROOT, 'image-gaps.md'), L.join('\n'));
for (const t of ['page', 'area', 'blog']) {
  const list = by(t);
  console.log(t, 'total', list.length, '| 0 imgs', list.filter((r) => r.images === 0).length, '| 1 img', list.filter((r) => r.images === 1).length, '| 2+', list.filter((r) => r.images >= 2).length, '| text run >600', list.filter((r) => r.longest > 600).length);
}
console.log('\nPages and areas with 0-1 images:');
rows.filter((r) => r.type !== 'blog' && r.images <= 1).forEach((r) => console.log(' ', r.url, r.images, 'imgs,', r.words, 'words, longest run', r.longest));
