;
"use strict";

jQuery(document).ready(function($){

// sending form
// var url = 'php/main.php';

$('#fileupload').fileupload({
        // url: url,
        // dataType: 'json'
    });

// display chosen files list
var ListUploadedFiles = (function() {

	var _setUplisteners = function() {

			$('#project-attachment').change(_displayList);
		},
	
		_displayList = function() {

			$('.filelist-container').empty();

			var inputFiles = $('#project-attachment').prop("files"),

				chosenFilesArray = $.map( inputFiles, function(val) { return val.name; } ),

				_displayFileName = function(filename){

					$('.filelist-container').append('<p>'+filename+'</p>');
				};

		chosenFilesArray.forEach(_displayFileName);
		};

	return {
		init: _setUplisteners
	};
})();

var Validation = (function() {

    var _setUpListeners = function() {
            $('form').on('keydown', '.controlred', _removeError);
            $('form').on('reset', _clearForm);
        },

        _validateForm = function(form) {

            var email = $('#customer-email'),
                valid = true;
                    
                if (email.val() === '') {
                    email.addClass('controlred');
                    $('.email-message_empty').fadeIn();
                    valid = false;
                } else {
                	var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
					if(pattern.test(email.val())){
						$('.email-message_empty').fadeOut();
					    email.removeClass('controlred');
					    valid = true;
					} else {
			           $('.email-message_invalid').fadeIn();
					   email.addClass('controlred');
					   valid = false;
			        }
                }

            return valid;
        },

        _removeError = function() {
            $(this).removeClass('controlred');
            $('.email-message_empty').fadeOut();
            $('.email-message_invalid').fadeOut();
        },

        _clearForm = function(form) {
            $('#customer-email').removeClass('controlred');
            $('.filelist-container').empty();
            $('.email-message_invalid').fadeOut();
            $('.email-message_empty').fadeOut();
            $('#errorblock').fadeOut();
            $('#successblock').fadeOut();
            $('#loading').fadeOut();
            $('#contact-form')[0].reset();
        };

    return {
        init: _setUpListeners,
        validateForm: _validateForm,
        clearForm: _clearForm
    };

})();
// end form validation script
if ($.find('form').length > 0) {
        Validation.init();
    }


// validate order form
var orderform_validation = (function() {

    var _setUpListeners = function() {
        	
        	$('#submitbutton').on('click', _orderform_validate);
		
		},

		_orderform_validate = function(event) {

			event.preventDefault();

            $('#errorblock').fadeOut();
            $('#successblock').fadeOut();
			
			var valid = Validation.validateForm($('#contact-form')),
				orderform = $('#contact-form'),
				handler_url = 'php/main.php';

			if (valid === true) {

				var formData = new FormData($('#contact-form')[0]);  

				var xhr = new XMLHttpRequest();
				xhr.open("POST", handler_url);


				var loadingBlock = $('#loading');

				 xhr.upload.addEventListener('progress', function(evt){ // добавляем обработчик события progress (onprogress)
                    if(evt.lengthComputable) { // если известно количество байт
                        // высчитываем процент загруженного
                        var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
                        // устанавливаем значение в атрибут value тега <progress>
                        // и это же значение альтернативным текстом для браузеров, не поддерживающих <progress>
                        loadingBlock.val(percentComplete).text(percentComplete + '%' + ' uploaded');
                    }
                }, false);

				xhr.onreadystatechange = function() {

					if (xhr.readyState == 4) {
						if(xhr.status == 200) {
							var data = xhr.responseText;
							// uncomment to get request report data

							var _reportSuccess = function() {

								$('#successblock').fadeIn();
							},
							_reportError = function() {

								$('#loading').fadeOut();
								$('#errorblock').fadeIn();
							};


							if(data == "true") {

								$('#loading').fadeOut();
								setTimeout(200, _reportError());
								// console.log(data);
							} else {
								
								Validation.clearForm($('#contact-form')[0]);
								setTimeout(200, _reportSuccess());
								// console.log(data);	
							}
                               
						}
					}
				};
				
				xhr.send(formData);
                loadingBlock.fadeIn();

			}
		};
     
    return {
        init: _setUpListeners
    };

})();
// end validate order form


if ($.find('#contact-form').length > 0) {
    orderform_validation.init();
}

ListUploadedFiles.init();

}); //jQuery wrapper document ready function