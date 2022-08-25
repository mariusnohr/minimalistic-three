import { WebGLRenderer, sRGBEncoding } from 'three';

import settings from './settings';
const { dpr } = settings;

const renderer = new WebGLRenderer({
  powerPreference: 'high-performance',
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(dpr);
renderer.outputEncoding = sRGBEncoding;

export default renderer;
