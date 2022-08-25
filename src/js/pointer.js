import { screenToNDC, detectPointerEvents } from './utils';

class Pointer {
  pointerDown = false;
  enabled = true;

  mouse = { x: 0, y: 0 };
  mouseNormalized = { x: 0, y: 0 };
  mouseEased = { x: 0, y: 0 };
  mouseNormalizedEased = { x: 0, y: 0 };

  mouseDamping = 20;
  listeners = {};

  constructor() {
    // check if pointer events is supported
    // TODO: provide fallback
    if (detectPointerEvents.hasApi) {
      this.toggleListeners(true);
    }
  }

  toggleListeners(enabled) {
    const func = enabled ? 'addEventListener' : 'removeEventListener';

    window[func](pointerEvents.prefix('pointerdown'), this.onPointerDown);
    window[func](pointerEvents.prefix('pointerup'), this.onPointerUp);
    window[func](pointerEvents.prefix('pointermove'), this.onPointerMove);

    this.enabled = enabled;
  }

  onPointerDown = (evt) => {
    this.pointerDown = true;
    this.trigger('down');
  };

  onPointerUp = () => {
    this.pointerDown = false;
    this.trigger('up');
  };

  onPointerMove = (evt) => {
    const { clientX, clientY } = evt;

    this.mouse = { x: clientX, y: clientY };
    this.mouseNormalized = screenToNDC(this.mouse);

    this.trigger('move');
  };

  update() {
    this.mouseEased.x += (this.mouse.x - this.mouseEased.x) / this.mouseDamping;
    this.mouseEased.y += (this.mouse.y - this.mouseEased.y) / this.mouseDamping;

    this.mouseNormalizedEased.x +=
      (this.mouseNormalized.x - this.mouseNormalizedEased.x) /
      this.mouseDamping;
    this.mouseNormalizedEased.y +=
      (this.mouseNormalized.y - this.mouseNormalizedEased.y) /
      this.mouseDamping;
  }

  enable() {
    if (!this.enabled) this.toggleListeners(true);
  }

  disable() {
    if (this.enabled) this.toggleListeners(false);
  }

  listen(type, func) {
    const listeners = this.listeners[type];

    if (!listeners) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(func);
  }

  unlisten(type, func) {
    const listeners = this.listeners[type];

    if (listeners) {
      this.listeners[type] = listeners.filter((f) => {
        return f !== func;
      });
    }
  }

  trigger(type) {
    const listeners = this.listeners[type];

    if (listeners) {
      listeners.forEach((func) => {
        func();
      });
    }
  }
}

export default new Pointer();
