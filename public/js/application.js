// Javascript
// function copyToClipboard(copyTarget) {
// 	// document.queryCommandSupported('copy') == true
// 	var temp = document.createElement("input");
// 	temp.setAttribute("value", copyTarget);
// 	document.body.appendChild(temp);
// 	temp.select();
// 	document.execCommand("copy");
// 	document.body.removeChild(temp);
// 	// console.log("copied");
// }

// function addCopyListener() {
// 	copyButton = document.getElementsByClassName("copyButton")[0];
// 	copyTarget = document.getElementsByClassName("copyTarget")[0].href;
// 	copyButton.addEventListener("click", function() {copyToClipboard(copyTarget)});
// }

// document.addEventListener('DOMContentLoaded', addCopyListener);

// jQuery
function copyToClipboard(copyTarget) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val(copyTarget.href).select();
	document.execCommand("copy");
	$temp.remove();
	// console.log("copied")
}

$(document).ready(function() {
	// $copyButton = $(".copyButton")[0];
	// $copyTarget = $(".copyTarget")[0];
	// $($copyButton).on("click", function() {
	// 	copyToClipboard($copyTarget)});
	// delegation
	$('.copy-container').delegate('.copyButton', 'click', function() {
		var copyButtonSplit = this.id.split('-');
		$copyTarget = $(".copyTarget")[parseInt(copyButtonSplit[1])];
		copyToClipboard($copyTarget);
	})
})
