var content = require('./content')

//no longer thinking in terms of "sections" but in terms of "views"
//a "view" might be a single effect, a UI element, or an entire page 
//composed of sub-views

//since we're adding views as they are created to the DOM,
//the order here determines the z-index

module.exports = [
	require('./views/background'),        //GL animations
	require('./views/content')(content),  //a "page" with sub-views
	require('./views/arrows'),            //some other overlay elements
	require('./views/footer')             //an overlay UI element
]