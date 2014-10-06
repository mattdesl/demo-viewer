module.exports.bind = function(gl, x, y, width, height) {
	gl.enable(gl.SCISSOR_TEST)
	gl.scissor(x, y, width, height)
}

module.exports.unbind = function(gl) {
	gl.disable(gl.SCISSOR_TEST)
}