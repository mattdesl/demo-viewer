var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var Transition = require('transitions')

//a simple carousel where views animate out & dispose
//before creating & animating in the next view
module.exports = Carousel
function Carousel(views) {
	if (!(this instanceof Carousel))
		return new Carousel(views)
	EventEmitter.call(this)
	this.current = null
	this.currentIndex = 0
	this.views = views
}	

inherits(Carousel, EventEmitter)

function set(next) {
	this.current = next
}

Carousel.prototype.set = function(index, data) {
	var last = this.current	
	this.currentIndex = index|0
	var next = this.views[index]

	if (last === next)
		return

	this.emit('change', next, this.currentIndex, this.views)

	//animation states for previous and next item
	var prevState = Transition(last||{}, data)
	var nextState = Transition(next||{}, data)

	//handle sequencing
	return prevState.hide()
		.then(prevState.dispose)
		.then(set.bind(this, next)) //change value of current
		.then(nextState.create)
		.then(nextState.show)
		// may also want an event on changed
		// .then(this.emit.bind(this, 'changed', this.current, this.currentIndex, this.views))
}

Carousel.prototype.next = function(data) {
	if (this.currentIndex < this.views.length-1)
		this.currentIndex++
	this.set(this.currentIndex, data)
}

Carousel.prototype.previous = function(data) {
	if (this.currentIndex > 0) 
		this.currentIndex--				
	this.set(this.currentIndex, data)
}