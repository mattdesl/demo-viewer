var Promise = require('bluebird')
var animate = require('gsap-promise')
var domify = require('domify')
var $ = require('dom-select')
var events = require('dom-events')
var slide = require('../animate/slide')
var style = require('dom-style')
var detach = require('remove-element')
var classes = require('dom-classes')
var router = require('../view-router')

module.exports = function(icon, route) {
	return { 

		create: function(app) {
			this.button = domify('<div>')

			;['fa', 'fa-info-circle', 'button'].forEach(function(c) {
				classes.add(this.button, c)
			}, this)

			events.on(this.button, 'click', function() {
				router.go(route)
			})
			app.element.appendChild(this.button)
			
		},

		dispose: function() {
			detach(this.button)
		},

		show: function(app) {

			// var text = $('span', this.element)
			// return Promise.all([
			// 	slide([this.element, text], {
			// 		from: 100,
			// 		delay: 0.8,
			// 		stagger: 0.25,
			// 		ease: "easeOutQuint"
			// 	}),
			// 	animate(this.border, 1.0, {
			// 		delay: 0.6,
			// 		ease: "easeOutQuint",
			// 		borderWidth: 20
			// 	})
			// ])
		},
	}
}