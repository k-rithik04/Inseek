//apply form step validation

$(document).ready(function() {

  function showStep(step) {
    $('.form-step').hide();
	$('#step-' + step).show();
   $('.step-indicator').css('background-color', '#dee2e6');
	  for (var i = 1; i <= step; i++) {
	    $('#step-indicator-' + i).css('background-color', 'var(--brand)');
	  }
  }

	function clearErrors(container) {
	   $(container).find('.text-danger').text('');
		$(container).find('.form-control').css('border-color', 'rgba(0,0,0,0.1)');
	}

  function showError(input, msg) {
	  $(input).closest('.field').find('.text-danger').text(msg);
	    $(input).css('border-color', '#dc3545');
  }

	function validateStep1() {
		 clearErrors('#step-1');
		  var valid = true;

		if (!$.trim($('#name').val())) {
			showError('#name', 'Full name is required.');
			valid = false;
		}

		if (!$.trim($('#address').val())) {
			showError('#address', 'Address is required.');
			  valid = false;
		}
		if (!$.trim($('#nic').val())) {
			showError('#nic', 'NIC / Passport number is required.');
			valid = false;
		}
		if (!$.trim($('#email').val()) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').val())) {
			showError('#email', 'Please enter a valid email address.');
			valid = false;
		}

		if (!$.trim($('#phone').val()) || !/^0\d{9}$/.test($('#phone').val())) {
			showError('#phone', 'Please enter a valid phone number (e.g. 0771234567).');
			valid = false;
		}

		return valid;
	}

	function validateStep2() {
		clearErrors('#step-2');
		var valid = true;

		if (!$('#resume').val()) {
			showError('#resume', 'Please upload your resume.');
			valid = false;
		} else {
			var ext = $('#resume').val().split('.').pop().toLowerCase();
			if (ext !== 'pdf') {
				showError('#resume', 'Only PDF files are accepted.');
				valid = false;
			}
		}

		if (!$.trim($('#skills').val())) {
			showError('#skills', 'Please enter at least one skill.');
			valid = false;
		}

		if (!$.trim($('#experience').val()) && $('#experience').val() !== '0') {
			showError('#experience', 'Please enter your years of experience.');
			valid = false;
		}
		if (!$.trim($('#prev-job').val())) {
			showError('#prev-job', 'Please enter your previous job title & company.');
			valid = false;
		}

		return valid;
	}

	function validateStep3() {
		clearErrors('#step-3');
		var valid = true;

		if (!$('#start-date').val()) {
			showError('#start-date', 'Please select a start date.');
			valid = false;
		}
		if (!$('#terms').is(':checked')) {
			$('#terms-error').text('You must agree to the terms and conditions.');
			valid = false;
		}

		return valid;
	}

	$('#btn-next-1').on('click', function() {
		if (validateStep1()) showStep(2);
	});

	$('#btn-back-2').on('click', function() { showStep(1); });

	$('#btn-next-2').on('click', function() {
		if (validateStep2()) showStep(3);
	});

	$('#btn-back-3').on('click', function() { showStep(2); });

	$('#multiStepForm').on('submit', function(e) {
		e.preventDefault();
		if (!validateStep3()) return;

		var clockDiv = document.getElementById("live_clock");
		clockDiv.style.display = "block";

		var now = new Date();
		var hours = String(now.getHours()).padStart(2, "0");
		var mins = String(now.getMinutes()).padStart(2, "0");
		var date = String(now.getDate()).padStart(2, "0");
		var month = String(now.getMonth() + 1).padStart(2, "0");
		var year = now.getFullYear();

		clockDiv.innerHTML = "Application submitted at " + date + "/" + month + "/" + year + " " + hours + ":" + mins;

		$('.form-step').hide();
		$('.step-indicator').css('background-color', 'var(--brand)');

		var summary = '<div class="text-center py-4">' +
			'<h3 class="fw-bold mb-3" style="color: var(--text-main);">Application Submitted!</h3>' +
			'<p class="text-muted mb-3">Thank you, <b>' + $('#name').val() + '</b>. We have received your application.</p>' +
			'</div>';

		$('#multiStepForm').html(summary);
		$('#multiStepForm').append(clockDiv);
	});

	$('#terms').on('change', function() {
		if ($(this).is(':checked')) $('#terms-error').text('');
	});

});
