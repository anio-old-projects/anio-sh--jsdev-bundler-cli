// Code is based off of https://rollupjs.org/plugin-development/#a-simple-example
// written in commonjs
const fs = require("node:fs/promises")
const path = require("node:path")

async function createVirtualModuleSourceCode(build_id) {
	const template_str = (await fs.readFile(
		path.resolve(
			__dirname,
			"loadResourceFromBundle.mjs"
		)
	)).toString()

	return template_str.split("$bundle_id$").join(build_id)
}

module.exports = function(build_id) {
	return function anioBundlerResolverPlugin() {
		return {
			name: "anio-bundler-resolver-plugin",

			resolveId(source) {
				if (source === "@anio-sh/bundler") {
					// this signals that Rollup should not ask other plugins or check
					// the file system to find this id
					return source
				}

				return null // other ids should be handled as usually
			},

			async load(id) {
				if (id === "@anio-sh/bundler") {
					return await createVirtualModuleSourceCode(build_id)
				}

				return null // other ids should be handled as usually
			}
		}
	}
}
