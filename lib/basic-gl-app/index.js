var getGL = require('webgl-context')
var mixes = require('mixes')
var Engine = require('canvas-app')
var xtend = require('xtend')
var Transitions = require('transitions')
var inherits = require('inherits')
var EventEmitter = require('events').EventEmitter
var createClear = require('gl-clear')
var Promise = require('bluebird')
var style = require('dom-style')

module.exports = App
function App(opt) {
	if (!(this instanceof App)) 
		return new App(opt)
	opt = opt||{}

	this.gl = getGL(opt)
	if (!this.gl)
		throw "no WebGL available"
	
	EventEmitter.call(this)
	Engine.call(this, this.render.bind(this), xtend({
		context: this.gl
	}, opt))

	this._clearGL = createClear(opt.clear)
	this.autoClear = opt.autoClear !== false

	this.views = opt.views||[]
}

//subclass canvas-app
inherits(App, Engine)
//also mixin EventEmitter emit() and on()
mixes(App, EventEmitter.prototype)

mixes(App, {

	make: function() {
		var states = Transitions.all(this.views, this)
		return states.create()
			.then( this.start.bind(this) )
			.then( states.show )
	},

	render: function(gl, width, height, dt) {
		this.deltaTime = Math.min(30,dt)
		this._clearGL(this.gl)
		this.views.forEach(render, this)
	},
})

function render(v) {
	if (typeof v.render === 'function')
		v.render(this)
}