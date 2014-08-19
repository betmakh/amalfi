$(document).ready(function(){

$('.drop').click(function(){

	$(this).children('.dropdownMenu').slideToggle();

    if ($(this).children('a').hasClass('close')) {
        $(this).children('a').removeClass('close');
    } else {
        $(this).children('a').addClass('close');
    }
})
})

