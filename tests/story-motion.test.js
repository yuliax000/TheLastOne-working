import test from 'node:test';
import assert from 'node:assert/strict';
const module = await import('../story-motion.js').catch(() => ({}));

test('story media reveals once and cleanup cancels motion', () => {
  assert.equal(typeof module.initStoryMotion, 'function');
  let notify, disconnected = false, cancelled = 0, played = 0, paused = 0;
  const calls = [];
  const media = { animate: (frames, options) => { calls.push({frames, options}); return {pause(){paused++;},play(){played++;},cancel(){cancelled++;}}; } };
  const observer = {observe(){}, unobserve(){}, disconnect(){disconnected=true;}};
  const cleanup = module.initStoryMotion({content:{querySelectorAll:()=>[media]}, scroller:{},
    createObserver: callback => {notify=callback;return observer;}});
  assert.equal(paused,1);
  assert.equal(played,0);
  notify([{target:media,isIntersecting:true}]);
  notify([{target:media,isIntersecting:true}]);
  assert.equal(calls.length,1);
  assert.equal(played,1);
  assert.equal(calls[0].frames[0].translate,'0 20px');
  assert.equal(calls[0].frames[1].opacity,1);
  cleanup(); assert.equal(disconnected,true); assert.equal(cancelled,1);
});

test('reduced motion leaves article visible without observers or animation', () => {
  assert.equal(typeof module.initStoryMotion, 'function');
  const cleanup = module.initStoryMotion({reducedMotion:true, createObserver(){throw Error('No observer expected');}});
  assert.doesNotThrow(cleanup);
});
