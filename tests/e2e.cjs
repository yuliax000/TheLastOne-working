const { chromium } = require("playwright");
const path = require("node:path");

const baseURL = "http://127.0.0.1:4173/";
const artifactDir = process.env.TLO_ARTIFACT_DIR || process.cwd();

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const errors = [];
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.waitForSelector("body.is-ready");
  if ((await page.title()) !== "THE LAST ONE — Scrollytelling Prototype") {
    throw new Error(`Unexpected title: ${await page.title()}`);
  }
  if ((await page.locator(".chapter").count()) !== 6) {
    throw new Error("Expected six chapters");
  }
  if (!(await page.evaluate(() => Boolean(window.gsap && window.ScrollTrigger)))) {
    throw new Error("GSAP or ScrollTrigger did not load");
  }
  await page.screenshot({ path: path.join(artifactDir, "the-last-one-desktop.png") });

  await page.getByRole("button", { name: "Go to Passenger Pigeon, 1914" }).click();
  await page.waitForFunction(() =>
    document.querySelector('[data-target="species-passenger-pigeon"]')?.getAttribute("aria-current") === "true",
  );
  const detailTrigger = page.locator('[data-detail-trigger="passenger-pigeon"]');
  await detailTrigger.click();
  await page.waitForSelector("#detail-passenger-pigeon:not([hidden])");
  if ((await detailTrigger.getAttribute("aria-expanded")) !== "true") {
    throw new Error("Inline story did not expose its expanded state");
  }
  if (!(await page.locator("#detail-passenger-pigeon").textContent()).includes("Martha died")) {
    throw new Error("Inline story content did not render");
  }
  await detailTrigger.click();
  await page.waitForSelector("#detail-passenger-pigeon[hidden]");

  await page.locator("#ending").scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const ending = document.querySelector("#ending");
    window.scrollTo(0, ending.offsetTop + ending.offsetHeight - window.innerHeight - 2);
  });
  await page.waitForFunction(() => getComputedStyle(document.querySelector("#next-question")).opacity === "1", null, { timeout: 8000 });
  const endingYearBox = await page.locator("#ending-year").boundingBox();
  const endingTitleBox = await page.locator("#ending-title").boundingBox();
  const timelineBox = await page.locator(".timeline").boundingBox();
  const endingNoteBox = await page.locator(".ending__header > p:first-child").boundingBox();
  const siteMarkBox = await page.locator(".site-mark").boundingBox();
  if (!endingYearBox || endingYearBox.y < 0 || endingYearBox.x + endingYearBox.width > 1440) {
    throw new Error(`Ending year is clipped: ${JSON.stringify(endingYearBox)}`);
  }
  if (!endingTitleBox || !timelineBox || endingTitleBox.x < timelineBox.x + timelineBox.width + 16) {
    throw new Error("Ending title overlaps the desktop timeline area");
  }
  if (!endingNoteBox || !siteMarkBox || endingNoteBox.x < siteMarkBox.x + siteMarkBox.width + 24) {
    throw new Error("Ending note overlaps the fixed site mark");
  }
  await page.screenshot({ path: path.join(artifactDir, "the-last-one-ending.png") });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(baseURL, { waitUntil: "networkidle" });
  await mobile.waitForSelector("body.is-ready");
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (overflow) throw new Error("Mobile page has horizontal overflow");
  const mobileMarkBox = await mobile.locator(".site-mark").boundingBox();
  const mobileTimelineBox = await mobile.locator(".timeline").boundingBox();
  if (!mobileMarkBox || !mobileTimelineBox || mobileMarkBox.y < mobileTimelineBox.y + mobileTimelineBox.height) {
    throw new Error("Mobile site mark overlaps the fixed timeline");
  }
  await mobile.screenshot({ path: path.join(artifactDir, "the-last-one-mobile.png") });

  const reducedContext = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    reducedMotion: "reduce",
  });
  const reduced = await reducedContext.newPage();
  await reduced.goto(baseURL, { waitUntil: "networkidle" });
  await reduced.waitForSelector("body.is-reduced-motion.is-static-ending");
  if ((await reduced.locator("[data-ending-item]:visible").count()) !== 6) {
    throw new Error("Reduced-motion ending does not expose all cards");
  }

  if (errors.length) throw new Error(`Browser console errors: ${errors.join(" | ")}`);
  await browser.close();
  console.log("E2E PASS: desktop, inline detail, ending, mobile, and reduced-motion flows verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
