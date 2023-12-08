// note: nodejs environment is implied
import path from "node:path"
import {fileURLToPath} from "node:url"
import fs from "node:fs"

import findNearestFile from "@anio-core-sh/nodejs-find-nearest-file/sync"
import callsites from "callsites"

import process from "node:process"

export default function loadProjectPackageJSON() {
	// origin_dirname is path of calling script
	const origin_dirname = path.dirname(
		fileURLToPath(callsites()[1].getFileName())
	)

	const anio_project_config_path = findNearestFile(
		"anio_project.mjs", origin_dirname
	)

	const anio_project_root = path.dirname(anio_project_config_path)
	const package_json_path = path.resolve(anio_project_root, "package.json")

	try {
		return JSON.parse(
			fs.readFileSync(package_json_path).toString()
		)
	} catch (e) {
		process.stderr.write(`[@anio-sh/bundler] Failed to parse package.json's file content.\n`)

		return null
	}
}
