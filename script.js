import { species, recentExtinctions } from "./data.js";
import { renderChapters, renderEndingItems, renderTimeline } from "./render.js";

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const state = {
  activeId: species[0].id,
  observer: null,
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

  const progress = species.length > 1 ? (index / (species.length - 1)) * 100 : 0;
  document
    .querySelector(".timeline")
    ?.style.setProperty("--timeline-progress", `${progress}%`);
}

export function toggleInlineDetail(trigger) {
  const detail = document.getElementById(trigger.getAttribute("aria-controls"));
  if (!detail) return;

  const opening = trigger.getAttribute("aria-expanded") !== "true";
  trigger.setAttribute("aria-expanded", String(opening));
  trigger.querySelector("span:first-child").textContent = opening
    ? "Close story"
    : "Explore story";
  detail.hidden = !opening;
  detail.closest("[data-species-card]")?.classList.toggle("is-expanded", opening);

  if (window.gsap && !motionQuery.matches) {
    window.gsap.fromTo(
      detail,
      { autoAlpha: 0, y: -12 },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", overwrite: true },
    );
  }
  window.ScrollTrigger?.refresh();
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
      }
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

export function initGsapAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger || motionQuery.matches) {
    revealStaticEnding();
    return false;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add("has-gsap");

  document.querySelectorAll(".chapter").forEach((chapter) => {
    const card = chapter.querySelector(".species-card");
    const media = chapter.querySelector(".chapter__habitat");
    const id = chapter.dataset.species;

    gsap.fromTo(
      card,
      { autoAlpha: 0, y: 32 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: chapter,
          start: "top 68%",
          toggleActions: "play none none none",
          onEnter: () => setActiveSpecies(id),
          onEnterBack: () => setActiveSpecies(id),
        },
      },
    );

    gsap.fromTo(
      media,
      { scale: 1.06, yPercent: -1.5 },
      {
        scale: 1,
        yPercent: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: chapter,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      },
    );
  });

  const ending = document.getElementById("ending");
  const stage = ending?.querySelector(".ending__stage");
  const cards = Array.from(document.querySelectorAll("[data-ending-item]"));
  const next = document.getElementById("next-question");
  const yearElement = document.getElementById("ending-year");
  if (!ending || !stage || !cards.length || !next || !yearElement) return true;

  gsap.set(cards, { autoAlpha: 0, scale: 0.985 });
  gsap.set(cards[0], { autoAlpha: 1, scale: 1 });
  gsap.set(next, { autoAlpha: 0 });

  const yearState = { value: 2012 };
  const endingTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ending,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      pin: stage,
      pinSpacing: false,
      anticipatePin: 1,
    },
  });

  endingTimeline.to(yearState, {
    value: 2026,
    duration: 6,
    ease: "power3.in",
    onUpdate: () => {
      yearElement.textContent = String(Math.round(yearState.value));
    },
  }, 0);

  cards.forEach((card, index) => {
    const at = index * 0.75;
    if (index > 0) {
      endingTimeline.to(cards[index - 1], { autoAlpha: 0, scale: 1.025, duration: 0.35 }, at);
    }
    endingTimeline.to(card, { autoAlpha: 1, scale: 1, duration: 0.4 }, at + 0.18);
  });

  endingTimeline
    .to(cards.at(-1), { autoAlpha: 0, scale: 1.04, duration: 0.45 }, ">+0.3")
    .to(next, { autoAlpha: 1, duration: 1.1, ease: "power2.out" }, ">+0.25");

  return true;
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const timelineButton = event.target.closest(".timeline__button");
    if (timelineButton) {
      document.getElementById(timelineButton.dataset.target)?.scrollIntoView({
        behavior: motionQuery.matches ? "auto" : "smooth",
        block: "center",
      });
      return;
    }

    const storyButton = event.target.closest("[data-detail-trigger]");
    if (storyButton) {
      toggleInlineDetail(storyButton);
      return;
    }
  });
}

function init() {
  document.getElementById("timeline-list").innerHTML = renderTimeline(species);
  document.getElementById("chapters").innerHTML = renderChapters(species);
  document.getElementById("ending-items").innerHTML = renderEndingItems(recentExtinctions);

  if (motionQuery.matches) document.body.classList.add("is-reduced-motion");
  bindEvents();
  initChapterObservers();
  initGsapAnimations();
  setActiveSpecies(species[0].id);
  document.body.classList.add("is-ready");
}

init();
