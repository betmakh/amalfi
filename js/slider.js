function getCookie(name) {

    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

    return matches ? decodeURIComponent(matches[1]) : undefined;

}

if (getCookie("Hide") != 1) {
    $(function() {
        $(window).scroll(function(){
            var distanceTop = $('#last').offset().top - $(window).height();
            if  ($(window).scrollTop() > distanceTop)
                $('#slidebox').animate({'right':'0px'},300);
            else
                $('#slidebox').stop(true).animate({'right':'-430px'},100);
        });
        $('#slidebox .close-block').bind('click',function(){
            $(this).parent().remove();
        });
        $('#slidebox .hide-button').bind('click', function(e){
            e.preventDefault();
            $(this).parent().remove();
            document.cookie="Hide=1";
        });
    });
}