import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { species, recentExtinctions } from "../data.js";
import {
  escapeHtml,
  renderChapters,
  renderTimeline,
  renderEndingItems,
} from "../render.js";

test("the narrative contains six ordered species", () => {
  assert.equal(species.length, 6);
  assert.deepEqual(
    species.map((item) => item.year),
    [1844, 1914, 1936, 1987, 2006, 2012],
  );
  assert.equal(new Set(species.map((item) => item.id)).size, 6);
});

test("renderers include navigation, chapter controls, and ending cards", () => {
  assert.match(
    renderTimeline(species),
    /aria-label="Go to Great Auk, 1844"/,
  );
  assert.equal(
    (renderChapters(species).match(/data-detail-trigger/g) || []).length,
    6,
  );
  assert.equal(
    (renderChapters(species).match(/data-inline-detail/g) || []).length,
    6,
  );
  assert.equal(
    (renderChapters(species).match(/chapter__habitat/g) || []).length,
    6,
  );
  assert.equal(
    (renderChapters(species).match(/species-card__portrait/g) || []).length,
    6,
  );
  assert.match(renderChapters(species), /aria-expanded="false"/);
  assert.match(renderChapters(species), /aria-controls="detail-great-auk"/);
  assert.equal(
    (renderEndingItems(recentExtinctions).match(/data-ending-item/g) || [])
      .length,
    recentExtinctions.length,
  );
});

test("dynamic content is escaped", () => {
  assert.equal(
    escapeHtml('<img src=x onerror="alert(1)">'),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
  );
});

test("HTML shell exposes required mounts without a modal dialog", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  for (const id of [
    "timeline-list",
    "chapters",
    "ending-items",
  ]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.doesNotMatch(html, /<dialog/);
  assert.doesNotMatch(html, /aria-modal="true"/);
  assert.match(html, /vendor\/gsap\.min\.js/);
});

test("HTML uses vendored GSAP files so local animation does not depend on CDN access", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /\.\/vendor\/gsap\.min\.js/);
  assert.match(html, /\.\/vendor\/ScrollTrigger\.min\.js/);
  const gsap = await readFile(new URL("../vendor/gsap.min.js", import.meta.url), "utf8");
  const scrollTrigger = await readFile(
    new URL("../vendor/ScrollTrigger.min.js", import.meta.url),
    "utf8",
  );
  assert.ok(gsap.length > 50000);
  assert.ok(scrollTrigger.length > 30000);
});

test("application module declares fallback and GSAP initializers", async () => {
  const source = await readFile(new URL("../script.js", import.meta.url), "utf8");
  for (const name of [
    "setActiveSpecies",
    "toggleInlineDetail",
    "initChapterObservers",
    "initPinnedChapters",
    "initGsapAnimations",
  ]) {
    assert.match(source, new RegExp(`(?:function|const)\\s+${name}\\b`));
  }
  assert.match(source, /window\.gsap/);
  assert.match(source, /prefers-reduced-motion/);
  assert.doesNotMatch(source, /!ScrollTrigger \|\| motionQuery\.matches/);
  assert.match(source, /initPinnedChapters\(gsap, ScrollTrigger, state\.reduceMotion\)/);
});

test("animated chapters use a fixed stage and scroll-driven card switching", async () => {
  const css = await readFile(
    new URL("../styles-redesign.css", import.meta.url),
    "utf8",
  );
  const source = await readFile(new URL("../script.js", import.meta.url), "utf8");

  assert.match(css, /\.has-gsap \.chapter__habitat\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /\.has-gsap \.species-card\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /\.has-gsap \.chapter\s*\{[^}]*min-height:\s*100svh/s);
  assert.match(source, /ScrollTrigger\.create\(/);
  assert.match(source, /onEnterBack:\s*\(\)\s*=>\s*activateChapter/);
  assert.match(source, /duration:\s*reduceMotion \? 0 : 0\.45/);
  assert.match(source, /ease:\s*"power4\.out"/);
  assert.doesNotMatch(source, /start:\s*"top 78%"/);
  assert.doesNotMatch(source, /backdrop-filter:\s*blur/);
  assert.match(css, /transform:\s*scaleY\(var\(--timeline-progress\)\)/);
  assert.match(source, /style\.setProperty\("--timeline-progress", String\(progress\)\)/);
});

test("ending builds an accumulating photo field with a hopeful closing question", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const css = await readFile(
    new URL("../styles-redesign.css", import.meta.url),
    "utf8",
  );
  const source = await readFile(new URL("../script.js", import.meta.url), "utf8");
  const ending = renderEndingItems(recentExtinctions);

  assert.equal(
    (ending.match(/ending-card__caption/g) || []).length,
    recentExtinctions.length,
  );
  assert.match(html, /THE STORY IS NOT WRITTEN/);
  assert.equal((html.match(/data-ending-step/g) || []).length, 8);
  assert.match(css, /\.ending-card:nth-child\(2\)/);
  assert.match(source, /function initEndingSequence/);
  assert.match(source, /querySelectorAll\("\[data-ending-step\]"\)/);
  assert.doesNotMatch(source, /scrub:\s*1/);
  assert.doesNotMatch(source, /pin:\s*stage/);
  assert.match(source, /if \(visibleCount > 0\)/);
  assert.doesNotMatch(css, /\.is-static-ending \.ending-card\{position:static/);
  assert.doesNotMatch(css, /\.is-static-ending \.ending__items\{[^}]*display:grid/s);
  assert.match(css, /\.ending__steps\{[^}]*pointer-events:none/s);
  assert.doesNotMatch(source, /if \(motionQuery\.matches\) \{\s*revealStaticEnding\(\);\s*return true;/s);
});

test("GSAP mode avoids a duplicate chapter observer", async () => {
  const source = await readFile(new URL("../script.js", import.meta.url), "utf8");
  assert.match(source, /if \(!initGsapAnimations\(\)\) initChapterObservers\(\)/);
  assert.doesNotMatch(source, /initChapterObservers\(\);\s*initGsapAnimations\(\);/);
});

test("motion is on by default and can be reduced with an explicit control", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const source = await readFile(new URL("../script.js", import.meta.url), "utf8");

  assert.match(html, /id="motion-toggle"/);
  assert.match(html, /aria-pressed="false"/);
  assert.match(source, /localStorage\.getItem\("the-last-one-motion"\) === "reduce"/);
  assert.match(source, /state\.reduceMotion/);
  assert.doesNotMatch(source, /initPinnedChapters\(gsap, ScrollTrigger, motionQuery\.matches\)/);
  assert.doesNotMatch(source, /initEndingSequence\(gsap, ScrollTrigger, motionQuery\.matches\)/);
});

test("the ending links to a six-species reference page", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const references = await readFile(
    new URL("../references.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /href="\.\/references\.html"/);
  assert.match(references, /Back to story/i);
  assert.equal((references.match(/class="reference-entry"/g) || []).length, 6);
  for (const name of [
    "Great Auk",
    "Passenger Pigeon",
    "Thylacine",
    "Kauaʻi ʻōʻō",
    "Baiji",
    "Lonesome George",
  ]) {
    assert.match(references, new RegExp(name));
  }
});

test("the final statement stays calm, centered, and on one line", async () => {
  const css = await readFile(
    new URL("../styles-redesign.css", import.meta.url),
    "utf8",
  );
  const source = await readFile(new URL("../script.js", import.meta.url), "utf8");

  assert.match(css, /\.next-question__title\{[^}]*font-size:clamp\(2rem,5vw,4\.5rem\)/s);
  assert.match(css, /\.next-question__title\{[^}]*white-space:nowrap/s);
  assert.match(css, /\.next-question\{[^}]*background:#141815d9/s);
  assert.match(source, /gsap\.set\(next, \{ autoAlpha: 0, y: reduceMotion \? 0 : 14 \}\)/);
  assert.match(source, /gsap\.to\(next, \{\s*autoAlpha: showClosing \? 1 : 0,\s*y: showClosing \? 0 : 14/s);
});
