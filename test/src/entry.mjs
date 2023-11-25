#!/usr/bin/env node
import loadResource from "@anio-sh/bundler"
//console.log('start')
//import t from "virtual-module"
//import loadResource from "./loadResource.mjs"

async function b() {
	console.log(
		"",
		await loadResource("a/test.sh")
	)
}

async function a() {
	await b()
}

a()

//import "./bla/a.mjs"
