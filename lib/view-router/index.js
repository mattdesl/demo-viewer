var HashRouter = require("hash-router")
var router = HashRouter()
var transitions = require('transitions')

module.exports = function routeViews(routes) {

	function set(current) {
		this.current = current
	}

	return {

		route: function(nextView, app, hash, event) {
			var prev = transitions(this.current||{}, app)
			var next = transitions(nextView||{}, app)
			console.log(nextView, app)

			prev.hide()
				.then(prev.dispose)
				.then(set.bind(this, nextView))
				.then(next.create)
				.then(next.show)
		},

		create: function(app) {
			this.current = null
			for (var k in routes) {
				router.addRoute(k, this.route.bind(this, routes[k], app))
			}
		},

		dispose: function(app) {
			transitions(this.current||{}, app).dispose()
		},

		render: function(app) {
			if (this.current && typeof this.current.render === 'function')
				this.current.render(app)
		},

		hide: function(app) {
			transitions(this.current||{}, app).hide()
		},
	}
}

module.exports.start = function() {
	window.addEventListener("hashchange", router)
	router.on("hash", function(hash, event) {
		lastHash = hash
		lastEvent = event
		console.log("HASH")
	})
	router()
}

module.exports.go = router.go.bind(router)

// module.exports = {
// 	