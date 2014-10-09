var Promise = require('bluebird')
var animate = require('gsap-promise')
var Transition = require('transitions')
var domify = require('domify')
var detach = require('remove-element')
var classes = require('dom-classes')

var Carousel = require('./carousel')

module.exports = function(views) {
	return {
		create: function(app) {
			this.element = domify('<div class="main-content">')
			this.app = app
			
			var carousel = Carousel(views)
			app.on('arrow-left', carousel.previous.bind(carousel, this))
			app.on('arrow-right', carousel.next.bind(carousel, this))

			carousel.on('change', app.emit.bind(app, 'change-content'))
			this.carousel = carousel
			this.views = views
			app.element.appendChild(this.element)
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