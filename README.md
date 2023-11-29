# @anio-sh/bundler

Bundles ecmascript source code into a single file with [rollup](https://github.com/rollup/rollup).

External resources can be embedded too.

### Usage

`anio_bundler <project_root>`

Where `<project_root>` must contain a file named `anio_project.mjs`.

This file must export either an object or a function that will resolve to an object:

```js
export default {
	bundler: {
		entry: "src/entry.mjs",
		output: "dist/bundle.mjs"
	}
}

```

Multiple targets can be specified by using an array:

```js
export default {
	bundler: [{
		entry: "src/cli.mjs",
		output: "dist/cli.mjs"
	}, {
		entry: "src/index.mjs",
		output: "dist/bundle.mjs"
	}]
}
```

### Embedding resources

Sources (that need to be embedded inside the bundle) must be saved under: `<project_root>/bundle.resources/` and can be loaded via:

```js
import {loadResource} from "@anio-sh/bundler"

const resource_contents = loadResource("file.txt")
```

Note:

> ⚠️ `loadResource` is _synchronous_ to be more versatile (i.e. so it is usable in `async` contexts as well).

This code would return the contents of `bundle.resources/file.txt`.

Embedded resources will have a unique identifier so that names won't collide with other bundles generated by @anio-sh/bundler:

```js
globalThis.__anio_bundler_resources["64de3d40048d8948-{0}"] = JSON.parse(
	"{\"a/test.sh\":\"test\\n\"}"
);
```
