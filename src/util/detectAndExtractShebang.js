module.exports = function(input) {
	let source_code = "", shebang = null

	const lines = input.split("\n")

	if (lines[0].startsWith("#!")) {
		shebang = lines[0]

		source_code = lines.slice(1).join("\n")
	} else {
		source_code = lines.join("\n")
	}

	return {source_code, shebang}
}
