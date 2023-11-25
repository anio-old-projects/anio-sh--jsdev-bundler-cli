const fs = require("node:fs/promises")
const path = require("node:path")

async function createResourceMap(root_dir, dir, map) {
	const entries = await fs.readdir(
		path.resolve(root_dir, dir)
	)

	for (const entry of entries) {
		const absolute_path = path.resolve(root_dir, dir, entry)
		const relative_path = path.join(dir, entry)

		const stat = await fs.lstat(absolute_path)

		if (stat.isDirectory()) {
			await createResourceMap(root_dir, relative_path, map)
		} else {
			map[relative_path] = (await fs.readFile(absolute_path)).toString()
		}
	}
}

module.exports = async function(dir) {
	const root_dir = await fs.realpath(dir)
	let map = {}

	await createResourceMap(root_dir, ".", map)

	return map
}
