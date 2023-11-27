#!/usr/bin/env node


if (!("__anio_bundler_resources" in globalThis)) {
	globalThis.__anio_bundler_resources = {};
}

globalThis.__anio_bundler_resources["64de3d40048d8948-{0}"] = JSON.parse(
	"{\"a/test.sh\":\"test\\n\",\"bla.sh\":\"\"}"
);



(function () {
	if (typeof process !== "object") return;

	if (!("env" in process)) return;

	if (!("ANIO_BUNDLER_DEBUG" in process.env)) return;

	process.stderr.write(
		"[@anio-sh/bundler v0.0.5] Application was bundled by version 0.0.5 on Mon, 27 Nov 2023 00:13:03 GMT and has build id '64de3d40048d8948-{0}'.\n"
	);
})();

	// 64de3d40048d8948-{0} will be replaced with the
// appropriate bundle id when bundling with rollup.
let __anio_bundle_id = "64de3d40048d8948-{0}";
// 0.0.5 will be replaced with the
// appropriate bundler version when bundling with rollup.
let __anio_bundler_version = "0.0.5";

function printDebugMessage(message) {
	if (typeof process !== "object") return

	if (!("env" in process)) return

	if (!("ANIO_BUNDLER_DEBUG" in process.env)) return

	process.stderr.write(
		`[@anio-sh/bundler v${__anio_bundler_version}] ${message}\n`
	);
}

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
			`__anio_bundler_resources global variable is missing. This is most likely due to misuse of the package OR a bug in @anio-sh/bundler.`
		)
	} else if (!(__anio_bundle_id in globalThis.__anio_bundler_resources)) {
		throw new Error(
			`Cannot find bundle '${__anio_bundle_id}' in __anio_bundler_resources. This is most likely due to a bug in @anio-sh/bundler.`
		)
	}

	const resources = globalThis.__anio_bundler_resources[__anio_bundle_id];

	const resource_path = normalizeResourcePath(resource);

	if (!(resource_path in resources)) {
		throw new Error(
			`Cannot locate '${resource_path}' in bundle.`
		)
	}

	printDebugMessage(`Load '${resource_path}' from local bundle '${__anio_bundle_id}'`);

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
