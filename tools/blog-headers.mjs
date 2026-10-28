// Blog header images: downloads each post's Unsplash photo, grades it to the site's dark warm look and writes
//   assets/blog/<slug>.webp      1600x900 header shown under the post title
//   assets/blog/og/<slug>.jpg    1200x630 social share image (og:image, twitter:image, JSON-LD image)
// Source map: blog-plan/queue/header-photos.json. Originals and CREDITS.md go to image-sources/blog-headers/.
// Usage: node tools/blog-headers.mjs [--sheet out.jpg] [slug ...]   (no slugs = all; existing outputs are rebuilt)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'Portfolio redesign and SEO structure');
const SRC = join(ROOT, 'image-sources', 'blog-headers', 'photos');
const MAP = JSON.parse(readFileSync(join(ROOT, 'blog-plan', 'queue', 'header-photos.json'), 'utf8'));
for (const d of [SRC, join(SITE, 'assets', 'blog', 'og')]) mkdirSync(d, { recursive: true });

const args = process.argv.slice(2);
const sheetAt = args.indexOf('--sheet');
const sheet = sheetAt >= 0 ? args.splice(sheetAt, 2)[1] : null;
const slugs = args.length ? args : Object.keys(MAP).filter((k) => !k.startsWith('_'));

// Soft edge vignette so photos sit into the dark page instead of ending in a bright edge.
const vignette = (w, h) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><radialGradient id="v" cx="50%" cy="45%" r="75%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".38"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#v)"/></svg>`);

const grade = async (input, w, h, pos) => {
  const base = await sharp(input).rotate().resize(w, h, { fit: 'cover', position: pos || 'attention' })
    .modulate({ saturation: 0.86, brightness: 0.97 })
    .recomb([[1.03, 0.02, 0], [0.01, 1.0, 0.01], [0, 0.02, 0.95]]) // slight warm cast, matches the site's warm greys
    .linear(1.05, -6).toBuffer();
  return sharp(base).composite([{ input: vignette(w, h), blend: 'multiply' }]);
};

const done = [];
for (const slug of slugs) {
  const e = MAP[slug];
  if (!e) { console.log('no entry', slug); continue; }
  let input;
  if (e.file) input = join(SITE, e.file);
  else {
    input = join(SRC, `${slug}.jpg`);
    if (!existsSync(input)) {
      let res;
      for (let t = 0; t < 3 && !res?.ok; t++) res = await fetch(`https://images.unsplash.com/${e.id}?fm=jpg&q=82&w=2000&fit=max`).catch(() => null);
      if (!res?.ok) { console.log('download failed', slug, res?.status); continue; }
      writeFileSync(input, Buffer.from(await res.arrayBuffer()));
    }
    await (await grade(input, 1600, 900, e.pos)).webp({ quality: 80 }).toFile(join(SITE, 'assets', 'blog', `${slug}.webp`));
  }
  await (await grade(input, 1200, 630, e.pos)).jpeg({ quality: 82, mozjpeg: true }).toFile(join(SITE, 'assets', 'blog', 'og', `${slug}.jpg`));
  done.push(slug);
  process.stdout.write('.');
}
console.log(`\n${done.length} built`);

// CREDITS.md for every photo in the map
const credits = Object.entries(MAP).filter(([k, v]) => !k.startsWith('_') && v.id)
  .map(([k, v]) => `| ${k} | ${v.by} | https://unsplash.com/photos/${v.id.replace(/^photo-/, '')} |`);
writeFileSync(join(SRC, 'CREDITS.md'), ['# Blog header photos', '', 'All photos from Unsplash under the Unsplash License (free to use, no permission needed). Graded and cropped by tools/blog-headers.mjs.',
  '', '| Post | Photographer | Source (image id) |', '|---|---|---|', ...credits, ''].join('\n'));

// Optional contact sheet of the 1200x630 versions, 6 across, labelled, for checking every photo by eye
if (sheet) {
  const cw = 300, ch = 158, cols = 6, rows = Math.ceil(done.length / cols);
  const tiles = await Promise.all(done.map(async (slug, i) => {
    const img = await sharp(join(SITE, 'assets', 'blog', 'og', `${slug}.jpg`)).resize(cw, ch).toBuffer();
    const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="18"><rect width="100%" height="100%" fill="#000"/><text x="4" y="13" font-family="Arial" font-size="11" fill="#fff">${i + 1}. ${slug}</text></svg>`);
    return [{ input: img, left: (i % cols) * cw, top: Math.floor(i / cols) * (ch + 18) }, { input: label, left: (i % cols) * cw, top: Math.floor(i / cols) * (ch + 18) + ch }];
  }));
  await sharp({ create: { width: cols * cw, height: rows * (ch + 18), channels: 3, background: '#111' } }).composite(tiles.flat()).jpeg({ quality: 80 }).toFile(sheet);
  console.log('sheet', sheet);
}
