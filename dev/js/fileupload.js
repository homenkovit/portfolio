jQuery(document).ready(function($){

//  $('#fileupload').fileupload({
//         dataType: 'json',
//         done: function (e, data) {
//             $.each(data.result.files, function (index, file) {
//                 $('<p/>').text(file.name).appendTo(document.body);
//             });
//         }
//     });

// var formData = $('#contact-form').serializeArray();


// $('#contact-form').bind('.fileinput-button', function (e, data) {
//     // The example input, doesn't have to be part of the upload form:
//     var input = $('#project-attachment');
//     data.formData = {example: input.val()};
//     if (!data.formData.example) {
//       data.context.find('button').prop('disabled', false);
//       input.focus();
//       return false;
//     }
// });
var url = 'php/main.php';

$('#fileupload').fileupload({
        url: url,
        dataType: 'json'
    })

}); //jQuery wrapper document ready function