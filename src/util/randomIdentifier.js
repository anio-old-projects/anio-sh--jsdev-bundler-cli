const crypto = require("node:crypto")

module.exports = function randomIdentifier() {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(8, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result.toString("hex"))
			}
		})
	})
}
