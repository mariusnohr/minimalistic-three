import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import camera from './camera';
import renderer from './renderer';
import settings from './settings';

const controls = new OrbitControls(camera, renderer.domElement);

controls.enabled = settings.controls;

export default controls;
