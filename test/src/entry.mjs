#!/usr/bin/env node
import {loadResource} from "../../src/index.mjs"

async function b() {
	console.log(
		await loadResource("a/test.sh")
	)
}

async function a() {
	await b()
}

a()
