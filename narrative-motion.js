// Restrained narrative motion. Only opacity and transforms are animated.
export function chapterCopyMotion(reducedMotion = false) {
  return {
    from: { autoAlpha: 0, y: reducedMotion ? 0 : 28 },
    to: {
      autoAlpha: 1, y: 0,
      duration: reducedMotion ? 0 : .85,
      delay: reducedMotion ? 0 : .08,
      stagger: reducedMotion ? 0 : .1,
      ease: "sine.out", overwrite: true,
    },
  };
}

export function endingCardPose(index, visible, reducedMotion = false, rotation = 0) {
  if (visible || reducedMotion) return { x: 0, y: 0, scale: 1, rotation };
  return { x: 0, y: -32, scale: 1, rotation };
}

export function chapterCardMotion(reducedMotion = false) {
  return {
    from: { autoAlpha: 0, yPercent: -50 },
    to: { autoAlpha: 1, yPercent: -50, duration: reducedMotion ? 0 : .4,
      ease: "sine.out", overwrite: true },
  };
}
