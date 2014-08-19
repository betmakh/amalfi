
///* топ меню наше

$(document).ready(function(){
     $('.sideSlider.popover').css('min-height',$('.sideSlider.popover').closest('.dropdown-panel').height());
$('.dropdown-container').on('click',function(){
        console.log('zauzano');
        var panel = $(this).children('.dropdown-panel');
        var isShow = true;
        if(isShow = (!panel.hasClass('showing'))){
            hidePanels();
        }
        panel.toggleClass('showing',isShow);
        panel.toggle(isShow);
	});
});
function hidePanels(){
    $(".dropdown-panel").hide();
    $('.dropdown-panel').removeClass('showing');
    $('.sideSlider.popover').css('display', 'none');
}
$(document).click(function(event) {
    if ($(event.target).parents(".main-navigation").length || $(event.target).parents("#lang").length) return;
    hidePanels();
    event.stopPropagation();
  });
$(function(){

var $menu = $(".dropdownSmart");

$menu.menuAim({
	activate: activateSubmenu,
	deactivate: deactivateSubmenu
});

function activateSubmenu(row) {
	var $row = $(row),
		submenuId = $row.data("submenuId"),
		$submenu = $("#" + submenuId),
		height = $menu.outerHeight(),
		width = $menu.outerWidth();

	// Show the submenu
	$submenu.css({
		display: "block",
		top: -1,
		left: width - 3,  // main should overlay submenu
	});

	// Keep the currently activated row's highlighted look
	$row.find("a").addClass("maintainHover");
}

function deactivateSubmenu(row) {

	var $row = $(row),
		submenuId = $row.data("submenuId"),
		$submenu = $("#" + submenuId);

	// Hide the submenu and remove the row's highlighted look
	$submenu.css("display", "none");
	$row.find("a").removeClass("maintainHover");
}

$(".dropdown-menu li").click(function(e) {
	e.stopPropagation();
});

});