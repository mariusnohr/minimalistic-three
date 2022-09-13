import { Clock } from 'three';
import Stats from 'stats.js';
import pointer from './pointer';
import settings from './settings';

let isPaused = true;
let rafId = null;
let listeners = [];
let clock = new Clock(false);
let stats = null;

if (settings.stats) {
  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
}

function tick() {
  if (!isPaused) {
    rafId = requestAnimationFrame(tick);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    if (stats) stats.begin();

    pointer.update();

    listeners.forEach((func) => {
      func({ delta, elapsed });
    });

    if (stats) stats.end();
  }
}

export function add(fn) {
  if (typeof fn !== 'function') {
    throw 'the "add"-method only takes a function';
  }

  listeners.push(fn);
}

export function remove(fn) {
  if (typeof fn !== 'function') {
    throw 'the "remove"-method only takes a function';
  }

  listeners = listeners.filter((item) => fn !== item);
}

export function start() {
  if (isPaused) {
    isPaused = false;
    clock.start();
    rafId = requestAnimationFrame(tick);
  }
}

export function pause() {
  clock.stop();
  cancelAnimationFrame(rafId);
  isPaused = true;
}
