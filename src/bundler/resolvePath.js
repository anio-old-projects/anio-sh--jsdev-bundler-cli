const path = require("node:path")

module.exports = function(project_root) {

	return function resolve(p) {
		if (p.slice(0, 1) === "/") {
			return p
		}

		return path.resolve(project_root, p)
	}

}
