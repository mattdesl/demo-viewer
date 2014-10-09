var transitions = require('transitions')
var Promise = require('bluebird')

function map(func, views) {
	return function(opt) {
		return Promise.all(views.map(function(v) {
			return func(v, opt)
		}))
	}
}

module.exports = function(views) {
	
	return {
		views: views,
		create: map(transitions.create, views),
		dispose: map(transitions.dispose, views),
		show: map(transitions.show, views),
		hide: map(transitions.hide, views),

		render: function(app) {
			views.forEach(function(v) {
				if (typeof v.render === 'function')
					v.render(app)
			})
		}
	}
}