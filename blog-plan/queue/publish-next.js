// Moves the next due queued post into the live site folder: writes blog/<slug>.html,
// adds its card to blog.html, adds it to sitemap.xml and marks the plan row done.
// Usage: node blog-plan/queue/publish-next.js [YYYY-MM-DD] [DUE-BY]   (defaults to today; DUE-BY lets later-scheduled posts publish early, dated today)
// Prints one JSON line: {"status":"published",...} or {"status":"none"}. Exits 1 on any problem.
const fs = require("fs");
const path = require("path");
const { render, minutesMap, SRC, SITE } = require("./build");

const ROOT = path.resolve(__dirname, "..", "..");
const PLAN = path.join(ROOT, "blog-plan", "keyword-plan.md");
const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const pad = (n) => String(n).padStart(2, "0");
const now = new Date();
const today = process.argv[2] || `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

const dueBy = process.argv[3] || today;

const queue = fs.readdirSync(SRC).filter((f) => f.endsWith(".js")).sort().map((f) => require(path.join(SRC, f)));
const isLive = (d) => fs.existsSync(path.join(SITE, "blog", d.slug + ".html"));
const due = queue.filter((d) => !isLive(d) && d.date <= dueBy).sort((a, b) => a.date.localeCompare(b.date));
if (!due.length) { console.log(JSON.stringify({ status: "none", today, remaining: queue.filter((d) => !isLive(d)).length })); process.exit(0); }

const d = { ...due[0], date: today }; // a missed day publishes with the real date
const r = render(d, queue, minutesMap(queue));
if (r.errs.length) { console.error("validation failed: " + r.errs.join("; ")); process.exit(1); }

const crlf = (s) => s.replace(/\r?\n/g, "\r\n");
fs.writeFileSync(path.join(SITE, "blog", d.slug + ".html"), r.html);

// blog.html card + count
const blogPath = path.join(SITE, "blog.html");
let blog = fs.readFileSync(blogPath, "utf8");
const anchor = 'id="flt-1">\r\n';
if (!blog.includes(anchor)) throw new Error("blog.html anchor not found");
const [y, m] = today.split("-");
const card = crlf(`
        <a data-cat="${d.cat}" href="/blog/${d.slug}/" style="display: grid; grid-template-columns: 0.8fr 2.4fr 0.8fr; gap: 28px; align-items: baseline; background: oklch(0.18 0.01 60); padding: 26px 20px; color: oklch(0.96 0.01 85);" style-hover="background: oklch(0.22 0.012 60);">
          <p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: oklch(0.88 0.19 100);">${d.cat}</p>
          <div>
            <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -0.03em; text-wrap: balance;">${d.cardTitle}</h2>
            <p style="font-size: 16px; line-height: 1.55; color: oklch(0.76 0.01 85); margin-top: 7px; max-width: 62ch;">${d.card}</p>
          </div>
          <p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: oklch(0.64 0.01 85); text-align: right;">${r.minutes} min · ${MON[+m - 1]} ${y}</p>
        </a>
`);
blog = blog.replace(anchor, anchor + card);
const count = (blog.match(/data-cat="[^"]+" href="\/blog\//g) || []).length;
blog = blog.replace(/>\d+ posts</, `>${count} posts<`);
fs.writeFileSync(blogPath, blog);

// sitemap
const smPath = path.join(SITE, "sitemap.xml");
let sm = fs.readFileSync(smPath, "utf8");
const loc = `https://kavinarulraj.com/blog/${d.slug}/`;
if (!sm.includes(loc)) {
  const blogEntry = sm.match(/  <url><loc>https:\/\/kavinarulraj\.com\/blog\/<\/loc>.*?<\/url>\r?\n/);
  if (!blogEntry) throw new Error("sitemap /blog/ entry not found");
  sm = sm.replace(blogEntry[0], blogEntry[0].replace(/<lastmod>[^<]+</, `<lastmod>${today}<`) + `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.5</priority></url>\r\n`);
  fs.writeFileSync(smPath, sm);
}

// plan row
let plan = fs.readFileSync(PLAN, "utf8");
const rowRe = new RegExp(`(\\| ${d.row} \\| )[^|]*?( \\| ${d.slug} \\|)`);
if (!rowRe.test(plan)) throw new Error("plan row not found for " + d.slug);
plan = plan.replace(rowRe, `$1done ${today}$2`);
fs.writeFileSync(PLAN, plan);

console.log(JSON.stringify({ status: "published", today, slug: d.slug, title: d.cardTitle, seoTitle: d.title, cat: d.cat, words: r.words, url: loc, remaining: queue.filter((x) => !isLive(x)).length }));
