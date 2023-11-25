const rollup = require("rollup")
const resolve = require("@rollup/plugin-node-resolve")
const process = require("node:process")

module.exports = async function(input_file, output_file, anio_bundler_plugin) {
	const options = {
		input: input_file,

		output: {
			file: output_file,
			format: "es"//,
			//inlineDynamicImports: true
		},

		/**
		 * anio_bundler_plugin has the responsibility
		 * to resolve "@anio-sh/bundler" to a ''virtual'' module
		 * to support loading resources without modifying the source
		 * code (for bundle id)
		 */
		plugins: [anio_bundler_plugin(), resolve()],

		onLog(level, error, handler) {
			process.stderr.write(
				`[${level}] ${error.message}\n`
			)
		}
	}

	const bundle = await rollup.rollup(options)

	await bundle.write(options.output)
}
