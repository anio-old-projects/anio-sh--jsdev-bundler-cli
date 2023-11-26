export default async function() {
	return {
		bundler: [{
			entry: "./src/entry.mjs",
			output: "./bundle.mjs"
		}]
	}
}

// todo: MULTIPLE ENTRIES + ASYNC config
