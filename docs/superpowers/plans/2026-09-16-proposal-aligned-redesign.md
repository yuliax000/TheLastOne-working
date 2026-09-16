# THE LAST ONE Proposal-Aligned Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing prototype around full-viewport habitat backgrounds, a persistent left timeline, portrait-based species cards, inline detail expansion and the proposal's visual system.

**Architecture:** Preserve the static, data-driven HTML/CSS/JavaScript architecture. Extend species records with explicit habitat, portrait and supporting-media labels; render complete semantic chapters and inline detail regions; progressively enhance them with GSAP/ScrollTrigger while retaining IntersectionObserver and reduced-motion fallbacks.

**Tech Stack:** HTML5, CSS, JavaScript ES modules, locally pinned GSAP 3 and ScrollTrigger, Node.js built-in test runner, Playwright with system Chrome.

**Spec:** `docs/superpowers/specs/2026-09-16-proposal-aligned-redesign.md`

## Global Constraints

- Desktop timeline remains vertically fixed on the left.
- Habitat media fills each chapter background; animal/individual portraits belong inside species cards.
- Details expand inline within their chapter and do not use a modal.
- Use Bebas Neue for display typography and Inter for body typography, with robust local fallbacks.
- Use proposal colours `#E7E7DF`, `#C9D2BC`, `#8F9390`, `#343836`, `#171918` and `#A89F8D`.
- Preserve all six chapters, accelerated ending, GitHub Pages support, local GSAP files, keyboard accessibility and reduced-motion behavior.
- Real habitat images, portraits, audio and video remain labelled placeholders in this redesign.

---

## File Map

- `data.js` — chapter content plus habitat, portrait and detail-media metadata.
- `render.js` — safe markup for left timeline, fullscreen chapter layers and inline details.
- `index.html` — opening, mount points and ending; removes the obsolete dialog shell.
- `styles.css` — proposal typography, colours, left timeline, chapter composition, inline details, responsive and reduced-motion states.
- `vendor/fonts/` — locally pinned Bebas Neue and Inter WOFF2 files with their OFL licences.
- `script.js` — navigation, inline expansion, observer state, GSAP chapter motion and ending animation.
- `tests/render.test.js` — data and markup contracts.
- `tests/e2e.cjs` — desktop, mobile, detail, timeline, ending, console and reduced-motion verification.
- `README.md` — updated content-replacement guide and project structure.

### Task 1: Habitat, portrait and inline-detail data contracts

**Files:**
- Modify: `data.js`
- Modify: `render.js`
- Modify: `tests/render.test.js`

**Interfaces:**
- Extends each `Species` with `habitatLabel`, `portraitLabel`, `archiveLabel`, `audioLabel`, `individualName` and `timelinePosition`.
- Replaces modal-only markup with `renderChapters(items): string` that emits `.chapter__habitat`, `.species-card__portrait`, `[data-detail-trigger]`, and `[data-inline-detail]`.
- Preserves `renderTimeline(items): string` and `renderEndingItems(items): string`.

- [ ] **Step 1: Write failing proposal-structure tests**

Add assertions that every species has non-empty habitat and portrait labels, timeline positions increase from 0 to 100, every chapter includes one habitat layer and one portrait layer, and every detail trigger has matching `aria-controls` and `aria-expanded="false"`.

```js
test("species define proposal media layers and historical timeline positions", () => {
  assert.equal(species.at(0).timelinePosition, 0);
  assert.equal(species.at(-1).timelinePosition, 100);
  assert.ok(species.every((item) => item.habitatLabel && item.portraitLabel));
  assert.ok(species.every((item, index) => index === 0 || item.timelinePosition > species[index - 1].timelinePosition));
});

test("chapters render separate habitat, portrait, and inline detail layers", () => {
  const html = renderChapters(species);
  assert.equal((html.match(/class="chapter__habitat"/g) || []).length, 6);
  assert.equal((html.match(/class="species-card__portrait"/g) || []).length, 6);
  assert.equal((html.match(/data-inline-detail/g) || []).length, 6);
  assert.equal((html.match(/aria-expanded="false"/g) || []).length, 6);
});
```

- [ ] **Step 2: Run the focused tests and confirm they fail**

Run: `npm test`

Expected: the new data and markup assertions fail against the existing card/dialog structure.

- [ ] **Step 3: Extend the six species records**

Add distinct habitat labels, portrait labels, archival labels, audio labels and individual names. Use uneven `timelinePosition` values `[0, 42, 55, 82, 94, 100]` to suggest historical compression toward the present while retaining readable marker spacing through CSS minimum-gap handling.

- [ ] **Step 4: Rebuild chapter markup**

Render, in order: habitat layer, pale viewport frame, large year, species card with portrait, explicit Explore story button, and a hidden inline detail region containing story, cause, archive placeholder, audio/video placeholder and source label. Escape every data value.

- [ ] **Step 5: Run tests and verify Task 1 is green**

Run: `npm test`

Expected: all data and renderer tests pass.

- [ ] **Step 6: Commit Task 1**

```bash
git add data.js render.js tests/render.test.js
git commit -m "feat: add proposal-aligned chapter layers"
```

### Task 2: Proposal visual system and responsive composition

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `tests/render.test.js`
- Create: `vendor/fonts/bebas-neue-regular.woff2`
- Create: `vendor/fonts/inter-regular.woff2`
- Create: `vendor/fonts/OFL-Bebas-Neue.txt`
- Create: `vendor/fonts/OFL-Inter.txt`

**Interfaces:**
- Consumes Task 1 class hooks.
- Produces CSS state hooks `.is-active`, `.is-expanded`, `.has-gsap`, `.is-static-ending` and `.is-reduced-motion`.
- Removes `#story-dialog` and all dialog-only elements.

- [ ] **Step 1: Write a failing shell and visual-token contract**

Assert that `index.html` no longer contains `<dialog`, that `styles.css` declares the six proposal colours, references Bebas Neue and Inter, and includes desktop rules for `.timeline { left:` and mobile rules that keep a narrow left rail.

```js
test("shell and styles follow the proposal visual contract", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.doesNotMatch(html, /<dialog\b/);
  for (const token of ["#E7E7DF", "#C9D2BC", "#8F9390", "#343836", "#171918", "#A89F8D"]) {
    assert.match(css.toUpperCase(), new RegExp(token));
  }
  assert.match(css, /Bebas Neue/i);
  assert.match(css, /Inter/i);
});
```

- [ ] **Step 2: Run tests and confirm the visual contract fails**

Run: `npm test`

Expected: failure because the existing page retains the dialog and previous palette/typography.

- [ ] **Step 3: Simplify the HTML shell**

Remove the modal dialog markup. Keep skip navigation, site mark, left timeline, opening, chapter mount, ending and footer. Update opening copy only where needed to support the proposal's slower, documentary tone.

- [ ] **Step 4: Vendor the proposal fonts**

Download the current Bebas Neue Regular and Inter Regular WOFF2 files from the official Google Fonts repositories, store them under `vendor/fonts/`, include each family's OFL licence, and declare them with `@font-face` using `font-display: swap`. Extend the unit test to require the four local font assets and reject remote font URLs.

- [ ] **Step 5: Implement the desktop composition**

Replace the current card-on-gradient treatment with fullscreen `.chapter__habitat`, dark overlay, subtle grain, proposal-colour panel, pale frame, large Bebas-style year and card portrait. Keep the timeline rail fixed on the left, reserve a content-safe column beside it, position markers from `--timeline-position`, and visually emphasize the active marker.

- [ ] **Step 6: Implement inline detail layout**

Style collapsed detail regions with zero grid rows and hidden visibility, and expanded regions with one grid row, visible archival/audio blocks and readable Inter body copy. Ensure no content is removed from the DOM.

- [ ] **Step 7: Implement mobile and reduced-motion layouts**

At widths below 760px, retain a slim left rail, show only the active timeline year, keep habitat full-width, place the card in the lower viewport and let expanded details flow beneath. Ensure reduced-motion rules remove pinning and reveal all ending content sequentially.

- [ ] **Step 8: Run tests and verify Task 2 is green**

Run: `npm test`

Expected: all unit tests pass.

- [ ] **Step 9: Commit Task 2**

```bash
git add index.html styles.css tests/render.test.js vendor/fonts
git commit -m "feat: align visual system with proposal"
```

### Task 3: Inline expansion and proposal-paced GSAP motion

**Files:**
- Modify: `script.js`
- Modify: `tests/render.test.js`
- Modify: `tests/e2e.cjs`

**Interfaces:**
- Replaces `openStory` and `closeStory` with `toggleInlineDetail(id: string, trigger: HTMLButtonElement): void`.
- Preserves `setActiveSpecies(id: string): void`, `initChapterObservers(): IntersectionObserver | null` and `initGsapAnimations(): boolean`.
- Uses detail ids `detail-<species.id>` and trigger `aria-controls` values with the same ids.

- [ ] **Step 1: Write failing interaction-contract tests**

Update the module test to require `toggleInlineDetail`, reject `showModal`, and require `aria-expanded`. Update E2E to click Passenger Pigeon's Explore story control, confirm its inline region is visible and the button says expanded, click again and confirm collapse.

```js
test("application uses inline expansion rather than a dialog", async () => {
  const source = await readFile(new URL("../script.js", import.meta.url), "utf8");
  assert.match(source, /function\s+toggleInlineDetail\b/);
  assert.doesNotMatch(source, /showModal\s*\(/);
  assert.match(source, /aria-expanded/);
});
```

- [ ] **Step 2: Run unit and E2E tests and confirm expected failures**

Run: `npm test`

Run: `node tests/e2e.cjs`

Expected: failures against the current modal interaction.

- [ ] **Step 3: Implement accessible inline expansion**

On trigger activation, find the matching detail region, toggle `.is-expanded`, update `aria-expanded`, toggle the region's `hidden` state after collapse animation completion, and keep focus on the trigger. Support Enter and Space through the native button.

- [ ] **Step 4: Rework chapter ScrollTriggers**

Animate the habitat with slow scale/parallax, fade the year and card into place, synchronize the left timeline on enter/back, and keep expanded sections out of pinned calculations by calling `ScrollTrigger.refresh()` after their transitions complete.

- [ ] **Step 5: Preserve and retune the ending**

Keep the 2012–2026 counter and ending cards, but adjust timing so intervals shorten progressively and the final “NEXT?” hold remains calm. Maintain the static reduced-motion path.

- [ ] **Step 6: Run unit and E2E tests**

Run: `npm test`

Run: `node tests/e2e.cjs`

Expected: all tests pass with no relevant console errors.

- [ ] **Step 7: Commit Task 3**

```bash
git add script.js tests/render.test.js tests/e2e.cjs
git commit -m "feat: add inline stories and proposal-paced motion"
```

### Task 4: Documentation and rendered design verification

**Files:**
- Modify: `README.md`
- Modify as findings require: `index.html`, `styles.css`, `script.js`, `tests/e2e.cjs`

**Interfaces:**
- Consumes the completed redesign.
- Produces reproducible editing instructions and desktop/mobile screenshot evidence.

- [ ] **Step 1: Update the README**

Explain the habitat-versus-portrait media split, exact data fields to replace, inline-detail structure, left timeline, local GSAP files, tests and GitHub Pages workflow.

- [ ] **Step 2: Run the complete automated suite**

Run: `npm test`

Run: `node tests/e2e.cjs`

Expected: all unit and E2E checks pass.

- [ ] **Step 3: Verify desktop rendered behavior**

At 1440 × 900, capture opening, one active species chapter, expanded Passenger Pigeon detail and ending. Confirm habitat fills the viewport, portrait stays inside the card, year is dominant, timeline remains on the left and no element overlaps its safe area.

- [ ] **Step 4: Verify mobile rendered behavior**

At 390 × 844, capture opening, chapter and expanded detail. Confirm the slim timeline remains left-aligned, text and display type do not clip, inline detail flows vertically and the document has no horizontal overflow.

- [ ] **Step 5: Verify reduced motion and fallback behavior**

Emulate `prefers-reduced-motion: reduce`, confirm all chapters and details remain reachable, ending items appear in order, and no section relies on pinning. Confirm the page remains readable if `window.gsap` is absent.

- [ ] **Step 6: Fix each observed regression with a failing check first**

For any clipping, overlap, interaction or console issue, add the smallest E2E assertion that reproduces it, watch it fail, apply one focused fix, reload and rerun the same check.

- [ ] **Step 7: Run final verification and inspect Git state**

Run: `npm test`

Run: `node tests/e2e.cjs`

Run: `git status --short`

Expected: all tests pass; only intentional redesign files are modified before the final commit.

- [ ] **Step 8: Commit documentation and QA fixes**

```bash
git add README.md index.html styles.css script.js tests/e2e.cjs
git commit -m "docs: document proposal-aligned editing workflow"
```
