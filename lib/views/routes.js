var bulk = require('bulk-require')
var routes = bulk(__dirname, ['**/*.js'])

module.exports = require('../view-router')({

	'default': routes.demos,
	// '#/': routes.demos,
	'#/demos': routes.demos,
	'#/about': routes.about,
})