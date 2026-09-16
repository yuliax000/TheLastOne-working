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
          <div class="chapter__media" aria-hidden="true">
            <div class="chapter__orb"></div>
            <p class="chapter__media-label">${escapeHtml(item.mediaLabel)}</p>
          </div>
          <article class="species-card">
            <div class="species-card__meta">
              <span>${escapeHtml(item.index)} / 06</span>
              <span>${escapeHtml(item.location)}</span>
            </div>
            <p class="species-card__year">${escapeHtml(item.year)}</p>
            <h2 id="title-${escapeHtml(item.id)}">${escapeHtml(item.name)}</h2>
            <p class="species-card__scientific"><i>${escapeHtml(item.scientificName)}</i></p>
            <p class="species-card__summary">${escapeHtml(item.summary)}</p>
            <button class="story-link" type="button" data-detail-trigger="${escapeHtml(item.id)}">
              <span>Explore story</span>
              <span aria-hidden="true">↘</span>
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
          <div>
            <p class="ending-card__year">${escapeHtml(item.year)}</p>
            <h3>${escapeHtml(item.name)}</h3>
            <p class="ending-card__status">${escapeHtml(item.status)}</p>
          </div>
        </article>`,
    )
    .join("");
}
