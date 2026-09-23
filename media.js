export function syncHabitatVideos(chapters, activeId) {
  chapters.forEach((chapter) => {
    const video = chapter.querySelector("[data-habitat-video]");
    if (!video) return;
    if (chapter.dataset.species === activeId) {
      video.play()?.catch(() => {});
    } else {
      video.pause();
    }
  });
}
