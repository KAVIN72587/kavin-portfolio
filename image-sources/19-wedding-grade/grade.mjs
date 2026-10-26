// Grade the case study's ungraded still three ways and add a palette strip.
// Usage: node image-sources/19-wedding-grade/grade.mjs <out-dir>
// Source: assets/slots/case-study-wedding-film-2.webp (the "ungraded original" beside this slot).

import sharp from '../../tools/node_modules/sharp/lib/index.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SRC = join(ROOT, 'Portfolio redesign and SEO structure', 'assets', 'slots', 'case-study-wedding-film-2.webp');
const OUT = process.argv[2] || '.';
const W = 1200, H = 675;

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
const smooth = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

// Per-pixel grades on linear-ish 0..255 RGB.
const GRADES = {
  a(r, g, b) { // teal shadows, warm highlights, more contrast
    const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const sh = 1 - smooth(0.05, 0.55, l), hi = smooth(0.45, 0.95, l);
    r = r - 16 * sh + 18 * hi; g = g + 4 * sh + 6 * hi; b = b + 14 * sh - 16 * hi;
    const c = 1.18; r = (r - 128) * c + 124; g = (g - 128) * c + 124; b = (b - 128) * c + 122;
    return [r, g, b];
  },
  b(r, g, b) { // lifted blacks, creamy highlights, slightly richer reds
    const l = (0.299 * r + 0.587 * g + 0.114 * b);
    const red = smooth(0.08, 0.3, (r - Math.max(g, b)) / 255);
    r = r + (r - l) * (0.25 + 0.5 * red); g = g + (g - l) * 0.05 - 10 * red; b = b + (b - l) * 0.05 - 6 * red;
    r = r * 0.84 + 44; g = g * 0.84 + 38; b = b * 0.8 + 30;
    return [r * 1.06, g * 1.03, b * 0.98];
  },
  c(r, g, b, px, py) { // mono, keep only the bride's gold jewellery
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    const sat = mx ? d / mx : 0;
    let h = 0;
    if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
    const keep = smooth(27, 30, h) * (1 - smooth(37, 43, h)) * smooth(0.27, 0.35, sat) * smooth(95, 108, mx) * (1 - smooth(260, 380, Math.hypot(px - 640, (py - 430) * 1.15)));
    let y = 0.3 * r + 0.59 * g + 0.11 * b;
    y = (y - 128) * 1.28 + 120;
    const gr = [y * 1.02, y, y * 0.96];
    const col = [r * 1.15, g * 1.0, b * 0.7];
    return gr.map((v, i) => v + (col[i] - v) * keep);
  },
};

const PALETTES = {
  a: { name: 'Teal & tungsten', sw: ['#3d8a83', '#b8362b', '#d6824f', '#e9d1a4', '#f3f0e8', '#0b0b0b'] },
  b: { name: 'Soft ivory', sw: ['#f4ede1', '#e4cfb6', '#c2373a', '#8e1f2a', '#b89a62', '#6f7d5d'] },
  c: { name: 'Gold in mono', sw: ['#0c0c0c', '#3a3a3a', '#8a8a8a', '#d9d6d0', '#c8942f', '#9c3f1d'] },
};

const base = await sharp(SRC).resize(W, H, { kernel: 'lanczos3' }).sharpen({ sigma: 0.8 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });

for (const key of ['a', 'b', 'c']) {
  const px = Buffer.from(base.data);
  for (let i = 0; i < px.length; i += 3) {
    const p3 = i / 3, [r, g, b] = GRADES[key](px[i], px[i + 1], px[i + 2], p3 % W, Math.floor(p3 / W));
    px[i] = clamp(r); px[i + 1] = clamp(g); px[i + 2] = clamp(b);
  }
  const p = PALETTES[key];
  const sw = 46, gap = 6, x0 = 28, y0 = H - 28 - sw;
  const strip = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset=".62" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".62"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#v)"/>
    <rect x="${x0 - 10}" y="${y0 - 10}" width="${p.sw.length * (sw + gap) + 14}" height="${sw + 20}" rx="10" fill="#000" fill-opacity=".45"/>
    ${p.sw.map((c, i) => `<rect x="${x0 + i * (sw + gap)}" y="${y0}" width="${sw}" height="${sw}" rx="6" fill="${c}" stroke="#fff" stroke-opacity=".35"/>`).join('')}
    <text x="${x0 + p.sw.length * (sw + gap) + 18}" y="${y0 + 20}" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="20" fill="#fff" letter-spacing="2">COLOUR PALETTE</text>
    <text x="${x0 + p.sw.length * (sw + gap) + 18}" y="${y0 + 44}" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#fff" fill-opacity=".8">${p.name.replace('&', '&amp;')} · 3 cameras matched</text>
    <rect x="${W - 210}" y="24" width="186" height="34" rx="17" fill="#000" fill-opacity=".5"/>
    <text x="${W - 117}" y="47" text-anchor="middle" font-family="Courier New, monospace" font-weight="700" font-size="15" fill="#fff" letter-spacing="1">LOG → REC.709</text>
  </svg>`;
  const out = join(OUT, `grade-${key}.webp`);
  await sharp(px, { raw: { width: W, height: H, channels: 3 } })
    .composite([{ input: Buffer.from(strip) }])
    .webp({ quality: 82 }).toFile(out);
  console.log(out);
}
