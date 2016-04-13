$(document).ready(function(){
  
  // $('a[href^="#"], a[href^="."]').click( function(){ // если в href начинается с # или ., то ловим клик
  //   var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href
  //     if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
  //   $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 300); // анимируем скроолинг к элементу scroll_el
  //     }
  //   return false; // выключаем стандартное действие
  // });

  // $('.wrapper').onepage_scroll({
  // 	animationTime: 500,
  // 	loop: false
  // });

  $('.nav__link').on('click', function(e) {
    e.preventDefault();

    showSection($(this).attr('href'), true);
  });

  showSection(window.location.hash, false);

});

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
      
      reqLink.closest('.nav__item').addClass('active-link')
        .siblings().removeClass('active-link');

      window.location.hash = currentId;
    }
  });
};