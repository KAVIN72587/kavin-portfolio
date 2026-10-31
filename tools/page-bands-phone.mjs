// Phone versions of the 2:1 page bands: the same photo and printed design without the price cards (unreadable at
// phone width), cropped to 4:3. Writes assets/slots/<page>-band-phone.webp and switches each page's band to a
// <picture> that serves it below 640px (the .band rule in assets/responsive.css swaps the frame to 4:3).
// Usage: node tools/page-bands-phone.mjs [layout ...]   (no args = all 17)

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'Portfolio redesign and SEO structure');
const WORK = join(ROOT, 'image-sources', 'og');
mkdirSync(WORK, { recursive: true });

// layout -> [band name, page file, left edge of the 4:3 crop in the 1600 x 800 render]
const BANDS = {
  website: ['website-design-cost-chennai', 'website-design-cost-chennai.html', 240], lowcost: ['low-cost-website-design-chennai', 'low-cost-website-design-chennai.html', 250],
  logo: ['logo-design-cost-chennai', 'logo-design-cost-chennai.html', 267], brochure: ['brochure-design-cost-chennai', 'brochure-design-cost-chennai.html', 150],
  video: ['video-editing-charges-chennai', 'video-editing-charges-chennai.html', 267], youtube: ['youtube-video-editing-chennai', 'youtube-video-editing-chennai.html', 267],
  freelancer: ['freelancer-vs-agency-chennai', 'freelancer-vs-agency-chennai.html', 267], pricing: ['pricing', 'pricing.html', 40],
  contact: ['contact', 'contact.html', 230], hire: ['hire-me', 'hire-me.html', 330], about: ['about', 'about.html', 267],
  areas: ['areas', 'areas.html', 267], tnagar: ['areas-t-nagar', 'areas/t-nagar.html', 267], adyar: ['areas-adyar', 'areas/adyar.html', 267],
  annanagar: ['areas-anna-nagar', 'areas/anna-nagar.html', 267], guindy: ['areas-guindy-nungambakkam', 'areas/guindy-nungambakkam.html', 267],
  velachery: ['areas-velachery-omr', 'areas/velachery-omr.html', 267],
};
const list = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(BANDS);
for (const layout of list) {
  const [band, page, left] = BANDS[layout];
  const raw = join(WORK, `${band}-phone-raw.webp`);
  execFileSync('node', [join(ROOT, 'tools', 'render-image.mjs'), join(ROOT, 'image-sources', 'pages', 'page-images.html'), raw, '1600', '800', `${layout}-phone`], { stdio: 'ignore' });
  await sharp(raw).extract({ left, top: 0, width: 1067, height: 800 }).webp({ quality: 80 }).toFile(join(SITE, 'assets', 'slots', `${band}-band-phone.webp`));

  const file = join(SITE, page);
  let html = readFileSync(file, 'utf8');
  const img = `<img src="/assets/slots/${band}-band.webp"`;
  if (!html.includes(`${band}-band-phone.webp`)) {
    const at = html.indexOf(img);
    if (at < 0) throw new Error(`${page}: band image not found`);
    const end = html.indexOf('/>', at) + 2;
    html = html.slice(0, at) + `<picture><source media="(max-width: 640px)" srcset="/assets/slots/${band}-band-phone.webp" width="1067" height="800" />` + html.slice(at, end) + '</picture>' + html.slice(end);
    // the frame: mark it so the phone rule can switch it to 4:3
    const div = html.lastIndexOf('<div style="aspect-ratio: 2 / 1;', at);
    html = html.slice(0, div) + '<div class="band" style="aspect-ratio: 2 / 1;' + html.slice(div + '<div style="aspect-ratio: 2 / 1;'.length);
    writeFileSync(file, html);
  }
  process.stdout.write(`${layout} `);
}
console.log('\ndone');
