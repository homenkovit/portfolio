;
"use strict";
$(document).ready(function(){

var windowWidth  = document.body.clientWidth,
	windowHeight = document.body.clientHeight;


var StartFullpage = function() {

	$('#fullpage').fullpage({
	//Navigation
	menu: '#menu',
	anchors: ['home', 'works', 'contacts'],
	navigation: true,
	navigationTooltips: ['home', 'works', 'contacts'],

	//Scrolling
	scrollingSpeed: 500
	});
};

if ( windowWidth>1000 && windowHeight>620) {
	
	StartFullpage();
}



var SwitchFullpagePlugin = (function(){

	var _setUpListeners = function() {

		window.onresize = _runFullpage;
	},

	_reloadPage = function() {

		location.reload(true);
	},

	_runFullpage = function(){

		setTimeout( _reloadPage, 500 );

		if ( windowWidth>1000 && windowHeight>620) {
		
			StartFullpage();
		}
	
	};

	return {
		init: _setUpListeners
	}
})();

SwitchFullpagePlugin.init();

// $(window).scroll(function getPageScroll() {

//         var xScroll;

//         if (self.pageXOffset) { 
//                 xScroll = self.pageXOffset;
//         } else if (document.documentElement && document.documentElement.scrollLeft) {
//                 xScroll = document.documentElement.scrollLeft;
//         } else if (document.body) {
//                 xScroll = document.body.scrollLeft;
//         }

//         var topmenu = $('.nav__list');
//         topmenu.css('right', xScroll + "px");
//         return xScroll    
// });

});