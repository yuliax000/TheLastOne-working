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
  parseEmbedCode,
} from "../story-renderer.js";
import {
  createStoryDialogController,
  getStoryNavigationState,
  stopStoryMedia,
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

test("each story adds a third wrapped image before the centered feature media", () => {
  for (const story of stories) {
    const images = story.blocks.filter((block) => block.type === "image");
    const finalBlock = story.blocks.at(-1);
    assert.equal(images.length, 3, `${story.id} should contain three wrapped image blocks`);
    assert.equal(images[0].align, "left");
    assert.equal(images[1].align, "right");
    assert.equal(images[2].size, "small");
    assert.equal(images[2].align, "left");
    const thirdImageIndex = story.blocks.indexOf(images[2]);
    assert.equal(story.blocks[thirdImageIndex + 1]?.type, "paragraph");
    assert.equal(finalBlock.type, "media");
    assert.equal(finalBlock.mediaType, "image");
    assert.equal(finalBlock.size, "medium");
    assert.equal(finalBlock.align, "center");
    assert.ok(story.blocks.filter((block) => block.type === "paragraph").length >= 4);
  }
});

test("media blocks normalize image video and audio options safely", () => {
  const normalized = [
    normalizeBlock({ type: "media", mediaType: "image", src: "photo.jpg" }),
    normalizeBlock({ type: "media", mediaType: "video", src: "film.mp4", poster: "poster.jpg" }),
    normalizeBlock({ type: "media", mediaType: "audio", src: "call.mp3" }),
    normalizeBlock({ type: "media", mediaType: "unknown", src: "fallback.jpg" }),
  ];

  assert.deepEqual(normalized.map((block) => block.mediaType), ["image", "video", "audio", "image"]);
  assert.equal(normalized[1].poster, "poster.jpg");
  assert.ok(normalized.every((block) => block.type === "media"));
});

test("editor placeholder captions and credits are not visitor-facing", () => {
  const placeholder = normalizeBlock({
    type: "image",
    caption: "Image placeholder 1 · text wraps on the right",
    credit: "Add image credit here",
  });
  const real = normalizeBlock({
    type: "image",
    caption: "A real archival photograph",
    credit: "Museum collection",
  });
  assert.equal(placeholder.caption, "");
  assert.equal(placeholder.credit, "");
  assert.equal(real.caption, "A real archival photograph");
  assert.equal(real.credit, "Museum collection");
});

test("empty story media uses an accessible but text-free placeholder", () => {
  const source = readFileSync(new URL("../story-renderer.js", import.meta.url), "utf8");
  assert.doesNotMatch(source, /story-media__placeholder-title/);
  assert.doesNotMatch(source, /story-media__placeholder-ratio/);
  assert.match(source, /placeholder\.setAttribute\("aria-label"/);
});

test("loaded story images keep their intrinsic aspect ratio without cropping", () => {
  const renderer = readFileSync(new URL("../story-renderer.js", import.meta.url), "utf8");
  const css = readFileSync(new URL("../story-styles.css", import.meta.url), "utf8");

  assert.match(renderer, /if \(media\.mediaType === "image"\) frame\.style\.aspectRatio = "auto"/);
  assert.match(css, /\.story-media__image\s*\{[^}]*height:\s*auto[^}]*object-fit:\s*contain/s);
  assert.doesNotMatch(css, /\.story-media__image,\s*\.story-media__video\s*\{[^}]*height:\s*100%/s);
});

test("HTTPS iframe embeds from multiple providers are parsed without injecting raw HTML", () => {
  const embedCode = `<iframe src="https://macaulaylibrary.org/asset/228099/embed" height="300" width="640" frameborder="0" allowfullscreen></iframe>`;
  assert.deepEqual(parseEmbedCode(embedCode), {
    src: "https://macaulaylibrary.org/asset/228099/embed",
    width: 640,
    height: 300,
    title: "",
    allowFullscreen: true,
  });
  assert.deepEqual(
    parseEmbedCode(`<iframe src="https://www.youtube.com/embed/abc123" title="YouTube video"></iframe>`),
    {
      src: "https://www.youtube.com/embed/abc123",
      width: null,
      height: null,
      title: "YouTube video",
      allowFullscreen: false,
    },
  );
  assert.equal(parseEmbedCode(`<iframe src="http://example.com/embed"></iframe>`), null);
  assert.equal(parseEmbedCode(`<iframe src="javascript:alert(1)"></iframe>`), null);
  assert.equal(parseEmbedCode(`<script>alert(1)</script>`), null);

  const normalized = normalizeBlock({
    type: "media",
    mediaType: "embed",
    embedCode,
    title: "Kauaʻi ʻōʻō field recording",
  });
  assert.equal(normalized.mediaType, "embed");
  assert.equal(normalized.embedCode, embedCode);
  assert.equal(normalized.title, "Kauaʻi ʻōʻō field recording");
});

test("closing a story stops local media and unloads embedded players", () => {
  let pauses = 0;
  const iframe = { src: "https://macaulaylibrary.org/asset/228099/embed" };
  const root = {
    querySelectorAll(selector) {
      if (selector === "audio, video") return [{ pause: () => { pauses += 1; } }];
      if (selector === "iframe[data-story-embed]") return [iframe];
      return [];
    },
  };
  stopStoryMedia(root);
  assert.equal(pauses, 1);
  assert.equal(iframe.src, "about:blank");
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

test("Explore Story header omits the editorial title and story number", () => {
  const source = readFileSync(new URL("../story-renderer.js", import.meta.url), "utf8");
  const articleSource = source.slice(
    source.indexOf("export function createStoryArticle"),
    source.indexOf("export function", source.indexOf("export function createStoryArticle") + 1),
  );

  assert.doesNotMatch(articleSource, /Story \$\{story\.chapter\}/);
  assert.doesNotMatch(articleSource, /story-reader__title/);
  assert.doesNotMatch(articleSource, /story\.title/);
  assert.match(articleSource, /story-dialog-title/);
  assert.match(articleSource, /story\.englishName/);
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
  assert.match(css, /\.story-media__embed\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%/s);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /\.story-block--size-medium\.story-block--align-left,[\s\S]*?\{\s*float:\s*left/);
  assert.match(css, /\.story-block--size-medium\.story-block--align-right,[\s\S]*?\{\s*float:\s*right/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.story-block--image\s*\{[^}]*float:\s*none\s*!important/s);
  assert.match(css, /\.story-dialog__close\s*\{[^}]*min-width:[^;}]+;[^}]*width:\s*auto/s);
  assert.match(css, /\.story-block--size-wide\.story-block--align-center\s*\{[^}]*margin-left:\s*50%;[^}]*margin-right:\s*0/s);
  for (const selector of ["quote", "size-wide", "image-text"]) {
    const rule = css.match(new RegExp(`\\.story-block--${selector}\\s*\\{([^}]*)\\}`, "s"))?.[1] ?? "";
    assert.match(rule, /margin-left:\s*50%/, `${selector} should start from the article midpoint`);
    assert.match(rule, /margin-right:\s*0/, `${selector} should not use an auto-resolved right margin`);
  }
});

test("dialog close synchronously releases the page lock and restores focus", () => {
  const source = readFileSync(new URL("../story-dialog.js", import.meta.url), "utf8");
  assert.match(source, /if \(dialog\.open\) dialog\.close\(\);\s*cleanup\(\);/);
});
