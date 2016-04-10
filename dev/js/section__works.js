jQuery(document).ready(function($) {
  
  $('.works__list').click(function() {
    $(this).addClass('works__list_selected');
    $('.works-close-button').addClass('works-close-button_selected');
    $(this).find('.works__link').addClass('works__link_selected');
    $(this).find('.works__title').hide();
  });
  
  $('.works-close-button').click(function(e) {
    e.preventDefault();
    $(this).removeClass('works-close-button_selected');
    $('.works__previews').find('.works__list_selected').removeClass('works__list_selected');
    $('.works__previews').find('.works__link_selected').removeClass('works__link_selected');
    $('.works__previews').find('.works__title').show();
  });

});