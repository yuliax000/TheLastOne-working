import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  applyIntroTransition,
  getIntroFadeProgress,
} from "../intro-start.js";

function createFixture() {
  const classes = new Set();
  const attributes = new Map();
  const properties = new Map();
  const link = {
    classList: {
      toggle(name, force) {
        if (force) classes.add(name);
        else classes.delete(name);
      },
      contains: (name) => classes.has(name),
    },
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
    getAttribute: (name) => attributes.get(name),
  };
  return {
    link,
    root: {
      style: {
        setProperty: (name, value) => properties.set(name, value),
        getPropertyValue: (name) => properties.get(name),
      },
    },
  };
}

test("intro transition uses a smooth progressive fade instead of an abrupt switch", () => {
  assert.equal(getIntroFadeProgress(0, 1000), 0);
  assert.ok(getIntroFadeProgress(250, 1000) > 0.35);
  assert.ok(getIntroFadeProgress(250, 1000) < 0.65);
  assert.equal(getIntroFadeProgress(550, 1000), 1);
});

test("intro content and site mark fade together while the link remains accessible until hidden", () => {
  const { link, root } = createFixture();

  applyIntroTransition(root, link, 0.5);
  assert.equal(root.style.getPropertyValue("--intro-fade-progress"), "0.5000");
  assert.equal(link.classList.contains("is-hidden"), false);
  assert.equal(link.getAttribute("aria-hidden"), undefined);

  applyIntroTransition(root, link, 1);
  assert.equal(link.classList.contains("is-hidden"), true);
  assert.equal(link.getAttribute("aria-hidden"), "true");
  assert.equal(link.getAttribute("tabindex"), "-1");

  applyIntroTransition(root, link, 0);
  assert.equal(link.classList.contains("is-hidden"), false);
  assert.equal(link.getAttribute("aria-hidden"), undefined);
  assert.equal(link.getAttribute("tabindex"), undefined);
});

test("intro uses a sticky stage so its background fades in place while text moves upward", async () => {
  const css = await readFile(
    new URL("../styles-redesign.css", import.meta.url),
    "utf8",
  );
  const html = await readFile(
    new URL("../index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /class="intro-sequence"[\s\S]*<header class="intro"/);
  assert.match(css, /\.intro-sequence\{[^}]*height:155svh/s);
  assert.match(css, /\.intro\{[^}]*position:sticky[^}]*top:0/s);
  assert.match(css, /\.intro:before\{[^}]*inset:0[^}]*background:#171918/s);
  assert.match(css, /\.intro:before\{[^}]*opacity:var\(--intro-fade-progress\)/s);
  assert.match(css, /\.intro__content\{[^}]*-38px/s);
});
