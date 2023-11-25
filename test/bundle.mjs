#!/usr/bin/env node


if (!("__anio_bundler_resources" in globalThis)) {
	globalThis.__anio_bundler_resources = {};
}

globalThis.__anio_bundler_resources["9f8e01c7db84bf7b"] = JSON.parse(
	"{\"a/test.sh\":\"test\\n\",\"bla.sh\":\"\"}"
);

// 9f8e01c7db84bf7b will be replaced with the
// approriate bundle id when bundling with rollup.
let __anio_bundle_id = "9f8e01c7db84bf7b";

function normalizeResourcePath(resource) {
	// todo: handle dot and double dot
	let normalized_path = resource;

	while (normalized_path.includes("//")) {
		normalized_path = normalized_path.slice("//").join("/");
	}

	return normalized_path
}

function loadResourceFromBundle(resource) {
	if (!("__anio_bundler_resources" in globalThis)) {
		throw new Error(
			`__anio_bundler_resources global variable is missing.`
		)
	} else if (!(__anio_bundle_id in globalThis.__anio_bundler_resources)) {
		throw new Error(
			`Cannot find bundle '${__anio_bundle_id}' in __anio_bundler_resources.`
		)
	}

	const resources = globalThis.__anio_bundler_resources[__anio_bundle_id];

	const resource_path = normalizeResourcePath(resource);

	if (!(resource_path in resources)) {
		throw new Error(
			`Cannot locate '${resource_path}' in bundle.`
		)
	}

	if (typeof process !== "undefined" && process.env) {
		if ("ANIO_BUNDLER_DEBUG" in process.env) {
			process.stderr.write(
				`[@anio-sh/bundler] Load '${resource_path}' from local bundle '${__anio_bundle_id}'\n`
			);
		}
	}

	return resources[resource_path]
}

//console.log('start')
//import t from "virtual-module"
//import loadResource from "./loadResource.mjs"

async function b() {
	console.log(
		"",
		await loadResourceFromBundle("a/test.sh")
	);
}

async function a() {
	await b();
}

a();

//import "./bla/a.mjs"
