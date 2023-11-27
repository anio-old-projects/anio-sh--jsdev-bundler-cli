const path = require("node:path")
const findNearestFile = require("@anio-sh/find-nearest-file")
const fs = require("node:fs/promises")
const process = require("node:process")

const arrayify = require("../util/arrayify.js")
const createResourcesBundle = require("../util/createResourcesBundle.js")
const randomIdentifier = require("../util/randomIdentifier.js")
const resolvePathFactory = require("./resolvePath.js")
const isDirectory = require("../util/isDirectory.js")

const rollup_pluginFactory = require("../rollup/plugin.js")

const build = require("./build.js")

async function readAnioProjectConfig(anio_project_config_path) {
	const config = (await import(anio_project_config_path)).default

	if (typeof config === "function") {
		return await config()
	}

	return config
}

module.exports = async function(project_root) {
	const build_id = await randomIdentifier()

	const package_json = JSON.parse((await fs.readFile(
		path.resolve(__dirname, "..", "..", "package.json")
	)).toString())

	const anio_project_config_path = await findNearestFile(
		"anio_project.mjs", project_root
	)

	// cross check location of anio_project.mjs
	if (!anio_project_config_path.startsWith(project_root)) {
		throw new Error(`Found anio_project.mjs but it is not located in specified project root.`)
	}

	process.stderr.write(
		`Found anio_project.mjs: ${anio_project_config_path}\n`
	)

	const anio_project_config = await readAnioProjectConfig(
		anio_project_config_path
	)

	const resources_path = path.resolve(
		path.dirname(anio_project_config_path), "bundle.resources"
	)

	let resources = null

	if (await isDirectory(resources_path)) {
		process.stderr.write(
			`Found bundle.resources: ${resources_path}\n`
		)

		resources = await createResourcesBundle(resources_path)
	}

	const resolvePath = resolvePathFactory(project_root)
	let i = 0

	const build_date = new Date()

	for (const bundle of arrayify(anio_project_config.bundler)) {
		const bundle_id = `${build_id}-{${i}}`

		let build_context = {
			package_json,
			id:  bundle_id,
			build_date,
			input: resolvePath(bundle.entry),
			output: resolvePath(bundle.output),
			anio_project_config,
			resources
		}

		build_context.rollup_plugin = rollup_pluginFactory(
			build_context
		)

		await build(build_context)

		++i
	}
}
