import { PerspectiveCamera } from 'three';
import settings from './settings';

const { fov, near, far } = settings.camera;

const aspect = window.innerWidth / window.innerHeight;
const camera = new PerspectiveCamera(fov, aspect, near, far);

export default camera;
