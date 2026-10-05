const { ctaLink } = require("../h");
module.exports = {
  row: 76, date: "2026-10-15", slug: "video-file-formats", cat: "Video",
  keyword: "MP4 vs MOV video file formats explained",
  title: "MP4, MOV, ProRes: Video File Formats Explained Simply",
  desc: "MP4, MOV, H.264, H.265 and ProRes explained in plain English: which files to send your editor, which to ask for back, and which to upload where.",
  short: "Which video files to send your editor, which to ask for back, and which to upload where.",
  headline: "Video file formats explained: MP4, MOV, H.264, H.265 and ProRes",
  crumb: "Video file formats",
  cardTitle: "MP4, MOV or ProRes? Video files explained",
  card: "What the letters mean, which files to send your editor, and which version to upload to each platform.",
  h1: ["MP4, MOV or ProRes? Video files", "explained"],
  lede: "Your editor asks for \"original files, not compressed\". Your videographer delivers a folder of MOVs that will not play on your laptop. Your website developer wants \"an MP4 under 10 MB\". Video file formats are confusing, but you only need to understand a few ideas to get the right file every time.",
  intro: [
    "Here is the difference between a container and a codec, the formats you will meet most often, what to send to an editor and what to ask for back.",
  ],
  sections: [
    { h: "Container vs codec",
      p: ["MP4 and MOV are containers: the box that holds video, audio and some information about them. H.264, H.265 (also called HEVC) and ProRes are codecs: the method used to compress the video inside the box. An MP4 and a MOV can both contain H.264 video. That is why two files with the same extension can behave very differently.",
         "When someone asks for \"MP4\", they almost always mean an MP4 containing H.264 video, the most widely compatible combination."] },
    { h: "H.264: the universal format",
      p: ["H.264 is the format that plays almost everywhere: phones, laptops, smart TVs, websites, WhatsApp and every social platform. It compresses well and is the right choice for most final deliveries. If in doubt, ask for MP4 with H.264.", "Its only real drawback is file size at very high quality, which is why it is used for delivery rather than for editing masters or long-term archives where every bit of detail matters."] },
    { h: "H.265 / HEVC: smaller, less compatible",
      p: ["H.265 gives similar quality at a smaller file size. Many phones, including iPhones by default, record in it. But older computers, some software and some platforms struggle with it. Videos that will not play on a laptop, or play choppily, are often H.265. It is fine for footage you send to an editor; for final files that must play everywhere, H.264 is safer."],
      note: "On iPhone, the \"High Efficiency\" camera setting records HEVC; \"Most Compatible\" records H.264." },
    { h: "ProRes: for editing, not sharing",
      p: ["ProRes is a high-quality format used during editing and for masters. Files are very large, but they keep quality through repeated processing. Professional cameras and some phones can record ProRes. You might receive a ProRes master from an editor for archiving or for a TV broadcast or cinema screening. For social media or your website, ask for an H.264 MP4 instead."] },
    { h: "What to send your editor",
      p: ["Send the original files exactly as they came off the camera or phone, without converting, trimming or sending through WhatsApp. WhatsApp, and many messaging apps, compress video heavily, which removes detail the editor needs. Use Google Drive, WeTransfer, a shared folder or a hard drive. Keep the original file names; they often contain useful information."] },
    { h: "What to ask for back",
      p: ["For most projects: an H.264 MP4 for each platform at the right size (vertical for reels, horizontal for YouTube), plus a high-quality master, such as a high-bitrate MP4 or ProRes, to keep for the future. For a website background video, ask for a short, small, silent MP4 optimised for web. For subtitles, ask for an SRT file as well."] },
    { h: "File size is not quality",
      p: ["A larger file is not automatically better, and a smaller one is not automatically worse. Quality depends on the codec, the bitrate and the content. A well-encoded 50 MB MP4 can look better than a carelessly encoded 200 MB file. What matters is that the file suits where it is going: high quality for archiving and editing, efficient for streaming and sharing."] },
  ],
  callout: {
    h: "Keep a master",
    p: "Final social media files are compressed for the platform. If you later need the same video for an ad, a TV screen at an event or a new platform, re-exporting from a high-quality master gives a far better result than reusing a compressed social file.",
    quote: "Archive the master, share the MP4.",
    after: "Store masters and original footage in two places, such as a hard drive and a cloud folder, labelled by project and date.",
  },
  extras: [
    { h: "Quick format guide",
      box: `Send to editor     Originals, as recorded (MOV / MP4, any codec)
Social media       MP4, H.264, platform size
YouTube            MP4, H.264, 16:9, high bitrate
Website            MP4, H.264, short, small, no audio
Archive / TV       High-bitrate MP4 or ProRes master
Never              Files sent through WhatsApp`,
      paras: ["Pin this list somewhere your team can see it. Most file problems on business video projects come from someone, somewhere, sending a compressed copy instead of the original."] },
  ],
  faq: [
    ["Is MP4 or MOV better?", "Neither is better by itself; both are containers. For final videos, MP4 with H.264 plays almost everywhere. MOV is common for camera originals and ProRes masters."],
    ["Why won't my iPhone video play on my laptop?", "It is probably recorded in HEVC (H.265), which some older computers and software do not play smoothly. Converting to H.264, or changing the iPhone camera setting to Most Compatible, solves it."],
    ["What file format should I send to a video editor?", "The original files exactly as recorded, sent via a cloud folder or drive, not WhatsApp. Do not convert or compress them first."],
  ],
  related: [
    ["/video-editing-chennai/", "Video editing in Chennai", "service"],
    ["/video-editing-charges-chennai/", "Video editing charges in Chennai", "pricing"],
    ["/blog/what-to-send-video-editor/", "How to send footage to your editor", "5 min"],
  ],
  cta: {
    h: "The right file for every screen.",
    p: `Every ${ctaLink("/video-editing-chennai/", "project I edit")} is delivered as platform-ready MP4s plus a high-quality master, so you never need to ask for a re-export later. Send me your footage and tell me where it will play.`,
  },
};
