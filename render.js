export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderTimeline(items) {
  return items
    .map(
      (item) => `
        <li class="timeline__item">
          <button
            class="timeline__button"
            type="button"
            data-target="species-${escapeHtml(item.id)}"
            aria-label="Go to ${escapeHtml(item.name)}, ${escapeHtml(item.year)}"
            aria-current="false"
          >
            <span class="timeline__dot" aria-hidden="true"></span>
            <span class="timeline__year">${escapeHtml(item.year)}</span>
          </button>
        </li>`,
    )
    .join("");
}

export function renderChapters(items) {
  return items
    .map(
      (item) => `
        <section
          class="chapter"
          id="species-${escapeHtml(item.id)}"
          data-species="${escapeHtml(item.id)}"
          style="--chapter-accent: ${escapeHtml(item.accent)}"
          aria-labelledby="title-${escapeHtml(item.id)}"
        >
          <div class="chapter__habitat" role="img" aria-label="${escapeHtml(item.habitatLabel)}">
            ${item.habitatVideo ? `<video data-habitat-video muted loop playsinline preload="none" src="${escapeHtml(item.habitatVideo)}" aria-hidden="true"></video>` : `<p class="media-placeholder">${escapeHtml(item.habitatLabel)}</p>`}
          </div>
          <div class="chapter__veil" aria-hidden="true"></div>
          <article class="species-card" data-species-card>
            <div class="species-card__meta">
              <span>${escapeHtml(item.index)} / 06</span>
              <span>${escapeHtml(item.location)}</span>
            </div>
            <div class="species-card__portrait" role="img" aria-label="${escapeHtml(item.portraitLabel)}">
              <span>${escapeHtml(item.portraitLabel)}</span>
            </div>
            <p class="species-card__year">${escapeHtml(item.year)}</p>
            <h2 id="title-${escapeHtml(item.id)}">${escapeHtml(item.name)}</h2>
            <p class="species-card__individual">${escapeHtml(item.individualName)}</p>
            <p class="species-card__scientific"><i>${escapeHtml(item.scientificName)}</i></p>
            <p class="species-card__summary">${escapeHtml(item.summary)}</p>
            <button class="story-link" type="button" data-story-trigger data-story-id="${escapeHtml(item.storyId || item.id)}" aria-haspopup="dialog" aria-controls="story-dialog">
              <span>Explore story</span>
              <span class="story-link__mark" aria-hidden="true">+</span>
            </button>
          </article>
          <p class="chapter__scroll-cue" aria-hidden="true">Scroll to continue</p>
        </section>`,
    )
    .join("");
}

export function renderEndingItems(items) {
  return items
    .map(
      (item) => `
        <article class="ending-card" data-ending-item data-ending-id="${escapeHtml(item.id)}">
          <div class="ending-card__image" aria-hidden="true">
            <span>IMAGE PLACEHOLDER</span>
          </div>
          <div class="ending-card__caption">
            <p class="ending-card__year">${escapeHtml(item.year)}</p>
            <h3>${escapeHtml(item.name)}</h3>
            <p class="ending-card__status">${escapeHtml(item.status)}</p>
          </div>
        </article>`,
    )
    .join("");
}
