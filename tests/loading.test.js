import test from "node:test";
import assert from "node:assert/strict";
const module = await import("../loading.js").catch(() => ({}));
const flush = () => new Promise(resolve => setImmediate(resolve));

test("blocked loading identifies failed media files", () => {
  assert.equal(typeof module.loadingBlockedMessage, "function");
  assert.match(module.loadingBlockedMessage({ reason: "failed", failed: ["assets/images/greatauk.jpg"] }), /greatauk\.jpg/);
  assert.match(module.loadingBlockedMessage({ reason: "timeout", failed: [] }), /longer/);
});

test("loading reports completed assets and enters only after every task succeeds", async () => {
  assert.equal(typeof module.createLoadingGate, "function");
  let first, second; const progress = []; const ready = [];
  const gate = module.createLoadingGate({ tasks: [
    { label: "image", load: () => new Promise(resolve => { first = resolve; }) },
    { label: "video", load: () => new Promise(resolve => { second = resolve; }) },
  ], onProgress: state => progress.push(state), onReady: state => ready.push(state) });
  gate.start(); await flush(); first(); await flush();
  assert.equal(progress.at(-1).loaded, 1);
  assert.equal(progress.at(-1).percent, 50);
  assert.equal(ready.length, 0);
  second(); await flush();
  assert.equal(progress.at(-1).percent, 100);
  assert.deepEqual(ready, [{ complete: true }]);
});

test("a failed asset blocks entry and retry preserves already loaded assets", async () => {
  assert.equal(typeof module.createLoadingGate, "function");
  let goodCalls = 0, badCalls = 0; const blocked = []; const ready = [];
  const gate = module.createLoadingGate({ tasks: [
    { label: "good", load: () => { goodCalls++; } },
    { label: "bad", load: () => { if (++badCalls === 1) throw Error("missing"); } },
  ], onBlocked: state => blocked.push(state), onReady: state => ready.push(state) });
  gate.start(); await flush();
  assert.equal(ready.length, 0);
  assert.equal(blocked.at(-1).reason, "failed");
  assert.deepEqual(blocked.at(-1).failed, ["bad"]);
  gate.retry(); await flush();
  assert.equal(goodCalls, 1);
  assert.equal(badCalls, 2);
  assert.deepEqual(ready, [{ complete: true }]);
});

test("timeout offers a choice; Continue exits once and ignores late completion", async () => {
  assert.equal(typeof module.createLoadingGate, "function");
  let complete; const blocked = []; const ready = [];
  const gate = module.createLoadingGate({ tasks: [
    { label: "slow", load: () => new Promise(resolve => { complete = resolve; }) },
  ], timeoutMs: 10, onBlocked: state => blocked.push(state), onReady: state => ready.push(state) });
  gate.start(); await new Promise(resolve => setTimeout(resolve, 25));
  assert.equal(blocked.at(-1).reason, "timeout");
  assert.equal(ready.length, 0);
  gate.continue(); complete(); await flush(); gate.continue();
  assert.deepEqual(ready, [{ complete: false }]);
});

test("an empty asset list does not create an artificial wait", async () => {
  assert.equal(typeof module.createLoadingGate, "function");
  const ready = []; const gate = module.createLoadingGate({ tasks: [], onReady: state => ready.push(state) });
  gate.start(); await flush(); assert.deepEqual(ready, [{ complete: true }]);
});
