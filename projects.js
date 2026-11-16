/*
  Edit this file to update the Featured section.

  For each slide:
    src   - path to an image, for example "assets/agedefy-01.jpg". Leave "" to show a placeholder block.
    ratio - frame shape. Use 1.7778 for 16:9, 1.25 for 5:4, or 0.8 for 4:5 vertical.
    size  - frame height tier: "s" (small), "m" (medium, default) or "l" (large). Shape and size are independent,
            so any of the three shapes can be any of the three sizes. The strip is as tall as its tallest frame.
            The image fills the frame (cropped to fit).
    pos   - optional crop focus, for example "50% 100%" to keep the bottom. Default is "50% 50%".
    tone  - placeholder color only. Ignored once src is set.
    dark  - true if the placeholder tone is dark (flips the label color).

*/

var WIDE = 1.7778, LAND = 1.25, TALL = 0.8;   // 16:9, 5:4, 4:5

// One frame with an explicit image: frame("assets/x.jpg", "wide", "l", "50% 50%")
// shape: "wide" (16:9), "land" (5:4) or "tall" (4:5). size: "s", "m" or "l". pos: crop focus.
// full: optional longer video with sound. Clicking a video frame opens it in a player.
function frame(src, shape, size, pos, full) {
  return { src: src, ratio: shape === "wide" ? WIDE : shape === "tall" ? TALL : LAND, size: size || "m", pos: pos || "50% 50%", full: full || "" };
}

const PROJECTS = [
  {
    title: "Agedefy Labs",
    sub: "Science-backed skincare, handcrafted in California.",
    role: "Design, Creative Direction",
    year: "2025",
    studio: "Kratos",
    tags: ["Brand Identity", "Website Design", "Packaging Design"],
    desc: "The skincare industry sells women over 40 on one word: anti. We flipped it for AgeDefy, building a full identity system, packaging, campaign, around one idea: aging isn't a flaw, it's proof of a life well lived. The result is a bold, unapologetic brand with a rebellious, playful energy, down to the handwritten type that gives it its attitude, standing apart in a category built entirely on apology.",
    slides: [
      frame("assets/agedefy-01.jpg", "wide"),
      frame("assets/agedefy-02.jpg", "land"),
      frame("assets/agedefy-video.mp4", "wide", "m", "50% 50%", "assets/agedefy-video-full.mp4"),
      frame("assets/agedefy-03.jpg", "land"),
      frame("assets/agedefy-04.jpg", "wide"),
      frame("assets/agedefy-05.jpg", "land"),
      frame("assets/agedefy-06.jpg", "land"),
      frame("assets/agedefy-07.jpg", "tall", "m", "40% 50%"),
      frame("assets/agedefy-08.jpg", "wide"),
      frame("assets/agedefy-09.jpg", "tall"),
      frame("assets/agedefy-10.jpg", "wide"),
      frame("assets/agedefy-11.jpg", "land"),
      frame("assets/agedefy-12.jpg", "wide")
    ]
  },
  {
    title: "Goldstar Collective",
    sub: "Texas heritage, rebuilt for the next chapter.",
    role: "Design, Creative Direction",
    year: "2025",
    studio: "Independent",
    tags: ["Brand Identity", "Brand Guidelines", "Print Collateral"],
    desc: "Goldstar has sold luxury appliances and lighting across Texas since 1959, built on a family legacy of showing up for people. The challenge was moving that story forward without losing it: a brand that feels like heritage, not nostalgia. A horse in a proud, measured stride toward a single star anchors the identity, paired with a confident wordmark and a seal, then carried through brand guidelines, hang tags, catalogs, a van fleet, and website mockups. The result is a warm, refined brand that treats every home like family.",
    slides: [
      frame("assets/goldstar-01.jpg", "tall"),
      frame("assets/goldstar-02.jpg", "land"),
      frame("assets/goldstar-03.jpg", "land"),
      frame("assets/goldstar-04.jpg", "wide"),
      frame("assets/goldstar-14.jpg", "tall"),
      frame("assets/goldstar-05.jpg", "land"),
      frame("assets/goldstar-07.jpg", "land"),
      frame("assets/goldstar-10.jpg", "tall"),
      frame("assets/goldstar-08.jpg", "wide"),
      frame("assets/goldstar-09.jpg", "land"),
      frame("assets/goldstar-11.jpg", "land"),
      frame("assets/goldstar-06.jpg", "tall"),
      frame("assets/goldstar-12.jpg", "wide"),
      frame("assets/goldstar-13.jpg", "land")
    ]
  },
  {
    title: "MGStays",
    sub: "Capturing the essence of home.",
    role: "Design, Creative Direction",
    year: "2024",
    studio: "Kratos",
    tags: ["Brand Identity", "Print Collateral", "Website Design"],
    desc: "Short-term rentals opened up travel, but every stay depended on a different host, so reliability was a gamble. MGStays set out to pair hotel-level dependability with the warmth of a real home, and we distilled that into one promise: feel at home. We built a full identity around it, from an elegant but approachable wordmark to an icon that merges a floor plan, a heart, and the MG initials, with a palette drawn from wood, stone, and linen. Our work earned a GDUSA Best-of-Year and a World Brand Design Society Commended Award.",
    slides: [
      frame("assets/mgstays-01.mp4", "wide"),
      frame("assets/mgstays-00.jpg", "wide"),
      frame("assets/mgstays-02.jpg", "tall"),
      frame("assets/mgstays-15.jpg", "wide"),
      frame("assets/mgstays-03.jpg", "land"),
      frame("assets/mgstays-05.jpg", "wide"),
      frame("assets/mgstays-04.jpg", "land"),
      frame("assets/mgstays-08.jpg", "land"),
      frame("assets/mgstays-06.jpg", "land"),
      frame("assets/mgstays-09.jpg", "land"),
      frame("assets/mgstays-10.jpg", "tall"),
      frame("assets/mgstays-11.jpg", "wide"),
      frame("assets/mgstays-13.jpg", "wide"),
      frame("assets/mgstays-16.jpg", "land"),
      frame("assets/mgstays-12.jpg", "land"),
      frame("assets/mgstays-07.jpg", "wide"),
      frame("assets/mgstays-14.jpg", "land"),
      frame("assets/mgstays-17.jpg", "land"),
      frame("assets/mgstays-18.jpg", "land")
    ]
  },
  {
    title: "House of Tile",
    sub: "Design-forward, never out of reach.",
    role: "Design, Creative Direction",
    year: "2024",
    studio: "Kratos",
    tags: ["Brand Identity", "Brand Guidelines", "Website Design"],
    desc: "Tile shopping tends to split in two: showrooms that feel out of reach, and big-box aisles that feel generic. House of Tile asked for something in between, a brand that feels elevated but stays attainable. We started with a serif wordmark whose letterforms are subtly irregular, giving it the warmth of something handmade, paired with an HT monogram that repeats like a tile pattern. A palette of twelve earthy tones, taken from real tile, and a graphic device of two intersecting lines carry the system across packaging, tags, stationery, email, social, and web. The slogan, The Art of Living, sums up the promise: good design belongs in everyday homes.",
    slides: [
      frame("assets/hot-02.jpg", "wide"),
      frame("assets/hot-01.mp4", "tall"),
      frame("assets/hot-12.jpg", "wide"),
      frame("assets/hot-04.jpg", "wide"),
      frame("assets/hot-06.jpg", "land"),
      frame("assets/hot-03.jpg", "wide"),
      frame("assets/hot-10.jpg", "tall"),
      frame("assets/hot-08.jpg", "land"),
      frame("assets/hot-16.jpg", "wide"),
      frame("assets/hot-07.jpg", "tall"),
      frame("assets/hot-13.jpg", "wide"),
      frame("assets/hot-14.jpg", "land"),
      frame("assets/hot-11.jpg", "land")
    ]
  },
  {
    title: "Trasnocho Coffee",
    sub: "Coffee worth staying up for.",
    role: "Design, Creative Direction",
    year: "2024",
    studio: "Kratos",
    tags: ["Brand Identity", "Packaging Design"],
    desc: "Coffee has turned into a quick energy fix in a paper cup. Trasnocho wanted its coffee to be the destination, not just a way to get through the day. We found the idea in sobremesa, the unhurried time at the table after a meal that stretches into trasnochar, staying up through the quiet hours between dusk and dawn. Our packaging is shaped like a rising or setting sun, with tarot-inspired labels that pair each Salvadoran infusion with a native animal, from the torogoz to the ocelot, under one line: Savor the Pause. The work earned a World Brand Design Society Silver Award for packaging and a Commended Award for writing.",
    slides: [
      frame("assets/trasnocho-01.mp4", "wide", "m", "50% 50%", "assets/trasnocho-01-full.mp4"),
      frame("assets/trasnocho-03.jpg", "land"),
      frame("assets/trasnocho-06.jpg", "land"),
      frame("assets/trasnocho-12.jpg", "land"),
      frame("assets/trasnocho-07.jpg", "land"),
      frame("assets/trasnocho-02.mp4", "land"),
      frame("assets/trasnocho-11.jpg", "land"),
      frame("assets/trasnocho-14.jpg", "land"),
      frame("assets/trasnocho-04.jpg", "tall"),
      frame("assets/trasnocho-15.jpg", "wide"),
      frame("assets/trasnocho-08.jpg", "land"),
      frame("assets/trasnocho-10.jpg", "wide"),
      frame("assets/trasnocho-13.jpg", "land"),
      frame("assets/trasnocho-09.jpg", "wide"),
      frame("assets/trasnocho-05.jpg", "land")
    ]
  }
];

/*
  Index: the lighter "Miscellaneous" list under Featured. One row per piece.
    name, category, year - the three columns
    img  - image shown on hover and in the click-to-open lightbox
*/
const INDEX = [];   // Hidden for now. Add rows here and restore the section in index.html when ready.
