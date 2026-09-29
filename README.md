# THE LAST ONE

A minimum-deliverable scrollytelling prototype about six extinct species and their final known individuals. It uses static HTML, CSS, JavaScript, GSAP and ScrollTrigger; there is no build step.

## Run locally

From this folder, start a local server:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

GSAP and ScrollTrigger are pinned locally in `vendor/`, so the complete animation works without an internet connection.

## Edit Explore Story articles

All six magazine articles are edited in `story-content.js`, and their images belong in `assets/stories/`. See [STORY-CONTENT-GUIDE.md](./STORY-CONTENT-GUIDE.md) for the Chinese step-by-step guide, supported block types, image sizing, alignment, captions, credits and sources.

## Test

```powershell
node --test tests/render.test.js
```

## Project files

- `index.html` contains the page shell and ending stage.
- `styles-redesign.css` is the active visual system, including responsive layouts and media styling.
- `data.js` contains all six chapter records and the provisional ending sequence.
- `render.js` turns the data records into safe chapter, timeline and ending markup.
- `story-content.js` contains the six editable magazine-story records.
- `story-renderer.js` safely renders every reusable article block.
- `story-dialog.js` manages opening, closing, keyboard focus and previous/next story navigation.
- `story-styles.css` contains the desktop and mobile magazine layouts.
- `script.js` connects navigation, the Explore Story reader, media playback, IntersectionObserver, GSAP and ScrollTrigger.
- `media.js` starts the active habitat video and pauses the others.
- `tests/render.test.js` checks data completeness and required application contracts.

## Add your own audio and video

1. Put your files in `assets/audio/` and `assets/video/`. Use web-friendly MP3 for audio and MP4 (H.264) for video. Keep file names short, lowercase, and free of spaces.
2. Open `data.js`, find the correct species, and fill any of these optional fields:

```js
habitatVideo: "./assets/video/great-auk-habitat.mp4",
audioSrc: "./assets/audio/great-auk-call.mp3",
videoSrc: "./assets/video/great-auk-archive.mp4",
```

Leave a field as `""` when you do not have that media. You can also add `audioLabel: "Field recording"` or `videoLabel: "Archive footage"` to change the labels above the players.

The habitat video appears **behind the species card** and starts automatically, silently and on a loop when that chapter becomes active. It pauses when another chapter is active or you leave the story. The detail audio and archive video appear only after clicking **Explore story**, have visible controls, and never autoplay. Closing the detail pauses them. The site's **Reduce motion** setting also prevents habitat-video playback.

If a habitat video cannot play, the existing colour background remains. Test media through WebStorm's local preview or another local server, not by double-clicking `index.html` as a `file://` page.

For each media item, replace the relevant `sourceLabel` in `data.js` and add its full source and licence to `references.html`. Verify every item in `recentExtinctions` before publication.

## Accessibility

The site uses native buttons and a native dialog, keeps a semantic reading order, restores focus after closing an article, supports Escape, and includes an explicit Reduce motion control.
