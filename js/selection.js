$(document).bind('keydown', 'Ctrl+return', function (e){
    e.preventDefault();
    if(getSelectionText().length > 1) {
        showPopup(document.URL, getSelectionText());
    }
});
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