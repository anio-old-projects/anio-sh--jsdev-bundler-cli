import path from "node:path"
import {fileURLToPath} from "node:url"
import fs from "node:fs"

export default function getBundlerInformation() {
	const __dirname = path.dirname(
		fileURLToPath(import.meta.url)
	)

	const package_json_path = path.resolve(__dirname, "..", "package.json")

	const package_json = JSON.parse(fs.readFileSync(
		package_json_path
	).toString())

	return {
		live: true,
		version: package_json.version
	}
}
