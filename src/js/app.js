import { Vector3 } from 'three';

import camera from './camera';
import renderer from './renderer';
import scene from './scene';
import * as renderLoop from './renderloop';
import assetloader from './assetloader';
import gui from './gui';

import './lights';
import './resize';
import './controls';

// import url to lego model
import legoBrick from '../assets/lego.glb';

function init(model) {
  // setup gui
  gui.addInput(model.position, 'x', { min: -5, max: 5, label: 'X position' });

  // scale and add model
  model.scale.set(3, 3, 3);
  scene.add(model);

  // add a renderloop callback that runs every frame
  renderLoop.add(({ delta, elapsed }) => {
    model.rotation.x += 0.5 * delta;
    model.rotation.y += 0.4 * delta;
    model.rotation.z += 0.3 * delta;

    renderer.render(scene, camera);
  });

  // start rendering
  renderLoop.start();
}

function setup() {
  // add canvas element to page
  document.body.appendChild(renderer.domElement);
  // queue a file in the asset loader
  assetloader.queue({
    id: 'lego',
    url: legoBrick,
    type: 'gltf',
    draco: true,
  });

  // returns the current loading progress
  assetloader.progress((p) => {});

  // funtion called when all assets is done loading
  assetloader.completed(() => {
    const model = assetloader.get('lego').scene;
    init(model);
  });

  // staart loading assets
  assetloader.load();

  // position cameara
  camera.position.z = 5;
  camera.position.y = 2;
  camera.lookAt(new Vector3(0, 0, 0));
}

setup();
