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

// A play() promise does not guarantee a painted frame. Keep the previous
// background until decoding is ready; never wait forever on a broken file.
export function prepareHabitatVideo(video, timeoutMs = 2000) {
  if (!video) return Promise.resolve(true);
  return new Promise(resolve => {
    let finished = false;
    let frameId;
    const finish = ready => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      video.removeEventListener("error", onError);
      video.removeEventListener("loadeddata", onLoaded);
      if (frameId !== undefined) video.cancelVideoFrameCallback?.(frameId);
      resolve(ready);
    };
    const onError = () => finish(false);
    const onLoaded = () => finish(true);
    const timer = setTimeout(() => finish(false), timeoutMs);
    video.addEventListener("error", onError, { once: true });
    try {
      Promise.resolve(video.play()).then(() => {
        if (finished) return;
        if (video.requestVideoFrameCallback) {
          frameId = video.requestVideoFrameCallback(() => finish(true));
        } else if (video.readyState >= 2) finish(true);
        else video.addEventListener("loadeddata", onLoaded, { once: true });
      }).catch(onError);
    } catch { onError(); }
  });
}
