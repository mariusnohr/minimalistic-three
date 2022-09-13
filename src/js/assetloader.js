import {
  TextureLoader,
  ImageLoader,
  CubeTextureLoader,
  VideoTexture,
} from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import settings from './settings';

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
const { dracoLoaderPath } = settings;

dracoLoader.setDecoderPath(dracoLoaderPath);
gltfLoader.setDRACOLoader(dracoLoader);

const textureLoader = new TextureLoader();
const imageLoader = new ImageLoader();
const cubeTextureLoader = new CubeTextureLoader();

class AssetLoader {
  constructor() {
    this.loadQueue = [];
    this.cache = {};
    this.onComplete = [];
    this.onProgress = [];
    this.renderer = null;
    this.numItems = 0;
  }

  queue(item) {
    this.loadQueue.push(item);
    this.numItems++;
  }

  setProgress(p) {
    for (let i = 0; i < this.onProgress.length; i++) {
      const func = this.onProgress[i];
      func(p);
    }
  }

  setComplete() {
    for (let i = 0; i < this.onComplete.length; i++) {
      const func = this.onComplete[i];
      func();
    }
  }

  load() {
    // check if loading is completed
    if (this.loadQueue.length <= 0) {
      this.setProgress(1);
      this.setComplete();
      return;
    }

    // set progress
    const numLoaded = this.numItems - (this.loadQueue.length - 1);
    const progress = numLoaded / this.numItems;
    this.setProgress(progress);

    // get first item in line
    const item = this.loadQueue.shift();

    // check type
    switch (item.type) {
      case 'gltf':
        this.loadGLTF(item, this.loadComplete);
        break;

      case 'texture':
        this.loadTexture(item, this.loadComplete);
        break;

      case 'image':
        this.loadImage(item, this.loadComplete);
        break;

      case 'cubetexture':
        this.loadCubeTexture(item, this.loadComplete);
        break;

      case 'videotexture':
        this.loadVideoTexture(item, this.loadComplete);
        break;

      default:
        console.warn(`Incorrect asset type for ${item.url}`);
        this.load();
        break;
    }
  }

  loadComplete = (err, item, data) => {
    if (err) {
      console.warn(`An error occured loading ${item.url}`);
    } else {
      const id = item.id || item.url;
      this.cache[id] = data;
      this.load();
    }
  };

  loadGLTF(item, done) {
    gltfLoader.load(
      item.url,
      (data) => {
        done(null, item, data);
      },
      () => {},
      (err) => {
        done(err);
      }
    );
  }

  loadTexture(item, done) {
    textureLoader.load(
      item.url,
      (texture) => {
        const { settings } = item;
        if (settings) {
          for (let prop in settings) {
            texture[prop] = settings[prop];
          }
        }
        if (this.renderer) {
          this.renderer.initTexture(texture);
        }
        done(null, item, texture);
      },
      null,
      (err) => {
        done(err);
      }
    );
  }

  loadCubeTexture(item, done) {
    cubeTextureLoader.load(
      item.urls,
      (cubeTexture) => {
        done(null, item, cubeTexture);
      },
      null,
      (err) => {
        done(err);
      }
    );
  }

  loadVideoTexture(item, done) {
    const video = document.createElement('video');
    video.src = item.url;

    // must be explicitly set in chrome wtf
    video.muted = true;

    video.setAttribute('loop', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('crossorigin', 'anonymous');

    video.play();

    const texture = new VideoTexture(video);

    done(null, item, texture);
  }

  loadImage(item, done) {
    imageLoader.load(
      item.url,
      (image) => {
        done(null, item, image);
      },
      null,
      (err) => {
        done(err);
      }
    );
  }

  get(key) {
    const item = this.cache[key];
    if (!item) {
      // console.warn(`Could not get asset ${key}`);
      return null;
    }
    return item;
  }

  setRenderer(renderer) {
    this.renderer = renderer;
  }

  completed(fn) {
    if (typeof fn !== 'function')
      throw 'The completed parameter must be a function';

    this.onComplete.push(fn);
  }

  progress(fn) {
    if (typeof fn !== 'function')
      throw 'The progress parameter must be a function';

    this.onProgress.push(fn);
  }
}

export default new AssetLoader();
