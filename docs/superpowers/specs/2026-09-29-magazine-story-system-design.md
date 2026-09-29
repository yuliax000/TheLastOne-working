# THE LAST ONE — Magazine Story System Design

**Date:** 2026-09-29  
**Status:** Proposed for implementation  
**Scope:** Reusable Explore Story article framework, placeholder content, interactions, responsive layout, documentation, and verification.

## 1. Purpose

Replace the current inline Explore Story expansion with a reusable natural-history magazine reading experience for all six species. The system must keep layout code separate from editable content, preserve the existing static HTML/CSS/JavaScript and GSAP/ScrollTrigger stack, and make future content replacement possible without editing renderer internals.

This phase provides only article structure and explicit placeholders. It does not add researched stories, downloaded media, citations, or invented image credits. Files under `sources/` remain untouched.

## 2. Existing Project Constraints

- `data.js` contains the six scrollytelling chapter records and ending data.
- `render.js` produces the timeline, fixed species cards, and ending markup.
- `script.js` controls chapter activation, GSAP transitions, habitat videos, and current inline detail expansion.
- `styles-redesign.css` is the active site stylesheet.
- The fixed chapter card is intentionally compact and cannot safely contain a long magazine article.
- Existing chapter anchors and the `lonesome-george` chapter ID must remain stable so timeline navigation does not break.

## 3. Chosen Architecture

Use one full-viewport native `<dialog>` as a shared magazine reader. Each Explore Story button opens the requested story inside the same dialog. The underlying scrollytelling stays mounted at its current scroll position and is locked while the reader is open.

This is preferred over inline expansion because it provides an independent reading surface with adequate space. It is preferred over separate HTML pages because it avoids duplicating article markup and preserves the current scrollytelling context.

### Files

- `story-content.js` — six editable story records and block arrays.
- `story-renderer.js` — safe DOM construction for the story header, blocks, sources, and story navigation.
- `story-dialog.js` — open, close, previous/next navigation, scroll reset, focus restoration, and reduced-motion behavior.
- `story-styles.css` — editorial grid, media states, dialog layout, and responsive rules.
- `assets/stories/` — user-supplied story images only; initially contains a short README, not downloaded media.
- `STORY-CONTENT-GUIDE.md` — concise Chinese editing guide and placeholder example.
- `index.html` — adds the shared dialog shell and loads `story-styles.css`.
- `data.js` / `render.js` / `script.js` — replace inline detail linkage with story IDs and initialize the shared reader while preserving chapter behavior.
- `tests/render.test.js` — covers data and rendering contracts.
- `tests/e2e.cjs` — updates the browser flow from inline expansion to the dialog reader where practical.

## 4. Story Identity and Mapping

`story-content.js` contains these stable story IDs:

1. `great-auk`
2. `passenger-pigeon`
3. `thylacine`
4. `kauai-oo`
5. `baiji`
6. `pinta-tortoise`

The existing sixth scrollytelling chapter keeps `id: "lonesome-george"`. Its chapter record receives or exposes a story mapping to `pinta-tortoise`. The other five chapter IDs and story IDs match directly. This avoids changing existing anchors while giving the editable article the requested species-level identity.

## 5. Editable Content Model

`story-content.js` exports one ordered array. Its file header explains where media belongs and lists accepted options. Each species record is separated by a prominent Chinese comment.

Record fields:

```js
{
  id: "baiji",                 // 稳定故事 ID
  chapterId: "baiji",          // 对应首页章节 ID
  chapter: "05",               // 章节编号
  year: "",                    // 年份占位
  title: "在这里填写标题",
  englishName: "Baiji",
  scientificName: "",
  habitat: "在这里填写栖息地",
  lastLocation: "在这里填写最后记录地点",
  introduction: "在这里填写导语",
  accent: "#728e94",
  blocks: [],
  sources: []
}
```

All six records contain placeholder-only blocks demonstrating every supported layout capability. Reordering, inserting, or deleting blocks requires no renderer changes.

### Supported block types

#### `paragraph`

```js
{ type: "paragraph", text: "在这里填写正文" }
```

#### `subheading`

```js
{ type: "subheading", text: "在这里填写小标题" }
```

#### `image`

```js
{
  type: "image",
  src: "",
  alt: "",
  caption: "在这里填写图片说明",
  credit: "在这里填写图片来源",
  size: "wide",                // wide | medium | small
  align: "center",             // left | right | center
  aspectRatio: "16 / 9"
}
```

#### `imageText`

```js
{
  type: "imageText",
  image: {
    src: "",
    alt: "",
    caption: "在这里填写图片说明",
    credit: "在这里填写图片来源",
    aspectRatio: "4 / 5"
  },
  text: "在这里填写与图片并排的正文",
  imageSide: "right"           // left | right
}
```

#### `quote`

```js
{
  type: "quote",
  text: "在这里填写引语",
  attribution: "在这里填写引语出处"
}
```

#### `divider`

```js
{ type: "divider" }
```

Sources use editable objects such as `{ label: "在这里填写资料名称", url: "" }`. Empty source arrays do not render a sources section.

## 6. Rendering and Content Safety

The story renderer uses `document.createElement`, attribute setters, and `textContent`. Story fields are never concatenated into unchecked HTML and never assigned to `innerHTML`.

The renderer normalizes user-editable layout values:

- `size`: `wide`, `medium`, or `small`; fallback `wide`.
- `align`: `left`, `right`, or `center`; fallback `center`.
- `imageSide`: `left` or `right`; fallback `left`.
- `aspectRatio`: two positive numeric components separated by `/`; fallback `16 / 9`.
- Unknown block types are skipped without breaking the remaining article.

Text including quotes, angle brackets, ampersands, newlines, and non-Latin characters remains text rather than executable markup. Paragraph newlines render naturally through CSS (`white-space: pre-line`) or equivalent safe text handling.

## 7. Image Component and Failure States

Every `image` and `imageText.image` uses the same media builder.

- Empty `src`: do not create a network image request; show the placeholder immediately.
- Non-empty `src`: create the image and keep the placeholder available until successful load.
- Successful load: show the image and hide the placeholder.
- Load error or missing file: remove/hide the broken image and show the same placeholder.
- Placeholder copy: `在这里放置图片` plus `建议比例 X:Y` derived from `aspectRatio`.
- The media frame always retains its aspect ratio so the editorial grid cannot collapse.
- Empty caption or credit values produce no nodes and no residual spacing.
- Image paths are documented as relative paths such as `./assets/stories/baiji-river.jpg`.

## 8. Dialog Interaction Model

### Open

- Explore Story buttons retain native `<button>` semantics.
- Clicking finds the story mapped to the chapter and renders it into the shared dialog.
- The opening trigger is stored for focus restoration.
- The story scroller starts at `scrollTop = 0`.
- Background page scrolling is locked without changing its scroll position.
- Habitat media and other currently playing page media are paused as appropriate.
- Animation is a short fade plus small vertical movement.

### Close

- Close button closes the dialog.
- Native Escape cancellation is handled and results in the same cleanup path.
- Background scrolling is restored to its previous position.
- Focus returns to the Explore Story button that opened the reader.
- Playing story audio/video, if later present, is paused before teardown.

### Previous and next

- Footer buttons follow the order of `story-content.js`.
- At the first story, Previous is disabled; at the last story, Next is disabled.
- Switching replaces the dialog content without closing it.
- The story scroller returns to the top and focus moves to the new article heading (temporarily focusable) for keyboard and screen-reader context.

### Reduced motion

- Both the site's explicit Reduce motion state and `prefers-reduced-motion: reduce` remove transform-based dialog transitions.
- All controls remain fully functional without animation.

## 9. Editorial Layout

### Desktop

- The dialog fills the viewport and owns its vertical scroll.
- The article uses a consistent CSS Grid with outer gutters, a readable text column, and wider media columns.
- The title header has generous vertical spacing and displays chapter metadata without competing with the headline.
- Introduction is larger than body text.
- Body measure is approximately 30–40 Chinese characters per line through a constrained `ch`/pixel width.
- `wide` media spans the editorial width.
- `medium` and `small` media occupy narrower grid spans and use `align` to select left, center, or right columns.
- `imageText` creates two stable columns, with ordering controlled by `imageSide`.
- Quotes span more width than body copy and use the active story accent sparingly.
- Captions and credits share one small, consistent style.
- The existing dark palette, bone text, lichen accents, display font, and per-species accent are retained.

### Mobile

- At the existing mobile breakpoint (approximately 760px), the grid becomes one column.
- Blocks retain array order.
- All image sizes occupy the available width.
- Alignment options no longer create offsets or floats.
- `imageText` becomes image first and text second regardless of desktop image side.
- No text wrapping around images is used.
- Dialog header controls remain reachable and no block can exceed the viewport width.
- Caption and credit text remains legible.

## 10. Accessibility

- Use a native `<dialog>` with an accessible article label derived from the story title.
- Close, Previous, and Next are native buttons with visible labels.
- Native modal focus containment is retained.
- Escape closes through the dialog cancel event.
- Focus is restored after closing and intentionally moved after story switching.
- Placeholder images use descriptive text; successful images receive the supplied `alt` value.
- Empty `alt` remains valid for decorative images.
- Disabled navigation uses the native `disabled` attribute.
- Focus indicators continue the site's existing visible focus treatment.

## 11. Documentation

`STORY-CONTENT-GUIDE.md` is written in Chinese and includes:

1. Editing title and introduction.
2. Adding paragraphs.
3. Adding images.
4. The `assets/stories/` directory.
5. Relative path syntax.
6. Image size and alignment options.
7. Left/right `imageText` examples.
8. Quote and subheading examples.
9. Deleting and reordering blocks.
10. One complete placeholder-only record.

It explicitly warns that users must provide and verify their own content, image credits, and sources.

## 12. Testing and Verification

### Automated tests

- Exactly six story records with unique stable IDs and the expected order.
- Every record has a block array and sources array.
- Every supported block type renders through the shared renderer contract.
- Reordering blocks changes output order without renderer edits.
- Invalid size, alignment, image side, and aspect ratio values fall back safely.
- Special characters remain text.
- Empty and failed image states retain the placeholder and aspect ratio.
- Empty captions, credits, and sources do not create empty layout elements.
- Chapter buttons map to all six stories, including `lonesome-george` → `pinta-tortoise`.

### Browser verification

- Load the existing main page with GSAP active and confirm no console errors.
- Open each of the six Explore Story buttons.
- Confirm every empty image displays the designed placeholder without a broken-image icon.
- Exercise wide, medium, and small images and left, right, and centered alignment.
- Exercise both imageText directions on desktop.
- Verify single-column order on a 390px-wide mobile viewport.
- Verify Close, Escape, trigger focus restoration, Previous, Next, disabled boundary controls, and scroll reset.
- Verify reduced motion through the explicit site setting and the browser preference where available.
- Change a test story field and confirm the rendered dialog updates from data without HTML edits.

The existing `npm test` suite must pass. Existing browser checks are updated to match the new dialog interaction. If the repository's standalone Playwright dependency is unavailable, browser verification uses the available controlled Chrome integration and the limitation is reported explicitly.

## 13. Out of Scope

- Writing or researching final species stories.
- Searching for, downloading, generating, or licensing images.
- Inventing captions, credits, or citations.
- Changing the six main scrollytelling chapter designs.
- Changing habitat video behavior or the ending timeline beyond any compatibility adjustment required by the dialog.
- Editing any file under `sources/`.

## 14. Completion Criteria

The feature is complete when one shared reader safely renders all six placeholder records from `story-content.js`, supports all required block layouts and image failure states, passes automated tests, passes the specified desktop/mobile interaction checks, and is documented sufficiently for a user to replace content without reading renderer internals.
