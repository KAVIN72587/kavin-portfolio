const { ctaLink } = require("../h");
module.exports = {
  row: 19, date: "2026-10-19", slug: "whatsapp-button-on-website", cat: "Web",
  keyword: "add WhatsApp button to website",
  title: "How to Add a WhatsApp Button to Your Website, Properly",
  desc: "How to add a WhatsApp button to your website the right way: the click-to-chat link, a prefilled message, where to place it, and how to see which pages bring chats.",
  short: "Click-to-chat done right: the link, a prefilled message, placement, and tracking.",
  headline: "How to add a WhatsApp button to your website: click-to-chat done right",
  crumb: "WhatsApp button",
  cardTitle: "The WhatsApp button, done properly",
  card: "The click-to-chat link, a prefilled first message, where to put the button, and how to tell which pages bring chats.",
  h1: ["The WhatsApp button, done", "properly"],
  lede: "For many Indian businesses, WhatsApp is where enquiries really happen. People who would never fill in a form will happily send a message. A WhatsApp button on your website is the simplest change that brings in more conversations — if it is set up properly.",
  intro: [
    "Most sites get it half right: a green icon in the corner that opens a blank chat. The visitor then has to work out what to type, and the business receives \"Hi\" with no idea which service or page it came from. A few small changes fix both problems.",
  ],
  sections: [
    { h: "Use the official click-to-chat link",
      p: ["WhatsApp provides a simple link format: <strong>https://wa.me/</strong> followed by your full number with country code, without the plus sign, spaces or leading zero. For an Indian mobile number, that means 91 followed by the ten digits. The link works on phones (opening the app) and on computers (opening WhatsApp Web or the desktop app).",
         "No plugin is needed. A button or link with that address is all it takes, and it does not slow your site down the way some chat widgets do."],
      note: "Test the link on a phone that does not have your number saved. It should open a chat with your business straight away." },
    { h: "Add a prefilled first message",
      p: ["You can add text to the link so the chat opens with a message already typed, for example \"Hi, I'd like a quote for a birthday cake\". The visitor can edit it or just press send. It removes the awkward blank screen, and it tells you immediately what they want.",
         "Use a different message on each page: the bridal page asks about bridal makeup, the pricing page says \"I have a question about your packages\". You will know where every enquiry came from without any tracking software."] },
    { h: "Put it where people decide",
      p: ["A floating button in the bottom corner is useful, because it is always there. But do not rely on it alone. Put a clear, labelled button — \"Chat on WhatsApp\" — next to prices, at the end of each service description, and on the contact page. People act at the moment they have enough information, so the button should be there at that moment.",
         "On mobile, make sure the floating button does not cover other important buttons or the cookie notice."] },
    { h: "Use a number someone actually answers",
      p: ["A WhatsApp button creates an expectation of a quick reply. If messages wait a day, you have turned a hot lead into a cold one. Use WhatsApp Business, set an away message for after-hours that says when you will reply, and use quick replies for the questions you answer every day — prices, location, timings."] },
    { h: "Measure which pages bring chats",
      p: ["Prefilled messages already tell you a lot. If you use website analytics, you can also count clicks on the WhatsApp button as an event, so you can see which pages and which campaigns produce conversations. That is far more useful than counting page views, because a chat is a real lead."] },
  ],
  callout: {
    h: "Keep a form as well",
    p: "WhatsApp is not everyone's choice. Some people are browsing at work, some prefer to write in detail, some do not want to share their number yet. A short form beside the WhatsApp button catches those enquiries too.",
    quote: "Offer two easy ways to reach you. Not five, and not one.",
    after: "Phone and WhatsApp for people who want speed, and a form for people who want to write. Anything more — Telegram, Messenger, email, three phone numbers — makes the choice harder, not easier.",
  },
  extras: [
    { h: "Prefilled messages that work",
      intro: "Write them as your customer would, short and specific:",
      box: `Home page:      Hi, I found you on your website and have a question.
Service page:   Hi, I'd like to know more about [service] and the price.
Pricing page:   Hi, which package would suit me? I need …
Offer page:     Hi, I saw the [offer name] offer. Is it still available?
Contact page:   Hi, I'd like to book an appointment for …`,
      paras: ["Ending with \"I need …\" or \"for …\" invites the visitor to finish the sentence, which gives you the details you would otherwise have to ask for."] },
    { h: "Common mistakes",
      list: [
        ["Including the + or 0 in the number.", "The link may fail to open a chat."],
        ["A personal number that is switched off at night.", "Use a WhatsApp Business number with an away message."],
        ["A widget that loads a heavy script.", "A plain link does the same job without slowing the page."],
        ["The button covering the menu or other buttons on mobile.", "Check every page on a small phone."],
      ] },
  ],
  faq: [
    ["How do I create a WhatsApp link for my website?", "Use https://wa.me/ followed by your number in international format without the plus, spaces or dashes — for India, 91 and then your ten-digit number. Add ?text= and a URL-encoded message to prefill the chat."],
    ["Do I need a plugin to add a WhatsApp button?", "No. A plain link or button pointing to your wa.me address is enough and keeps the site fast. Plugins mainly add styling or multiple agents, which most small businesses do not need."],
    ["Should I use WhatsApp Business for website enquiries?", "Yes. It is free and adds a business profile, an away message, quick replies and labels for organising chats, which make handling website enquiries much easier."],
  ],
  related: [
    ["/low-cost-website-design-chennai/", "Low-cost business websites", "service"],
    ["/website-design-cost-chennai/", "What a website really costs in Chennai", "pricing"],
    ["/blog/contact-form-not-working/", "Your contact form might be losing leads", "5 min"],
  ],
  cta: {
    h: "More chats, from the right pages.",
    p: `Every ${ctaLink("/low-cost-website-design-chennai/", "site I build")} has WhatsApp buttons with page-specific messages, placed where people decide. Want it added to your existing site? Send me the address.`,
  },
};
