const { ctaLink } = require("../h");
module.exports = {
  row: 16, date: "2026-10-16", slug: "video-editing-revisions", cat: "Video",
  keyword: "how many revisions for video editing",
  title: "Video Editing Revisions: How Many, and How to Give Feedback",
  desc: "How many revisions are normal for video editing, what counts as a revision round, and how to give timestamped feedback that gets the changes right the first time.",
  short: "What counts as a revision round, and how to give timestamped feedback that gets it right first time.",
  headline: "How many revisions for video editing, and how to give feedback that works",
  crumb: "Video editing revisions",
  cardTitle: "How to give video feedback that works",
  card: "What counts as a revision round, why two is normal, and how timestamped notes save you money and days.",
  h1: ["How to give video feedback that", "works"],
  lede: "The first draft arrives. Something feels off, but you are not sure what. You send a voice note, then a few texts, then your partner adds their thoughts the next day. A week later, you are on draft five and still not happy.",
  intro: [
    "Revisions are where most editing projects slow down and where most disagreements about cost begin. Almost always, the problem is not the editor's skill or the client's taste. It is how feedback was given. Here is what is normal, what counts as a revision, and how to give notes that get things right the first time.",
  ],
  sections: [
    { h: "Two rounds is normal",
      p: ["Most editors include two rounds of revisions in their price. That is what I include on everything. Two rounds is enough when feedback is clear: the first round fixes the big things, the second polishes the details. Beyond that, extra rounds are usually charged — mine are ₹800 a round for short-form and ₹2,000 for long-form."],
      note: "If a quote says \"unlimited revisions\", ask what that means in practice. It usually means fewer rounds than you would think, or a lower starting quality." },
    { h: "What counts as one round",
      p: ["One round is one consolidated set of feedback from you, applied together. If you send three separate messages over three days, that can count as three rounds, because each one means reopening the project, making changes and exporting again. Collect everyone's notes first, then send them together.", "It works the same way on the editor's side: a good editor applies the whole list in one pass and sends back a single new draft, ideally with a short note saying what changed and anything they could not do and why."] },
    { h: "Revision vs new request",
      p: ["Changing the order of two shots, swapping a song, fixing a caption, trimming a section — those are revisions. Changing the video's purpose, adding new footage, asking for a completely different style, or making a second version for another platform are new work. It is worth agreeing this distinction before the project starts, so nobody is surprised later."] },
    { h: "Give timestamps, not feelings",
      p: ["\"It feels slow\" is hard to act on. \"0:12–0:20 feels slow, can we cut to the product sooner?\" is easy. Watch the draft with a pen and note the time of every point you want changed. Most players show the time as you scrub; on your phone, pause and write it down."],
      note: "Format: timestamp, what you see, what you want instead. One line per note." },
    { h: "Say what is wrong, not only how to fix it",
      p: ["If you think a section should be cut, say why: \"too long\", \"this person looks uncomfortable\", \"the message is unclear\". Sometimes the editor will have a better fix than the one you suggested — a different shot, a caption, a reordering — but only if they know what problem they are solving.", "Be just as clear about what you like. \"Keep the opening exactly as it is\" or \"the music is perfect\" protects the parts that work from being changed by accident while the editor fixes everything else."] },
  ],
  callout: {
    h: "One decision-maker",
    p: "The biggest cause of endless revisions is not the editor. It is several people giving feedback separately, often contradicting each other. The founder wants it shorter; the marketing head wants more product shots; the partner hates the music.",
    quote: "Collect everyone's opinions, agree internally, then send one list.",
    after: "Pick one person to make final calls and send feedback. The editor can then work on a clear brief instead of trying to please three people who disagree.",
  },
  extras: [
    { h: "A feedback template you can copy",
      box: `Draft: v1   Overall: (one line — what works, what doesn't)

0:03  Logo comes in too late — show it in the first second
0:12–0:20  Feels slow — cut straight to the product
0:41  Caption typo: "recieve" → "receive"
1:05  Swap this shot for the one with the customer smiling (clip 14)
End  Add phone number and WhatsApp on the last frame

Music: keep / change (if change, reference: link)`,
      paras: ["One message like this replaces an evening of voice notes and gets you a much closer second draft."] },
    { h: "Before you send feedback",
      list: [
        ["Watch it twice.", "Once as a viewer, once with a pen."],
        ["Watch it where it will be seen.", "A reel on a phone, a corporate video on a laptop or TV."],
        ["Check the brief.", "Is your note about the brief, or a new idea? Both are fine, but they are different."],
        ["Prioritise.", "Mark must-fix items separately from nice-to-haves."],
      ] },
  ],
  faq: [
    ["How many revisions are normal for video editing?", "Two rounds is standard for most freelance editors. Extra rounds are usually charged, so it pays to make each round count by sending all feedback together."],
    ["What is the best way to give feedback on a video?", "Write a list of timestamped notes: the time, what you see, and what you want instead. Send everything in one message from one decision-maker."],
    ["Do I pay for revisions if the editor made a mistake?", "No. Fixing the editor's errors — typos they introduced, a missed instruction from the brief, a wrong logo — should never count as a revision round."],
  ],
  related: [
    ["/video-editing-chennai/", "Video editing in Chennai", "service"],
    ["/pricing/", "All pricing", "pricing"],
    ["/blog/what-to-send-video-editor/", "How to send footage to your editor", "6 min"],
  ],
  cta: {
    h: "Two rounds, clear notes, done on time.",
    p: `Every ${ctaLink("/video-editing-chennai/", "editing project")} with me includes two revision rounds and this feedback template, so drafts move forward instead of in circles. Tell me what you are making.`,
  },
};
