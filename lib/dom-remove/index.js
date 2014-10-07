module.exports = function(el) {
	if (el && el.parentNode)
		el.parentNode.removeChild(el)
}