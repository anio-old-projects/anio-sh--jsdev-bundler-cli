module.exports = function(build_id, resources) {
	if (resources === null) return ""

	return `

if (!("__anio_bundler_resources" in globalThis)) {
	globalThis.__anio_bundler_resources = {};
}

globalThis.__anio_bundler_resources["${build_id}"] = JSON.parse(
	${JSON.stringify(JSON.stringify(resources))}
);

`
}
