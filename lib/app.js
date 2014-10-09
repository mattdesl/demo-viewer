var Base = require('./basic-gl-app')
var domify = require('domify')

module.exports = function App(opt) {
	opt = opt||{}

	if (!opt.clear) //white background
		opt.clear = { color: [1,1,1,1] }

	var app = new Base(opt)
	app.canvas.setAttribute('class', 'main-canvas')
	app.element = domify('<div class="main">')
	app.element.appendChild(app.canvas)

	return app
}



