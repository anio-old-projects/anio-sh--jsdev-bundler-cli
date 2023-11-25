const fs = require("node:fs/promises")
const rollup_bundle = require("../rollup/bundle.js")

const createTemporaryFile = require("../util/createTemporaryFile.js")
const detectAndExtractShebang = require("../util/detectAndExtractShebang.js")
const stringifyResourcesBundle = require("../util/stringifyResourcesBundle.js")

module.exports = async function(context) {
	const tmp_output_file = await createTemporaryFile(".mjs")

	await rollup_bundle(
		context.input,
		tmp_output_file,
		context.rollup_plugin
	)

	let bundle_str = (await fs.readFile(tmp_output_file)).toString()
	let bundle_code = ""

	const {source_code, shebang} = detectAndExtractShebang(bundle_str)

	if (shebang) {
		bundle_code += `${shebang}\n`
	}

	bundle_code += stringifyResourcesBundle(context.id, context.resources)
	bundle_code += source_code

	await fs.writeFile(context.output + ".tmp", bundle_code)
	await fs.rename(context.output + ".tmp", context.output)
}
