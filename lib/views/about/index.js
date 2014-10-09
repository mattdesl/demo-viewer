var Promise = require('bluebird')
var animate = require('gsap-promise')
var domify = require('domify')
var $ = require('dom-select')
var style = require('dom-style')
var detach = require('remove-element')
var template = require('./template.hbs')
var slide = require('../../animate/slide')

module.exports = {

	create: function(app) {
		this.element = domify(template())
	},

	dispose: function() {
		detach(this.element)
	},

	show: function(app) {
		app.element.appendChild(this.element)
		
		var elements = [
			$('p', this.element),
			$('header', this.element)
		]
		return Promise.all([
			animate.fromTo(this.element, 1.0, {
				scale: 0.7, 
				rotationX: 90, 
				z: -100,
			}, {
				rotationX: 0.0,
				scale: 1,
				z: 0,
				transformPerspective: 1000,
				delay: 0.5,
				ease: "easeOutQuint"
			}),
			slide(elements, {
				from: -200,
				delay: 0.25,
				stagger: 0.20,
				ease: "easeOutQuint"
			})
		])
	},


}