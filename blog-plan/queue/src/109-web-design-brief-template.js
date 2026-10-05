const { ctaLink } = require("../h");
module.exports = {
  row: 109, date: "2026-10-26", slug: "web-design-brief-template", cat: "Web",
  keyword: "how to brief a web designer template",
  title: "How to Brief a Web Designer (With a Template)",
  desc: "How to write a website brief that gets accurate quotes: goals, audience, pages, content, examples, features, budget and deadline, plus a template to copy.",
  short: "Goals, audience, pages, content, examples, features, budget and deadline, with a template.",
  headline: "How to brief a web designer: what to include, with a template",
  crumb: "Web design brief",
  cardTitle: "A one-page brief for your web designer",
  card: "Vague briefs get vague quotes. What to write down before you contact anyone, with a template to copy.",
  h1: ["A one-page brief for your web", "designer"],
  lede: "\"I need a website, how much?\" is the most common first message a web designer receives, and the hardest to answer. The honest reply is \"it depends\", which is frustrating for both sides. A one-page brief turns that into a useful conversation and an accurate quote.",
  intro: [
    "Here is what to put in a website brief, why each part matters, and a template you can copy and fill in before you contact anyone. You do not need technical knowledge to write a good brief; you need clarity about your business.",
  ],
  sections: [
    { h: "1. What the website is for",
      p: ["Start with the main goal. More phone calls and WhatsApp enquiries? Online bookings? Selling products? Building credibility for corporate clients? Recruiting staff? Each goal shapes the design differently. If there are several, put them in order of importance.", "Add how you will judge success a few months after launch, for example ten enquiries a month from the website, or customers arriving already knowing the prices. It helps the designer make choices that serve the result, not just the look."] },
    { h: "2. Who it is for",
      p: ["Describe your typical customers: who they are, where they are, what they are looking for, and how they usually find you. A site for young couples planning weddings looks and reads differently from one for factory purchase managers. Mention languages if relevant."] },
    { h: "3. Pages and content",
      p: ["List the pages you think you need: home, services, about, pricing, gallery, contact and so on. Be honest about content: do you have text and photos ready, partly ready, or not at all? Content is the most common cause of delays and extra cost, so a designer needs to know who will write and photograph what."],
      note: "If you do not know which pages you need, say so. A good designer will suggest a structure." },
    { h: "4. Examples you like, and why",
      p: ["Share two or three websites you like, ideally not only competitors, and say what you like about each: the layout, the colours, how simple it is, the photos. Share one you dislike too. \"Modern and clean\" means different things to different people; links make it concrete."] },
    { h: "5. Features",
      p: ["List anything the site must do beyond showing information: contact form, WhatsApp button, booking system, payment, online store, blog, multiple languages, integrations with software you already use. Features are a big part of the cost, so be clear about what is essential and what is nice to have."] },
    { h: "6. Existing assets and accounts",
      p: ["Do you have a logo, brand colours, a domain, hosting, an existing website, a Google Business Profile? Note who controls each account. If there is an existing site, say what you like and dislike about it, and whether its content can be reused."] },
    { h: "7. Budget and deadline",
      p: ["Give a budget range, even a rough one. It does not weaken your position; it lets the designer propose what fits rather than guessing. Give the deadline and the reason for it, such as a launch, an event or a season, so they can plan backwards and tell you honestly whether it is realistic."] },
    { h: "8. Who decides",
      p: ["Name the person who will approve designs and give feedback, and anyone else who needs to see drafts. Websites stall most often when several partners give conflicting feedback late in the project. Agreeing internally on one decision-maker, and when they are available, keeps the project moving and avoids paying for rounds of changes that contradict each other."] },
  ],
  callout: {
    h: "A brief saves you money",
    p: "A clear brief gets you comparable quotes, because every designer is pricing the same thing. It reduces back-and-forth, prevents misunderstandings, and makes it obvious which designers have actually read and understood what you need.",
    quote: "The clearer the brief, the more accurate the quote.",
    after: "Send the same brief to each designer you are considering. Compare not just prices, but the questions they ask back; good questions are a sign of a good designer.",
  },
  extras: [
    { h: "Website brief template",
      box: `Business: (name, what you do, where)
Main goal of the site:
Typical customers:
Pages needed:
Content status: text ___  photos ___
Sites I like (and why):
Must-have features:
Nice-to-have features:
Existing logo / domain / hosting / site:
Budget range:
Deadline (and why):
Who approves the design:`,
      paras: ["Fill it in with short answers. A page like this takes twenty minutes to write and saves several calls."] },
  ],
  faq: [
    ["What should I include in a website brief?", "The site's main goal, your target customers, the pages needed, the status of your content, examples you like, required features, existing assets, budget range, deadline and who approves the work."],
    ["Should I tell a web designer my budget?", "Yes, a rough range helps. It lets the designer propose what fits rather than guessing, and saves time for both sides."],
    ["What if I don't know what pages I need?", "Say so in the brief. Describe your goals and customers, and a good designer will suggest a sensible page structure."],
  ],
  related: [
    ["/web-design-chennai/", "Web design in Chennai", "service"],
    ["/website-design-cost-chennai/", "What a website really costs in Chennai", "pricing"],
    ["/blog/what-to-send-for-a-quote/", "What to send a designer before asking for a quote", "5 min"],
  ],
  cta: {
    h: "Send the brief, get a fixed quote.",
    p: `Fill in the template above and send it to me. I'll reply with a fixed quote for ${ctaLink("/web-design-chennai/", "your website")}, a suggested page structure and the questions I need answered. Five-page sites start at ₹20,000.`,
  },
};
