module.exports = function(el) {
	if (el.parentNode)
		el.parentNode.removeChild(el)
}