import { DirectionalLight } from 'three';
import scene from './scene';

const dirLight1 = new DirectionalLight(0xffffff, 1);
dirLight1.position.set(10, 10, 10);
scene.add(dirLight1);

const dirLight2 = new DirectionalLight(0xffffff, 1);
dirLight2.position.set(-10, -10, 10);
scene.add(dirLight2);
