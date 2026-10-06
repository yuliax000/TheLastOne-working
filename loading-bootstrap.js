// Independent of the application module: a failed script must not trap visitors.
document.documentElement.classList.add("is-loading");
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("loading-page");
  document.getElementById("loading-retry")?.addEventListener("click", () => {
    if (document.documentElement.dataset.loadingBound) document.dispatchEvent(new Event("loading-retry"));
    else window.location.reload();
  });
  document.getElementById("loading-continue")?.addEventListener("click", () => {
    if (document.documentElement.dataset.loadingBound) document.dispatchEvent(new Event("loading-continue"));
    else {
      document.documentElement.classList.remove("is-loading");
      overlay.hidden = true;
    }
  });
  setTimeout(() => {
    if (!document.documentElement.classList.contains("is-loading") || document.documentElement.dataset.loadingBound) return;
    document.getElementById("loading-status").textContent = "The page is taking longer to start. Retry, or continue with available content.";
    document.getElementById("loading-actions").hidden = false;
  }, 12000);
});
