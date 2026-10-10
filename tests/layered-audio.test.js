import test from "node:test";
import assert from "node:assert/strict";
import { createLayeredAudioController } from "../global-audio.js";

// Media playback is a browser/hardware boundary. This double preserves its
// paused state and asynchronous play contract; the real mixer runs unchanged.
class Media {
  paused = true; volume = 1; currentTime = 12; listeners = {};
  play() { this.paused = false; return Promise.resolve(); }
  pause() { this.paused = true; }
  setAttribute() {}
  addEventListener(name, callback) { this.listeners[name] = callback; }
}
function setup(overrides = {}) {
  const tracks = [];
  let now = 0;
  let frames = [];
  const button = { hidden: true, disabled: false, textContent: "", attributes: {},
    setAttribute(key, value) { this.attributes[key] = value; }, addEventListener() {} };
  const controller = createLayeredAudioController({ button,
    config: { src: "music.mp3", volume: .4, atmosphereSrc: "wind.mp3", atmosphereVolume: .1,
      chapterVolume: .2, crossfadeSeconds: 2, storyVolumeFactor: .25, ...overrides },
    chapters: [{ id: "sea", audioSrc: "sea.mp3" }, { id: "forest", audioSrc: "forest.mp3" }, { id: "empty", audioSrc: "" }],
    createAudio: () => { const track = new Media(); tracks.push(track); return track; },
    now: () => now,
    requestFrame: callback => { frames.push(callback); },
  });
  const advance = async (ms) => {
    await Promise.resolve();
    now += ms;
    const pending = frames; frames = [];
    pending.forEach(callback => callback());
    await Promise.resolve();
  };
  const media = src => tracks.find(track => track.src === src);
  return { controller, button, media, advance };
}

test("enabling sound starts both global layers and only the selected chapter", async () => {
  const { controller, media, advance, button } = setup();
  controller.setChapter("sea");
  assert.equal(media("music.mp3").paused, true);
  assert.equal(await controller.toggle(), true);
  await advance(2000);
  assert.equal(media("music.mp3").volume, .4);
  assert.equal(media("wind.mp3").volume, .1);
  assert.equal(media("sea.mp3").volume, .2);
  assert.equal(media("forest.mp3").paused, true);
  assert.equal(button.attributes["aria-pressed"], "true");
});

test("chapter crossfade does not reset global music and pauses outgoing ambience", async () => {
  const { controller, media, advance } = setup();
  controller.setChapter("sea"); await controller.toggle(); await advance(2000);
  controller.setChapter("forest"); await advance(1000);
  assert.ok(media("sea.mp3").volume > 0 && media("sea.mp3").volume < .2);
  assert.ok(media("forest.mp3").volume > 0 && media("forest.mp3").volume < .2);
  assert.equal(media("music.mp3").currentTime, 12);
  assert.equal(media("music.mp3").paused, false);
  await advance(1000);
  assert.equal(media("sea.mp3").paused, true);
  assert.equal(media("forest.mp3").volume, .2);
});

test("story mode ducks globals and stops chapter audio; closing restores selected layer", async () => {
  const { controller, media, advance } = setup();
  controller.setChapter("sea"); await controller.toggle(); await advance(2000);
  controller.setStoryOpen(true); await advance(2000);
  assert.equal(media("music.mp3").volume, .1);
  assert.equal(media("wind.mp3").volume, .025);
  assert.equal(media("sea.mp3").paused, true);
  controller.setStoryOpen(false); await advance(2000);
  assert.equal(media("sea.mp3").volume, .2);
});

test("rapid switches, missing chapters and Sound off leave no stale playing layers", async () => {
  const { controller, media, advance } = setup();
  await controller.toggle(); controller.setChapter("sea"); controller.setChapter("forest");
  await advance(2000);
  assert.equal(media("sea.mp3").paused, true);
  controller.setChapter("empty"); await advance(2000);
  assert.equal(media("forest.mp3").paused, true);
  assert.equal(media("music.mp3").paused, false);
  await controller.toggle(); await advance(2000);
  for (const src of ["music.mp3", "wind.mp3", "sea.mp3", "forest.mp3"]) assert.equal(media(src).paused, true);
});

test("one broken track does not disable healthy layers; hidden pages suspend playback", async () => {
  const { controller, media, advance, button } = setup();
  await controller.toggle(); await advance(2000);
  media("wind.mp3").listeners.error();
  assert.equal(media("wind.mp3").paused, true);
  assert.equal(media("music.mp3").paused, false);
  assert.equal(button.disabled, false);
  controller.setSuspended(true);
  assert.equal(media("music.mp3").paused, true);
  controller.setSuspended(false); await advance(2000);
  assert.equal(media("music.mp3").paused, false);
});

test("chapter-only configuration still exposes sound control without globals", async () => {
  const { controller, button, media, advance } = setup({ src: "", atmosphereSrc: "" });
  assert.equal(button.hidden, false);
  controller.setChapter("sea"); await controller.toggle(); await advance(2000);
  assert.equal(media("sea.mp3").paused, false);
});

test("default sound can start and autoplay rejection remains retryable", async () => {
  const { controller, media, button } = setup();
  let blocked = true;
  const music = media("music.mp3");
  music.play = function () {
    if (blocked) return Promise.reject(Object.assign(new Error("activation required"), { name: "NotAllowedError" }));
    this.paused = false; return Promise.resolve();
  };
  assert.equal(typeof controller.enable, "function");
  await controller.enable();
  assert.equal(button.disabled, false);
  assert.equal(controller.needsGesture, true);
  assert.equal(button.textContent, "Sound on");
  blocked = false;
  await controller.toggle();
  assert.equal(music.paused, false);
  assert.equal(controller.needsGesture, false);
  await controller.toggle();
  assert.equal(music.paused, true);
});
