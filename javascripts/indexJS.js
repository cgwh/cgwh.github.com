/**
 * Created by cg on 16-5-19.
 */
window.onload = function () {
    setSize();
};
function setSize() {
    var maxWidth = window.innerWidth,maxHeight = window.innerHeight;
    document.getElementById('d_content').style.height = maxHeight + 130 + 'px';
    document.getElementById('d_content').style.marginTop = (5*maxHeight)/36 + 'px';
    document.getElementById('d_content_middle').style.height = (0.48*maxHeight) + 'px';
    document.getElementById('div_p_introduce').style.marginLeft = ((0.8*maxWidth) - 500)/2 + 'px';
    document.getElementById('bt_into').style.marginLeft = (0.8*maxWidth - 0.15*maxWidth)/2 + 'px';

}