import { createStoryArticle, getAdjacentStory } from "./story-renderer.js";

export function getStoryNavigationState(items, activeId) {
  const activeIndex = items.findIndex((story) => story.id === activeId);
  if (activeIndex < 0) return { activeIndex: -1, previous: null, next: null };
  return {
    activeIndex,
    previous: getAdjacentStory(items, activeId, "previous"),
    next: getAdjacentStory(items, activeId, "next"),
  };
}

export function createStoryDialogController({
  dialog,
  scroller,
  content,
  stories,
  reducedMotion = false,
  onOpen = () => {},
  onClose = () => {},
  documentRef = document,
  windowRef = window,
}) {
  const closeButton = dialog.querySelector("[data-story-close]");
  const previousButton = dialog.querySelector("[data-story-previous]");
  const nextButton = dialog.querySelector("[data-story-next]");
  let activeId = null;
  let openingTrigger = null;
  let savedScrollY = 0;
  let cleanedUp = true;

  function getStory(id) {
    return stories.find((story) => story.id === id) || null;
  }

  function updateNavigation() {
    const navigation = getStoryNavigationState(stories, activeId);
    previousButton.disabled = !navigation.previous;
    nextButton.disabled = !navigation.next;
    previousButton.dataset.storyTarget = navigation.previous?.id || "";
    nextButton.dataset.storyTarget = navigation.next?.id || "";
  }

  function focusHeading() {
    const heading = content.querySelector("#story-dialog-title");
    if (!heading) return;
    if (reducedMotion) heading.focus();
    else windowRef.requestAnimationFrame(() => heading.focus());
  }

  function show(storyId) {
    const story = getStory(storyId);
    if (!story) return false;
    activeId = story.id;
    content.replaceChildren(createStoryArticle(documentRef, story));
    scroller.scrollTop = 0;
    updateNavigation();
    dialog.dataset.activeStory = activeId;
    dialog.classList.toggle("is-reduced-motion", reducedMotion);
    focusHeading();
    return true;
  }

  function open(storyId, trigger) {
    if (!getStory(storyId)) return false;
    openingTrigger = trigger || documentRef.activeElement;
    savedScrollY = windowRef.scrollY;
    cleanedUp = false;
    documentRef.body.style.top = `-${savedScrollY}px`;
    documentRef.body.classList.add("is-story-dialog-open");
    onOpen(storyId);
    show(storyId);
    if (!dialog.open) dialog.showModal();
    return true;
  }

  function cleanup() {
    if (cleanedUp) return;
    cleanedUp = true;
    dialog.querySelectorAll("audio, video").forEach((media) => media.pause());
    documentRef.body.classList.remove("is-story-dialog-open");
    documentRef.body.style.top = "";
    windowRef.scrollTo(0, savedScrollY);
    onClose(activeId);
    const focusTarget = openingTrigger;
    openingTrigger = null;
    focusTarget?.focus();
  }

  function close() {
    if (dialog.open) dialog.close();
    cleanup();
  }

  function handleClick(event) {
    if (event.target.closest("[data-story-close]")) {
      close();
      return;
    }
    const directionButton = event.target.closest("[data-story-previous], [data-story-next]");
    const targetId = directionButton?.dataset.storyTarget;
    if (targetId) show(targetId);
  }

  function handleCancel(event) {
    event.preventDefault();
    close();
  }

  dialog.addEventListener("click", handleClick);
  dialog.addEventListener("cancel", handleCancel);
  dialog.addEventListener("close", cleanup);
  closeButton?.setAttribute("aria-controls", "story-dialog-content");

  return {
    open,
    close,
    show,
    destroy() {
      dialog.removeEventListener("click", handleClick);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", cleanup);
      cleanup();
    },
  };
}
