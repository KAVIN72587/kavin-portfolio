const { ctaLink } = require("../h");
module.exports = {
  row: 4, date: "2026-10-04", slug: "what-to-send-video-editor", cat: "Video",
  keyword: "how to send raw footage to a video editor",
  title: "How to Send Raw Footage to a Video Editor (Without Delays)",
  desc: "How to send raw footage to a video editor: Drive links, original file quality, folder names and timestamped notes. The handover that saves a week of back-and-forth.",
  short: "Drive links, original quality, folder names and timestamped notes: the handover that saves a week.",
  headline: "How to send raw footage to a video editor: the handover that saves a week",
  crumb: "Sending footage to an editor",
  cardTitle: "How to send footage to your editor",
  card: "Original files, sensible folders and timestamped notes. The ten-minute handover that saves a week of back-and-forth.",
  h1: ["How to send footage to your editor without losing a", "week"],
  lede: "The edit does not start when the editor opens the software. It starts when they can find, open and understand your files. For many projects, that takes longer than the edit itself.",
  intro: [
    "A common situation: forty clips arrive over WhatsApp in three batches, compressed, half of them named IMG_4471, with a voice note saying \"use the good ones\". The editor spends a day sorting, then asks questions, then waits for answers. Nobody did anything wrong. It just was not handed over.",
    "Here is how to send footage so the first draft comes back days sooner.",
  ],
  sections: [
    { h: "Never send footage through WhatsApp",
      p: ["WhatsApp compresses video to save data. A crisp 4K clip from your phone arrives as a soft, blocky file a fraction of the size. It looks fine on a phone screen and falls apart on a laptop, and once compressed, the detail cannot be brought back. Even WhatsApp's document mode, which avoids compression, has a file-size limit that long clips easily exceed."],
      note: "Use Google Drive, Dropbox, WeTransfer or OneDrive. Upload the original files, straight from the phone or camera." },
    { h: "Upload originals, not exports",
      p: ["Send the files exactly as the camera made them. Do not trim them, do not add filters, and do not run them through an app first. If you shot on an iPhone, AirDrop or a cable to a computer keeps the original quality; some cloud apps quietly upload a smaller version unless you change the setting."] },
    { h: "Name folders the way you would explain them",
      p: ["You do not need to rename every clip. You do need folders that make sense to someone who was not there: <em>01 Interview</em>, <em>02 Shop exterior</em>, <em>03 Product close-ups</em>, <em>04 Logo and music</em>. If the footage spans several days or cameras, add a folder per day or per camera. Ten minutes of sorting on your side saves an hour on mine."] },
    { h: "Write notes with timestamps",
      p: ["\"Use the good take\" means nothing to someone who has not met you. \"Clip 7, from 0:42 to 1:15 — this is the answer we want\" means everything. If you know which moments matter, which ones to avoid, or which person must not appear, write it down with the clip name and time."],
      note: "A short text file in the folder called READ ME FIRST is the single most useful thing you can send." },
    { h: "Send the brand pieces with the footage",
      p: ["Logo files (ideally PNG with a transparent background, or vector), your brand colours, the fonts you use, music you have licensed, and any end screen or contact details that must appear. If these arrive a week after the footage, the first draft either waits or has to be redone."] },
  ],
  callout: {
    h: "One reference is worth a page of instructions",
    p: "Describing the style you want is hard. \"Energetic but classy\" means something different to everyone. Sending one or two videos you like — a reel, an ad, a YouTube intro — and saying what you like about each is far clearer.",
    quote: "\"Like this, but slower\" beats three paragraphs of adjectives.",
    after: "Be specific about what you are pointing at: the captions, the pace, the colour, the music, the way it opens. You are not asking for a copy, you are giving the editor a direction.",
  },
  extras: [
    { h: "A handover checklist",
      intro: "Copy this into your message when you share the folder.",
      box: `Project: (one line on what the video is for)
Where it will be posted: (Instagram, YouTube, website, ad)
Length: (target duration)
Deadline: (the date you need the final, not the draft)
Must include: (people, products, logo, contact details)
Must avoid: (anyone or anything that should not appear)
References: (1–2 links, with what you like about each)
Folder link: (Drive or Dropbox, set to "anyone with the link")`,
      paras: ["Check the sharing setting before you send. A link that says \"request access\" costs a day if the editor is working while you are asleep."] },
    { h: "If several people shot the footage",
      intro: "Events, shop launches and family functions often end up with clips from four or five phones. That is fine, as long as the editor knows whose is whose.",
      list: [
        ["One folder per person or camera.", "Name it after them: <em>Ravi phone</em>, <em>Main camera</em>, <em>Drone</em>. It helps match angles of the same moment."],
        ["Upload everything, not favourites.", "Let the editor choose. The shaky clip you skipped may hold the one reaction that makes the video."],
        ["Mention which clips have the best sound.", "If one phone was near the speaker, say so. Clean audio decides which angle gets used."],
        ["Keep the dates and times right.", "Do not edit file names or metadata. Editors line up multiple cameras using the time each clip was recorded."],
      ] },
  ],
  faq: [
    ["What is the best way to send large video files to an editor?", "Upload the original files to Google Drive, Dropbox, OneDrive or WeTransfer and share the link with view or download access. Avoid WhatsApp, which compresses video, and avoid email, which cannot carry large files."],
    ["Should I cut the clips myself before sending?", "No. Send the full original clips and use notes with timestamps to point out the parts you want. Trimming on a phone can re-compress the file, and the editor often needs the second or two before and after a moment for a clean cut."],
    ["How long should I keep the raw footage?", "At least until the final video is approved and you have downloaded it. Ideally keep the raw files on a drive you own for a year, in case you want a new cut, a shorter version or a different format later."],
  ],
  related: [
    ["/video-editing-chennai/", "Video editing in Chennai", "service"],
    ["/video-editing-charges-chennai/", "Video editing charges, explained", "pricing"],
    ["/blog/reels-editing-price/", "Why one reel costs ₹300 here and ₹15,000 there", "5 min"],
  ],
  cta: {
    h: "Send the footage. I'll handle the rest.",
    p: `For every ${ctaLink("/video-editing-chennai/", "editing project")} I send a shared folder and this checklist up front, so the first draft comes back on time. Not sure what you have is usable? Share a clip and ask.`,
  },
};
