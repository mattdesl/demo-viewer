var container = require('./view-container')

module.exports = [
	require('./views/background'),  
	require('./views/routes'),
	require('./views/button')(''),
	require('./views/border') 
]