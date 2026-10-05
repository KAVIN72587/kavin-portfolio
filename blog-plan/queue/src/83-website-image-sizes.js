const { ctaLink } = require("../h");
module.exports = {
  row: 83, date: "2026-10-17", slug: "website-image-sizes", cat: "Web",
  keyword: "image size for website how to compress",
  title: "Website Image Sizes: How Big Your Photos Should Be",
  desc: "How large website photos should be, how to resize and compress them, JPEG vs PNG vs WebP, and why oversized images are the most common reason sites load slowly.",
  short: "Dimensions, compression, JPEG vs PNG vs WebP, and why oversized images slow your site.",
  headline: "Website image sizes: how big your photos should be and how to compress them",
  crumb: "Website image sizes",
  cardTitle: "Your photos are slowing your website down",
  card: "A single phone photo can be bigger than the rest of the page combined. How to size and compress images properly.",
  h1: ["Your photos are slowing your website", "down"],
  lede: "A photo straight from a modern phone can be several megabytes and over 4,000 pixels wide. Upload ten of those to a page and it can take many seconds to load on mobile data, while showing them no larger than a laptop screen. Oversized images are the single most common reason small business websites are slow.",
  intro: [
    "Here is how big website images actually need to be, how to resize and compress them without visible quality loss, and which file formats to use.",
  ],
  sections: [
    { h: "Size for where the image appears",
      p: ["An image only needs to be as wide as the largest space it fills on screen, with some allowance for high-resolution displays. A full-width banner rarely needs to be more than about 2,000 pixels wide. An image in a content column might need 1,200 to 1,600 pixels. A thumbnail or team photo might need 600 to 800.",
         "Uploading a 4,000-pixel photo to show it at 800 pixels wastes data and time on every visit.", "Crop to the shape the design uses too. If a banner is wide and short, crop the photo to that shape before uploading, rather than relying on the website to cut it."] },
    { h: "Compress before uploading",
      p: ["Compression removes data the eye does not notice. A well-compressed photo can be a fraction of the original size with no visible difference on screen. Free tools such as Squoosh in the browser, or export settings in most photo apps, let you choose a quality level. For JPEG photos, a quality setting around 70 to 80 is usually a good balance.",
         "As a rough guide, most website photos can be well under 300 KB, and many under 150 KB."],
      note: "Compare the original and compressed versions side by side at the size they appear on the site. If you cannot see a difference, compress further." },
    { h: "JPEG, PNG or WebP",
      p: ["JPEG is for photographs. PNG is for graphics with sharp edges, text or transparency, such as logos and screenshots; it is much larger for photos. WebP is a modern format that is usually smaller than both at similar quality and is supported by current browsers. AVIF is newer still and smaller again. Many websites now serve WebP automatically.",
         "SVG is best for logos and icons: it is tiny and stays sharp at any size."] },
    { h: "Let the website do some of the work",
      p: ["Good websites serve different image sizes to different screens, so a phone downloads a smaller version than a large desktop monitor. They also load images lazily, only as the visitor scrolls towards them. WordPress does some of this automatically; image optimisation plugins can convert to WebP and compress on upload. Static sites can be built to do the same."] },
    { h: "Name and describe images",
      p: ["Rename files before uploading: \"velachery-dental-clinic-reception.jpg\" rather than \"IMG_20260914_103322.jpg\". Add alt text, a short description of the image, for every meaningful image. It helps visitors using screen readers, appears if the image fails to load, and helps search engines understand the page."] },
    { h: "Background videos and sliders",
      p: ["Large background videos and image sliders with five full-width photos are common culprits on slow sites. Visitors rarely watch beyond the first slide. One strong, well-compressed image usually performs better than a slider. If you use a background video, keep it short, silent, small and with a still image fallback for mobile."] },
    { h: "Check the result",
      p: ["Run the page through Google's PageSpeed Insights, which flags oversized images and estimates how much faster the page could be. Open the site on your phone using mobile data, not office Wi-Fi, and see how quickly the first screen appears. That is what your customers experience."] },
  ],
  callout: {
    h: "Resize, compress, then upload",
    p: "The fix for most image problems is a habit, not a technology. Before any photo goes on the website, resize it to the size it will be shown and compress it. It takes a minute per image, and it keeps the site fast for its whole life.",
    quote: "Never upload a photo straight from the phone.",
    after: "If several people in your team add content, write the rule down: maximum width, maximum file size, file naming and alt text. Or use a plugin that enforces it automatically.",
  },
  extras: [
    { h: "Image size cheat sheet",
      box: `Full-width banner     ~1,920–2,000 px wide, < 300 KB
Content image         ~1,200–1,600 px wide, < 200 KB
Team / card photo     ~600–800 px wide, < 100 KB
Logo                  SVG (or PNG at 2x display size)
Photos                JPEG or WebP, quality ~70–80
Graphics with text    PNG, WebP or SVG`,
      paras: ["These are guidelines, not hard limits. The goal is simple: no image bigger than it needs to be, and every image compressed."] },
  ],
  faq: [
    ["What size should images be for a website?", "As wide as the largest space they fill on screen, with some allowance for high-resolution displays. Full-width banners around 2,000 pixels wide; content images around 1,200 to 1,600; thumbnails 600 to 800."],
    ["How do I compress images for my website?", "Use a free tool such as Squoosh or your photo app's export settings, choose JPEG or WebP at around 70 to 80 quality, and check the result at display size. Many sites can also compress automatically on upload."],
    ["Is WebP better than JPEG?", "WebP is usually smaller than JPEG at similar quality and is supported by current browsers. Many websites serve WebP automatically, with JPEG as a fallback."],
  ],
  related: [
    ["/web-design-chennai/", "Web design in Chennai", "service"],
    ["/website-design-cost-chennai/", "What a website really costs in Chennai", "pricing"],
    ["/blog/slow-website-mobile/", "Why your website is slow on mobile", "5 min"],
  ],
  cta: {
    h: "Fast pages, sharp photos.",
    p: `Every ${ctaLink("/web-design-chennai/", "website I build")} serves resized, compressed, modern-format images that load as visitors scroll. If your current site is slow, send me the link and I'll tell you how much the images are costing you.`,
  },
};
