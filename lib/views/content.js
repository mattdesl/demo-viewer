var Promise = require('bluebird')
var animate = require('../animate')
var Transition = require('transitions')
var domify = require('domify')
var detach = require('../dom-remove')
var classes = require('dom-classes')

var Carousel = require('../carousel')

//This acts as a carousel / "view manager" of sorts, and could be made modular
module.exports = function(views) {
	return {
		create: function(app) {
			this.element = domify('<div class="main-content">')
			this.app = app
			app.element.appendChild(this.element)

			var runner = Carousel(views)
			app.on('arrow-left', runner.previous.bind(runner, this))
			app.on('arrow-right', runner.next.bind(runner, this))

			runner.on('change', app.emit.bind(app, 'change-content'))
			this.carousel = runner
			this.views = views
		},

		dispose: function() {
			detach(this.element)
		},

		render: function(app) {
			if (this.carousel.current) {
				this.carousel.current.render(this)
			}
		},

		show: function(app) {
			return Promise.delay(850).then(function() {
				this.carousel.set(0, this)
			}.bind(this))
		},
	}
}