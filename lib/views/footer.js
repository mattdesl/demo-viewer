var Promise = require('bluebird')
var animate = require('../animate')
var domify = require('domify')
var $ = require('dom-select')
var slide = require('../fx/slide')

module.exports = {
	create: function(app) {
		this.element = domify('<div class="footer"><span>footer</span></div>')
		app.element.appendChild(this.element)
	},

	show: function(app) {
		var text = $('span', this.element)
		return slide([this.element, text], {
			from: 100,
			delay: 0.8,
			stagger: 0.5,
			ease: "easeOutQuint"
		})
	},
}