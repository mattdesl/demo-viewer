var Promise = require('bluebird')
var animate = require('gsap-promise')
var domify = require('domify')
var $ = require('dom-select')
var slide = require('../animate/slide')
var style = require('dom-style')
var detach = require('remove-element')

module.exports = {
	create: function(app) {
		this.element = domify('<div class="footer"><span>@mattdesl</span></div>')
		this.border = domify('<div class="border">')
		
		app.element.appendChild(this.element)
		app.element.appendChild(this.border)
	},

	dispose: function() {
		;[this.element, this.border].forEach(detach)
	},

	show: function(app) {

		var text = $('span', this.element)
		return Promise.all([
			slide([this.element, text], {
				from: 100,
				delay: 0.8,
				stagger: 0.25,
				ease: "easeOutQuint"
			}),
			animate(this.border, 1.0, {
				delay: 0.6,
				ease: "easeOutQuint",
				borderWidth: 20
			})
		])
	},
}