const MAX_DPR = 2;

export default {
  dpr: Math.min(window.devicePixelRatio, MAX_DPR),
  camera: {
    fov: 60,
    near: 0.01,
    far: 1000,
  },
  controls: true,
  dracoLoaderPath: '/draco/',
  stats: true,
};
