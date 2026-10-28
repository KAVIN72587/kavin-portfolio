// Blog header image: adds a post's header photo under its title and points og:image, twitter:image and the
// JSON-LD image at the post's own 1200x630 share image. Photos come from header-photos.json and are built by
// node tools/blog-headers.mjs (assets/blog/<slug>.webp and assets/blog/og/<slug>.jpg).
// Used by build.js for queued posts. Run directly to patch published posts:
//   node blog-plan/queue/header-image.js [slug ...]   (no slugs = every post in blog/)
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const SITE = path.join(ROOT, "Portfolio redesign and SEO structure");
const MAP = JSON.parse(fs.readFileSync(path.join(__dirname, "header-photos.json"), "utf8"));
const OG_DEFAULT = "https://kavinarulraj.com/assets/og-default.jpg";
const LEDE = '<section style="max-width: 780px; margin: 0 auto; padding: 40px 28px 34px;">';

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Returns a list of problems (empty when the post has a header photo and its files exist).
function check(slug) {
  const e = MAP[slug];
  if (!e) return [`no header photo for "${slug}" in header-photos.json (add one, then run node tools/blog-headers.mjs ${slug})`];
  const need = [`assets/blog/og/${slug}.jpg`, e.file || `assets/blog/${slug}.webp`];
  return need.filter((f) => !fs.existsSync(path.join(SITE, f))).map((f) => `missing ${f} (run node tools/blog-headers.mjs ${slug})`);
}

function apply(html, slug) {
  const e = MAP[slug];
  if (!e) return html;
  const og = `https://kavinarulraj.com/assets/blog/og/${slug}.jpg`;
  html = html.split(OG_DEFAULT).join(og)
    .replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${esc(e.alt)}$2`);
  if (e.id && !html.includes(`/assets/blog/${slug}.webp`)) {
    const at = html.indexOf(LEDE);
    if (at < 0) throw new Error(`${slug}: title section not found`);
    const end = html.indexOf("</section>", at) + "</section>".length;
    const hero = `

    <section style="max-width: 780px; margin: 0 auto; padding: 0 28px 34px;">
      <div style="aspect-ratio: 16 / 9; border-radius: 16px; border: 1px solid oklch(0.34 0.01 60); overflow: hidden; background: oklch(0.2 0.01 60);">
        <img src="/assets/blog/${slug}.webp" alt="${esc(e.alt)}" width="1600" height="900" fetchpriority="high" decoding="async" style="display: block; width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </section>`;
    html = html.slice(0, end) + (html.includes("\r\n") ? hero.replace(/\n/g, "\r\n") : hero) + html.slice(end);
  }
  return html;
}

module.exports = { apply, check };

if (require.main === module) {
  const dir = path.join(SITE, "blog");
  const slugs = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5));
  let changed = 0, problems = 0;
  for (const slug of slugs) {
    const p = check(slug);
    if (p.length) { problems++; p.forEach((m) => console.log(`${slug}: ${m}`)); continue; }
    const file = path.join(dir, `${slug}.html`);
    const before = fs.readFileSync(file, "utf8");
    const after = apply(before, slug);
    if (after !== before) { fs.writeFileSync(file, after); changed++; }
  }
  console.log(`${changed} posts updated, ${problems} with problems`);
  process.exit(problems ? 1 : 0);
}
