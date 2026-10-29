// #20 "third row, watching": a family watching the finished wedding film at home, shot from behind.
// Real photo (Kevin Woblick, Unsplash License, ./photos/a.jpg); the TV now plays the case study's own still
// (assets/slots/case-study-wedding-film-2.webp, warmed to match the graded film), blurred to the photo's focus.
// The viewer's head stays in front of the screen through a feathered mask.
// Usage: node image-sources/20-watching/build.mjs <out.webp>

import sharp from '../../tools/node_modules/sharp/lib/index.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = join(HERE, '..', '..', 'Portfolio redesign and SEO structure');
const out = process.argv[2];
const W = 1600, H = 1067;
const SCREEN = { left: 552, top: 178, width: 753, height: 417 };
const HEAD = { cx: 663, cy: 527, rx: 124, ry: 187 }; // nearer viewer's head, overlaps the screen's lower-left

// 1. the film frame, warm grade like the finished film, then softened to the photo's depth of field
const frame = await sharp(join(SITE, 'assets/slots/case-study-wedding-film-2.webp'))
  .resize(SCREEN.width, SCREEN.height, { fit: 'cover', position: 'centre' })
  .modulate({ saturation: 1.12, brightness: 1.02 })
  .recomb([[1.06, 0.03, 0], [0.01, 1.0, 0], [0, 0.03, 0.9]])
  .blur(3.2).toBuffer();

// 2. mask: whole screen visible except the head (feathered)
const mask = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SCREEN.width}" height="${SCREEN.height}">
  <rect width="100%" height="100%" fill="#fff"/>
  <ellipse cx="${HEAD.cx - SCREEN.left}" cy="${HEAD.cy - SCREEN.top}" rx="${HEAD.rx}" ry="${HEAD.ry}" fill="#000"/></svg>`))
  .blur(4).extractChannel(0).toBuffer();
const screen = await sharp(frame).joinChannel(mask).png().toBuffer();

// 3. composite, light glow from the screen, crop to 4:3 and grade like the rest of the site's photos
const glow = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><radialGradient id="g" cx="58%" cy="36%" r="45%"><stop offset="0" stop-color="#ffd9a8" stop-opacity=".16"/><stop offset="1" stop-color="#ffd9a8" stop-opacity="0"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/></svg>`);
const comp = await sharp(join(HERE, 'photos/a.jpg')).resize(W, H)
  .composite([{ input: screen, left: SCREEN.left, top: SCREEN.top }, { input: glow, blend: 'screen' }]).toBuffer();
await sharp(comp).extract({ left: 89, top: 0, width: 1422, height: 1067 }).resize(1200, 900)
  .modulate({ brightness: 0.9, saturation: 0.92 }).linear(1.05, -8)
  .webp({ quality: 82 }).toFile(out);
console.log('wrote', out);
