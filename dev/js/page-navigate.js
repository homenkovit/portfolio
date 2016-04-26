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
} else {
  $('.nav__link').on('click', function(e) {
    e.preventDefault();

    showSection($(this).attr('href'), true);
  });

  showSection(window.location.hash, false);
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

$(window).scroll(function() {
  checkSection();
});

function showSection(section, isAnimate) {
  var direction = section.replace(/#/, ''),
      reqSection = $('.section').filter('[data-section="' + direction + '"]'),
      reqSectionPos = reqSection.offset().top;

  if (isAnimate) {
    $('body, html').animate({scrollTop: reqSectionPos}, 300);
  } else {
    $('body, html').scrollTop(reqSectionPos);
  }
}

function checkSection() {
  $('.section').each(function() {
    var $this = $(this),
        topEdge = $this.offset().top - 200,
        bottomEdge = topEdge + $this.height(),
        wScroll = $(window).scrollTop();
    if (topEdge < wScroll && bottomEdge > wScroll) {
      var currentId = $this.data('section'),
          reqLink = $('.nav__link').filter('[href="#' + currentId + '"]');
      
      reqLink.closest('.nav__item').addClass('active')
        .siblings().removeClass('active');

      window.location.hash = currentId;
    }
  });
};

}); // "document.ready wrapper function"