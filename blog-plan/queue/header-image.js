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
  const need = [`assets/blog/og/${slug}.jpg`, e.file || `assets/blog/${slug}.webp`].concat(e.mid ? [`assets/blog/mid/${slug}.webp`] : []);
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
  // second photo with a caption, just before the article's middle heading
  if (e.mid && !html.includes(`/assets/blog/mid/${slug}.webp`)) {
    const a0 = html.indexOf("<article"), a1 = html.indexOf("</article>");
    // headings on the dark page only (not inside the light cream callout sections), nearest the middle first
    const light = (i) => /background: oklch\(0\.9\d/.test(html.slice(html.lastIndexOf("<section", i), i));
    const heads = [...html.slice(a0, a1).matchAll(/<h2\b/g)].map((m) => a0 + m.index).filter((i) => !light(i));
    if (heads.length >= 2) {
      const at = heads[Math.floor(heads.length / 2)];
      let line = html.lastIndexOf("\n", at) + 1;
      const pad = html.slice(line, at);
      // keep a section's small number label ("03") with its heading: go above it
      const prev = html.lastIndexOf("\n", line - 2) + 1;
      if (/^\s*<p [^>]*IBM Plex Mono[^>]*>[^<]{0,40}<\/p>\s*$/.test(html.slice(prev, line))) line = prev;
      const fig = [`<figure style="margin: 8px 0 44px;">`,
        `  <div style="aspect-ratio: 3 / 2; border-radius: 16px; border: 1px solid oklch(0.34 0.01 60); overflow: hidden; background: oklch(0.2 0.01 60);"><img src="/assets/blog/mid/${slug}.webp" alt="${esc(e.mid.alt)}" width="1500" height="1000" loading="lazy" decoding="async" style="display: block; width: 100%; height: 100%; object-fit: cover;" /></div>`,
        `  <figcaption style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; line-height: 1.5; color: oklch(0.66 0.01 85); margin-top: 12px;">${e.mid.caption}</figcaption>`,
        `</figure>`].map((l) => pad + l).join(html.includes("\r\n") ? "\r\n" : "\n") + (html.includes("\r\n") ? "\r\n" : "\n");
      html = html.slice(0, line) + fig + html.slice(line);
    }
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
