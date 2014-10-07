//Wraps TweenMax functions as a promise
//
var TweenMax = require('gsap')
var Promise = require('bluebird')

function animateFunc(func, element, duration, opts) {
	opts = opts||{}
	return new Promise(function(resolve, reject) {
		opts.onComplete = resolve
		func(element, duration, opts)
	})
}

var animateTo = animateFunc.bind(null, TweenMax.to)

module.exports = animateTo
module.exports.to = animateTo
module.exports.from = animateFunc.bind(null, TweenMax.from)
module.exports.set = TweenMax.set

module.exports.fromTo = function animateFromTo(element, duration, from, to) {
	to = to||{}
	return new Promise(function(resolve, reject) {
		to.onComplete = resolve
		TweenMax.fromTo(element, duration, from, to)
	})
}