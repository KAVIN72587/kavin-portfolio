const { ctaLink } = require("../h");
module.exports = {
  row: 24, date: "2026-10-24", slug: "video-aspect-ratios", cat: "Video",
  keyword: "video size for Instagram reels, YouTube, LinkedIn",
  title: "Video Size for Reels, YouTube and LinkedIn: One Shoot",
  desc: "Video sizes for Instagram Reels, YouTube, LinkedIn and your website: 9:16, 16:9, 4:5 and 1:1 explained, and how to shoot once and export for every platform.",
  short: "9:16, 16:9, 4:5 and 1:1 explained, and how to shoot once and export for every platform.",
  headline: "Video size for Instagram Reels, YouTube and LinkedIn: shoot once, export for every platform",
  crumb: "Video sizes by platform",
  cardTitle: "One shoot, every video size",
  card: "9:16, 16:9, 4:5, 1:1 — which platform wants which, and how to shoot so one video works everywhere.",
  h1: ["One shoot, every", "video size"],
  lede: "You made a lovely horizontal video for your website. Now you want it on Reels, and suddenly the logo is cut off, the speaker's head is half out of frame, and the text is unreadable. The problem started on shoot day, not in the edit.",
  intro: [
    "Each platform prefers a different shape of video. If you know that before filming, one shoot can produce versions for all of them with very little extra effort. Here is what each shape is for, and how to plan for all of them at once.",
  ],
  sections: [
    { h: "9:16 vertical — Reels, Shorts, Stories",
      p: ["Full-screen vertical video, usually exported at 1080 × 1920 pixels. This is the native shape for Instagram Reels and Stories, YouTube Shorts, and full-screen vertical video on most social apps. On a phone it fills the entire screen, which is why it holds attention so well.",
         "Keep text and faces away from the very top and bottom, where the app places buttons, captions and the profile name."],
      note: "The safe zone: keep important things roughly in the middle two-thirds of a vertical frame." },
    { h: "16:9 horizontal — YouTube, websites, presentations",
      p: ["The classic widescreen shape, usually 1920 × 1080 (or 3840 × 2160 for 4K). It is right for long-form YouTube, website videos, TVs, event screens and presentations. On a phone held upright it appears as a small strip, which is why horizontal videos underperform in social feeds.", "It is still worth making the horizontal version properly, even if social is your focus. Your website, a YouTube channel, a client presentation and a screen at an event all want 16:9, and a horizontal master with clean framing is the easiest version to cut everything else from."] },
    { h: "4:5 portrait — feed posts",
      p: ["A slightly tall rectangle, 1080 × 1350, that takes up more of the screen than a square in Instagram and Facebook feeds. It is a good choice for feed videos and ads when you are not posting as a Reel. Instagram's profile grid now previews posts in a taller shape too, so check how the cover looks in your grid."] },
    { h: "1:1 square — the safe middle",
      p: ["1080 × 1080. Square video was once the default for social feeds. It is still a reasonable all-rounder for LinkedIn feeds and ads, and it is the easiest shape to cut from either vertical or horizontal footage, because the middle of almost any frame is square."] },
    { h: "LinkedIn and the rest",
      p: ["LinkedIn accepts horizontal, square and vertical video in the feed; vertical and square take up more space on mobile, where most people scroll. Platform specifications change from time to time, so check each platform's current guidance before a big campaign — but the principle stays the same: the more of the phone screen your video fills, the better it tends to do."] },
  ],
  callout: {
    h: "Shoot wide, frame centre",
    p: "The simplest way to get every shape from one shoot: film horizontally, in 4K if you can, with your subject in the middle of the frame and plenty of space around them. In the edit, that frame can be cropped to vertical, square and portrait without losing anything important.",
    quote: "Frame for the tightest crop you will need, and every wider version comes free.",
    after: "If most of your output is Reels and Shorts, it is often better to shoot vertically and accept that the horizontal version will be a designed layout rather than a straight crop.",
  },
  extras: [
    { h: "Export settings that work almost everywhere",
      box: `Vertical (Reels, Shorts, Stories):  1080 × 1920, 9:16
Horizontal (YouTube, website):       1920 × 1080, 16:9
Portrait feed:                        1080 × 1350, 4:5
Square:                               1080 × 1080, 1:1

Format: MP4 (H.264), AAC audio
Frame rate: same as shot (usually 30 fps)`,
      paras: ["Check the current maximum length and file size for each platform before exporting long videos. These limits change more often than the shapes do."] },
    { h: "Text and captions need reworking for each shape",
      paras: ["Cropping the picture is not enough. A caption placed at the bottom of a horizontal video may be cut off in a vertical crop or covered by the app's buttons. Titles sized for a widescreen TV become tiny on a phone. Each version needs its text repositioned and resized — a small job if planned, an annoying one if not. When you brief an editor, list every platform the video is going to, so these versions are built in from the start."] },
  ],
  faq: [
    ["What size should an Instagram Reel be?", "1080 × 1920 pixels, a 9:16 vertical ratio. Keep text and faces in the middle of the frame, away from the top and bottom edges where Instagram places its buttons and captions."],
    ["Can I post a horizontal YouTube video as a Reel?", "You can, but it will appear small with large empty bars, and it usually performs poorly. It is better to recrop it to vertical, reframing each shot on the speaker or subject."],
    ["What is the best video size for LinkedIn?", "LinkedIn supports horizontal, square and vertical video. On mobile, where most people scroll, square or vertical videos take up more of the screen and usually get more attention."],
  ],
  related: [
    ["/video-editing-chennai/", "Video editing in Chennai", "service"],
    ["/video-editing-charges-chennai/", "Video editing charges, explained", "pricing"],
    ["/blog/phone-footage-for-editing/", "Shooting on a phone for a professional edit", "5 min"],
  ],
  cta: {
    h: "Every platform, from one shoot.",
    p: `I ${ctaLink("/video-editing-chennai/", "edit videos")} into every shape you need — vertical, horizontal, square, portrait — with text and captions placed for each platform. Tell me where your video will go before you shoot, and I'll tell you how to frame it.`,
  },
};
