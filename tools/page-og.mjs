// Share images for the main pages: each page's own photo plus its headline, in the site's style, 1200x630.
// Writes assets/og/<slug>.jpg and points og:image, twitter:image, og:image:alt and the JSON-LD image at it.
// Skips the home page, blog index, privacy and blog posts (blog posts have their own, see blog-plan/queue/header-image.js).
// Usage: node tools/page-og.mjs [page.html ...]   (paths relative to the site folder; no args = every main page)

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'Portfolio redesign and SEO structure');
const OUT = join(SITE, 'assets', 'og');
const WORK = join(ROOT, 'image-sources', 'og');
mkdirSync(OUT, { recursive: true }); mkdirSync(WORK, { recursive: true });

const OG_DEFAULT = 'https://kavinarulraj.com/assets/og-default.jpg';
const SKIP = /^(index|blog|privacy|404|thank-you)\.html$|^blog[\\/]/;
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? (n === 'assets' ? [] : walk(p)) : [p]; });
const args = process.argv.slice(2);
const pages = (args.length ? args.map((a) => join(SITE, a)) : walk(SITE).filter((f) => f.endsWith('.html')))
  .filter((f) => !SKIP.test(relative(SITE, f)) && readFileSync(f, 'utf8').includes(OG_DEFAULT) || args.length);

const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const data = [];
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  const main = html.match(/<main[\s\S]*<\/main>/)[0];
  const h1 = main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1];
  // headline keeps the site's serif word: <span ...>word</span> becomes <em>word</em>, all other markup dropped
  const h1html = h1.replace(/<span[^>]*>/g, '\u0001').replace(/<\/span>/g, '\u0002').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    .replace(/\u0001\s*/g, '<em>').replace(/\s*\u0002/g, '</em>');
  const at = main.indexOf('<h1');
  const eyebrow = text((main.slice(Math.max(0, at - 600), at).match(/<p[^>]*IBM Plex Mono[^>]*>([\s\S]*?)<\/p>\s*$/) || ['', ''])[1]).replace(/^Silo \d+ · /, '');
  // the page's most representative photo: its band, else the first content image or background
  const imgs = [...main.matchAll(/(?:src="|url\(')(\/assets\/[^"')]+\.(?:webp|jpg|png))/g)].map((m) => m[1]).filter((s) => !/logo-mark|logo-512/.test(s));
  const img = imgs.find((s) => /-band\.webp$/.test(s)) || imgs[0];
  if (!img) { console.log('no image, skipped', relative(SITE, f)); continue; }
  const slug = relative(SITE, f).replace(/\\/g, '/').replace(/\.html$/, '').replace(/\//g, '-');
  data.push({ file: f, slug, img, h1: h1html, eyebrow: eyebrow || 'Kavin Arulraj · Chennai', alt: text(h1) });
}

// one template, each page's data embedded, rendered by tools/render-image.mjs
const tpl = readFileSync(join(ROOT, 'tools', 'page-og.html'), 'utf8');
// the 2:1 page bands carry price cards at their edges; share images use a clean render of the same photo instead
const BANDS = { website: 'website-design-cost-chennai', lowcost: 'low-cost-website-design-chennai', logo: 'logo-design-cost-chennai', brochure: 'brochure-design-cost-chennai',
  video: 'video-editing-charges-chennai', youtube: 'youtube-video-editing-chennai', freelancer: 'freelancer-vs-agency-chennai', pricing: 'pricing', contact: 'contact', hire: 'hire-me',
  about: 'about', areas: 'areas', tnagar: 'areas-t-nagar', adyar: 'areas-adyar', annanagar: 'areas-anna-nagar', guindy: 'areas-guindy-nungambakkam', velachery: 'areas-velachery-omr' };
for (const d of data) {
  const band = Object.keys(BANDS).find((k) => d.img === `/assets/slots/${BANDS[k]}-band.webp`);
  if (band) {
    const clean = join(WORK, `${BANDS[band]}-clean.webp`);
    if (!existsSync(clean)) execFileSync('node', [join(ROOT, 'tools', 'render-image.mjs'), join(ROOT, 'image-sources', 'pages', 'page-images.html'), clean, '1600', '800', `${band}-clean`], { stdio: 'ignore' });
    d.src = `../og/${BANDS[band]}-clean.webp`;
  }
}
writeFileSync(join(WORK, 'og.html'), tpl.replace('/*DATA*/[]', JSON.stringify(data.map(({ slug, img, src, h1, eyebrow }) => ({ slug, img: src || '../../Portfolio redesign and SEO structure' + img, h1, eyebrow })))));
for (const d of data) {
  const png = join(WORK, `${d.slug}.webp`);
  execFileSync('node', [join(ROOT, 'tools', 'render-image.mjs'), join(WORK, 'og.html'), png, '1200', '630', d.slug], { stdio: 'ignore' });
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(join(OUT, `${d.slug}.jpg`));
  const url = `https://kavinarulraj.com/assets/og/${d.slug}.jpg`;
  let html = readFileSync(d.file, 'utf8');
  html = html.split(OG_DEFAULT).join(url).replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${esc(d.alt)}$2`);
  writeFileSync(d.file, html);
  process.stdout.write(`${d.slug} `);
}
console.log(`\n${data.length} share images`);
