import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { species } from "../data.js";
import { stories } from "../story-content.js";
import {
  createStoryArticle,
  createStoryBlock,
  createStoryMedia,
  findStoryByChapterId,
  findStoryById,
  getAdjacentStory,
  normalizeAspectRatio,
  normalizeBlock,
  normalizeStory,
} from "../story-renderer.js";
import {
  createStoryDialogController,
  getStoryNavigationState,
} from "../story-dialog.js";

const expectedIds = [
  "great-auk",
  "passenger-pigeon",
  "thylacine",
  "kauai-oo",
  "baiji",
  "pinta-tortoise",
];

test("story content exposes six ordered placeholder records", () => {
  assert.deepEqual(stories.map((story) => story.id), expectedIds);
  assert.equal(new Set(stories.map((story) => story.id)).size, 6);
  for (const story of stories) {
    assert.ok(story.title.includes("在这里填写"));
    assert.ok(story.introduction.includes("在这里填写"));
    assert.ok(Array.isArray(story.blocks));
    assert.ok(Array.isArray(story.sources));
  }
});

test("all visitor-facing story placeholders are English", () => {
  assert.doesNotMatch(JSON.stringify(stories.map(normalizeStory)), /[\u3400-\u9fff]/);
  assert.equal(normalizeStory({}).title, "Add story title here");
  assert.equal(normalizeStory({}).introduction, "Add introduction here");
});

test("each story demonstrates three-image magazine pacing and text wrap", () => {
  for (const story of stories) {
    const images = story.blocks.filter((block) => block.type === "image");
    assert.equal(images.length, 3, `${story.id} should contain three image blocks`);
    assert.ok(images.some((image) => image.size === "small" && image.align === "left"));
    assert.ok(images.some((image) => image.size === "small" && image.align === "right"));
    assert.ok(images.some((image) => image.size === "wide" && image.align === "center"));
    assert.ok(story.blocks.filter((block) => block.type === "paragraph").length >= 4);
  }
});

test("renderer normalization keeps every supported editorial option available", () => {
  const fixtures = [
    { type: "paragraph", text: "Copy" },
    { type: "subheading", text: "Heading" },
    { type: "quote", text: "Quote" },
    { type: "divider" },
    { type: "image", size: "wide", align: "center" },
    { type: "image", size: "medium", align: "left" },
    { type: "image", size: "small", align: "right" },
    { type: "imageText", imageSide: "left" },
    { type: "imageText", imageSide: "right" },
  ].map(normalizeBlock);
  assert.deepEqual(new Set(fixtures.map((block) => block.type)), new Set(["paragraph", "subheading", "image", "imageText", "quote", "divider"]));
  assert.deepEqual(new Set(fixtures.filter((block) => block.type === "image").map((block) => block.size)), new Set(["wide", "medium", "small"]));
  assert.deepEqual(new Set(fixtures.filter((block) => block.type === "image").map((block) => block.align)), new Set(["left", "right", "center"]));
  assert.deepEqual(new Set(fixtures.filter((block) => block.type === "imageText").map((block) => block.imageSide)), new Set(["left", "right"]));
});

test("every existing chapter maps to one story", () => {
  assert.equal(species.length, 6);
  for (const chapter of species) {
    assert.equal(findStoryById(chapter.storyId)?.id, chapter.storyId);
  }
  assert.equal(findStoryByChapterId("lonesome-george")?.id, "pinta-tortoise");
});

test("normalization applies safe layout fallbacks and preserves literal text", () => {
  assert.equal(normalizeAspectRatio("4 / 5"), "4 / 5");
  assert.equal(normalizeAspectRatio("url(javascript:bad)"), "16 / 9");
  assert.deepEqual(
    normalizeBlock({
      type: "image",
      src: 'x" onerror="alert(1)',
      alt: "<b>literal</b>",
      size: "giant",
      align: "float",
      aspectRatio: "nope",
    }),
    {
      type: "image",
      src: 'x" onerror="alert(1)',
      alt: "<b>literal</b>",
      caption: "",
      credit: "",
      size: "wide",
      align: "center",
      aspectRatio: "16 / 9",
    },
  );
  assert.equal(normalizeBlock({ type: "unknown", text: "skip" }), null);
});

test("normalization tolerates missing optional fields", () => {
  const story = normalizeStory({ id: "empty", title: '“标题” <test>' });
  assert.equal(story.title, '“标题” <test>');
  assert.deepEqual(story.blocks, []);
  assert.deepEqual(story.sources, []);
  assert.equal(story.introduction, "Add introduction here");
});

test("adjacent story lookup respects content order and boundaries", () => {
  assert.equal(getAdjacentStory(stories, "great-auk", "previous"), null);
  assert.equal(getAdjacentStory(stories, "great-auk", "next")?.id, "passenger-pigeon");
  assert.equal(getAdjacentStory(stories, "pinta-tortoise", "next"), null);
  assert.equal(getAdjacentStory(stories, "baiji", "previous")?.id, "kauai-oo");
});

test("shared story DOM builders are exported", () => {
  assert.equal(typeof createStoryArticle, "function");
  assert.equal(typeof createStoryBlock, "function");
  assert.equal(typeof createStoryMedia, "function");
});

test("story normalization preserves valid block order and empty optional media text", () => {
  const normalized = normalizeStory({
    id: "ordered",
    blocks: [
      { type: "paragraph", text: "first <literal>" },
      { type: "unknown", text: "skip" },
      { type: "image", src: "", caption: "", credit: "" },
      { type: "subheading", text: "last & literal" },
    ],
    sources: [],
  });
  assert.deepEqual(normalized.blocks.map((block) => block.type), ["paragraph", "image", "subheading"]);
  assert.equal(normalized.blocks[0].text, "first <literal>");
  assert.equal(normalized.blocks[1].caption, "");
  assert.equal(normalized.blocks[1].credit, "");
  assert.equal(normalized.blocks[2].text, "last & literal");
  assert.deepEqual(normalized.sources, []);
});

test("dialog navigation state exposes adjacent stories and disabled boundaries", () => {
  assert.deepEqual(getStoryNavigationState(stories, "great-auk"), {
    activeIndex: 0,
    previous: null,
    next: stories[1],
  });
  assert.deepEqual(getStoryNavigationState(stories, "pinta-tortoise"), {
    activeIndex: 5,
    previous: stories[4],
    next: null,
  });
  assert.deepEqual(getStoryNavigationState(stories, "missing"), {
    activeIndex: -1,
    previous: null,
    next: null,
  });
  assert.equal(typeof createStoryDialogController, "function");
});

test("magazine stylesheet defines the complete responsive editorial contract", () => {
  const css = readFileSync(new URL("../story-styles.css", import.meta.url), "utf8");

  assert.match(css, /\.story-dialog\s*\{/);
  assert.match(css, /\.story-dialog__scroller\s*\{[^}]*overflow-y:\s*auto/s);
  assert.match(css, /\.is-story-dialog-open\s*\{/);
  assert.match(css, /\.story-reader__body\s*\{[^}]*display:\s*flow-root/s);
  for (const size of ["wide", "medium", "small"]) {
    assert.match(css, new RegExp(`\\.story-block--size-${size}\\s*\\{`));
  }
  for (const alignment of ["left", "right", "center"]) {
    assert.match(css, new RegExp(`\\.story-block--align-${alignment}\\s*\\{`));
  }
  for (const side of ["left", "right"]) {
    assert.match(css, new RegExp(`\\.story-block--image-side-${side}(?:\\s*\\{|\\s+\\.)`));
  }
  assert.match(css, /aspect-ratio:\s*var\(--media-aspect/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /\.story-block--size-medium\.story-block--align-left,[\s\S]*?\{\s*float:\s*left/);
  assert.match(css, /\.story-block--size-medium\.story-block--align-right,[\s\S]*?\{\s*float:\s*right/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.story-block--image\s*\{[^}]*float:\s*none\s*!important/s);
  assert.match(css, /\.story-dialog__close\s*\{[^}]*min-width:[^;}]+;[^}]*width:\s*auto/s);
});

test("dialog close synchronously releases the page lock and restores focus", () => {
  const source = readFileSync(new URL("../story-dialog.js", import.meta.url), "utf8");
  assert.match(source, /if \(dialog\.open\) dialog\.close\(\);\s*cleanup\(\);/);
});
