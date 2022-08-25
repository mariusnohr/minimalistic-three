import { Pane } from 'tweakpane';

const pane = new Pane();

export function addFolder(options = {}) {
  const folder = pane.addFolder(options);
  return folder;
}

export function addInput(params, prop, options = {}) {
  pane.addInput(params, prop, options);
}

export default pane;
