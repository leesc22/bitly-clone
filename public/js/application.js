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

// Hide and show table using toggle with blind effect
function toggleHistoryTable() {
	$('#toggleHistoryButton').click(function() {
		$('table').toggle('blind');
	});
}

// Implement an Asynchronous Bitly Submission
function ajaxSubmit() {
  $('#url-form').submit(function(event) {
  	event.preventDefault();
  	$ajax({
  		url: '/urls',
  		method: 'POST',
  		data: $(this).serialize(),
  		dataType: 'json',
  		success: function(data) {
  			// code to display shortened url
  		}
  	});
  });
}

$(document).ready(function() {
	// delegation - copy to clipboard
	$('.copy-container').delegate('.copyButton', 'click', function() {
		var copyButtonSplit = this.id.split('-');
		$copyTarget = $(".copyTarget")[parseInt(copyButtonSplit[1])];
		copyToClipboard($copyTarget);
	})

	// copy to clipboard - one element
	$recentCopyButton = $(".recentCopyButton")[0];
	$recentCopyTarget = $(".recentCopyTarget")[0];
	$($recentCopyButton).on("click", function() {
		copyToClipboard($recentCopyTarget);
	});

  toggleHistoryTable();

  // Implement an Asynchronous Bitly Submission
  ajaxSubmit();
});


