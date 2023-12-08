// $bundle_id$ will be replaced with the
// appropriate bundle id when bundling with rollup.
let __anio_bundle_id = "$bundle_id$"
// $bundler_version$ will be replaced with the
// appropriate bundler version when bundling with rollup.
let __anio_bundler_version = "$bundler_version$"

function printDebugMessage(message) {
	if (typeof process !== "object") return

	if (!("env" in process)) return

	if (!("ANIO_BUNDLER_DEBUG" in process.env)) return

	process.stderr.write(
		`[@anio-sh/bundler v${__anio_bundler_version}] ${message}\n`
	)
}

function normalizeResourcePath(resource) {
	// todo: handle dot and double dot
	let normalized_path = resource

	while (normalized_path.includes("//")) {
		normalized_path = normalized_path.slice("//").join("/")
	}

	return normalized_path
}

function loadResourceFromBundle(resource) {
	if (!("__anio_bundler_resources" in globalThis)) {
		throw new Error(
			`__anio_bundler_resources global variable is missing. This is most likely due to misuse of the package OR a bug in @anio-sh/bundler.`
		)
	} else if (!(__anio_bundle_id in globalThis.__anio_bundler_resources)) {
		throw new Error(
			`Cannot find bundle '${__anio_bundle_id}' in __anio_bundler_resources. This is most likely due to a bug in @anio-sh/bundler.`
		)
	}

	const resources = globalThis.__anio_bundler_resources[__anio_bundle_id]

	const resource_path = normalizeResourcePath(resource)

	if (!(resource_path in resources)) {
		throw new Error(
			`Cannot locate '${resource_path}' in bundle.`
		)
	}

	printDebugMessage(`Load '${resource_path}' from local bundle '${__anio_bundle_id}'`)

	return resources[resource_path]
}

function loadProjectPackageJSON() {
	try {
		return JSON.parse($project_package_json$)
	} catch (e) {
		printDebugMessage(`Failed to parse embedded package.json's file content.`)

		return null
	}
}

export const loadResource = loadResourceFromBundle
export const loadPackageJSON = loadProjectPackageJSON

export function getBundlerInformation() {
	return {
		live: false,
		version: __anio_bundler_version
	}
}
