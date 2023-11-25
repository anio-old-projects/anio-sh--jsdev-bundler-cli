const fs = require("node:fs/promises")

module.exports = async function(path) {
	try {
		const stat = await fs.lstat(path)

		return stat.isDirectory()
	} catch (e) {
		return false
	}
}
