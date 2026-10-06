// Opening gate: progress counts ready resources, not downloaded bytes.
// Audio, story images and third-party players intentionally load on demand.
export function createLoadingGate({ tasks = [], timeoutMs = 12000,
  onProgress = () => {}, onBlocked = () => {}, onReady = () => {} }) {
  const states = tasks.map(() => "pending");
  let generation = 0, timer, abort, entered = false;
  const snapshot = () => {
    const loaded = states.filter(state => state === "loaded").length;
    return { loaded, total: tasks.length, percent: tasks.length ? Math.round(100 * loaded / tasks.length) : 100 };
  };
  const block = reason => onBlocked({ ...snapshot(), reason,
    failed: tasks.filter((_, index) => states[index] === "failed").map(task => task.label) });
  const enter = complete => {
    if (entered) return;
    entered = true;
    generation++;
    clearTimeout(timer);
    abort?.abort();
    onReady({ complete });
  };
  const start = () => {
    if (entered) return;
    const request = ++generation;
    clearTimeout(timer);
    abort?.abort();
    abort = new AbortController();
    const signal = abort.signal;
    states.forEach((state, index) => { if (state !== "loaded") states[index] = "pending"; });
    onProgress(snapshot());
    const check = () => {
      if (request !== generation || entered) return;
      onProgress(snapshot());
      if (states.every(state => state === "loaded")) enter(true);
      else if (states.every(state => state !== "pending")) { clearTimeout(timer); block("failed"); }
    };
    timer = setTimeout(() => { if (request === generation && !entered) block("timeout"); }, timeoutMs);
    tasks.forEach((task, index) => {
      if (states[index] === "loaded") return;
      Promise.resolve().then(() => task.load(signal)).then(() => {
        if (request !== generation || entered) return;
        states[index] = "loaded"; check();
      }, () => {
        if (request !== generation || entered) return;
        states[index] = "failed"; check();
      });
    });
    check();
  };
  return { start, retry: start, continue: () => enter(false) };
}

function waitForMedia(element, signal, video = false) {
  return new Promise((resolve, reject) => {
    const event = video ? "loadeddata" : "load";
    const cleanup = () => {
      element.removeEventListener(event, ready);
      element.removeEventListener("error", failed);
      signal.removeEventListener("abort", failed);
    };
    const ready = async () => {
      cleanup();
      try {
        if (!video && element.decode) await element.decode();
        if (signal.aborted) throw Error("Loading cancelled");
        resolve();
      } catch (error) { reject(error); }
    };
    const failed = () => { cleanup(); reject(Error("Media unavailable")); };
    if (signal.aborted) { failed(); return; }
    element.addEventListener(event, ready, { once: true });
    element.addEventListener("error", failed, { once: true });
    signal.addEventListener("abort", failed, { once: true });
    if (video) {
      if (element.readyState >= 2) ready();
      else { element.preload = "auto"; element.load(); }
    } else if (element.complete && element.naturalWidth > 0) ready();
    else {
      element.loading = "eager";
      // Retry reloads failed images too. Do not request empty image paths.
      const src = element.getAttribute("src");
      if (!src) failed();
      else { element.hidden = false; element.src = src; }
    }
  });
}

export function initLoadingPage(documentRef, onReady) {
  const overlay = documentRef.getElementById("loading-page");
  if (!overlay || !documentRef.documentElement.classList.contains("is-loading")) { onReady(); return; }
  const progress = documentRef.getElementById("loading-progress");
  const count = documentRef.getElementById("loading-count");
  const status = documentRef.getElementById("loading-status");
  const actions = documentRef.getElementById("loading-actions");
  const inertElements = [...documentRef.body.children].filter(element => element !== overlay && element.tagName !== "SCRIPT");
  const originalInert = inertElements.map(element => element.inert);
  inertElements.forEach(element => { element.inert = true; });
  overlay.focus({ preventScroll: true });
  const tasks = [...documentRef.querySelectorAll(".species-card__portrait-image, .ending-card__photo")]
    .map((image, index) => ({ label: `Image ${index + 1}`, load: signal => waitForMedia(image, signal) }));
  documentRef.querySelectorAll("[data-habitat-video]").forEach((video, index) => {
    tasks.push({ label: `Habitat ${index + 1}`, load: signal => waitForMedia(video, signal, true) });
  });
  if (documentRef.fonts) tasks.push({ label: "Fonts", load: () => documentRef.fonts.ready });
  const gate = createLoadingGate({ tasks,
    onProgress: ({ loaded, total, percent }) => {
      progress.value = percent;
      count.textContent = `${loaded} / ${total} resources ready`;
    },
    onBlocked: ({ reason }) => {
      status.textContent = reason === "timeout"
        ? "Loading is taking a little longer. Retry, or continue with available media."
        : "Some media could not be loaded. Retry, or continue with available media.";
      actions.hidden = false;
    },
    onReady: () => {
      documentRef.removeEventListener("loading-retry", retry);
      documentRef.removeEventListener("loading-continue", proceed);
      onReady();
      inertElements.forEach((element, index) => { element.inert = originalInert[index]; });
      const focusWasInside = overlay.contains(documentRef.activeElement);
      overlay.classList.add("is-leaving");
      documentRef.documentElement.classList.remove("is-loading");
      if (focusWasInside) documentRef.querySelector(".intro__start")?.focus({ preventScroll: true });
      setTimeout(() => { overlay.hidden = true; }, 450);
    },
  });
  const retry = () => {
    actions.hidden = true;
    status.textContent = "Preparing the timeline…";
    gate.retry();
  };
  const proceed = () => gate.continue();
  documentRef.addEventListener("loading-retry", retry);
  documentRef.addEventListener("loading-continue", proceed);
  documentRef.documentElement.dataset.loadingBound = "true";
  gate.start();
  return gate;
}
