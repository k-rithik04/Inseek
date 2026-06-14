// Dinuga - auth toggle + form handlers
// still need to add proper validation but the form works lol
document.addEventListener('DOMContentLoaded', function() {

	var login_div = document.getElementById('login_box');
	var register_div = document.getElementById('register_box');
	
  var button_show_register = document.getElementById('button_show_register');
  var button_show_login = document.getElementById('button_show_login');

	  var login_form = document.getElementById('login_form');
	var register_form = document.getElementById('register_form');

	var nav_auth_button = document.getElementById('nav_auth_button');

  function showRegister() {
		if (login_div && register_div) {
		 login_div.style.display = 'none';
			 register_div.style.display = 'block';
			if (nav_auth_button) nav_auth_button.textContent = 'Log In';
		}
	}

	function showLogin() {
		if (login_div && register_div) {
			register_div.style.display = 'none';
			login_div.style.display = 'block';
			if (nav_auth_button) nav_auth_button.textContent = 'Sign Up';
		}
	}

	if (button_show_register && button_show_login) {
		button_show_register.addEventListener('click', function(e) {
			e.preventDefault();
			showRegister();
		});

		button_show_login.addEventListener('click', function(e) {
			e.preventDefault();
			showLogin();
		});
	}

	if (nav_auth_button) {
		nav_auth_button.addEventListener('click', function(e) {
			e.preventDefault();
			if (nav_auth_button.textContent.trim() === 'Sign Up') {
				showRegister();
			} else {
				showLogin();
			}
		});
	}

	if (login_form) {
		login_form.addEventListener('submit', function(e) {
		  e.preventDefault();
			let my_email = document.getElementById('login_email').value;
			let my_pass = document.getElementById('login_password').value;

			if (!my_email || !my_pass) {
				alert('Please enter both email and password.');
				return;
			}

			window.location.href = 'dashboard.html';
		});
	}

  if (register_form) {
	 register_form.addEventListener('submit', function(e) {
		e.preventDefault();
		let my_name = document.getElementById('register_name').value;
		let my_email = document.getElementById('register_email').value;
		let my_pass = document.getElementById('register_password').value;

		if (!my_name || !my_email || !my_pass) {
			alert('Please fill out all registration fields.');
			return;
		}

		localStorage.setItem('user_name', my_name);

		alert('Account created successfully! Please sign in.');
	 });
  }
});







