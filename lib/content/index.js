var map = require('object-map-to-array')
var Promise = require('bluebird')
var animate = require('../animate')
var hyperglue = require('hyperglue')
var detach = require('../dom-remove')
var domify = require('domify')
var style = require('dom-style')

var $ = require('dom-select')
var bulk = require('bulk-require')
var templates = bulk(__dirname+'/templates', ['*.hbs'])

module.exports = map(templates, function(t, k) {
	return view(k, t)
})

function view(id, template) {
	return {
		id: id,

		create: function(ctx) {
			this.element = hyperglue(template())
			ctx.element.appendChild( this.element )
			console.log(this.id, 'create')
		},

		dispose: function(ctx) {
			detach(this.element)
			console.log(this.id, 'dispose')

		},	

		show: function(ctx) {
			console.log(this.id, 'show')

			animate.set(this.element, { y: -200 })

			return Promise.all([
				animate.fromTo(this.element,1, { y: -200 }, {
					y: 0,
					ease: "easeOutQuint"
				}),
				animate.fromTo($('p', this.element),1, {
					y: -300
				}, {
					y: 0,
					delay: 0.05
				}),
				animate.fromTo($('header', this.element),1, { y: -300 }, {
					y: 0,
					ease: "easeOutQuint",
					alpha: 1,
					delay: 0.4
				})
				
			])
		},

		hide: function(ctx) {
			return Promise.all([
				animate(this.element, 0.8, {
					y: -200,
					ease: "easeOutExpo"
				})
			])
		}
	}

}