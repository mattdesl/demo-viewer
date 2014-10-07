# demo-viewer

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

[runnable mock](https://mattdesl.github.io/demo-viewer/app/demo.html)

Experimentations with promises and functional animations for a portfolio reel.

Also see [transitions](https://github.com/mattdesl/transitions).

### comp

[![mock](http://i.imgur.com/7p0WjEo.png)](mattdesl.github.io/demo-viewer/app/demo.html)

### examples

the logic for the carousel:

```js
function carousel() {
	//wrap the views as Transitions
	var prevState = Transition(last||{}, data)
	var nextState = Transition(next||{}, data)

	//handle sequencing, return the promise
	return prevState.hide()
		.then(prevState.dispose)
		.then(nextState.create)
		.then(nextState.show)
}
```

app startup:

```js
//wrap all the top-level views as a Transition
var states = Transitions.all(views, app)

states.create()         //initialize views
	.then(startLoop)    //start render loop
	.then(states.show)  //animate in all views
	.then(doSomething)  //optional further processing
```

Some of the top level views have "sub views" as content. This allows for easy layering and interaction of content across differnt sections (e.g. constant footer or arrow buttons).