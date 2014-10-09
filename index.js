module.exports = function() {
	var App = require('./lib/app')
	require('domready')(function() {
		var app = App({
			views: require('./lib/views')
		})

		document.body.appendChild(app.element)
		app.make()
	})
	
	require('./lib/view-router').start()
}