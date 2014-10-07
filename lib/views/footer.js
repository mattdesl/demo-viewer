var Promise = require('bluebird')
var animate = require('../animate')
var domify = require('domify')
var $ = require('dom-select')
var slide = require('../fx/slide')

module.exports = {
	create: function(app) {
		this.element = domify('<div class="footer"><span>footer</span></div>')
		this.border = domify('<div class="border">')

		app.element.appendChild(this.element)
		app.element.appendChild(this.border)
	},

	show: function(app) {
		var text = $('span', this.element)
		return Promise.all([
			slide([this.element, text], {
				from: 100,
				delay: 0.8,
				stagger: 0.5,
				ease: "easeOutQuint"
			}),
			animate(this.border, 1.0, {
				delay: 0.4,
				ease: "easeOutQuint",
				borderWidth: 20
			})
		])
	},
}