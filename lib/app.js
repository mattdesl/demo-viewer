var getGL = require('webgl-context')
var mixes = require('mixes')
var Engine = require('canvas-app')
var xtend = require('xtend')
var scissor = require('./gl-scissor')
var Transitions = require('./transitions')
var Promise = require('bluebird')
var inherits = require('inherits')
var domify = require('domify')
var EventEmitter = require('events').EventEmitter

var clearGL = require('gl-clear')({ color: [1,1,1,1] })
var DPR = window.devicePixelRatio||1

module.exports = App
function App(opt) {
	if (!(this instanceof App)) 
		return new App(opt)
	opt = opt||{}

	this.gl = getGL()
	if (!this.gl)
		throw "no WebGL available"
	
	EventEmitter.call(this)
	Engine.call(this, this.render.bind(this), xtend({
		context: this.gl
	}, opt))
	
	this.canvas.setAttribute('class', 'main-canvas')
	
	this.element = domify('<div class="main">')
	this.element.appendChild(this.canvas)

	this.transitions = Transitions(opt.views||[], this)
}

//inherit & mixin base classes
inherits(App, Engine)
mixes(App, EventEmitter.prototype)

mixes(App, {

	make: function() {
		return this.transitions.create()
			.then(this.start.bind(this))
			.then(this.transitions.show.bind(this.transitions))
	},

	render: function(gl, width, height, dt) {
		clearGL(this.gl)
		this.transitions.views.forEach(function(v) {
			if (typeof v.render === 'function')
				v.render(this)
		}, this)
	},

	start: function() {
		Engine.prototype.start.call(this)
		return this
	},

	deviceWidth: {
		get: function() { return this.width * DPR }
	},

	deviceHeight: {
		get: function() { return this.height * DPR }
	}
})