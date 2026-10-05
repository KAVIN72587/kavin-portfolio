const { ctaLink } = require("../h");
module.exports = {
  row: 112, date: "2026-10-27", slug: "website-background-video", cat: "Video",
  keyword: "background video for website hero",
  title: "Background Video on Your Website: Done Right or Not at All",
  desc: "When a background video helps a website and when it hurts: file size, length, mobile, accessibility and how to edit footage into a loop that loads fast.",
  short: "When it helps, when it hurts, file size, length, mobile, accessibility and editing a loop.",
  headline: "Background video on your website: when it helps and how to do it right",
  crumb: "Website background video",
  cardTitle: "The website background video, done right",
  card: "A looping hero video can look great or eat mobile data and hide your message. How to edit one that works.",
  h1: ["The website background video, done", "right"],
  lede: "A short, silent video looping behind the headline on a homepage can make a business feel alive: a kitchen in action, a factory floor, a resort's pool at sunset. Done carelessly, it is a heavy file that slows the page, distracts from the message and drains visitors' mobile data.",
  intro: [
    "Here is when a background video genuinely helps, the technical limits to respect, and how to edit footage into a loop that looks good and loads quickly.",
  ],
  sections: [
    { h: "When it helps",
      p: ["Background video works when motion shows something a still photo cannot: the atmosphere of a restaurant, a process in action, the scale of a venue, the energy of an event. It suits hospitality, food, events, manufacturing and creative businesses. For many service businesses, a strong still photo communicates just as well with none of the cost.", "It works best when the footage is genuinely yours. A loop of your actual kitchen, your actual team or your actual venue makes the first impression specific to you. A generic stock clip of a city skyline or people in an office adds weight to the page and tells visitors nothing they could not guess."] },
    { h: "When it hurts",
      p: ["When it slows the first screen on mobile, when it competes with the headline so visitors cannot read it, when it is generic stock footage that says nothing about your business, or when it is the only way key information is shown. If the page works worse with the video than without, remove it."] },
    { h: "Keep it short and small",
      p: ["Five to fifteen seconds is usually enough for a loop. Export at a modest resolution, such as 1280 or 1920 pixels wide, compressed heavily. Background video does not need the quality of a featured film; it sits behind text and often under a dark overlay. Aim for a file of a few megabytes at most."],
      note: "Remove the audio track entirely. Background videos should be silent, and a silent file is smaller." },
    { h: "Make it loop seamlessly",
      p: ["A visible jump at the loop point looks amateur. Choose footage with continuous motion, such as steam, water, a slow pan or people moving, and edit so the end flows into the start. A gentle crossfade at the loop point can hide the join. Avoid shots with obvious beginnings and endings, such as someone walking in and out of frame."] },
    { h: "Keep the headline readable",
      p: ["Text over moving footage is hard to read. Use a dark or coloured overlay, choose calm footage without busy detail behind the text area, or place the text beside the video rather than on top. Test readability on a phone in daylight."] },
    { h: "Mobile and data",
      p: ["Many visitors browse on mobile data. Consider showing a still image instead of the video on phones, or a smaller, lighter version. Always provide a poster image that appears immediately while the video loads, so the first screen never looks empty."] },
    { h: "Accessibility",
      p: ["Constant motion can distract or discomfort some visitors. Respect the \"reduce motion\" setting many devices offer, by showing a still image when it is enabled, and consider a small pause button. Never put essential information only in the video."] },
    { h: "Shooting footage for a loop",
      p: ["If you are filming specifically for a background video, plan for it. Use a tripod or a very smooth slow movement, shoot several long takes of fifteen to thirty seconds each, and avoid people looking into the camera. Leave space in the frame where the headline will sit, usually the centre or left side. Calm, continuous action, such as a chef plating, waves on sand or machines running steadily, gives the editor the best chance of a seamless loop."] },
  ],
  callout: {
    h: "Motion should support the message",
    p: "The headline is still the most important thing on the first screen. A background video should add atmosphere around it, not compete with it. If visitors remember the video but not what you do, it is working against you.",
    quote: "Short, silent, light and behind the message, not in front of it.",
    after: "Test the page with and without the video. If enquiries or time on page do not improve with it, a strong photo may be the better choice.",
  },
  extras: [
    { h: "Background video spec",
      box: `Length        5–15 seconds, seamless loop
Resolution    1280–1920 px wide
Format        MP4 (H.264), optional WebM
Audio         none (track removed)
File size     a few MB at most
Fallback      poster image; still image on mobile
              or when reduce-motion is on`,
      paras: ["Hand this spec to your editor and web developer together, so the video is edited and embedded with the same goals in mind."] },
  ],
  faq: [
    ["Do background videos slow down websites?", "They can, especially on mobile data. Keeping them short, small, silent and compressed, with a poster image and a mobile fallback, limits the impact."],
    ["How long should a website background video be?", "Usually five to fifteen seconds, edited to loop seamlessly."],
    ["Should a background video have sound?", "No. Background videos should be silent; remove the audio track entirely. Browsers generally block autoplaying video with sound anyway."],
  ],
  related: [
    ["/video-editing-chennai/", "Video editing in Chennai", "service"],
    ["/video-editing-charges-chennai/", "Video editing charges in Chennai", "pricing"],
    ["/blog/slow-website-mobile/", "Why your website is slow on mobile", "5 min"],
  ],
  cta: {
    h: "A loop that loads fast.",
    p: `I edit ${ctaLink("/video-editing-chennai/", "website background videos")} as seamless, silent, lightweight loops with poster images, and as a web designer I know how they will be embedded. Send me your footage.`,
  },
};
