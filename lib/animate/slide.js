var animate = require('gsap-promise')
var Promise = require('bluebird')
var number = require('as-number')
var xtend = require('xtend')

module.exports = function(elements, opt) {
	opt = opt||{}
	opt.stagger = number(opt.stagger, 0.15)
	opt.duration = number(opt.duration, 1)
	opt.delay = opt.delay||0

	var offset = opt.offset||0
	var dir = opt.direction||[0,1]

	var end = { x: offset*dir[0], y: offset*dir[1] }
	
	elements = Array.isArray(elements) ? elements : [elements]
	if (typeof opt.from === 'number') {
		elements.forEach(function(e) {
			var start = { x: opt.from*dir[0], y: opt.from*dir[1] }
			animate.set(e, start)
		})
	}

	return Promise.all(elements.map(function(e) {
		var to = xtend(end, {
			delay: opt.delay,
			ease: opt.ease
		})

		//stagger animation
		opt.delay += opt.stagger

		//animate element
		return animate(e, opt.duration, to)
	}))
}
