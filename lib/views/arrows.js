var Promise = require('bluebird')
var animate = require('../animate')
var events = require('dom-events')
var classes = require('dom-classes')

var domify = require('domify')

module.exports = {
	create: function(app) {
		this.arrows = ['left','right'].map(function(dir) {
			var element = domify('<div class="arrow-'+dir+'">')

			events.on(element, 'click', function(ev) {
				app.emit('arrow-'+dir, ev)
			})
			
			app.element.appendChild(element)

			return element
		})

		app.on('change-content', function(c, i, list) {
			this.arrows.forEach(function(a) {
				classes.remove(a, 'disabled')
			})
			if (i === 0)
				classes.add(this.arrows[0], 'disabled')
			else if (i === list.length-1)
				classes.add(this.arrows[1], 'disabled')
		}.bind(this))
	},

	show: function(app) {
		var delay = 0.65,
			time = 0.75

		return Promise.all([
			animate.fromTo(this.arrows[0], time, { x: -100, }, {
				ease: "easeOutQuint",
				delay: delay,
				x: 0
			}),
			animate.fromTo(this.arrows[1], time, { x: 100, }, {
				ease: "easeOutQuint",
				delay: delay + 0.1,
				x: 0
			}),
		])
	}
}
