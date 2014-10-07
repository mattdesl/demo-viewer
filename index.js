require('./app/less/index.less')

var App = require('./lib/app')
require('domready')(function() {
	var app = App({
		views: require('./lib/views')
	})

	document.body.appendChild(app.element)
	app.make() 
	
	// .then(app.stop.bind(app)) //stop render loop
})