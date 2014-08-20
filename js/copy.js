function slyLink() {
    var istS = 'See more at:';
    var body_element = document.getElementsByTagName('body')[0];
    var choose;
    choose = window.getSelection();
    var myLink = document.location.href;
    var authorLink = "<br /><br />" + istS + ' ' + "<a href='"+myLink+"'>"+myLink+"</a><br />";
    var copytext = choose + authorLink;
    var addDiv = document.createElement('div');
    addDiv.style.position='absolute';
    addDiv.style.left='-99999px';
    body_element.appendChild(addDiv);
    addDiv.innerHTML = copytext;
    choose.selectAllChildren(addDiv);
    window.setTimeout(function() {
        body_element.removeChild(addDiv);
    },0);
}
document.oncopy = slyLink;