#!/usr/bin/env node


if (!("__anio_bundler_resources" in globalThis)) {
	globalThis.__anio_bundler_resources = {};
}

globalThis.__anio_bundler_resources["1fadb664e3af6562-{0}"] = JSON.parse(
	"{\"a/test.sh\":\"this is a test\\n\",\"file.sh\":\"\"}"
);



(function () {
	if (typeof process !== "object") return;

	if (!("env" in process)) return;

	if (!("ANIO_BUNDLER_DEBUG" in process.env)) return;

	process.stderr.write(
		"[@anio-sh/bundler v0.0.6] Application was bundled by version 0.0.6 on Mon, 27 Nov 2023 03:04:12 GMT and has build id '1fadb664e3af6562-{0}'.\n"
	);
})();

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import process from 'node:process';

async function findNearestFile(config_file_name, dir_path) {
	const absolute_dir_path = await fs.realpath(dir_path);
	const parent_dir_path = path.dirname(absolute_dir_path);

	let config_path = null;

	const entries = await fs.readdir(absolute_dir_path);

	for (const entry of entries) {
		const absolute_entry_path = path.resolve(absolute_dir_path, entry);
		const stat = await fs.lstat(absolute_entry_path);

		// ignore directories
		if (stat.isDirectory() || stat.isSymbolicLink()) continue;

		if (stat.isFile() && entry === config_file_name) {
			config_path = absolute_entry_path;

			break
		}
	}

	if (config_path) {
		return config_path
	}

	// do not recurse further if we just scanned root directory
	if (absolute_dir_path === "/" && parent_dir_path === "/") {
		return false
	}

	return await findNearestFile(config_file_name, parent_dir_path)
}

function callsites() {
	const _prepareStackTrace = Error.prepareStackTrace;
	try {
		let result = [];
		Error.prepareStackTrace = (_, callSites) => {
			const callSitesWithoutCurrent = callSites.slice(1);
			result = callSitesWithoutCurrent;
			return callSitesWithoutCurrent;
		};

		new Error().stack; // eslint-disable-line unicorn/error-message, no-unused-expressions
		return result;
	} finally {
		Error.prepareStackTrace = _prepareStackTrace;
	}
}

// note: nodejs environment is implied

async function loadResourceFromDisk(resource) {
	const resource_path = resource;
	// origin_dirname is path of calling script
	const origin_dirname = path.dirname(
		fileURLToPath(callsites()[1].getFileName())
	);

	const anio_project_config_path = await findNearestFile(
		"anio_project.mjs", origin_dirname
	);

	const anio_project_root = path.dirname(anio_project_config_path);
	const absolute_resource_path = path.resolve(anio_project_root, "bundle.resources", resource_path);

	if ("ANIO_BUNDLER_DEBUG" in process.env) {
		process.stderr.write(`[@anio-sh/bundler] Requested '${resource_path}', will be loaded from '${absolute_resource_path}')\n`);
	}

	return (
		await fs.readFile(
			absolute_resource_path
		)
	).toString()
}

const loadResource = loadResourceFromDisk;

async function b() {
	console.log(
		await loadResource("a/test.sh")
	);
}

async function a() {
	await b();
}

a();
