// Builds queued blog posts from src/*.js into out/<slug>.html using the live post template.
// Usage: node blog-plan/queue/build.js   (validates every post; exits 1 on any problem)
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const SITE = path.join(ROOT, "Portfolio redesign and SEO structure");
const SRC = path.join(__dirname, "src");
const OUT = path.join(__dirname, "out");
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const tpl = fs.readFileSync(path.join(SITE, "blog", "who-owns-your-website.html"), "utf8").replace(/\r\n/g, "\n");
const HEADER = tpl.slice(tpl.indexOf("<header"), tpl.indexOf("</header>") + "</header>".length);
const FOOTER = tpl.slice(tpl.indexOf("<footer"));
const FONTS_STYLE = tpl.slice(tpl.indexOf('<link rel="preconnect"'), tpl.indexOf("</style>") + "</style>".length);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");

function pageExists(href, date, queue) {
  const p = href.replace(/^\/|\/$/g, "");
  if (p.startsWith("blog/")) {
    const slug = p.slice(5);
    if (fs.existsSync(path.join(SITE, "blog", slug + ".html"))) return true;
    const q = queue.find((x) => x.slug === slug);
    return !!q && q.date < date;
  }
  return fs.existsSync(path.join(SITE, p + ".html"));
}

const P = (t, extra = "") => `<p style="font-size: 18px; line-height: 1.65; color: oklch(0.82 0.01 85); margin-top: 10px;${extra}">${t}</p>`;
const NOTE = (t) => `<p style="font-size: 16px; line-height: 1.55; color: oklch(0.7 0.01 85); background: oklch(0.23 0.012 60); border-radius: 10px; padding: 12px 16px; margin-top: 14px;">${t}</p>`;
const LI = (b, t) => `<li style="font-size: 18px; line-height: 1.6; color: oklch(0.86 0.01 85); border-left: 2px solid oklch(0.88 0.19 100); padding-left: 16px;"><strong style="color: oklch(0.96 0.01 85);">${b}</strong> ${t}</li>`;
const H2 = (t) => `<h2 style="font-size: clamp(26px, 3vw, 36px); letter-spacing: -0.035em; font-weight: 800;">${t}</h2>`;
const BIG = (t, mt = 26) => `<p style="font-size: 19px; line-height: 1.7; color: oklch(0.86 0.01 85); margin-top: ${mt}px; text-wrap: pretty;">${t}</p>`;

function extra(x) {
  let h = `    <section style="max-width: 780px; margin: 0 auto; padding: 52px 28px 0;">\n      ${H2(x.h)}\n`;
  if (x.intro) h += `      <p style="font-size: 18px; line-height: 1.65; color: oklch(0.82 0.01 85); margin-top: 12px;">${x.intro}</p>\n`;
  if (x.list) h += `      <ol style="display: grid; gap: 14px; margin-top: 20px;">\n${x.list.map(([b, t]) => "        " + LI(b, t)).join("\n")}\n      </ol>\n`;
  if (x.box) h += `      <div style="border: 1px solid oklch(0.34 0.01 60); border-radius: 16px; padding: 26px; margin-top: 20px; background: oklch(0.21 0.012 60);">\n        <p style="font-family: 'IBM Plex Mono', monospace; font-size: 16px; line-height: 1.75; color: oklch(0.88 0.01 85); white-space: pre-line;">${x.box}</p>\n      </div>\n`;
  (x.paras || []).forEach((t, i) => (h += "      " + BIG(t, x.list || x.box || i ? 22 : 16) + "\n"));
  return h + "    </section>\n";
}

function render(d, queue, mins = {}) {
  const dt = new Date(d.date + "T00:00:00");
  const month = MONTHS[dt.getMonth()];
  const url = `https://kavinarulraj.com/blog/${d.slug}/`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://kavinarulraj.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://kavinarulraj.com/blog/" },
        { "@type": "ListItem", position: 3, name: d.crumb, item: url } ] },
      { "@type": "BlogPosting", headline: d.headline, description: d.desc, datePublished: d.date, dateModified: d.date,
        author: { "@type": "Person", name: "Kavin Arulraj", url: "https://kavinarulraj.com/about/" },
        publisher: { "@type": "Person", name: "Kavin Arulraj" },
        mainEntityOfPage: { "@type": "WebPage", "@id": url }, articleSection: d.cat, image: "https://kavinarulraj.com/assets/og-default.jpg" },
      { "@type": "FAQPage", mainEntity: d.faq.map(([q, a]) => ({ "@type": "Question", name: strip(q), acceptedAnswer: { "@type": "Answer", text: strip(a) } })) },
    ],
  };
  const sections = d.sections.map((s, i) => `        <div style="border-top: 1px solid oklch(0.32 0.01 60); padding: 26px 0;">
          <p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.12em; color: oklch(0.88 0.19 100);">${String(i + 1).padStart(2, "0")}</p>
          <h2 style="font-size: 26px; font-weight: 800; letter-spacing: -0.03em; margin-top: 8px;">${s.h}</h2>
${s.p.map((t) => "          " + P(t)).join("\n")}${s.note ? "\n          " + NOTE(s.note) : ""}
        </div>
`).join("\n");

  const body = `  <nav aria-label="Breadcrumb" style="max-width: 1240px; margin: 0 auto; padding: 20px 28px 0;">
    <ol style="display: flex; gap: 10px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: oklch(0.6 0.01 85); flex-wrap: wrap;">
      <li><a href="/" style="color: oklch(0.72 0.19 240);">Home</a></li>
      <li>/</li>
      <li><a href="/blog/" style="color: oklch(0.72 0.19 240);">Blog</a></li>
      <li>/</li>
      <li>${d.crumb}</li>
    </ol>
  </nav>

  <article>

    <section style="max-width: 780px; margin: 0 auto; padding: 40px 28px 34px;">
      <p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: oklch(0.72 0.19 240); margin-bottom: 20px;">${d.cat} · MINUTES min read · ${month} ${dt.getFullYear()}</p>
      <h1 style="font-size: clamp(38px, 5vw, 62px); line-height: 0.97; letter-spacing: -0.04em; font-weight: 800; text-wrap: balance;">
        ${d.h1[0]}
        <span style="font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; letter-spacing: -0.01em; color: oklch(0.88 0.19 100);">${d.h1[1]}</span>
      </h1>
      <p style="margin-top: 24px; font-size: 21px; line-height: 1.55; color: oklch(0.82 0.01 85); text-wrap: pretty;">
        ${d.lede}
      </p>
    </section>

    <section style="max-width: 780px; margin: 0 auto; padding: 0 28px 8px;">
${d.intro.map((t, i) => `      <p style="font-size: 19px; line-height: 1.7; color: oklch(0.86 0.01 85);${i ? " margin-top: 22px;" : ""} text-wrap: pretty;">\n        ${t}\n      </p>`).join("\n")}
    </section>

    <section style="max-width: 780px; margin: 0 auto; padding: 32px 28px 0;">

${sections}
    </section>

    <section style="background: oklch(0.96 0.01 85); color: oklch(0.18 0.01 60); padding: 56px 0; margin-top: 52px;">
      <div style="max-width: 780px; margin: 0 auto; padding: 0 28px;">
        <h2 style="font-size: clamp(28px, 3.4vw, 40px); letter-spacing: -0.04em; font-weight: 800;">${d.callout.h}</h2>
        <p style="font-size: 19px; line-height: 1.7; color: oklch(0.3 0.01 85); margin-top: 16px; text-wrap: pretty;">
          ${d.callout.p}
        </p>
        <blockquote style="border-left: 3px solid oklch(0.88 0.19 100); padding: 4px 0 4px 22px; font-family: 'Instrument Serif', serif; font-size: 26px; line-height: 1.35; font-style: italic; color: oklch(0.2 0.01 85); margin-top: 26px;">
          ${d.callout.quote}
        </blockquote>
        <p style="font-size: 19px; line-height: 1.7; color: oklch(0.3 0.01 85); margin-top: 24px; text-wrap: pretty;">
          ${d.callout.after}
        </p>
      </div>
    </section>

${(d.extras || []).map(extra).join("\n")}
    <section style="max-width: 780px; margin: 0 auto; padding: 52px 28px 0;">
      ${H2("Quick answers")}
${d.faq.map(([q, a], i) => `      <div style="border-top: 1px solid oklch(0.32 0.01 60); padding: 22px 0;${i ? "" : " margin-top: 18px;"}">
        <h3 style="font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">${q}</h3>
        <p style="font-size: 17px; line-height: 1.65; color: oklch(0.82 0.01 85); margin-top: 8px;">${a}</p>
      </div>`).join("\n")}
    </section>

    <section style="max-width: 780px; margin: 0 auto; padding: 44px 28px 0;">
      <p style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.12em; color: oklch(0.66 0.01 85); text-transform: uppercase; margin-bottom: 14px;">Related reading</p>
      <ul style="display: grid; gap: 10px;">
${d.related.map(([href, label, tag]) => [href, label, (/^\d+ min$/.test(tag) && mins[href]) ? mins[href] + " min" : tag]).map(([href, label, tag]) => `        <li><a href="${href}" style="display: flex; justify-content: space-between; gap: 16px; border-top: 1px solid oklch(0.3 0.01 60); padding-top: 14px; font-size: 18px; font-weight: 700; letter-spacing: -0.02em;">${label} <span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: oklch(0.66 0.01 85); white-space: nowrap;">${tag}</span></a></li>`).join("\n")}
      </ul>
    </section>

    <section style="background: oklch(0.88 0.19 100); color: oklch(0.18 0.01 60); padding: 58px 0; margin-top: 52px;">
      <div style="max-width: 1240px; margin: 0 auto; padding: 0 28px; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 44px; align-items: center;">
        <div>
          <h2 style="font-size: clamp(30px, 4vw, 52px); line-height: 0.97; letter-spacing: -0.045em; font-weight: 800; text-wrap: balance;">${d.cta.h}</h2>
          <p style="font-size: 18px; line-height: 1.55; margin-top: 16px; max-width: 52ch;">${d.cta.p}</p>
        </div>
        <div style="display: grid; gap: 10px;">
          <a href="/hire-me/" style="background: oklch(0.18 0.01 60); color: oklch(0.96 0.01 85); padding: 18px 24px; border-radius: 14px; font-weight: 800; font-size: 19px; display: flex; justify-content: space-between; gap: 14px;" style-hover="background: oklch(0.72 0.19 240);">Send a brief <span>→</span></a>
          <a href="https://wa.me/917010266975" style="border: 2px solid oklch(0.18 0.01 60); color: oklch(0.18 0.01 60); padding: 16px 24px; border-radius: 14px; font-weight: 700; font-size: 17px; display: flex; justify-content: space-between; gap: 14px; font-family: 'IBM Plex Mono', monospace;">+91 70102 66975 <span>whatsapp</span></a>
        </div>
      </div>
    </section>

  </article>`;

  const words = strip(body.replace(/<nav[\s\S]*?<\/nav>/, "")).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(4, Math.round(words / 200));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>${esc(d.title)}</title>
<meta name="description" content="${esc(d.desc)}" />
<link rel="canonical" href="${url}" />
<meta property="og:title" content="${esc(d.title)}" />
<meta property="og:description" content="${esc(d.short)}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${url}" />
<meta property="og:site_name" content="Kavin Arulraj" />
<meta property="og:locale" content="en_IN" />
<meta property="og:image" content="https://kavinarulraj.com/assets/og-default.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Kavin Arulraj, freelance graphic designer and video editor in Chennai" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(d.title)}" />
<meta name="twitter:description" content="${esc(d.short)}" />
<meta name="twitter:image" content="https://kavinarulraj.com/assets/og-default.jpg" />
${FONTS_STYLE}
<script type="application/ld+json">
${JSON.stringify(ld)}
</script>

</head>
<body>

${HEADER}

<main>

${body.replace("MINUTES", minutes)}

</main>

${FOOTER}`;

  // validation
  const errs = [];
  if (d.title.length > 60) errs.push(`title ${d.title.length} chars`);
  if (d.desc.length < 140 || d.desc.length > 165) errs.push(`desc ${d.desc.length} chars`);
  if (words < 900 || words > 1400) errs.push(`words ${words}`);
  if (d.faq.length !== 3) errs.push("faq count");
  if (d.related.length !== 3) errs.push("related count");
  for (const [href] of d.related) if (!pageExists(href, d.date, queue)) errs.push("missing related " + href);
  const inner = (body.match(/href="(\/[^"]*)"/g) || []).map((m) => m.slice(6, -1));
  for (const href of inner) if (href !== "/" && !pageExists(href, d.date, queue)) errs.push("missing link " + href);
  if (!["Design", "Print", "Web", "Video", "Business"].includes(d.cat)) errs.push("bad cat");
  if (/REFERRALCODE/.test(body) && !/rel="sponsored/.test(body)) errs.push("referral without rel=sponsored");
  JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  return { html: html.replace(/\n/g, "\r\n"), words, minutes, errs };
}

if (require.main === module) {
  fs.mkdirSync(OUT, { recursive: true });
  const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".js")).sort();
  const queue = files.map((f) => require(path.join(SRC, f)));
  const manifest = [];
  let bad = 0;
  const mins = minutesMap(queue);
  for (const d of queue) {
    const r = render(d, queue, mins);
    fs.writeFileSync(path.join(OUT, d.slug + ".html"), r.html);
    manifest.push({ row: d.row, date: d.date, slug: d.slug, cat: d.cat, title: d.title, cardTitle: d.cardTitle, card: d.card, minutes: r.minutes, words: r.words });
    console.log(`${d.date} ${d.slug.padEnd(36)} ${r.words}w ${r.minutes}min ${r.errs.length ? "ERR " + r.errs.join("; ") : "ok"}`);
    if (r.errs.length) bad++;
  }
  fs.writeFileSync(path.join(__dirname, "manifest.json"), JSON.stringify(manifest, null, 2).replace(/\n/g, "\r\n"));
  if (bad) { console.error(bad + " post(s) failed validation"); process.exit(1); }
}

// Read time of every queued post, keyed by its URL path, so related-reading labels stay accurate.
function minutesMap(queue) {
  const m = {};
  for (const d of queue) m["/blog/" + d.slug + "/"] = render(d, queue).minutes;
  return m;
}

module.exports = { render, minutesMap, SRC, SITE };
