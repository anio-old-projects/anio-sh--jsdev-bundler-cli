#!/usr/bin/env node
import loadResource from "@anio-sh/bundler"

async function b() {
	console.log(
		await loadResource("a/test.sh")
	)
}

async function a() {
	await b()
}

a()
