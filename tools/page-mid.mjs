// Mid-page photos for the long main pages: one real photo with a caption, placed before the page's middle section,
// so the price tables and FAQs are not one long run of text. Photos: image-sources/mid/photos (Unsplash License).
// Writes assets/slots/<page>-mid.webp (2100 x 900, graded like the blog photos) and inserts the figure.
// Usage: node tools/page-mid.mjs [page ...]   (no args = all below; pages already done are skipped)

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'Portfolio redesign and SEO structure');
const SRC = join(ROOT, 'image-sources', 'mid', 'photos');

// page -> [alt, caption]   (photo ids and photographers: image-sources/mid/CREDITS.md)
const PAGES = {
  'website-design-cost-chennai': ['A laptop with website code on a busy desk', 'A business site is design, build and the content that fills it. Quotes that skip the last part grow later.'],
  'video-editing-charges-chennai': ['A bright studio light seen up close', 'Light and sound at the shoot decide how much the edit has to fix, and that shows up in the price.'],
  'low-cost-website-design-chennai': ['Hands typing on a phone', 'Most people will meet your one-page site on a phone first, so that is where it is designed.'],
  'brochure-design-cost-chennai': ['A print finishing machine trimming printed sheets', 'Design is one cost. Paper, quantity and finishing are another, paid to the printer.'],
  'youtube-video-editing-chennai': ['A phone on a tripod recording a video', 'Consistent uploads matter more than one perfect video. A retainer keeps the schedule.'],
  'freelancer-vs-agency-chennai': ['A team meeting around a long table in an office', 'An agency brings a team and a process. Both are on the invoice.'],
  'logo-design-cost-chennai': ['A designer sketching in a notebook', 'Every concept starts as rough sketches before one is drawn properly.'],
  pricing: ['Two people going over a printed agreement at a table', 'Every quote is fixed and agreed in writing before work starts.'],
  'social-media-creatives-chennai': ['A creator filming on a beach with a camera on a tripod', 'A monthly set keeps the feed consistent without a daily scramble.'],
};

const vignette = (w, h) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><radialGradient id="v" cx="50%" cy="45%" r="75%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".38"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#v)"/></svg>`);
const grade = async (input, w, h) => {
  const base = await sharp(input).rotate().resize(w, h, { fit: 'cover', position: 'attention' })
    .modulate({ saturation: 0.86, brightness: 0.97 }).recomb([[1.03, 0.02, 0], [0.01, 1.0, 0.01], [0, 0.02, 0.95]]).linear(1.05, -6).toBuffer();
  return sharp(base).composite([{ input: vignette(w, h), blend: 'multiply' }]);
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const list = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(PAGES);
for (const page of list) {
  const [alt, caption] = PAGES[page];
  const file = join(SITE, `${page}.html`);
  let html = readFileSync(file, 'utf8');
  if (html.includes(`/assets/slots/${page}-mid.webp`)) { console.log('done already', page); continue; }
  await (await grade(join(SRC, `${page}.jpg`), 2100, 900)).webp({ quality: 72, effort: 6 }).toFile(join(SITE, 'assets', 'slots', `${page}-mid.webp`));

  // content sections with a heading, minus the closing call to action; insert before the middle one
  const main0 = html.indexOf('<main'), main1 = html.indexOf('</main>');
  const secs = [...html.slice(main0, main1).matchAll(/<section\b/g)].map((m) => main0 + m.index)
    .filter((i) => /<h2\b/.test(html.slice(i, html.indexOf('</section>', i))));
  const at = secs.slice(0, -1)[Math.floor((secs.length - 1) / 2)];
  const eol = html.includes('\r\n') ? '\r\n' : '\n';
  const fig = [`  <section style="max-width: 1240px; margin: 0 auto; padding: 0 28px 56px;">`,
    `    <figure>`,
    `      <div style="aspect-ratio: 21 / 9; border-radius: 20px; border: 1px solid oklch(0.34 0.01 60); overflow: hidden; background: oklch(0.2 0.01 60);"><img src="/assets/slots/${page}-mid.webp" alt="${esc(alt)}" width="2100" height="900" loading="lazy" decoding="async" style="display: block; width: 100%; height: 100%; object-fit: cover;" /></div>`,
    `      <figcaption style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; line-height: 1.5; color: oklch(0.66 0.01 85); margin-top: 12px; max-width: 70ch;">${caption}</figcaption>`,
    `    </figure>`,
    `  </section>`, ``, ``].join(eol);
  const line = html.lastIndexOf('\n', at) + 1;
  html = html.slice(0, line) + fig + html.slice(line);
  writeFileSync(file, html);
  console.log('placed', page);
}
