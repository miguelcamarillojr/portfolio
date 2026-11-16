# Miguel Camarillo Jr. portfolio

Static site. No build step. Plain HTML, CSS, and JS.

## Files
- `index.html`: page structure, header, capabilities, about, connect, footer
- `projects.js`: all Featured project data and image paths (edit this to add work)
- `styles.css`: layout and type
- `script.js`: renders projects, drag-to-scroll strips, live Central Time clock
- `assets/`: put images here (`portrait.jpg` plus project images)

## Add images
1. Drop files in `assets/`.
2. In `projects.js`, set each slide's `src` (for example `"assets/agedefy-01.jpg"`).
3. Set `ratio` to width divided by height so the strip sizes correctly.

## Fonts
- Cormorant Garamond and Instrument Sans load from Google Fonts.

## Carousel speed
Edit `SPEED` (pixels per second) near the top of the carousel section in `script.js`. A light touch or vertical swipe never stops it. A deliberate horizontal drag takes over, and on release it carries on at auto speed with no momentum. Auto-scroll is off for visitors with reduced motion enabled.

## Run locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000

## Deploy with GitHub Pages
1. Create a repo and push these files to `main`.
2. Repo Settings, Pages, Source: Deploy from a branch, `main`, `/ (root)`.
3. For a custom domain, add it under Pages settings and point DNS at GitHub.

## Adding video to a carousel

Use the same frame() call with an .mp4 path:

    frame("assets/mgstays-01.mp4", "wide")

Videos play muted and looping, only while on screen, and stay still for visitors who prefer reduced motion.
Export H.264 MP4, no audio needed, ideally under 8 MB per clip. Keep each frame at its true ratio (16:9, 5:4 or 4:5).
