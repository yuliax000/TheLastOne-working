# Magazine Story System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one reusable, editable magazine-style Explore Story reader for all six species without adding researched content or downloaded media.

**Architecture:** Keep editable article data in `story-content.js`, normalize layout fields and safely build article DOM in `story-renderer.js`, and isolate modal lifecycle in `story-dialog.js`. A single native `<dialog>` is mounted in `index.html`; it overlays the existing GSAP scrollytelling without replacing its chapter, habitat-video, or ending systems.

**Tech Stack:** Static HTML, CSS Grid, ES modules, native `<dialog>`, native DOM APIs, Node test runner, existing GSAP/ScrollTrigger, controlled Chrome browser validation.

**Spec:** `docs/superpowers/specs/2026-09-29-magazine-story-system-design.md`

## Global Constraints

- Do not modify, rename, move, or delete any file under `sources/`.
- Do not write researched species stories, search/download images, or invent image sources.
- Keep all user-editable story content in `story-content.js`; do not hard-code article content in HTML or the renderer.
- Story content must be created with DOM APIs and `textContent`, never unchecked `innerHTML`.
- Story images live under `assets/stories/` and must have an intact placeholder for empty, missing, and failed sources.
- Preserve the existing chapter IDs, GSAP/ScrollTrigger behavior, habitat media behavior, dark theme, and ending sequence.
- Support `paragraph`, `subheading`, `image`, `imageText`, `quote`, and `divider` through one shared renderer.
- Desktop uses an editorial CSS Grid; at approximately 760px the article becomes a strict single column.
- Both the website Reduce motion state and `prefers-reduced-motion` disable transform-based reader motion.
- Existing unrelated working-tree changes belong to the user and must not be reverted or overwritten.

## Review Focus

- A story whose `blocks`, `sources`, or optional strings are missing must still open with stable placeholder/default UI; test in Task 1.
- Unknown block types and invalid layout values must not add unsafe classes/styles or prevent later valid blocks from rendering; test in Tasks 1–2.
- Image URLs containing quotes/special characters or failing at load time must never produce executable markup or broken-image icons; test in Task 2 and verify in Task 6.
- Repeated open/switch/close cycles must not leak page-scroll locks, stale focus targets, or playing media; test in Task 3 and verify in Task 6.
- A very long unbroken string, empty caption/credit, and narrow mobile viewport must not create horizontal overflow or phantom spacing; test/verify in Tasks 4 and 6.

---

## File Structure

**Create**

- `story-content.js` — six placeholder story records and editable comments only.
- `story-renderer.js` — normalization helpers and safe DOM builders for all story blocks.
- `story-dialog.js` — reusable reader controller and focus/scroll/media lifecycle.
- `story-styles.css` — dialog, editorial grid, block, placeholder, navigation, and responsive styles.
- `STORY-CONTENT-GUIDE.md` — Chinese content-replacement guide.
- `assets/stories/README.md` — asset directory purpose and path example.
- `tests/story.test.js` — story data, normalization, ordering, and mapping contracts.

**Modify**

- `index.html` — load `story-styles.css` and add the single empty dialog shell.
- `data.js` — add explicit `storyId` mapping to each existing chapter record; keep current chapter IDs.
- `render.js` — render Explore Story triggers only; remove the old duplicated inline-detail content.
- `script.js` — initialize the reader and delegate story-trigger clicks; remove inline-detail lifecycle.
- `styles-redesign.css` — remove obsolete inline-detail layout rules only after reader integration passes.
- `tests/render.test.js` — update chapter contracts from inline details to shared story triggers/dialog mount.
- `tests/e2e.cjs` — update the existing browser scenario for the shared reader and current five-card ending.
- `package.json` — make `npm test` run every `tests/*.test.js` file.
- `README.md` — point editors to the new story guide without duplicating it.

## Task 1: Story Content Model and Safe Normalization

**Files:**
- Create: `story-content.js`
- Create: `story-renderer.js`
- Create: `tests/story.test.js`
- Modify: `data.js`
- Modify: `package.json`

**Interfaces:**
- Produces: `stories: StoryRecord[]` from `story-content.js`.
- Produces: `findStoryById(id)`, `findStoryByChapterId(chapterId)`, `normalizeStory(rawStory)`, `normalizeBlock(rawBlock)`, `normalizeAspectRatio(value)`, and `getAdjacentStory(stories, activeId, direction)` from `story-renderer.js`.
- Produces: `species[*].storyId`, including `lonesome-george → pinta-tortoise`.

- [ ] **Step 1: Write failing content-model tests**

Add tests asserting:

- six records in order with IDs `great-auk`, `passenger-pigeon`, `thylacine`, `kauai-oo`, `baiji`, `pinta-tortoise`;
- unique IDs, arrays for `blocks` and `sources`, and explicit placeholder-only strings;
- all six chapter records map to a story, including the sixth mapping;
- the combined fixtures exercise all six supported block types, three image sizes, three alignments, and both `imageText` sides.

- [ ] **Step 2: Run the new test and verify RED**

Run: `node --test tests/story.test.js`  
Expected: FAIL because `story-content.js`, exported helpers, and `storyId` mappings do not exist.

- [ ] **Step 3: Create `story-content.js` with six documented placeholder records**

Use Chinese comments at the top and between records. Include the accepted values beside editable layout fields. Use only the exact placeholder families from the spec; do not add factual species prose, URLs, or credits.

- [ ] **Step 4: Implement pure normalization and lookup helpers in `story-renderer.js`**

Normalize missing `blocks`/`sources` to empty arrays, missing strings to explicit safe defaults, layout values through whitelists, `aspectRatio` to a validated `N / N` string, and unknown blocks to `null`. `getAdjacentStory` returns the neighboring record or `null` at a boundary.

- [ ] **Step 5: Add `storyId` to each record in `data.js` and broaden the npm test glob**

Set five mappings to their chapter ID and the sixth to `pinta-tortoise`. Change the test script to `node --test tests/*.test.js`.

- [ ] **Step 6: Run all tests and verify GREEN**

Run: `npm test`  
Expected: all existing and new tests pass with zero failures.

- [ ] **Step 7: Commit the model**

```powershell
git add story-content.js story-renderer.js data.js package.json tests/story.test.js
git commit -m "feat: add editable magazine story model"
```

## Task 2: Safe Shared Block Renderer and Image Failure State

**Files:**
- Modify: `story-renderer.js`
- Modify: `tests/story.test.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: normalized `StoryRecord` and `StoryBlock` values from Task 1.
- Produces: `createStoryArticle(documentRef, story): HTMLElement`, `createStoryBlock(documentRef, block): HTMLElement | null`, and `createStoryMedia(documentRef, imageData): HTMLElement`.
- Produces dialog mounts: `#story-dialog`, `#story-dialog-scroller`, and `#story-dialog-content`.

- [ ] **Step 1: Write failing renderer contract tests**

Test exported function presence and pure observable contracts: block order remains input order after `normalizeStory`; unsupported blocks normalize to `null`; empty caption/credit values remain empty normalized strings and empty sources remain an empty array; special text is retained as literal values. Add an index-shell test requiring one native dialog and the three mount IDs. Browser-visible node omission is verified in Task 6 against the real DOM.

- [ ] **Step 2: Run targeted tests and verify RED**

Run: `node --test tests/story.test.js tests/render.test.js`  
Expected: FAIL because DOM builders and dialog mounts do not exist.

- [ ] **Step 3: Add the shared dialog shell to `index.html`**

Add one `<dialog>` after the main content with an accessible close button, scroll container, content mount, and footer navigation mount. Keep story content out of HTML. Load `story-styles.css` after `styles-redesign.css`.

- [ ] **Step 4: Implement DOM builders in `story-renderer.js`**

Use only `documentRef.createElement`, `textContent`, `setAttribute`, `classList`, and validated style values. Render the header, introduction, blocks, optional sources, and navigation hooks. Unknown blocks return `null` and do not interrupt following blocks.

- [ ] **Step 5: Implement one resilient media builder**

Always build the aspect-ratio frame and placeholder. For empty `src`, omit `<img>`. For non-empty `src`, attach `load` and `error` handlers before assigning `src`; success marks the frame loaded and error removes/hides the image while retaining the placeholder. Create caption/credit nodes only when non-empty.

- [ ] **Step 6: Run targeted and full tests and verify GREEN**

Run: `npm test`  
Expected: all tests pass; no existing chapter or ending contract regresses.

- [ ] **Step 7: Commit the renderer**

```powershell
git add story-renderer.js index.html tests/story.test.js tests/render.test.js
git commit -m "feat: render reusable magazine story blocks"
```

## Task 3: Dialog Lifecycle, Keyboard Behavior, and Story Switching

**Files:**
- Create: `story-dialog.js`
- Modify: `render.js`
- Modify: `script.js`
- Modify: `tests/render.test.js`
- Modify: `tests/story.test.js`

**Interfaces:**
- Consumes: `stories`, `createStoryArticle`, `findStoryById`, and `getAdjacentStory`.
- Produces: `createStoryDialogController({ dialog, scroller, content, stories, reducedMotion, onOpen, onClose })` returning `{ open(storyId, trigger), close(), show(storyId), destroy() }`.
- Produces trigger contract: `[data-story-trigger][data-story-id]`.

- [ ] **Step 1: Write failing integration-contract tests**

Update tests to require six story triggers with mapped IDs and no six duplicated `[data-inline-detail]` regions. Add pure controller-state tests for previous/next boundary selection, active ID changes, and scroll-reset request callbacks.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`  
Expected: FAIL because old inline details remain and the controller does not exist.

- [ ] **Step 3: Replace inline detail markup with shared story triggers**

In `renderChapters`, keep the existing button visual but output `data-story-trigger` and the mapped `data-story-id`. Remove per-card article/media/detail markup; retain existing card summaries and habitat media.

- [ ] **Step 4: Implement `story-dialog.js` controller**

On open, remember the trigger and page scroll position, add the page lock class, render the story, call `showModal`, reset the scroller, and focus the heading. Handle close button, native `cancel`, and `close` through one cleanup path. Cleanup pauses dialog media, removes the lock, restores the exact page scroll position, and focuses the stored trigger.

- [ ] **Step 5: Implement previous/next switching**

Use content-array order, native disabled boundaries, and delegated button events. `show` re-renders in place, sets `scrollTop = 0`, updates the dialog label/accent, and focuses the new heading without closing.

- [ ] **Step 6: Integrate the controller in `script.js`**

Initialize after chapter rendering, replace `toggleInlineDetail`, and delegate `[data-story-trigger]` clicks. While open, pause habitat videos; after close, resume only the currently active chapter's habitat video when motion is enabled. Do not refresh ScrollTrigger for dialog-internal content.

- [ ] **Step 7: Run all tests and verify GREEN**

Run: `npm test`  
Expected: all tests pass and no inline-detail contract remains.

- [ ] **Step 8: Commit interaction behavior**

```powershell
git add story-dialog.js render.js script.js tests/render.test.js tests/story.test.js
git commit -m "feat: add accessible Explore Story reader"
```

## Task 4: Editorial Grid, Responsive Layout, and Reduced Motion

**Files:**
- Create: `story-styles.css`
- Modify: `styles-redesign.css`
- Modify: `tests/story.test.js`

**Interfaces:**
- Consumes renderer classes `story-reader*`, `story-block*`, `story-media*`, size/alignment modifiers, and `image-side-*`.
- Produces responsive editorial layout at desktop and `max-width: 760px`.

- [ ] **Step 1: Add failing style-contract tests**

Require dialog viewport containment, an editorial CSS Grid, width modifiers for all three sizes, alignment modifiers for all three alignments, both image-side modifiers, the 760px single-column rule, no floats, overflow wrapping, aspect-ratio media frames, the page lock class, and a `prefers-reduced-motion` rule.

- [ ] **Step 2: Run targeted test and verify RED**

Run: `node --test tests/story.test.js`  
Expected: FAIL because `story-styles.css` does not exist.

- [ ] **Step 3: Implement dialog shell and editorial header styles**

Make the dialog full viewport, remove default browser chrome, give the scroller independent vertical scrolling, keep close controls visible, and establish the existing ink/bone/lichen palette with `--story-accent`.

- [ ] **Step 4: Implement the desktop editorial grid and block modifiers**

Use named or numbered grid columns for body measure, wide content, and outer gutters. Implement size and alignment through classes only. Use two columns for `imageText`; order columns with `image-side-left/right`. Constrain long text with `overflow-wrap:anywhere`.

- [ ] **Step 5: Implement image, quote, sources, and navigation presentation**

Keep placeholders visually complete, captions/credits consistent, quotes wide but restrained, and footer navigation keyboard-visible. Empty optional nodes produce no margins because they are not rendered.

- [ ] **Step 6: Implement mobile and reduced-motion rules**

At 760px, collapse every block to one column and force image-before-text. Remove alignment offsets and prevent horizontal overflow. Under either `.is-reduced-motion` or system preference, remove transform transitions and use immediate/opacity-only behavior.

- [ ] **Step 7: Remove obsolete inline-detail CSS**

Delete only selectors that served the removed inline details and players. Preserve chapter card, habitat video, timeline, and ending styles.

- [ ] **Step 8: Run all tests and verify GREEN**

Run: `npm test`  
Expected: all tests pass.

- [ ] **Step 9: Commit the editorial layout**

```powershell
git add story-styles.css styles-redesign.css tests/story.test.js
git commit -m "style: add responsive magazine story layout"
```

## Task 5: Editor Guide and Asset Directory

**Files:**
- Create: `STORY-CONTENT-GUIDE.md`
- Create: `assets/stories/README.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: exact field names and allowed values implemented in Tasks 1–4.
- Produces: user-facing instructions only; no runtime API.

- [ ] **Step 1: Draft the Chinese guide against the actual implemented model**

Cover all ten requested topics, including one complete placeholder-only record. Document `./assets/stories/file-name.jpg`, `wide|medium|small`, `left|right|center`, both `imageSide` values, block insertion/deletion/reordering, quotes, headings, and sources.

- [ ] **Step 2: Add the asset-directory README and root README pointer**

State that media is user supplied and must have verified rights/credits. Link the root README to `STORY-CONTENT-GUIDE.md` rather than duplicating instructions.

- [ ] **Step 3: Self-check the guide**

Verify every sample field exists in `story-content.js`, every option is accepted by normalization, the example uses no factual story or invented credit, and no instruction references `sources/` for editing.

- [ ] **Step 4: Run tests**

Run: `npm test`  
Expected: all tests pass.

- [ ] **Step 5: Commit documentation**

```powershell
git add STORY-CONTENT-GUIDE.md assets/stories/README.md README.md
git commit -m "docs: explain magazine story content editing"
```

## Task 6: Browser QA, E2E Update, and Final Regression Pass

**Files:**
- Modify: `tests/e2e.cjs`
- Modify only when a Task 6 failing assertion identifies a defect: `story-dialog.js`, `story-renderer.js`, `story-styles.css`, `script.js`, and the owning test file.

**Interfaces:**
- Consumes all completed reader behavior.
- Produces final verification evidence and an updated optional Playwright scenario.

- [ ] **Step 1: Update the E2E scenario before fixes**

Change the existing Passenger Pigeon inline-detail flow to require an open native dialog, visible story heading, close behavior, and focus restoration. Add previous/next switch plus scroll reset, Escape closure, five ending cards, and mobile no-overflow assertions.

- [ ] **Step 2: Run the repository's browser script if its existing Playwright dependency is available**

Run: `node tests/e2e.cjs` against the current local URL.  
Expected: PASS. If the dependency is unavailable, do not install it without approval; record the limitation and perform the same checks through controlled Chrome.

- [ ] **Step 3: Validate all six stories in controlled Chrome at desktop size**

For each Explore Story: open, assert the mapped title and placeholder media, verify no broken image icon, close, and verify focus restoration. Across the fixtures, inspect wide/medium/small, left/center/right, both imageText directions, quote, subheading, divider, and sources.

- [ ] **Step 4: Validate interaction edge cases**

Check Close, Escape, first/last disabled navigation, previous/next switching, scroll-to-top after switching, repeated open/close, background scroll lock/restoration, and paused dialog/background media behavior.

- [ ] **Step 5: Validate mobile and reduced motion**

At 390×844, check single-column order, image-before-text for both imageText directions, readable captions/credits, reachable close/navigation, no clipping, and no horizontal overflow. Check both the site Reduce motion setting and browser reduced-motion preference where supported.

- [ ] **Step 6: Check page identity and runtime health**

Verify the intended localhost URL/title, meaningful DOM content, no framework error overlay, and no relevant console warnings/errors. Capture desktop and mobile screenshots as evidence outside the repository unless explicitly requested otherwise.

- [ ] **Step 7: Make only evidence-driven fixes using TDD**

For every defect, add the smallest failing unit or E2E assertion, observe it fail, implement the fix, then rerun the targeted and full suite.

- [ ] **Step 8: Run final verification**

Run: `npm test`  
Expected: zero failures. Re-run the available browser flow after the test run and confirm the ten requested verification areas.

- [ ] **Step 9: Commit final QA updates**

```powershell
git add tests/e2e.cjs story-dialog.js story-renderer.js story-styles.css script.js tests
git commit -m "test: verify magazine story reader flows"
```

## Final Deliverable Checklist

- [ ] Six placeholder-only stories render from `story-content.js`.
- [ ] One shared renderer supports all six block types and arbitrary block order.
- [ ] Empty, missing, and failed images share the complete placeholder state.
- [ ] Dialog close, Escape, focus restoration, previous/next, and scroll reset work.
- [ ] Desktop and mobile editorial layouts pass visual inspection.
- [ ] Reduced-motion behavior works without removing functionality.
- [ ] `STORY-CONTENT-GUIDE.md` matches the implemented fields exactly.
- [ ] `sources/` remains untouched.
- [ ] Automated tests and browser checks have fresh passing evidence.
