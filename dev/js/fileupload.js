;
"use strict";

jQuery(document).ready(function($){

var url = 'php/main.php';

$('#fileupload').fileupload({
        url: url,
        dataType: 'json'
    });

 // // Load existing files:
 //    $.ajax({
 //    // Uncomment the following to send cross-domain cookies:
 //    //xhrFields: {withCredentials: true},
 //    url: $('#fileupload').fileupload('option', 'url'),
 //        dataType: 'json',
 //        context: $('#fileupload')[0]
 //    }).done(function (result) {
 //        $(this).fileupload('option', 'done')
 //            .call(this, null, {result: result});
 //    });

var ListUploadedFiles = (function() {

	var _setUplisteners = function() {

			$('#project-attachment').change(_displayList);
		},
	
		_displayList = function() {

			$('.filelist-container').empty();

			var inputFiles = $('#project-attachment').prop("files"),

				chosenFilesArray = $.map( inputFiles, function(val) { return val.name } ),

				_displayFileName = function(filename){

					$('.filelist-container').append('<p>'+filename+'</p>');
				};

		chosenFilesArray.forEach(_displayFileName);
		};

	return {
		init: _setUplisteners
	}
})();

$('.contacts-form__button_clear').click($('.filelist-container').empty());

if ($.find('#project-attachment').length > 0) {
        ListUploadedFiles.init();
    }

}); //jQuery wrapper document ready function