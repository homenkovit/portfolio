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

var list_uploaded_files = function() {

		var inputField = $('#project-attachment');

		var _setUplisteners = $(inputField).change(displayList),

			displayList = function() {

				var inputFiles = inputField.prop("files");

				var chosenFilesNames = $.map( files, function(val) { return val.name; } );

				console.log(chosenFilesNames);
			};
}();



}); //jQuery wrapper document ready function