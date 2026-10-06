import test from "node:test";
import assert from "node:assert/strict";

const motion = await import("../narrative-motion.js").catch(() => ({}));

test("chapter copy reveals in sequence and ends fully readable", () => {
  assert.equal(typeof motion.chapterCopyMotion, "function");
  const { from, to } = motion.chapterCopyMotion(false);
  assert.equal(from.autoAlpha, 0);
  assert.ok(from.y >= 24 && from.y <= 36);
  assert.ok(to.duration >= .75 && to.duration <= 1);
  assert.equal(to.autoAlpha, 1);
  assert.equal(to.y, 0);
  assert.ok(to.stagger > 0 && to.stagger * 3 <= .4);
  assert.equal(to.overwrite, true);
});

test("photos fall straight down without horizontal travel, zoom or animated rotation", () => {
  assert.equal(typeof motion.endingCardPose, "function");
  const first = motion.endingCardPose(0, false, false, -2);
  const second = motion.endingCardPose(1, false, false, 1.5);
  assert.equal(first.x, 0);
  assert.equal(second.x, 0);
  assert.ok(first.y < 0 && second.y < 0);
  assert.equal(first.scale, 1);
  assert.equal(second.scale, 1);
  assert.equal(first.rotation, -2);
  assert.equal(second.rotation, 1.5);
  assert.deepEqual(motion.endingCardPose(0, true, false, -2),
    { x: 0, y: 0, scale: 1, rotation: -2 });
});

test("reduced motion removes translation, rotation change and stagger", () => {
  assert.equal(typeof motion.chapterCopyMotion, "function");
  assert.equal(typeof motion.endingCardPose, "function");
  const { from, to } = motion.chapterCopyMotion(true);
  assert.equal(from.y, 0);
  assert.equal(to.stagger, 0);
  assert.equal(to.duration, 0);
  assert.deepEqual(motion.endingCardPose(2, false, true, -1),
    { x: 0, y: 0, scale: 1, rotation: -1 });
});

test("the card stays anchored while its copy moves", () => {
  assert.equal(typeof motion.chapterCardMotion, "function");
  const {from, to} = motion.chapterCardMotion(false);
  assert.equal(from.yPercent, -50);
  assert.equal(to.yPercent, -50);
  assert.equal(from.autoAlpha, 0);
  assert.equal(to.autoAlpha, 1);
});
