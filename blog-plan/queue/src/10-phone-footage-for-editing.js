const { ctaLink } = require("../h");
module.exports = {
  row: 10, date: "2026-10-10", slug: "phone-footage-for-editing", cat: "Video",
  keyword: "can you edit video shot on a phone",
  title: "Can a Phone Video Look Professional? Shoot for the Edit",
  desc: "Yes, video shot on a phone can be edited to look professional. How to shoot on your phone so the edit works: light, sound, steadiness, settings and framing.",
  short: "Light, sound, steadiness and framing: how to shoot on a phone so the edit looks professional.",
  headline: "Can you edit video shot on a phone? How to shoot so the edit looks professional",
  crumb: "Shooting on a phone",
  cardTitle: "Shooting on a phone for a professional edit",
  card: "Your phone is good enough. Light, sound and a steady hand decide whether the edit looks professional.",
  h1: ["Your phone is good enough. Your", "light might not be."],
  lede: "\"Can you make this look professional? It's just shot on my phone.\" Usually, yes. Phones made in the last few years record better video than many cameras did a decade ago. What separates a polished edit from an amateur one is rarely the phone.",
  intro: [
    "It is light, sound and steadiness. An editor can do a lot with colour, cuts, captions and music, but cannot invent detail that was never recorded or remove a ceiling fan's hum without side effects. Get those three right while shooting and the edit can look like it came from a crew.",
  ],
  sections: [
    { h: "Light: face the window",
      p: ["The single biggest improvement is free. Stand facing a window, not with your back to it. Soft daylight falling on your face from the front or side makes skin look natural and keeps the phone from struggling. Avoid harsh overhead tube lights and direct midday sun, which both create hard shadows under the eyes.",
         "In a dim shop or a room at night, a cheap LED panel behind the phone is worth more than a new phone."],
      note: "If your face looks grainy in the preview, there is not enough light. The edit cannot fix grain cleanly." },
    { h: "Sound: get the microphone close",
      p: ["Viewers forgive average video far more than bad audio. The phone's built-in microphone is fine at arm's length in a quiet room and poor everywhere else. A clip-on lapel mic that plugs into the phone, or a small wireless set, costs less than a day's shoot and transforms talking videos.",
         "Switch off fans and AC while recording if you can, close the windows to traffic, and record somewhere with curtains or furniture rather than an empty tiled room that echoes."] },
    { h: "Steadiness: lean, rest, or use a tripod",
      p: ["Shaky footage can be stabilised in editing, but it crops the picture and can look wobbly. A small tripod or a phone clamp keeps talking shots rock-steady. For moving shots, hold the phone with both hands close to your body and walk slowly. The phone's own stabilisation helps, but does not replace a steady hand."] },
    { h: "Settings: keep them simple and consistent",
      p: ["Record at 1080p or 4K, at 30 frames per second unless you specifically want slow motion. Use the main (1x) camera rather than ultra-wide or digital zoom — it is the best lens on almost every phone. Wipe the lens before every shoot; a fingerprint smudge makes everything look hazy and cannot be fixed later.",
         "Use the same settings for every clip in one video. Mixing frame rates and lenses makes the edit look patched together."],
      note: "Clear storage before you start. Running out of space mid-take is the most common phone shoot disaster." },
    { h: "Framing: think about where it will be posted",
      p: ["Hold the phone vertically for Reels and Shorts, horizontally for YouTube and websites. If you need both, shoot horizontally with your subject in the centre and leave space around them, so a vertical crop is possible. Keep your eyes roughly a third of the way down the frame, not in the middle.", "Leave a little room above your head and do not cut people off at the joints — mid-knee or mid-elbow looks awkward. For product shots, clear the background first: a tidy counter or a plain wall makes the product the obvious subject, and saves the editor from cropping around clutter."] },
  ],
  callout: {
    h: "Shoot more than you need",
    p: "The most useful thing you can give an editor is choice. Record each line two or three times. Film a few seconds before and after each action. Capture extra shots of your hands working, the product, the shop sign, the street outside. These are called B-roll, and they are what make an edit feel professional.",
    quote: "An editor can always cut. An editor cannot add what was never filmed.",
    after: "Ten extra minutes of B-roll on shoot day saves an hour in editing — and saves you from the same talking head for two minutes straight.",
  },
  extras: [
    { h: "A two-minute pre-shoot checklist",
      box: `□ Lens wiped clean
□ Facing the light, not the window behind me
□ Fan / AC off, door and windows closed
□ Mic connected and tested with a short clip
□ Phone on tripod or steady support
□ Main 1x camera, same resolution and frame rate
□ Enough storage and battery (and Do Not Disturb on)
□ Vertical or horizontal — decided before the first take`,
      paras: ["Play back the test clip with headphones before you start. Thirty seconds of checking saves a whole reshoot."] },
  ],
  faq: [
    ["Can professional video editors work with phone footage?", "Yes. Most of the reels, shorts and small business videos online today were shot on phones. Good light, clear audio and steady framing matter far more than the camera."],
    ["Should I shoot in 4K on my phone?", "If you have the storage, 4K gives the editor room to crop and reframe, which is useful when one shoot must produce both vertical and horizontal versions. For simple talking videos, 1080p is perfectly fine."],
    ["What is the cheapest upgrade for phone videos?", "A clip-on or small wireless microphone. Clear sound makes a bigger difference to how professional a video feels than any camera upgrade."],
  ],
  related: [
    ["/video-editing-chennai/", "Video editing in Chennai", "service"],
    ["/video-editing-charges-chennai/", "Video editing charges, explained", "pricing"],
    ["/blog/what-to-send-video-editor/", "How to send footage to your editor", "6 min"],
  ],
  cta: {
    h: "Shot on a phone. Edited like it wasn't.",
    p: `I ${ctaLink("/video-editing-chennai/", "edit phone footage")} every week — colour-matched, cleaned up and cut to hold attention. Send me one clip before your next shoot and I'll tell you what to change.`,
  },
};
