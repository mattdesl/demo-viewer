var content = require('../../content')
var container = require('../../view-container')

module.exports = container([
	require('./content')(content), //a "page" with sub-views
	require('./arrows')            //some other overlay elements
])