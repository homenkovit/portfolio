;
"use strict";

jQuery(document).ready(function($){

// sending form
var url = 'php/main.php';

$('#fileupload').fileupload({
        url: url,
        dataType: 'json'
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


// clear form with clear button
// var clearForm = (function() {

// 	var _setUplisteners = function(){

// 		$('.contacts-form__button_clear').click(_clearForm);
// 	},
// 	_clearForm = function(){

// 		$('#fileupload').trigger('reset');
// 		$('.filelist-container').empty();
// 	}
// 	return {
// 		init: _setUplisteners
// 	}
// })();

// if ($.find('#project-attachment').length > 0) {
//         ListUploadedFiles.init();
//     }
// clearForm.init();

// form validation script
var Validation = (function() {

    var _setUpListeners = function() {
            $('form').on('keydown', '.controlred', _removeError);
            $('form').on('reset', _clearForm);
        },

        _validateForm = function(form) {

            var email = $('#customer-email'),
                valid = true;
                    
                if (email.length < 1) {
                    email.addClass('controlred');
                    $('.email-message_empty').addClass('display_block');
                    valid = false;
                } else {
                	var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
					if(pattern.test($(email).val())){
						$('.email-message_empty').removeClass('display_block');
					    $(email).removeClass('controlred');
					    valid = true;
					} else {
			           $('.email-message_invalid').addClass('display_block');
					   $(email).addClass('controlred');
					   valid = false;
			        }
                }

            return valid;
        },

        _removeError = function() {
            $(this).removeClass('controlred');
            $('.email-message_empty').removeClass('display_block');
            $('.email-message_invalid').removeClass('display_block');
        },

        _clearForm = function(form) {
            $('#customer-email').removeClass('controlred');
            form.trigger('reset');
            $('.filelist-container').empty();
        };

    return {
        init: _setUpListeners,
        validateForm: _validateForm
    };

})();
// end form validation script

// validate order form
var orderform_validation = (function() {

    var _setUpListeners = function() {
        	
        	$('#submitbutton').on('click', _orderform_validate);
		
		},

		_orderform_validate = function(event) {

			event.preventDefault();

            $('#errorblock').addClass('display_none');
            $('#successblock').css('display', 'none');
			
			var valid = Validation.validateForm($('#contact-form')),
				orderform = $('#contact-form'),
				handler_url = 'php/main.php';

			if (valid === true) {

				var formData = new FormData($('#contact-form'));  

				var xhr = new XMLHttpRequest();
				xhr.open("POST", handler_url);

                // file upload progressbar
                // var progressBar = $('#progressbar');
                
                // xhr.upload.addEventListener('progress', function(evt){ // добавляем обработчик события progress (onprogress)
                //     if(evt.lengthComputable) { // если известно количество байт
                //         // высчитываем процент загруженного
                //         var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
                //         // устанавливаем значение в атрибут value тега <progress>
                //         // и это же значение альтернативным текстом для браузеров, не поддерживающих <progress>
                //         progressBar.val(percentComplete).text('Загружено ' + percentComplete + '%');
                //     }
                // }, false);
                // end file upload progressbar

				xhr.onreadystatechange = function() {

					if (xhr.readyState == 4) {
						if(xhr.status == 200) {
							var data = xhr.responseText;
							// uncomment to get request report data
							if(data == "true") {
								$('#errorblock').addClass('display_none');
								console.log(data);

							} else {
								$('#successblock').addClass('display_none');
                                console.log(data);
							}
						}
					}
				};
				
				xhr.send(formData);
                $('#contact-form').Validation._clearForm();

			}
		};
     
    return {
        init: _setUpListeners
    };

})();
// end validate order form

if ($.find('form').length > 0) {
        Validation.init();
    }
if ($.find('#contact-form').length > 0) {
    orderform_validation.init();
}

}); //jQuery wrapper document ready function