# noa-engine

An experimental voxel engine.

Examples:

- [Minecraft Classic](https://classic.minecraft.net/) - a game from Mojang(!) built on this engine
- [Minecraft Classic](https://classic.minecraft.net/) - a game from Mojang(!) built on this engine
- [noa-testbed](https://andyhall.github.io/noa-testbed/) - An old demo, outdated but colorful
- [test example](https://andyhall.github.io/noa/test/) - test world from this repo, implements most of the engine's features
- [hello-world example](https://andyhall.github.io/noa/hello-world/) - bare minimum world, suitable for using as a base to build something out of
- [noa-testbed](https://andyhall.github.io/noa-testbed/) - An old demo, outdated but colorful
- [test example](https://andyhall.github.io/noa/test/) - test world from this repo, implements most of the engine's features
- [hello-world example](https://andyhall.github.io/noa/hello-world/) - bare minimum world, suitable for using as a base to build something out of

## Usage

Under active development, best way to try it is to clone and hack on the `develop` branch:

```sh
(clone this repo)
cd noa
npm install
git checkout develop   # newest version is in develop
npm test               # runs demo world in /docs/test
```

The `start` and `test` scripts run the minimal demo projects locally, via `webpack` and `webpack-dev-server` (which will be installed as dev dependencies). The `build` script rebuilds static bundles for both demos.

To build a new world, use `noa` as a dependency:

```sh
npm install --save noa-engine
```

```js
var engine = require("noa-engine");
var noa = engine({
  inverseY: true
  // see source or /docs/ examples for more options and usage
});
```

---

## Status, contributing, etc.

This library attempts to be something you can build a voxel game on top of. It's not a fully-featured game engine; it just tries to manage the painful parts of using voxels (e.g. chunking, meshing), and certain things that are tightly coupled to voxel implementation (physics, raycasting, collisions..), but otherwise stay out of your way.

Contributions are welcome! But please open an issue before building any nontrivial new features. I'd like to keep this library lean, so if a given feature could be done as a separate module then that's probably what I'll suggest.

> Please note I do all dev work on the `develop` branch; please send any PRs against that branch!

## Editors

If using VS Code, install the [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) and [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions. These will automatically use the EditorConfig and Prettier settings from the repo to consistently format files.

## Docs

The source is pretty fully commented, mostly with JSDoc-style comments, but I don't currently have a good docgen tool, so for now it's best to consult the source.

---

## Recent changes:

- 0.25.0
  - Adds `debug` option: populates `window` with useful references, binds `Z` to BJS inspector
  - Now current with Babylon.js 4.0
  - Updates many dependencies, many small bug fixes.
- 0.24.0
  - Terrain materials can specify a renderMaterial (see `registry.registerMaterial()`)
  - Targeting and `noa.pick` can take a function for which block IDs to target - #36
  - `every` component is removed (client apps using this, please define it separately)
- 0.23.0
  - Now uses octrees for scene selection for all meshes, even moving ones
  - Option `useOctreesForDynamicMeshes` (default `true`) to disable previous
  - `noa.rendering.addDynamicMesh` changed to `addMeshToScene(mesh, isStatic)`
  - Entities can now be cylindrical w.r.t. `collideEntities` component
  - Adds pairwise entity collision handler `noa.entities.onPairwiseEntityCollision`
- 0.22.0
  - Large/complicated scenes should mesh and render much faster
  - Chunk terrain/object meshing now merges results. Block object meshes must be static!
  - Removed redundant `player` component - use `noa.playerEntity` property
  - Added `showFPS` option
  - Many internal changes that hopefully don't break compatibility
- 0.21.0
  - Support unloading/reloading new world data.  
    Sample implementation in the `docs/test` app (hit "O" to swap world data)
  - changes `noa.world#setChunkData` params: `id, array, userData`
  - changes `noa.world#chunkBeingRemoved` event params: `id, array, userData`
- 0.20.0
  - Near chunks get loaded and distant ones get unloaded faster and more sensibly
  - Greatly speeds up chunk init, meshing, and disposal (and fixes some new Chrome deopts)
- 0.19.0
  - Revise per-block callbacks:
    - `onLoad` when a block is created as part of a newly-loaded chunk
    - `onUnload` - when the block goes away because its chunk was unloaded
    - `onSet` - when a block gets set to that particular id
    - `onUnset` - when a block that had that id gets set to something else
    - `onCustomMeshCreate` - when that block's custom mesh is instantiated (either due to load or set)
- 0.18.0
  - Simplifies block targeting. Instead of several accessor methods, now there's a persistent `noa.targetedBlock` with details on whatever block is currently targeted.
  - `noa` now emits `targetBlockChanged`
  - Built-in block highlighting can now be overridden or turned off with option `skipDefaultHighlighting`
- 0.17.0
  - Adds per-block callbacks: `onCreate`, `onDestroy`, `onCustomMeshCreate`
- 0.16.0
  - Simplifies block registration - now takes an options argument, and the same API is used for custom mesh blocks
  - Removes the idea of registration for meshes

---

## Credits

Made by [@fenomas](https://twitter.com/fenomas), license is MIT.
