const fs = require("node:fs/promises")
const path = require("node:path")
const os = require("node:os")

const randomIdentifier = require("./randomIdentifier.js")

module.exports = async function(extension = "") {
	const tmp_path = path.resolve(
		os.tmpdir(),
		await randomIdentifier() + extension
	)

	await fs.writeFile(tmp_path, "")

	return await fs.realpath(tmp_path)
}
