import test from "node:test";
import assert from "node:assert/strict";

import { species } from "../data.js";
import { stories } from "../story-content.js";
import {
  findStoryByChapterId,
  findStoryById,
  getAdjacentStory,
  normalizeAspectRatio,
  normalizeBlock,
  normalizeStory,
} from "../story-renderer.js";

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

test("placeholder fixtures exercise every supported editorial option", () => {
  const blocks = stories.flatMap((story) => story.blocks);
  assert.deepEqual(
    new Set(blocks.map((block) => block.type)),
    new Set(["paragraph", "subheading", "image", "imageText", "quote", "divider"]),
  );
  const images = blocks.filter((block) => block.type === "image");
  assert.deepEqual(new Set(images.map((block) => block.size)), new Set(["wide", "medium", "small"]));
  assert.deepEqual(new Set(images.map((block) => block.align)), new Set(["left", "right", "center"]));
  const imageText = blocks.filter((block) => block.type === "imageText");
  assert.deepEqual(new Set(imageText.map((block) => block.imageSide)), new Set(["left", "right"]));
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
  assert.equal(story.introduction, "在这里填写导语");
});

test("adjacent story lookup respects content order and boundaries", () => {
  assert.equal(getAdjacentStory(stories, "great-auk", "previous"), null);
  assert.equal(getAdjacentStory(stories, "great-auk", "next")?.id, "passenger-pigeon");
  assert.equal(getAdjacentStory(stories, "pinta-tortoise", "next"), null);
  assert.equal(getAdjacentStory(stories, "baiji", "previous")?.id, "kauai-oo");
});
