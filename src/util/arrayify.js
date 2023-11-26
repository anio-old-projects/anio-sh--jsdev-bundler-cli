module.exports = function(value) {
	if (Array.isArray(value)) return value

	return [value]
}
