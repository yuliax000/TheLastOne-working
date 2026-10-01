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
import { syncHabitatVideos } from "../media.js";
import { createGlobalAudioController } from "../global-audio.js";

test("global audio exposes a reusable controller", async () => {
  const module = await import("../global-audio.js").catch(() => ({}));
  assert.equal(typeof module.createGlobalAudioController, "function");
});

test("global audio stays hidden without a source and toggles configured sound", async () => {
  const listeners = new Map();
  const attributes = new Map();
  const button = {
    hidden: false,
    textContent: "",
    addEventListener: (name, handler) => listeners.set(name, handler),
    setAttribute: (name, value) => attributes.set(name, value),
  };
  const audio = {
    src: "",
    loop: false,
    volume: 1,
    paused: true,
    playCalls: 0,
    pauseCalls: 0,
    play() { this.paused = false; this.playCalls += 1; return Promise.resolve(); },
    pause() { this.paused = true; this.pauseCalls += 1; },
  };

  const inactive = createGlobalAudioController({ audio, button, config: { src: "" } });
  assert.equal(inactive.enabled, false);
  assert.equal(button.hidden, true);

  const controller = createGlobalAudioController({
    audio,
    button,
    config: { src: "./assets/audio/ambient.mp3", label: "Ambient soundscape", volume: 0.35 },
  });
  assert.equal(controller.enabled, true);
  assert.equal(button.hidden, false);
  assert.equal(audio.src, "./assets/audio/ambient.mp3");
  assert.equal(audio.loop, true);
  assert.equal(audio.volume, 0.35);
  assert.equal(button.textContent, "Sound on");

  await controller.toggle();
  assert.equal(audio.playCalls, 1);
  assert.equal(button.textContent, "Sound off");
  assert.equal(attributes.get("aria-pressed"), "true");

  await controller.toggle();
  assert.equal(audio.pauseCalls, 1);
  assert.equal(button.textContent, "Sound on");
  assert.equal(attributes.get("aria-pressed"), "false");
});

test("global audio configuration and controls are present but inactive by default", async () => {
  const data = await import("../data.js");
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.deepEqual(data.globalAudio, {
    src: "",
    label: "Ambient soundscape",
    volume: 0.35,
  });
  assert.match(html, /id="global-audio"/);
  assert.match(html, /id="sound-toggle"/);
});

test("the narrative contains six ordered species", () => {
  assert.equal(species.length, 6);
  assert.deepEqual(
    species.map((item) => item.year),
    [1844, 1914, 1936, 1987, 2006, 2012],
  );
  assert.equal(new Set(species.map((item) => item.id)).size, 6);
});

test("the recent extinction collage does not include a speculative 2026 card", () => {
  assert.equal(recentExtinctions.length, 5);
  assert.doesNotMatch(renderEndingItems(recentExtinctions), /The next species/i);
});

test("renderers include navigation, chapter controls, and ending cards", () => {
  const chapters = renderChapters(species);
  assert.match(
    renderTimeline(species),
    /aria-label="Go to Great Auk, 1844"/,
  );
  assert.equal(
    (chapters.match(/data-story-trigger/g) || []).length,
    6,
  );
  assert.equal(
    (chapters.match(/data-inline-detail/g) || []).length,
    0,
  );
  assert.equal(
    (chapters.match(/chapter__habitat/g) || []).length,
    6,
  );
  assert.equal(
    (chapters.match(/class="species-card__portrait"/g) || []).length,
    6,
  );
  assert.match(chapters, /data-story-id="great-auk"/);
  assert.match(chapters, /data-story-id="pinta-tortoise"/);
  assert.equal(
    (renderEndingItems(recentExtinctions).match(/data-ending-item/g) || [])
      .length,
    recentExtinctions.length,
  );
});

test("empty homepage media keeps accessible labels without visible placeholder copy", () => {
  const chapters = renderChapters(species);
  const ending = renderEndingItems(recentExtinctions);
  assert.match(chapters, /aria-label="North Atlantic cliffs · habitat image placeholder"/);
  assert.doesNotMatch(chapters, />\s*[^<]*placeholder[^<]*</i);
  assert.doesNotMatch(ending, /IMAGE PLACEHOLDER/i);
});

test("dynamic content is escaped", () => {
  assert.equal(
    escapeHtml('<img src=x onerror="alert(1)">'),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
  );
});

test("chapters render optional habitat video only when a path is provided", () => {
  const withMedia = {
    ...species[0],
    habitatVideo: "./assets/video/auk-habitat.mp4",
  };
  const withoutMedia = {
    ...species[1],
    habitatVideo: "",
  };
  const html = renderChapters([withMedia, withoutMedia]);
  const first = html.split('id="species-passenger-pigeon"')[0];
  const second = html.split('id="species-passenger-pigeon"')[1];

  assert.match(first, /<video[^>]*data-habitat-video[^>]*muted[^>]*loop[^>]*playsinline/s);
  assert.match(first, /src="\.\/assets\/video\/auk-habitat\.mp4"/);
  assert.doesNotMatch(second, /data-habitat-video/);
});

test("chapter portraits support configurable image crop with a safe placeholder fallback", () => {
  const html = renderChapters([
    {
      ...species[0],
      portraitImage: "./assets/images/great-auk-landscape.jpg",
      portraitFit: "contain",
      portraitPosition: "25% center",
    },
    { ...species[1], portraitImage: "" },
  ]);
  const first = html.split('id="species-passenger-pigeon"')[0];
  const second = html.split('id="species-passenger-pigeon"')[1];

  assert.match(first, /class="species-card__portrait-image"/);
  assert.match(first, /src="\.\/assets\/images\/great-auk-landscape\.jpg"/);
  assert.match(first, /--portrait-fit:\s*contain/);
  assert.match(first, /--portrait-position:\s*25% center/);
  assert.match(first, /onerror="this\.hidden=true"/);
  assert.match(first, /aria-label="Great Auk · species portrait placeholder"/);
  assert.doesNotMatch(second, /species-card__portrait-image/);

  const unsafe = renderChapters([{ ...species[0], portraitImage: 'x" onerror="alert(1)', portraitFit: "bad", portraitPosition: "left; color: red" }]);
  assert.doesNotMatch(unsafe, /onerror="alert/);
  assert.match(unsafe, /--portrait-fit:\s*cover/);
  assert.match(unsafe, /--portrait-position:\s*center center/);
});

test("media paths are escaped before insertion into HTML", () => {
  const html = renderChapters([{ ...species[0], habitatVideo: 'x" onerror="alert(1)' }]);
  assert.doesNotMatch(html, /onerror="alert/);
  assert.match(html, /x&amp;quot;|x&quot;/);
});

test("only the active chapter's habitat video plays", () => {
  const events = [];
  const chapter = (id) => ({
    dataset: { species: id },
    querySelector: () => ({
      play: () => { events.push(`${id}:play`); return Promise.resolve(); },
      pause: () => events.push(`${id}:pause`),
    }),
  });
  const chapters = [chapter("great-auk"), chapter("baiji")];
  syncHabitatVideos(chapters, "baiji");
  assert.deepEqual(events, ["great-auk:pause", "baiji:play"]);
  events.length = 0;
  syncHabitatVideos(chapters, null);
  assert.deepEqual(events, ["great-auk:pause", "baiji:pause"]);
});

test("HTML shell exposes required mounts and one shared story dialog", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  for (const id of [
    "timeline-list",
    "chapters",
    "ending-items",
  ]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.equal((html.match(/<dialog\b/g) || []).length, 1);
  for (const id of ["story-dialog", "story-dialog-scroller", "story-dialog-content"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /story-styles\.css/);
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
  assert.match(
    css,
    /\.ending-card:nth-child\(4\)\{[^}]*right:0;top:36%/s,
    "the 2020 card should sit below the large ending year on desktop",
  );
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
