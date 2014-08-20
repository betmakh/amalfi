$(document).bind('keydown', 'Ctrl+return', function (e){
    e.preventDefault();
    if(getSelectionText().length > 1) {
        selection = getSelectionText();
        showPopup(document.URL, selection);
    }
});
var submitMethod = 'POST',
    submitUrl = 'errorSend.php',
    selection;

$(function(){
    $('.popup form').submit(function (event){
        event.preventDefault();
        var $this = $(this);
        var formData = {
            'url': $this.find('input[name=lnk]').val(),
            'selection': selection,
            'selectionModified': $this.find('textarea[name=text]').val(),
            'isChanged': selection == $this.find('textarea[name=text]').val() ? false : true
        }
        // $.ajax
        console.log(formData);
    })
})
function showPopup(url, text) {
    $('.popup').show();
    $('input[name="lnk"]').val(url);
    $('#errorText').val(text);
}
$('#close-popup').on('click', function (e) {
    e.preventDefault();
    $('.popup').hide();
})
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return $.trim(text);
}