# Minimalistic starter template for Three.js

This is my own starter template for working with small to medium sized WebGL-projects using Three.js. It features some of the things I almost always need for quick prototyping, but it's still very lightweight and has very few dependencies. Still WIP.

## Features

- Simple asset loading and management (textures, glb/gltf)
- Pointer-events for mouse/touch handling
- Subscribe to the render loop from within anywhere in your code
- [glslify](https://github.com/glslify/glslify) for convenient component based shader modules
- [Parcel](https://github.com/parcel-bundler/parcel) as the build system
- [Orbitcontrols](https://threejs.org/docs/?q=orbi#examples/en/controls/OrbitControls) for easy camera movement
- FPS meter using [stats.js](https://github.com/mrdoob/stats.js/)
- [Tweakpane](https://cocopon.github.io/tweakpane/) for an easy to use interface to tweak object values real time

## Requirements

This runs on [Node.js](https://nodejs.dev/), so make sure you have that installed.

## Installation

Clone this repo by using this command, and make sure you change "my-new-project" to your own project name.

```sh
git clone https://github.com/mariusnohr/minimalistic-three.git my-new-project
cd my-new-project && npm install
```

## Running in development mode

There are some npm scripts in the `package.json` that you can use for local development. This will spin up a local dev-server, and you're ready to go.

For local development, run

```sh
npm run dev
```

## Creating a production build

To create a production build, run

```sh
npm run build
```

This will build the whole project to the `dist` folder.

## Note about postprocessing

There are currently no default postprocessing pipeline included for this project. I've seen some starter templates that include this, but my reasoning for this is firstly that I want to keep it simple, and secondly that these pipelines tend to be very specific for each project. There are also a lot of different options to choose from, so I don't want this to be any opinionated on this matter.
