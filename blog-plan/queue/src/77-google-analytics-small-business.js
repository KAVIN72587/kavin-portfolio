const { ctaLink } = require("../h");
module.exports = {
  row: 77, date: "2026-10-15", slug: "google-analytics-small-business", cat: "Web",
  keyword: "Google Analytics for small business what to track",
  title: "Google Analytics for a Small Business: What to Track",
  desc: "A plain-English guide to Google Analytics for small business websites: the few numbers that matter, tracking enquiries, and the reports you can safely ignore.",
  short: "The few numbers that matter, tracking enquiries, and the reports you can safely ignore.",
  headline: "Google Analytics for a small business: the few numbers worth watching",
  crumb: "Google Analytics basics",
  cardTitle: "The only analytics numbers you need",
  card: "Most of Google Analytics is noise for a small business. The handful of numbers that tell you if the site is working.",
  h1: ["The only analytics numbers you", "need"],
  lede: "Open Google Analytics for the first time and you meet dozens of reports, hundreds of metrics and a lot of jargon. Most small business owners close it and never return. That is a shame, because a handful of numbers, checked once a month, tell you whether your website is doing its job.",
  intro: [
    "Here are the numbers worth watching, how to track the one that matters most, which is enquiries, and what you can safely ignore. Google Analytics 4 changes its interface from time to time, so menu names may differ slightly from what is described here.",
  ],
  sections: [
    { h: "Make sure it is installed properly",
      p: ["First, check that Analytics is actually on every page of your site and that the account belongs to you, under your business Google account, not your designer's. Many small business sites have Analytics installed on one account nobody can access, or not installed at all. Ask your web designer to add you as an administrator.", "Also check that your own visits, and your staff's, are not inflating the numbers. If the team opens the website every day to share links with customers, those visits can be a large share of a small site's traffic. Analytics can be set to exclude internal traffic from your office network, which gives you a more honest picture of real visitors."] },
    { h: "Number 1: enquiries",
      p: ["The most important number is how many people contacted you through the website: form submissions, WhatsApp button clicks and phone number taps. These can be set up as \"key events\" in Analytics. Once they are tracked, you can see which pages and which traffic sources produce enquiries, not just visits.",
         "If you only set up one thing in Analytics, set up this."],
      note: "A thank-you page after the contact form makes form tracking simple and reliable." },
    { h: "Number 2: where visitors come from",
      p: ["The traffic acquisition report shows how people arrived: Google search, Google Maps and Business Profile, social media, direct visits or referrals from other websites. Over months, you see which channels are growing. Combined with enquiries, it tells you where to spend time: if Instagram brings visitors but no enquiries, and Google brings fewer but enquiring visitors, that matters."] },
    { h: "Number 3: top pages",
      p: ["Which pages get the most views, and which ones lead to enquiries. Often a single service or pricing page does most of the work. That page deserves the best photos, the clearest wording and the most prominent contact button. Pages nobody visits may need better links from the home page, or may not be needed at all."] },
    { h: "Number 4: mobile vs desktop",
      p: ["For most local businesses in India, the majority of visitors use phones. Check the split. If mobile visitors leave quickly or never enquire, while desktop visitors do, the mobile version of the site probably has a problem: slow loading, a hidden button or a form that is hard to fill on a phone."] },
    { h: "What you can ignore",
      p: ["Real-time visitors, minute-by-minute charts, most demographic reports and the dozens of advanced explorations. Small numbers fluctuate wildly from week to week, so do not react to a single bad week. Compare month to month, or the same month last year, for a fair picture."] },
    { h: "Use Search Console alongside it",
      p: ["Google Analytics shows what visitors do on your site. Google Search Console shows how you appear in Google search before they click: which searches you show up for, how often, and your average position. Together, they tell the full story. Both are free, and both should be linked to your business Google account."] },
  ],
  callout: {
    h: "A ten-minute monthly check",
    p: "Once a month, open Analytics and write down four numbers: total enquiries, the top three traffic sources, the top three pages and the mobile share. Keep them in a simple spreadsheet. After six months, you will understand your website better than most business owners ever do.",
    quote: "Track enquiries, not just visitors.",
    after: "If enquiries fall, look at what changed: a source that dropped, a page that stopped working, a form that broke. The numbers point you to the problem.",
  },
  extras: [
    { h: "Your monthly website numbers",
      box: `Month: ________

Enquiries (form + WhatsApp + calls):  ____
Top traffic sources:  1. ____  2. ____  3. ____
Top pages:            1. ____  2. ____  3. ____
Mobile share of visitors:  ____ %
Notes (what changed?):  ________________`,
      paras: ["Copy this into a notebook or spreadsheet and fill it in on the first of each month. It takes ten minutes and replaces hours of staring at dashboards."] },
  ],
  faq: [
    ["What should a small business track in Google Analytics?", "Enquiries from the website, where visitors come from, which pages they view most, and the mobile versus desktop split. Those four cover most decisions a small business needs to make."],
    ["How do I track contact form submissions in Google Analytics?", "Set up the submission, or a visit to a thank-you page after submitting, as a key event in Google Analytics 4. Your web designer can configure this in a few minutes."],
    ["Is Google Analytics free?", "Yes, the standard Google Analytics 4 is free and more than enough for small business websites."],
  ],
  related: [
    ["/web-design-chennai/", "Web design in Chennai", "service"],
    ["/website-design-cost-chennai/", "What a website really costs in Chennai", "pricing"],
    ["/blog/contact-form-not-working/", "Your contact form might be losing leads", "5 min"],
  ],
  cta: {
    h: "Analytics set up to count enquiries.",
    p: `Every ${ctaLink("/web-design-chennai/", "website I build")} launches with Google Analytics and Search Console in your name, with form, WhatsApp and call clicks tracked as enquiries. Ask me to check your current setup.`,
  },
};
