import renderer from './renderer';
import camera from './camera';

let listeners = [];

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  listeners.forEach((func) => {
    func({ width, height, aspect });
  });
}

export function listen(fn) {
  if (typeof fn === 'function') {
    listeners.push(fn);
  }
}

export function unlisten(fn) {
  listeners = listeners.filter((item) => item !== fn);
}

window.addEventListener('resize', onResize);
