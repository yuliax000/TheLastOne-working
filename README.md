# THE LAST ONE

A minimum-deliverable scrollytelling prototype about six extinct species and their final known individuals. It uses static HTML, CSS, JavaScript, GSAP and ScrollTrigger; there is no build step.

## Run locally

From this folder, start a local server:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

GSAP and ScrollTrigger are pinned locally in `vendor/`, so the complete animation works without an internet connection.

## Test

```powershell
node --test tests/render.test.js
```

## Project files

- `index.html` contains the semantic page shell, ending stage and reusable detail dialog.
- `styles.css` contains the visual system, responsive layouts and reduced-motion fallbacks.
- `data.js` contains all six chapter records and the provisional ending sequence.
- `render.js` turns the data records into safe chapter, timeline and ending markup.
- `script.js` connects navigation, the detail dialog, IntersectionObserver, GSAP and ScrollTrigger.
- `tests/render.test.js` checks data completeness and required application contracts.

## Replace the placeholders

1. Edit chapter text, years, colours and media labels in `data.js`.
2. Keep each object's existing field names so the renderers and dialog continue to work.
3. Replace `.chapter__media` and `.story-dialog__media` placeholder treatments with real images using CSS custom properties or new media fields.
4. Verify every item in `recentExtinctions` before publication. Their current `status` text deliberately marks unverified proposal entries.
5. Add final source and licence text to each chapter's `sourceLabel`.

## Accessibility

The site uses native buttons and a native modal dialog, restores focus after closing, keeps a semantic reading order, and replaces scroll pinning and rapid transitions when the user prefers reduced motion.
