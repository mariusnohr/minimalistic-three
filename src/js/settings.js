const MAX_DPR = 2;

export default {
  // sets max device pixel ratio
  dpr: Math.min(window.devicePixelRatio, MAX_DPR),
  // camera settings
  camera: {
    fov: 60,
    near: 0.01,
    far: 1000,
  },
  // enable/disable orbit controls
  controls: true,
  // set draco loader path
  // the gltf/draco loader is located
  // in the `static` folder
  dracoLoaderPath: '/draco/',
  // enable/disable fps meter
  stats: true,
  // enable/disable the default MSAA antialias
  // remember that this doesn't work if you add
  // postprocessing later, unless you use the
  // WebGL 2 multisample framebuffer
  antialias: true,
};
