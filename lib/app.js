var getGL = require('webgl-context')
var mixes = require('mixes')
var Engine = require('canvas-app')
var xtend = require('xtend')
var scissor = require('./gl-scissor')
var Transitions = require('transitions')
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

	this.views = opt.views||[]
}

//inherit & mixin base classes
inherits(App, Engine)
mixes(App, EventEmitter.prototype)

mixes(App, {

	make: function() {
		var states = Transitions.all(this.views, this)
		return states.create() //initialize views
			.then( this.start.bind(this) ) //start render loop
			.then( states.show ) //show views
	},

	render: function(gl, width, height, dt) {
		this.deltaTime = Math.min(30,dt)
		clearGL(this.gl)
		this.views.forEach(render, this)
	},

	deviceWidth: {
		get: function() { return this.width * DPR }
	},

	deviceHeight: {
		get: function() { return this.height * DPR }
	}
})


function render(v) {
	// if (Array.isArray(v.views))
	// 	v.views.forEach(render, this)
	if (typeof v.render === 'function')
		v.render(this)
}