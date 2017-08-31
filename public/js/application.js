// Copy to clipboard
function copyToClipboard(copyTarget) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val(copyTarget.href).select();
	document.execCommand("copy");
	$temp.remove();
}

// tooltip
// Adapted from http://www.alessioatzeni.com/blog/simple-tooltip-with-jquery-only-text/
function tooltip() {
	$('.masterTooltip').hover(function() {
		// Hover over
		var title = $(this).attr('title');
		$(this).data('tipText', title).removeAttr('title');
		$('<p class="tooltip"></p>')
		.text(title)
		.appendTo('body')
		.fadeIn('slow');
	}, function() {
		// Hover out
		$(this).attr('title', $(this).data('tipText'));
		$('.tooltip').remove();
	}).mousemove(function(e) {
		var mousex = e.pageX + 20; // Get X coordinates
		var mousey = e.pageY + 10; // Get Y coordinates
		$('.tooltip').css({ top: mousey, left: mousex })
	});
}


$(document).ready(function() {
	// delegation - copy to clipboard
	$('.copy-container').delegate('.copyButton', 'click', function() {
		var copyButtonSplit = this.id.split('-');
		$copyTarget = $(".copyTarget")[parseInt(copyButtonSplit[1])];
		copyToClipboard($copyTarget);
	})

  // tooltip
  tooltip
});


