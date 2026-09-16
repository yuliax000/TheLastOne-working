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
    "initGsapAnimations",
  ]) {
    assert.match(source, new RegExp(`(?:function|const)\\s+${name}\\b`));
  }
  assert.match(source, /window\.gsap/);
  assert.match(source, /prefers-reduced-motion/);
});
