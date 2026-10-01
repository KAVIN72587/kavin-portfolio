const { ctaLink } = require("../h");
module.exports = {
  row: 31, date: "2026-10-31", slug: "shopify-vs-woocommerce-india", cat: "Web",
  keyword: "Shopify vs WooCommerce India",
  title: "Shopify vs WooCommerce in India: Fees, Gateways and GST",
  desc: "Shopify vs WooCommerce for an Indian online store: monthly fees, transaction fees with Indian payment gateways, GST invoices, maintenance, and which suits whom.",
  short: "Monthly fees, transaction fees with Indian gateways, GST invoices and maintenance compared.",
  headline: "Shopify vs WooCommerce in India: fees, payment gateways and GST invoices",
  crumb: "Shopify vs WooCommerce",
  cardTitle: "Shopify or WooCommerce for an Indian store?",
  card: "Platform fees, extra transaction fees with Indian gateways, GST invoices and upkeep: how the two compare for a small store.",
  h1: ["Shopify or WooCommerce for an Indian", "store?"],
  lede: "Both run thousands of Indian online stores. Both can take UPI, cards and cash on delivery, generate GST invoices and ship across the country. The real differences are in how you pay, who maintains it, and how much control you have.",
  intro: [
    "Here is a practical comparison for a small Indian business selling physical products, based on the platforms' published pricing at the time of writing. Fees change, so check the current Shopify India pricing page and your payment gateway's rates before you decide.",
  ],
  sections: [
    { h: "Shopify: a monthly subscription, hosting included",
      p: ["Shopify is a hosted platform. You pay a monthly plan, and Shopify handles hosting, security and updates. At the time of writing, Shopify's India pricing lists the Basic plan at around ₹1,499 a month on yearly billing (higher if billed monthly), with larger plans costing considerably more.",
         "You manage products, orders and settings from a polished dashboard, and there is a large app store for extras. Many apps charge their own monthly fees, which add up."] },
    { h: "Shopify's extra transaction fee in India",
      p: ["This is the cost people miss. Indian stores usually take payments through third-party gateways such as Razorpay, PayU or Cashfree. When you use a third-party gateway, Shopify adds its own transaction fee on top of the gateway's fee — listed at 2% on the Basic plan at the time of writing, lower on higher plans. On ₹1 lakh of monthly sales, that is an extra ₹2,000 before the gateway's own charge."],
      note: "Calculate total cost at your expected sales: plan fee + Shopify transaction fee + gateway fee + apps." },
    { h: "WooCommerce: free software, you run it",
      p: ["WooCommerce is a free plugin that turns a WordPress site into a store. There is no monthly platform fee and no platform transaction fee; you pay only your payment gateway's fee. You do pay for hosting (a store needs better hosting than a brochure site — roughly ₹8,000 to ₹15,000 a year), and possibly for premium plugins.",
         "The trade-off is responsibility. WordPress, WooCommerce and plugins need regular updates, backups and security care, either by you or someone you pay."] },
    { h: "GST invoices and Indian specifics",
      p: ["Both can produce GST-compliant invoices, typically through apps (Shopify) or plugins (WooCommerce), configured with your GSTIN, HSN codes and tax rates. Both integrate with Indian gateways for UPI and cards, and with shipping aggregators for courier booking and cash on delivery. Set these up carefully and have your accountant check a sample invoice before launch."] },
    { h: "Ownership and moving later",
      p: ["With WooCommerce, you own the site and data and can move to any host. With Shopify, you can export products, customers and orders, but the store design and setup stay on Shopify; moving means rebuilding the storefront elsewhere. Neither is a trap, but switching is a project either way.", "Whichever you pick, register the domain in your own name and keep the store account, gateway account and shipping account under your business email. Those accounts, not the platform, are what make the store yours."] },
  ],
  callout: {
    h: "The deciding question: who will look after it?",
    p: "If you want to focus entirely on products and marketing, have no one to handle updates, and are comfortable with a monthly fee plus a percentage, Shopify is simpler. If you want lower ongoing fees, full control, and have a developer or maintenance plan, WooCommerce usually costs less as sales grow.",
    quote: "Compare total yearly cost at the sales you expect, not the headline plan price.",
    after: "For very small catalogues, there is a third option: a simple website with payment links or buttons, and orders handled over WhatsApp. It is a sensible way to test demand before committing to either platform.",
  },
  extras: [
    { h: "A quick cost comparison to run",
      intro: "Fill this in with current prices and your own expected monthly sales:",
      box: `                         Shopify            WooCommerce
Platform fee / month     plan price         ₹0
Hosting / month          included           your host
Platform txn fee         % of sales         0%
Gateway fee              % of sales         % of sales
Paid apps / plugins      monthly            yearly
Maintenance              included           your time or plan`,
      paras: ["At low sales, Shopify's simplicity can be worth the fees. As sales grow, the percentage-based fees often make WooCommerce cheaper overall, provided it is properly maintained."] },
  ],
  faq: [
    ["Is Shopify or WooCommerce cheaper in India?", "WooCommerce has no platform or platform transaction fee, but needs hosting and maintenance. Shopify charges a monthly plan and, with third-party Indian gateways, an extra transaction fee. At low sales Shopify can be comparable; as sales grow, WooCommerce is often cheaper."],
    ["Does Shopify charge transaction fees in India?", "When you use a third-party payment gateway, Shopify charges its own transaction fee on top of the gateway's fee — listed at 2% on the Basic plan at the time of writing, and lower on higher plans. Check the current Shopify India pricing page."],
    ["Can WooCommerce and Shopify generate GST invoices?", "Yes, both can, usually through a plugin or app configured with your GSTIN, HSN codes and tax rates. Have your accountant review a sample invoice before going live."],
  ],
  related: [
    ["/ecommerce-website-design-chennai/", "Ecommerce website design in Chennai", "service"],
    ["/website-design-cost-chennai/", "What a website really costs in Chennai", "pricing"],
    ["/blog/upi-payments-on-website/", "Taking UPI payments on your website", "5 min"],
  ],
  cta: {
    h: "The right store for how you sell.",
    p: `I build ${ctaLink("/ecommerce-website-design-chennai/", "online stores")} from ₹45,000 for up to fifty products, live in four to six weeks, with Indian gateways, GST invoices and shipping set up. Tell me what you sell and your expected orders, and I'll recommend a platform.`,
  },
};
