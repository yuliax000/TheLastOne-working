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

export function initGlobalAudio(documentRef, config) {
  return createGlobalAudioController({
    audio: documentRef.getElementById("global-audio"),
    button: documentRef.getElementById("sound-toggle"),
    config,
  });
}
