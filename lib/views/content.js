var Promise = require('bluebird')
var animate = require('../animate')
var Transition = require('../transitions')
var domify = require('domify')
var detach = require('../dom-remove')
var classes = require('dom-classes')

//This acts as a carousel / "view manager" of sorts, and could be made modular
module.exports = function(views) {
	return {
		create: function(app) {
			this.element = domify('<div class="main-content">')
			app.element.appendChild(this.element)

			app.on('arrow-left', this.previous.bind(this, app))
			app.on('arrow-right', this.next.bind(this, app))

			this.current = null
			this.currentIndex = 0
			this.views = views
		},

		dispose: function() {
			detach(this.element)
		},

		show: function(app) {
			return Promise.delay(850).then(this.set.bind(this, 0, app))
		},

		set: function(index, app) {
			var last = this.current	
			this.currentIndex = index|0
			this.current = this.views[index]

			if (last === this.current)
				return

			var p
			if (last) {
				p = Transition(last, this)
					.hide()
					.then( last.dispose.bind(last) )
			} else
				p = Promise.resolve()
			
			if (this.current) {
				var t = Transition(this.current, this)
				p = p.then(function() {
					t.create().then( t.show.bind(t) )
				})
			}

			app.emit('set-content', this.current, this.currentIndex, this.views)	
			return p
		},

		next: function(app) {
			if (this.currentIndex < this.views.length-1)
				this.currentIndex++
			this.set(this.currentIndex, app)
		},

		previous: function(app) {
			if (this.currentIndex > 0) 
				this.currentIndex--				
			this.set(this.currentIndex, app)
		}
	}
}