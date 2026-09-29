import { stories } from "./story-content.js";

const IMAGE_SIZES = new Set(["wide", "medium", "small"]);
const IMAGE_ALIGNMENTS = new Set(["left", "right", "center"]);
const IMAGE_SIDES = new Set(["left", "right"]);
const BLOCK_TYPES = new Set(["paragraph", "subheading", "image", "imageText", "quote", "divider"]);

function text(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export function normalizeAspectRatio(value) {
  if (typeof value !== "string") return "16 / 9";
  const match = value.trim().match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (!match || Number(match[1]) <= 0 || Number(match[2]) <= 0) return "16 / 9";
  return `${match[1]} / ${match[2]}`;
}

function normalizeImage(image = {}) {
  return {
    src: text(image.src),
    alt: text(image.alt),
    caption: text(image.caption),
    credit: text(image.credit),
    aspectRatio: normalizeAspectRatio(image.aspectRatio),
  };
}

export function normalizeBlock(block) {
  if (!block || !BLOCK_TYPES.has(block.type)) return null;

  if (block.type === "paragraph" || block.type === "subheading") {
    return { type: block.type, text: text(block.text) };
  }
  if (block.type === "divider") return { type: "divider" };
  if (block.type === "quote") {
    return {
      type: "quote",
      text: text(block.text),
      attribution: text(block.attribution),
    };
  }
  if (block.type === "imageText") {
    return {
      type: "imageText",
      image: normalizeImage(block.image),
      text: text(block.text),
      imageSide: IMAGE_SIDES.has(block.imageSide) ? block.imageSide : "left",
    };
  }

  return {
    type: "image",
    ...normalizeImage(block),
    size: IMAGE_SIZES.has(block.size) ? block.size : "wide",
    align: IMAGE_ALIGNMENTS.has(block.align) ? block.align : "center",
  };
}

export function normalizeStory(rawStory = {}) {
  const rawBlocks = Array.isArray(rawStory.blocks) ? rawStory.blocks : [];
  const rawSources = Array.isArray(rawStory.sources) ? rawStory.sources : [];
  return {
    id: text(rawStory.id),
    chapterId: text(rawStory.chapterId, text(rawStory.id)),
    chapter: text(rawStory.chapter),
    year: text(rawStory.year),
    title: text(rawStory.title, "在这里填写标题"),
    englishName: text(rawStory.englishName),
    scientificName: text(rawStory.scientificName),
    habitat: text(rawStory.habitat),
    lastLocation: text(rawStory.lastLocation),
    introduction: text(rawStory.introduction, "在这里填写导语"),
    accent: /^#[0-9a-f]{6}$/i.test(rawStory.accent || "") ? rawStory.accent : "#ced8c3",
    blocks: rawBlocks.map(normalizeBlock).filter(Boolean),
    sources: rawSources.map((source) => ({
      label: text(source?.label),
      url: text(source?.url),
    })),
  };
}

export function findStoryById(id) {
  return stories.find((story) => story.id === id) || null;
}

export function findStoryByChapterId(chapterId) {
  return stories.find((story) => story.chapterId === chapterId) || null;
}

export function getAdjacentStory(items, activeId, direction) {
  const index = items.findIndex((story) => story.id === activeId);
  if (index < 0) return null;
  const targetIndex = index + (direction === "previous" ? -1 : direction === "next" ? 1 : 0);
  if (targetIndex === index || targetIndex < 0 || targetIndex >= items.length) return null;
  return items[targetIndex];
}
