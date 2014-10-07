var map = require('object-map-to-array')
var Promise = require('bluebird')
var animate = require('../animate')
var hyperglue = require('hyperglue')
var detach = require('../dom-remove')
var domify = require('domify')
var style = require('dom-style')
var style = require('dom-style')

var $ = require('dom-select')
var bulk = require('bulk-require')
var templates = bulk(__dirname+'/templates', ['*.hbs'])

var slide = require('../fx/slide')

var Sphere = require('keytime-canvas-playground/ico/spinning-sphere')
var Particles = require('keytime-canvas-playground/ico/particles')

module.exports = map(templates, function(t, k) {
	return view(k, t)
})


function view(id, template) {
	return {
		id: id,

		create: (function(parent) {
			this.element = hyperglue(template())
			parent.element.appendChild( this.element )
			style.hide(this.element)

			console.log(this.id, 'create')
			this.scale = { value: 0 }

			this._setup(parent, id)
		}),

		_setup: function(parent, id) {
			//TODO: split this into separate JS files...
			if (id === 'icosphere') {
				this.sphere = Sphere(parent.app.gl, {
					outerColor: [0,0,0,0.03],
					innerColor: [0.1,0.1,0.1,0.04],
					strokeColor: [0.1,0.1,0.1,0.5]
				})
			} else if (id === 'particles') {
				this.particles = Particles(parent.app.gl, {
				    count: 50,
				    noiseScale: 0.5,
				    speed: 0.3,
				    driftSpeed: 0.03,
				    width: parent.app.width,
				    height: parent.app.height,
				    color: [1,1,1,0.65],
				    scale: 0 //initially hidden
				})
			}
		},

		render: function(parent) {
			var app = parent.app,
				width = app.width,
				height = app.height,
				dt = app.deltaTime
			if (this.sphere) {
				var sc = [this.scale.value, this.scale.value, this.scale.value]
				this.sphere.innerScale = sc
				this.sphere.outerScale = sc
				this.sphere.draw(width, height, dt)
			}
			if (this.particles) {
				this.particles.scale = this.scale.value * 3.5
			    this.particles.draw(width, height, dt)
			}	
		},

		dispose: function(parent) {
			console.log(this.id, 'dispose')
			detach(this.element)
			if (this.sphere)
				this.sphere.dispose()
			if (this.particles)
				this.particles.dispose()
		},	

		show: function(parent) {
			console.log(this.id, 'show')
			style(this.element, 'display', 'block')

			var elements = [
				this.element, 
				$('p', this.element),
				$('header', this.element)
			]

			return Promise.all([
				slide(elements, {
					from: -400,
					delay: 0.2,
					ease: "easeOutQuint"
				}),
				animate(this.scale, 1.0, {
					value: 1,
					ease: "easeOutQuart",
				})
			])
		},

		hide: function(parent) {
			console.log(this.id, "hide")
			return Promise.all([
				slide(this.element, { offset: -300, ease: "easeInQuint" }),
				animate(this.scale, 0.5, { value: 0, ease: "easeOutQuint" })
			])
		}
	}

}