export function getIntroFadeProgress(scrollY, viewportHeight) {
  const distance = Math.max(1, viewportHeight * 0.55);
  const normalized = Math.min(1, Math.max(0, scrollY / distance));
  return normalized * normalized * (3 - 2 * normalized);
}

export function applyIntroTransition(root, link, progress) {
  root?.style.setProperty("--intro-fade-progress", progress.toFixed(4));
  if (!link) return;
  const hidden = progress >= 0.98;
  link.classList.toggle("is-hidden", hidden);

  if (hidden) {
    link.setAttribute("aria-hidden", "true");
    link.setAttribute("tabindex", "-1");
    return;
  }

  link.removeAttribute("aria-hidden");
  link.removeAttribute("tabindex");
}

export function initIntroStartVisibility(doc = document, view = window) {
  const link = doc.querySelector(".intro__start");
  const root = doc.documentElement;
  if (!link || !root) return;

  let scheduled = false;
  const update = () => {
    scheduled = false;
    applyIntroTransition(
      root,
      link,
      getIntroFadeProgress(view.scrollY, view.innerHeight),
    );
  };
  const requestUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    view.requestAnimationFrame(update);
  };

  update();
  view.addEventListener("scroll", requestUpdate, { passive: true });
}
