import { stories } from "./story-content.js";

const IMAGE_SIZES = new Set(["wide", "medium", "small"]);
const IMAGE_ALIGNMENTS = new Set(["left", "right", "center"]);
const IMAGE_SIDES = new Set(["left", "right"]);
const BLOCK_TYPES = new Set(["paragraph", "subheading", "image", "imageText", "quote", "divider"]);

const PLACEHOLDER_TRANSLATIONS = new Map([
  ["在这里填写年份", "Add year here"],
  ["在这里填写标题", "Add story title here"],
  ["在这里填写学名", "Add scientific name here"],
  ["在这里填写栖息地", "Add habitat here"],
  ["在这里填写最后记录地点", "Add last recorded location here"],
  ["在这里填写导语", "Add introduction here"],
  ["在这里填写正文", "Add body text here"],
  ["在这里填写与图片并排的正文", "Add accompanying text here"],
  ["在这里填写图片说明", "Add image caption here"],
  ["在这里填写图片来源", "Add image credit here"],
  ["在这里填写引语", "Add pull quote here"],
  ["在这里填写引语出处", "Add quote attribution here"],
  ["在这里填写小标题", "Add section heading here"],
  ["在这里填写资料名称", "Add source title here"],
]);

function text(value, fallback = "") {
  const resolved = typeof value === "string" ? value : fallback;
  return PLACEHOLDER_TRANSLATIONS.get(resolved) || resolved;
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
    title: text(rawStory.title, "Add story title here"),
    englishName: text(rawStory.englishName),
    scientificName: text(rawStory.scientificName),
    habitat: text(rawStory.habitat),
    lastLocation: text(rawStory.lastLocation),
    introduction: text(rawStory.introduction, "Add introduction here"),
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

function element(documentRef, tagName, className, content) {
  const node = documentRef.createElement(tagName);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function isSafeLink(value) {
  return /^(https?:\/\/|\.\.?\/|\/)/i.test(value);
}

export function createStoryMedia(documentRef, imageData = {}) {
  const image = normalizeImage(imageData);
  const figure = element(documentRef, "figure", "story-media");
  const frame = element(documentRef, "div", "story-media__frame is-placeholder");
  frame.style.aspectRatio = image.aspectRatio;

  const placeholder = element(documentRef, "div", "story-media__placeholder");
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", image.alt || "Place image here");
  placeholder.append(
    element(documentRef, "span", "story-media__placeholder-title", "Place image here"),
    element(
      documentRef,
      "span",
      "story-media__placeholder-ratio",
      `Suggested ratio ${image.aspectRatio.replaceAll(" ", "")}`,
    ),
  );
  frame.append(placeholder);

  if (image.src) {
    const img = element(documentRef, "img", "story-media__image");
    img.alt = image.alt;
    img.hidden = true;
    img.addEventListener("load", () => {
      img.hidden = false;
      frame.classList.remove("is-placeholder");
      frame.classList.add("is-loaded");
    });
    img.addEventListener("error", () => {
      img.remove();
      frame.classList.remove("is-loaded");
      frame.classList.add("is-placeholder");
    });
    img.src = image.src;
    frame.append(img);
  }

  figure.append(frame);
  if (image.caption || image.credit) {
    const figcaption = element(documentRef, "figcaption", "story-media__caption");
    if (image.caption) {
      figcaption.append(element(documentRef, "span", "story-media__caption-text", image.caption));
    }
    if (image.credit) {
      figcaption.append(element(documentRef, "span", "story-media__credit", image.credit));
    }
    figure.append(figcaption);
  }
  return figure;
}

export function createStoryBlock(documentRef, rawBlock) {
  const block = normalizeBlock(rawBlock);
  if (!block) return null;

  if (block.type === "paragraph") {
    return element(documentRef, "p", "story-block story-block--paragraph", block.text);
  }
  if (block.type === "subheading") {
    return element(documentRef, "h2", "story-block story-block--subheading", block.text);
  }
  if (block.type === "divider") {
    const divider = element(documentRef, "div", "story-block story-block--divider");
    divider.setAttribute("role", "separator");
    return divider;
  }
  if (block.type === "quote") {
    const quote = element(documentRef, "blockquote", "story-block story-block--quote");
    quote.append(element(documentRef, "p", "story-quote__text", block.text));
    if (block.attribution) {
      quote.append(element(documentRef, "cite", "story-quote__attribution", block.attribution));
    }
    return quote;
  }
  if (block.type === "imageText") {
    const imageText = element(
      documentRef,
      "section",
      `story-block story-block--image-text story-block--image-side-${block.imageSide}`,
    );
    imageText.append(
      createStoryMedia(documentRef, block.image),
      element(documentRef, "p", "story-image-text__copy", block.text),
    );
    return imageText;
  }

  const media = createStoryMedia(documentRef, block);
  media.classList.add(
    "story-block",
    "story-block--image",
    `story-block--size-${block.size}`,
    `story-block--align-${block.align}`,
  );
  return media;
}

export function createStoryArticle(documentRef, rawStory) {
  const story = normalizeStory(rawStory);
  const article = element(documentRef, "article", "story-reader");
  article.dataset.storyId = story.id;
  article.style.setProperty("--story-accent", story.accent);

  const header = element(documentRef, "header", "story-reader__header");
  const eyebrow = element(documentRef, "p", "story-reader__eyebrow");
  eyebrow.append(
    element(documentRef, "span", "story-reader__chapter", `Story ${story.chapter}`),
    element(documentRef, "span", "story-reader__year", story.year),
  );
  const heading = element(documentRef, "h1", "story-reader__title", story.title);
  heading.id = "story-dialog-title";
  heading.tabIndex = -1;
  header.append(eyebrow, heading);
  if (story.englishName || story.scientificName) {
    const names = element(documentRef, "p", "story-reader__names");
    if (story.englishName) names.append(element(documentRef, "span", "", story.englishName));
    if (story.scientificName) names.append(element(documentRef, "i", "", story.scientificName));
    header.append(names);
  }
  if (story.habitat || story.lastLocation) {
    const meta = element(documentRef, "dl", "story-reader__meta");
    if (story.habitat) {
      meta.append(element(documentRef, "dt", "", "Habitat"), element(documentRef, "dd", "", story.habitat));
    }
    if (story.lastLocation) {
      meta.append(element(documentRef, "dt", "", "Last record"), element(documentRef, "dd", "", story.lastLocation));
    }
    header.append(meta);
  }
  header.append(element(documentRef, "p", "story-reader__introduction", story.introduction));
  article.append(header);

  const body = element(documentRef, "div", "story-reader__body");
  story.blocks.forEach((block) => {
    const rendered = createStoryBlock(documentRef, block);
    if (rendered) body.append(rendered);
  });
  article.append(body);

  const visibleSources = story.sources.filter((source) => source.label);
  if (visibleSources.length) {
    const sourcesSection = element(documentRef, "section", "story-reader__sources");
    sourcesSection.append(element(documentRef, "h2", "", "Sources"));
    const list = element(documentRef, "ol", "");
    visibleSources.forEach((source) => {
      const item = element(documentRef, "li", "");
      if (source.url && isSafeLink(source.url)) {
        const link = element(documentRef, "a", "", source.label);
        link.href = source.url;
        if (/^https?:\/\//i.test(source.url)) {
          link.target = "_blank";
          link.rel = "noreferrer";
        }
        item.append(link);
      } else {
        item.textContent = source.label;
      }
      list.append(item);
    });
    sourcesSection.append(list);
    article.append(sourcesSection);
  }

  return article;
}
