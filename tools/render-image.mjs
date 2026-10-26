// Render an HTML layout to a WebP for the site.
// Usage: node tools/render-image.mjs <page.html> <out.webp> <width> <height> [layout]
// Renders at 2x in headless Chrome, then downsizes with sharp for crisp edges.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const [page, out, w, h, layout = ''] = process.argv.slice(2);
if (!page || !out || !w || !h) {
  console.error('Usage: node tools/render-image.mjs <page.html> <out.webp> <width> <height> [layout]');
  process.exit(1);
}

const chrome = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync);
if (!chrome) throw new Error('Chrome or Edge not found');

const tmp = mkdtempSync(join(tmpdir(), 'render-'));
const png = join(tmp, 'shot.png');
const url = pathToFileURL(resolve(page)).href + (layout ? `?layout=${layout}` : '');

execFileSync(chrome, [
  '--headless=new', '--hide-scrollbars', '--disable-gpu', '--no-first-run',
  `--user-data-dir=${join(tmp, 'profile')}`,
  // Headless window chrome eats some height, so render taller and crop to size below.
  `--window-size=${w},${Number(h) + 200}`, '--force-device-scale-factor=2',
  '--virtual-time-budget=5000', `--screenshot=${png}`, url,
], { stdio: 'ignore', timeout: 60000 });

const info = await sharp(png)
  .extract({ left: 0, top: 0, width: w * 2, height: h * 2 })
  .resize(Number(w), Number(h)).webp({ quality: 80 }).toFile(out);
rmSync(tmp, { recursive: true, force: true });
console.log(`${out} ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
