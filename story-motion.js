// Reveal paragraphs and editorial landmarks as they enter the reading viewport.
// Content is visible by default, including when browser animation APIs are absent.
export function initStoryMotion({ content, scroller, reducedMotion = false,
  createObserver = typeof IntersectionObserver === 'function'
    ? (callback, options) => new IntersectionObserver(callback, options) : null,
}) {
  if (reducedMotion || !createObserver) return () => {};
  const seen = new Set();
  const animations = new Map();
  let disposed = false;
  const observer = createObserver(entries => {
    if (disposed) return;
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting || seen.has(target)) return;
      seen.add(target);
      observer.unobserve(target);
      animations.get(target)?.play();
    });
  }, { root: scroller, threshold: 0, rootMargin: '0px 0px -5% 0px' });
  let firstParagraph = true;
  content.querySelectorAll('.story-reader__introduction, .story-block--paragraph, .story-block--image, .story-block--image-text, .story-block--subheading, .story-block--quote')
    .forEach(element => {
      if (!element.animate) return;
      const paragraph = element.matches?.('.story-block--paragraph');
      const opening = element.matches?.('.story-reader__introduction') || (paragraph && firstParagraph);
      if (paragraph) firstParagraph = false;
      // Prepare before observation so visible content never flashes then hides.
      // Independent translate preserves wide-image centering and text wrapping.
      const animation = element.animate([
        { opacity: 0, translate: '0 20px' },
        { opacity: 1, translate: '0 0' },
      ], {
        duration: 1600,
        easing: opening ? 'ease-in-out' : 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        fill: 'both',
      });
      animation.pause();
      animation.currentTime = 0;
      animations.set(element, animation);
      animation.onfinish = () => {
        animation.cancel(); // Return to the naturally visible, untransformed state.
        animations.delete(element);
      };
      observer.observe(element);
    });
  return () => {
    disposed = true;
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
  };
}
