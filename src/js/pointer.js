import { screenToNDC, detectPointerEvents } from './utils';

class Pointer {
  pointerDown = false;
  enabled = true;

  pointer = { x: 0, y: 0 };
  pointerNormalized = { x: 0, y: 0 };
  pointerEased = { x: 0, y: 0 };
  pointerNormalizedEased = { x: 0, y: 0 };

  pointerDamping = 20;
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

    window[func](detectPointerEvents.prefix('pointerdown'), this.onPointerDown);
    window[func](detectPointerEvents.prefix('pointerup'), this.onPointerUp);
    window[func](detectPointerEvents.prefix('pointermove'), this.onPointerMove);

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

    this.pointer = { x: clientX, y: clientY };
    this.pointerNormalized = screenToNDC(this.pointer);

    this.trigger('move');
  };

  update() {
    this.pointerEased.x +=
      (this.pointer.x - this.pointerEased.x) / this.pointerDamping;
    this.pointerEased.y +=
      (this.pointer.y - this.pointerEased.y) / this.pointerDamping;

    this.pointerNormalizedEased.x +=
      (this.pointerNormalized.x - this.pointerNormalizedEased.x) /
      this.pointerDamping;
    this.pointerNormalizedEased.y +=
      (this.pointerNormalized.y - this.pointerNormalizedEased.y) /
      this.pointerDamping;
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
