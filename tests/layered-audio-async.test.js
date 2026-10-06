import test from "node:test";
import assert from "node:assert/strict";
import { createLayeredAudioController } from "../global-audio.js";

test("late play resolution cannot restart sound after the visitor switches it off", async () => {
  let resolve;
  const media = { paused: true, volume: 0, setAttribute() {}, addEventListener() {},
    play() { this.paused = false; return new Promise(done => { resolve = done; }); },
    pause() { this.paused = true; } };
  const button = { setAttribute() {}, addEventListener() {} };
  const controller = createLayeredAudioController({ button, config: { src: "music.mp3" }, createAudio: () => media });
  const starting = controller.toggle();
  await controller.toggle();
  resolve(); await starting;
  assert.equal(media.paused, true);
  assert.equal(media.volume, 0);
  assert.equal(button.textContent, "Sound on");
});

test("failed playback is handled without an unhandled rejection and disables an unavailable mix", async () => {
  const media = { volume: 0, paused: true, setAttribute() {}, addEventListener() {},
    play() { return Promise.reject(new Error("Unavailable media")); }, pause() { this.paused = true; } };
  const button = { setAttribute() {}, addEventListener() {} };
  const controller = createLayeredAudioController({ button, config: { src: "missing.mp3" }, createAudio: () => media });
  assert.equal(await controller.toggle(), false);
  assert.equal(button.disabled, true);
  assert.equal(button.textContent, "Sound unavailable");
});
