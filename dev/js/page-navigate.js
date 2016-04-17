$(document).ready(function(){

$('#fullpage').fullpage({
//Navigation
menu: '#menu',
anchors: ['home', 'works', 'contacts'],
navigation: true,
navigationTooltips: ['home', 'works', 'contacts'],

//Scrolling
scrollingSpeed: 500
});

});