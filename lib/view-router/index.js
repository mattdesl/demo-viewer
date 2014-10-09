//this could be cleaned up...
var HashRouter = require("hash-router")

var router

function createRouter() {
	router = HashRouter()
	router.on("hash", function (hash, event) {
	  console.log("hash changed!", hash)
	})

	window.addEventListener("hashchange", router)
	router() 
	return router
}

module.exports = function routeViews(routes) {

	return {

		create: function(app) {
			this.current = null

			if (!router) {
				createRouter()
			}

		}
	}
}



// module.exports = {
// 	