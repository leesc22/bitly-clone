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
  	$.ajax({
  		// cache: false,
  		url: '/urls',
  		method: 'POST',
  		data: $(this).serialize(),
  		// dataType: 'json',
  		success: function(data) {
  			alert("success");
  			var json = JSON.parse(data);
  			console.log('success', json);
  			if ($('table > tbody > tr').length == 0) {
					$('#history-table-container').css('display', 'block');
					$('#mostRecentLink').css('display', 'block');
				}

  			// code to display shortened url
  			$('#recentLongUrl').html(json.long_url);
  			$('#recentCopyTarget').prop('href', json.short_url);
  			$('#recentCopyTarget').html(json.short_url);

  			// append new row to table
  			$('table tbody').append("<tr><td>" + json.id + ".</td><td>" + json.long_url + "</td><td><div class='copy-container'><div class='copyLeft'><a class='copyTarget' href='" + json.short_url + "' target='_blank'>" + json.short_url + "</a></div><div class='copyRight'><button id='copyButton-" + json.id + "' class='btn btn-primary copyButton masterTooltip' title='Copy to clipboard'><i class='fa fa-copy'></i></button></div></div></td><td>" + json.click_count + "</td></tr>");
  			$('#copyButton-' + json.id).on("click", function() {
					copyToClipboard($('.copyTarget')[parseInt(json.id) - 1]);
				});
  		},
  		error: function(jqXHR, textStatus, errorThrown) {
  			alert('error');
  			// var json = jqXHR.responseJSON;
  			// console.log(json);
  			console.log(textStatus, errorThrown);
			}
  	});
		// clear form
		$('#url-form')[0].reset();
  });
}

$(document).ready(function() {
	// hide thead if tbody empty
	if ($('table > tbody > tr').length == 0) {
		$('#history-table-container').css('display', 'none');
		$('#mostRecentLink').css('display', 'none');
	}

  // Implement an Asynchronous Bitly Submission
  ajaxSubmit();

	// delegation - copy to clipboard
	$('.copy-container').delegate('.copyButton', 'click', function() {
		var copyButtonSplit = this.id.split('-');
		$copyTarget = $(".copyTarget")[parseInt(copyButtonSplit[1])];
		copyToClipboard($copyTarget);
	})

	// copy to clipboard - one element
	$recentCopyButton = $("#recentCopyButton")[0];
	$recentCopyTarget = $("#recentCopyTarget")[0];
	$($recentCopyButton).on("click", function() {
		copyToClipboard($recentCopyTarget);
	});

  toggleHistoryTable();
});


