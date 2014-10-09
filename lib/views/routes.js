var bulk = require('bulk-require')
var routes = bulk(__dirname, ['**/*.js'])

module.exports = require('../view-router')({

	'#/': routes.demos,
	'#/demos/:name?': routes.demos,
	'#/about': routes.about,
})