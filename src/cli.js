#!/usr/bin/env -S node --experimental-detect-module
const path = require("node:path")
const fs = require("node:fs/promises")
const process = require("node:process")

const main = require("./bundler/main.js")

if (process.argv.length !== 3) {
	process.stderr.write(
		`Usage: anio_bundler <project_root>\n`
	)
	process.exit(2)
}

fs.realpath(process.argv[2])
.then(resolved_project_root => {
	return main(resolved_project_root)
})
.catch(error => {
	process.stderr.write(`${error.message}\n`)

	process.stderr.write(`\n-- stack trace --\n${error.stack}\n`)

	process.exit(1)
})
