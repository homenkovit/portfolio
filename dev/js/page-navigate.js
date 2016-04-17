$(document).ready(function(){

var fullblock = $('#fullpage');

fullblock.fullpage({
//Navigation
menu: '#menu',
anchors: ['home', 'works', 'contacts'],
navigation: true,
navigationTooltips: ['home', 'works', 'contacts'],

//Scrolling
scrollingSpeed: 500
});

});