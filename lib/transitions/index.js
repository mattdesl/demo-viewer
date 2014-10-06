var Promise = require("bluebird")

//TODO: Could optimize this a bit better ...

var promise = Promise.method(function(func, views, opt) {
	if (!Array.isArray(views))
		views = [views]
	
	var p = resolve.bind(null, func, opt)
	return Promise.all(views.map(p)).then(function() {
		return opt
	})
})

function resolve(func, opt, v) {
	if (typeof v[func] === 'function')
		return v[func](opt)
	else
		return Promise.resolve()
}

module.exports = Transitions
function Transitions(views, opt) {
	return {
		views: views,
		create: promise.bind(null, 'create', views, opt),
		show: promise.bind(null, 'show', views, opt),
		hide: promise.bind(null, 'hide', views, opt)
	}
}

module.exports.create = promise.bind(null, 'create')
module.exports.show = promise.bind(null, 'show')
module.exports.hide = promise.bind(null, 'hide')