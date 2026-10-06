import { globalAudio, species, recentExtinctions } from "./data.js";
import { stories } from "./story-content.js";
import { initGlobalAudio } from "./global-audio.js";
import { createStoryDialogController } from "./story-dialog.js";
import { renderChapters, renderEndingItems, renderTimeline } from "./render.js";
import { syncHabitatVideos, prepareHabitatVideo } from "./media.js?v=frame-ready-1";
import { initIntroStartVisibility } from "./intro-start.js";
import { chapterCopyMotion, chapterCardMotion, endingCardPose } from "./narrative-motion.js?v=straight-drop-1";

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const state = {
  activeId: species[0].id,
  observer: null,
  storyDialog: null,
  audio: null,
};

function getSpecies(id) {
  return species.find((item) => item.id === id);
}

export function setActiveSpecies(id) {
  const index = species.findIndex((item) => item.id === id);
  if (index < 0) return;

  state.activeId = id;
  document.querySelectorAll("[data-species]").forEach((chapter) => {
    chapter.classList.toggle("is-active", chapter.dataset.species === id);
  });
  document.querySelectorAll(".timeline__button").forEach((button) => {
    button.setAttribute(
      "aria-current",
      String(button.dataset.target === `species-${id}`),
    );
  });

  const progress = species.length > 1 ? index / (species.length - 1) : 0;
  document
    .querySelector(".timeline")
    ?.style.setProperty("--timeline-progress", String(progress));
}

export function initChapterObservers() {
  if (!("IntersectionObserver" in window)) {
    setActiveSpecies(species[0].id);
    return null;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.dataset.species) {
        setActiveSpecies(visible.target.dataset.species);
        syncHabitatVideos(document.querySelectorAll(".chapter"), visible.target.dataset.species);
      }
      // Native-scroll fallback also clears ambience outside the chapter field.
      const centre = window.innerHeight / 2;
      const current = Array.from(document.querySelectorAll(".chapter")).find(chapter => {
        const rect = chapter.getBoundingClientRect();
        return rect.top <= centre && rect.bottom > centre;
      });
      state.audio?.setChapter(current?.dataset.species || null);
    },
    { rootMargin: "-30% 0px -30% 0px", threshold: [0.1, 0.35, 0.6] },
  );

  document.querySelectorAll("[data-species]").forEach((chapter) => {
    observer.observe(chapter);
  });
  state.observer = observer;
  return observer;
}

function revealStaticEnding() {
  document.body.classList.add("is-static-ending");
  const year = document.getElementById("ending-year");
  if (year) year.textContent = "2026";
}

function initEndingSequence(gsap, ScrollTrigger, reduceMotion = false) {
  const ending = document.getElementById("ending");
  const cards = Array.from(document.querySelectorAll("[data-ending-item]"));
  const steps = Array.from(document.querySelectorAll("[data-ending-step]"));
  const next = document.getElementById("next-question");
  const yearElement = document.getElementById("ending-year");
  if (!ending || !cards.length || !steps.length || !next || !yearElement) return;

  const duration = reduceMotion ? 0 : 0.5;
  let visibleCount = -1;
  let closingVisible = false;
  // Capture each CSS angle before applying entrance transforms (mobile uses 0).
  const rotations = cards.map(card => Number(gsap.getProperty(card, "rotation")) || 0);
  cards.forEach((card, index) => gsap.set(card, {
    autoAlpha: 0, ...endingCardPose(index, false, reduceMotion, rotations[index]),
  }));
  gsap.set(next, { autoAlpha: 0, y: reduceMotion ? 0 : 14 });

  const renderStep = (stepIndex) => {
    const revealCount = Math.min(cards.length, Math.max(0, stepIndex));
    const showClosing = stepIndex === steps.length - 1;
    const showPresentYear = stepIndex > cards.length;

    if (revealCount !== visibleCount) {
      cards.forEach((card, index) => {
        const visible = index < revealCount;
        // Leave accumulated photos still; animate only a changed card.
        if (visible === (index < visibleCount)) return;
        gsap.to(card, {
          autoAlpha: visible ? (showClosing ? 0.24 : 1) : 0,
          ...endingCardPose(index, visible, reduceMotion, rotations[index]),
          duration: visible ? duration : (reduceMotion ? 0 : .22),
          ease: "sine.out",
          overwrite: true,
        });
      });
      const latest = cards[Math.max(0, revealCount - 1)];
      yearElement.textContent = latest?.querySelector(".ending-card__year")?.textContent || "2012";
      visibleCount = revealCount;
    }

    if (showPresentYear) yearElement.textContent = "2026";

    if (showClosing !== closingVisible) {
      if (visibleCount > 0) {
        gsap.to(cards.slice(0, visibleCount), {
          opacity: showClosing ? 0.24 : 1,
          duration: reduceMotion ? 0 : (showClosing ? 1.2 : .35),
          overwrite: "auto",
        });
      }
      gsap.to(next, {
        autoAlpha: showClosing ? 1 : 0,
        y: showClosing ? 0 : 14,
        duration: reduceMotion ? 0 : (showClosing ? 1.8 : .35),
        delay: reduceMotion || !showClosing ? 0 : .2,
        ease: "sine.inOut",
        overwrite: true,
      });
      closingVisible = showClosing;
    }
  };

  renderStep(0);
  steps.forEach((step, index) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top center",
      end: "bottom center",
      onEnter: () => renderStep(index),
      onEnterBack: () => renderStep(index),
    });
  });
}

export function initPinnedChapters(gsap, ScrollTrigger, reduceMotion = false) {
  const chapters = Array.from(document.querySelectorAll(".chapter"));
  if (!chapters.length) return;
  let activeChapter = null;
  let backgroundChapter = null;
  let backgroundRequest = 0;
  const backgrounds = chapters.flatMap(chapter => [
    chapter.querySelector(".chapter__habitat"), chapter.querySelector(".chapter__veil"),
  ]);
  const hideBackgrounds = () => {
    backgroundRequest++;
    backgroundChapter = null;
    gsap.to(backgrounds, { autoAlpha: 0, duration: reduceMotion ? 0 : .25, overwrite: true });
    syncHabitatVideos(chapters, null);
  };

  const activateChapter = (chapter) => {
    if (activeChapter === chapter) return;
    document.body.classList.add("is-story-active");
    setActiveSpecies(chapter.dataset.species);
    state.audio?.setChapter(chapter.dataset.species);
    const card = chapter.querySelector(".species-card");
    const habitat = chapter.querySelector(".chapter__habitat");
    const veil = chapter.querySelector(".chapter__veil");

    if (activeChapter) {
      gsap.to(
        activeChapter.querySelector(".species-card"),
        {
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 0.22,
          ease: "power2.out",
          overwrite: true,
        },
      );
    }

    const request = ++backgroundRequest;
    const video = chapter.querySelector("[data-habitat-video]");
    const ready = reduceMotion ? Promise.resolve(true) : prepareHabitatVideo(video);
    ready.then(() => {
      if (request !== backgroundRequest || activeChapter !== chapter) {
        if (activeChapter !== chapter && backgroundChapter !== chapter) video?.pause();
        return;
      }
      gsap.killTweensOf(backgrounds);
      chapters.forEach(other => {
        if (other !== chapter && other !== backgroundChapter) {
          gsap.set([other.querySelector(".chapter__habitat"), other.querySelector(".chapter__veil")], { autoAlpha: 0 });
          other.querySelector("[data-habitat-video]")?.pause();
        }
      });
      // Incoming sits above the fully opaque outgoing video, in either scroll
      // direction. Do not fade both to transparency and expose the page base.
      gsap.set([habitat, veil], { autoAlpha: 0, zIndex: 3 });
      gsap.to([habitat, veil], {
        autoAlpha: 1, duration: reduceMotion ? 0 : .45,
        ease: "sine.inOut", overwrite: true,
        onComplete: () => {
          if (request !== backgroundRequest) return;
          chapters.forEach(other => {
            if (other !== chapter) gsap.set([
              other.querySelector(".chapter__habitat"), other.querySelector(".chapter__veil"),
            ], { autoAlpha: 0 });
          });
          gsap.set(habitat, { zIndex: 1 });
          gsap.set(veil, { zIndex: 2 });
          backgroundChapter = chapter;
          const storyOpen = document.getElementById("story-dialog")?.open;
          syncHabitatVideos(chapters, reduceMotion || storyOpen ? null : chapter.dataset.species);
        },
      });
    });
    const cardMotion = chapterCardMotion(reduceMotion);
    gsap.fromTo(card, cardMotion.from, cardMotion.to);
    const copy = card.querySelectorAll(".species-card__year, h2, .species-card__summary, .story-link");
    const copyMotion = chapterCopyMotion(reduceMotion);
    gsap.fromTo(copy, copyMotion.from, copyMotion.to);
    activeChapter = chapter;
  };

  chapters.forEach((chapter, index) => {
    const card = chapter.querySelector(".species-card");
    const habitat = chapter.querySelector(".chapter__habitat");
    const veil = chapter.querySelector(".chapter__veil");
    gsap.set([card, habitat, veil], { autoAlpha: 0 });
    gsap.set(card, { yPercent: -50 });

    ScrollTrigger.create({
      trigger: chapter,
      start: index === 0 ? "top 80%" : "top center",
      end: "bottom center",
      onEnter: () => activateChapter(chapter),
      onEnterBack: () => activateChapter(chapter),
      onLeave: () => {
        if (index === chapters.length - 1) {
          gsap.to(card, { autoAlpha: 0, duration: 0.25, overwrite: true });
          hideBackgrounds();
          document.body.classList.remove("is-story-active");
          syncHabitatVideos(chapters, null);
          state.audio?.setChapter(null);
          activeChapter = null;
        }
      },
      onLeaveBack: () => {
        if (index === 0) {
          gsap.to(card, {
            autoAlpha: 0,
            duration: reduceMotion ? 0 : 0.4,
            ease: "power3.out",
            overwrite: true,
          });
          hideBackgrounds();
          document.body.classList.remove("is-story-active");
          syncHabitatVideos(chapters, null);
          state.audio?.setChapter(null);
          activeChapter = null;
        }
      },
    });
  });
}

export function initGsapAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) {
    revealStaticEnding();
    return false;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add("has-gsap");
  initPinnedChapters(gsap, ScrollTrigger, false);
  // Narrative motion is explicitly enabled for this project, independent of
  // the browser's preference. Article-dialog accessibility stays separate.
  initEndingSequence(gsap, ScrollTrigger, false);

  return true;
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const timelineButton = event.target.closest(".timeline__button");
    if (timelineButton) {
      document.getElementById(timelineButton.dataset.target)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    const storyButton = event.target.closest("[data-story-trigger]");
    if (storyButton) {
      state.storyDialog?.open(storyButton.dataset.storyId, storyButton);
      return;
    }

  });
}

function initStoryDialog() {
  const dialog = document.getElementById("story-dialog");
  const scroller = document.getElementById("story-dialog-scroller");
  const content = document.getElementById("story-dialog-content");
  if (!dialog || !scroller || !content) return null;
  const reducedMotion = motionQuery.matches;
  return createStoryDialogController({
    dialog,
    scroller,
    content,
    stories,
    reducedMotion,
    onOpen: () => {
      syncHabitatVideos(document.querySelectorAll(".chapter"), null);
      state.audio?.setStoryOpen(true);
    },
    onClose: () => {
      syncHabitatVideos(document.querySelectorAll(".chapter"), state.activeId);
      state.audio?.setStoryOpen(false);
    },
  });
}

function init() {
  document.getElementById("timeline-list").innerHTML = renderTimeline(species);
  document.getElementById("chapters").innerHTML = renderChapters(species);
  document.getElementById("ending-items").innerHTML = renderEndingItems(recentExtinctions);
  state.storyDialog = initStoryDialog();
  state.audio = initGlobalAudio(document, globalAudio, species);
  initIntroStartVisibility();

  bindEvents();
  if (!initGsapAnimations()) initChapterObservers();
  setActiveSpecies(species[0].id);
  document.body.classList.add("is-ready");
}

init();
