var Promise = require('bluebird')
var animate = require('../animate')
var domify = require('domify')
var $ = require('dom-select')

module.exports = {
	create: function(app) {
		this.element = domify('<div class="footer"><span>footer</span></div>')
		app.element.appendChild(this.element)
	},

	show: function(app) {
		var text = $('span', this.element)

		animate.set([this.element, text], { y: 100 })
		return animate.to(this.element, 1.0, {
			y: 0,
			delay: 0.8,
			ease: "easeOutQuint"
		}).then(function() {
			return animate(text, 0.5, {
				y: 0,
				ease: "easeOutExpo"
			})
		})
	},
}