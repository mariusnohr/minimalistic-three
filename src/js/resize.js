import renderer from './renderer';
import camera from './camera';

let listeners = [];

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  listeners.forEach((func) => {
    func({ width, height, aspect });
  });
}

export function addResizeListener(fn) {
  if (typeof fn === 'function') {
    listeners.push(fn);
  }
}

export function removeResizeLister(fn) {
  listeners = listeners.filter((item) => item !== fn);
}

window.addEventListener('resize', onResize);
