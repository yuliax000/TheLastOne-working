function clampVolume(value) {
  const volume = Number(value);
  return Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : 0.35;
}

export function createGlobalAudioController({ audio, button, config = {} }) {
  const enabled = Boolean(audio && button && config.src);
  if (!audio || !button) return { enabled: false, toggle: async () => false };

  button.hidden = !enabled;
  button.setAttribute("aria-pressed", "false");
  button.textContent = "Sound on";
  if (!enabled) return { enabled: false, toggle: async () => false };

  audio.src = config.src;
  audio.loop = true;
  audio.volume = clampVolume(config.volume);
  audio.setAttribute?.("aria-label", config.label || "Ambient soundscape");

  const updateButton = (playing) => {
    button.textContent = playing ? "Sound off" : "Sound on";
    button.setAttribute("aria-pressed", String(playing));
  };

  const toggle = async () => {
    if (audio.paused) {
      try {
        await audio.play();
        updateButton(true);
        return true;
      } catch {
        updateButton(false);
        return false;
      }
    }
    audio.pause();
    updateButton(false);
    return false;
  };

  button.addEventListener("click", toggle);
  audio.addEventListener?.("ended", () => updateButton(false));
  audio.addEventListener?.("error", () => {
    audio.pause();
    updateButton(false);
    button.textContent = "Sound unavailable";
    button.disabled = true;
  });

  return { enabled: true, toggle };
}

// Three independent layers. Only chapter tracks crossfade; global tracks keep
// their currentTime when the reader scrolls, opens a story or changes chapters.
export function createLayeredAudioController({
  button, config = {}, chapters = [],
  createAudio = () => new Audio(),
  requestFrame = callback => requestAnimationFrame(callback),
  now = () => performance.now(),
}) {
  let soundOn = false;
  let activationBlocked = false;
  let chapterId = null;
  let storyOpen = false;
  let suspended = false;
  let framePending = false;
  const duration = Math.max(0, Number(config.crossfadeSeconds) || 0) * 1000;
  const storyFactor = clampVolume(config.storyVolumeFactor ?? .2);
  const tracks = [];

  function updateButton() {
    if (!button) return;
    button.hidden = tracks.length === 0;
    const unavailable = tracks.length > 0 && tracks.every(track => track.failed);
    button.disabled = unavailable;
    button.textContent = unavailable ? "Sound unavailable" : soundOn && !activationBlocked ? "Sound off" : "Sound on";
    button.setAttribute("aria-pressed", String(soundOn && !activationBlocked && !unavailable));
  }

  function addTrack(kind, src, volume, id = null) {
    if (!src || typeof src !== "string") return;
    const audio = createAudio();
    audio.src = src;
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0;
    audio.setAttribute?.("aria-label", kind === "chapter" ? `${id} ambience` : kind === "music" ? "Narrative music" : "Global atmosphere");
    const track = { kind, id, audio, volume: clampVolume(volume), target: 0, fade: null, failed: false, pending: null };
    audio.addEventListener?.("error", () => {
      track.failed = true;
      track.target = 0;
      track.fade = null;
      audio.pause();
      audio.volume = 0;
      updateButton();
    });
    tracks.push(track);
  }
  addTrack("music", config.src, config.volume ?? .35);
  addTrack("atmosphere", config.atmosphereSrc, config.atmosphereVolume ?? .08);
  chapters.forEach(chapter => addTrack("chapter", chapter.audioSrc,
    chapter.audioVolume ?? config.chapterVolume ?? .18, chapter.id));

  function tick() {
    framePending = false;
    const time = now();
    tracks.forEach(track => {
      if (!track.fade) return;
      const progress = Math.min(1, Math.max(0, (time - track.fade.start) / duration));
      // Smoothstep avoids an abrupt slope at either end of the fade.
      const eased = progress * progress * (3 - 2 * progress);
      track.audio.volume = clampVolume(track.fade.from + (track.target - track.fade.from) * eased);
      if (progress === 1) {
        track.audio.volume = track.target;
        track.fade = null;
        if (track.target === 0) track.audio.pause();
      }
    });
    if (tracks.some(track => track.fade)) schedule();
  }
  function schedule() {
    if (framePending) return;
    framePending = true;
    requestFrame(tick);
  }
  function beginFade(track) {
    if (!soundOn || suspended || track.failed) return;
    if (duration === 0) {
      track.audio.volume = track.target;
      track.fade = null;
      if (track.target === 0) track.audio.pause();
      return;
    }
    track.fade = { from: track.audio.volume, start: now() };
    schedule();
  }
  function reconcile() {
    const pending = [];
    tracks.forEach(track => {
      const target = !soundOn || suspended || track.failed ? 0 : track.kind === "chapter"
        ? (!storyOpen && track.id === chapterId ? track.volume : 0)
        : track.volume * (storyOpen ? storyFactor : 1);
      const changed = track.target !== target;
      track.target = target;
      if (!soundOn || suspended || track.failed) {
        track.fade = null;
        track.audio.pause();
        track.audio.volume = 0;
        return;
      }
      if (target > 0 && track.audio.paused && !track.pending) {
        // Start all requested tracks synchronously inside the user's click, not
        // after awaiting another track (which could lose browser activation).
        let playback;
        try { playback = track.audio.play(); } catch (error) { playback = Promise.reject(error); }
        track.pending = Promise.resolve(playback).then(() => {
          if (!soundOn || suspended || track.failed || track.target === 0) {
            track.audio.pause();
            track.audio.volume = 0;
            track.fade = null;
          } else beginFade(track);
        }).catch(error => {
          if (error?.name === "NotAllowedError") activationBlocked = true;
          else track.failed = true;
          track.target = 0;
          track.fade = null;
          track.audio.pause();
          track.audio.volume = 0;
        }).finally(() => { track.pending = null; updateButton(); });
        pending.push(track.pending);
      } else if (changed && !track.pending) beginFade(track);
    });
    updateButton();
    return Promise.all(pending);
  }
  async function toggle() {
    if (soundOn && activationBlocked) return enable();
    if (!tracks.some(track => !track.failed)) return false;
    soundOn = !soundOn;
    await reconcile();
    if (tracks.every(track => track.failed)) soundOn = false;
    updateButton();
    return soundOn;
  }
  async function enable() {
    if (!tracks.some(track => !track.failed)) return false;
    activationBlocked = false;
    soundOn = true;
    await reconcile();
    if (tracks.every(track => track.failed)) soundOn = false;
    updateButton();
    return soundOn;
  }
  button?.addEventListener("click", toggle);
  updateButton();
  return {
    enabled: tracks.length > 0,
    toggle,
    enable,
    get needsGesture() { return soundOn && activationBlocked; },
    setChapter(id) { if (chapterId !== id) { chapterId = id; reconcile(); } },
    setStoryOpen(value) { storyOpen = Boolean(value); reconcile(); },
    setSuspended(value) { suspended = Boolean(value); reconcile(); },
  };
}

export function initGlobalAudio(documentRef, config, chapters = []) {
  const controller = createLayeredAudioController({
    button: documentRef.getElementById("sound-toggle"), config, chapters,
    createAudio: () => {
      const audio = documentRef.createElement("audio");
      documentRef.body.append(audio);
      return audio;
    },
  });
  documentRef.addEventListener("visibilitychange", () => controller.setSuspended(documentRef.hidden));
  controller.setSuspended(documentRef.hidden);
  if (config.defaultOn) {
    controller.enable();
    const activate = event => {
      if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
      if (event.target?.closest?.("#sound-toggle")) return;
      if (controller.needsGesture) controller.enable();
    };
    documentRef.addEventListener("pointerdown", activate);
    documentRef.addEventListener("keydown", activate);
  }
  return controller;
}
