// Image sitemap: adds each page's content images to its <url> entry in sitemap.xml (Google image extension),
// so Google Images can index them. Safe to re-run: existing <image:image> tags are rebuilt every time.
// Usage: node tools/sitemap-images.js   (also called by blog-plan/queue/publish-next.js after each publish)
const fs = require("fs");
const path = require("path");

const SITE = path.resolve(__dirname, "..", "Portfolio redesign and SEO structure");
const ORIGIN = "https://kavinarulraj.com";
const MAX = 12; // per page; plenty for search, keeps the file small

const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function pageFile(loc) {
  const p = loc.replace(ORIGIN, "").replace(/^\/|\/$/g, "");
  return path.join(SITE, p ? `${p}.html` : "index.html");
}

function imagesOf(file) {
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, "utf8");
  const main = (html.match(/<main[\s\S]*<\/main>/) || [""])[0];
  const found = [...main.matchAll(/<img\b[^>]*\ssrc="(\/assets\/[^"]+)"|url\('(\/assets\/[^']+)'\)/g)].map((m) => m[1] || m[2]);
  return [...new Set(found)].filter((s) => !/logo-mark|favicon/.test(s)).slice(0, MAX);
}

function run() {
  const smPath = path.join(SITE, "sitemap.xml");
  let sm = fs.readFileSync(smPath, "utf8");
  if (!sm.includes('xmlns:image=')) sm = sm.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">');
  let pages = 0, images = 0;
  sm = sm.replace(/<url>([\s\S]*?)<\/url>/g, (all, body) => {
    body = body.replace(/<image:image>[\s\S]*?<\/image:image>/g, "");
    const loc = (body.match(/<loc>([^<]+)<\/loc>/) || [])[1];
    const imgs = loc ? imagesOf(pageFile(loc)) : [];
    if (imgs.length) pages++;
    images += imgs.length;
    return `<url>${body}${imgs.map((s) => `<image:image><image:loc>${xml(ORIGIN + s)}</image:loc></image:image>`).join("")}</url>`;
  });
  fs.writeFileSync(smPath, sm);
  return { pages, images };
}

module.exports = { run };
if (require.main === module) { const r = run(); console.log(`${r.images} images on ${r.pages} pages`); }
