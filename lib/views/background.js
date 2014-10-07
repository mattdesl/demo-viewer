var create = require('gl-vignette-background')
var Promise = require('bluebird')
var clip = require('../gl-scissor')
var animate = require('../animate')

var style = {
    aspect: 1,
    color1: [0.95, 0.95, 0.95],
    color2: [60/255, 76/255, 88/255], //rgb expressed in 0.0 - 1.0
    smoothing: [ -0.5, 1.0 ],
    noiseAlpha: 0.12,
    offset: [ -0.05, -0.15 ]
}

module.exports = {

	create: function(app) {
		this.size = { x: 0, y: 1 }
		this.quad = create(app.gl, style)
	},

	show: function(app) {
		return Promise.all([
			animate(this.size, 1.0, {
				delay: 0.15,
				ease: "easeOutQuint",
				x: 1
			}),
			animate(app.canvas, 1.0, {
				delay: 0.4,
				ease: "easeOutQuint",
				borderWidth: 20
			})
		])
	},

	dispose: function() {
		this.quad.dispose()
	},

	render: function(app) {
		var width = app.width,
			height = app.height,
			radius = Math.max(width, height)*1.05
		
		//clip from upper-left
		var clipHeight = app.deviceHeight * this.size.y
		clip.bind(app.gl, 0, app.deviceHeight - clipHeight, app.deviceWidth * this.size.x, clipHeight)
		
		this.quad.style({
		    scale: [ 1/width * radius, 1/height * radius],
		})
		this.quad.draw(app.gl)
		clip.unbind(app.gl)
	}
}