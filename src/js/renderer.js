import { WebGLRenderer, sRGBEncoding } from 'three';

import settings from './settings';
const { dpr, antialias } = settings;

const renderer = new WebGLRenderer({
  powerPreference: 'high-performance',
  antialias,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(dpr);
renderer.outputEncoding = sRGBEncoding;

export default renderer;
