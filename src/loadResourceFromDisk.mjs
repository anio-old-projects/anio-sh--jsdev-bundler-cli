// note: nodejs environment is implied

import path from "node:path"
import {fileURLToPath} from "node:url"
import fs from "node:fs/promises"

import findNearestFile from "@anio-sh/find-nearest-file"
import callsites from "callsites"

import process from "node:process"

export default async function loadResourceFromDisk(resource) {
	const resource_path = resource
	// origin_dirname is path of calling script
	const origin_dirname = path.dirname(
		fileURLToPath(callsites()[1].getFileName())
	)

	const anio_project_config_path = await findNearestFile(
		"anio_project.mjs", origin_dirname
	)

	const anio_project_root = path.dirname(anio_project_config_path)
	const absolute_resource_path = path.resolve(anio_project_root, "bundle.resources", resource_path)

	if ("ANIO_BUNDLER_DEBUG" in process.env) {
		process.stderr.write(`[@anio-sh/bundler] Requested '${resource_path}', will be loaded from '${absolute_resource_path}')\n`)
	}

	return (
		await fs.readFile(
			absolute_resource_path
		)
	).toString()
}
