import test from "node:test";
import assert from "node:assert/strict";
const media = await import("../media.js");

test("habitat preparation waits for a decoded frame, not just play acceptance", async () => {
  assert.equal(typeof media.prepareHabitatVideo, "function");
  let frame;
  const video = {
    play: () => Promise.resolve(),
    requestVideoFrameCallback: callback => { frame = callback; return 1; },
    cancelVideoFrameCallback() {}, addEventListener() {}, removeEventListener() {},
  };
  let finished = false;
  const ready = media.prepareHabitatVideo(video).then(value => { finished = true; return value; });
  await Promise.resolve(); await Promise.resolve();
  assert.equal(finished, false);
  frame();
  assert.equal(await ready, true);
});

test("unavailable video returns a bounded fallback without rejecting", async () => {
  assert.equal(typeof media.prepareHabitatVideo, "function");
  const video = { play: () => Promise.reject(new Error("missing")), addEventListener() {}, removeEventListener() {} };
  assert.equal(await media.prepareHabitatVideo(video), false);
  assert.equal(await media.prepareHabitatVideo(null), true);
});

test("stalled video preparation times out and cancels its frame callback", async () => {
  assert.equal(typeof media.prepareHabitatVideo, "function");
  let cancelled = false;
  const video = { play: () => Promise.resolve(), requestVideoFrameCallback: () => 7,
    cancelVideoFrameCallback: id => { cancelled = id === 7; }, addEventListener() {}, removeEventListener() {} };
  assert.equal(await media.prepareHabitatVideo(video, 10), false);
  assert.equal(cancelled, true);
});
