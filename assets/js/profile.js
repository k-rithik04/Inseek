// Nisagi - profile page dynamic save/load





//if anyone adds a field this breaks
document.addEventListener('DOMContentLoaded', function() {

    function loadProfile() {
        var fields = {
            'profile_first_name': document.querySelector('input[value="Nisagi"]'),
            'profile_middle_name': document.querySelector('input[placeholder="Ex: Ahamed"]'),
            'profile_last_name': document.querySelector('input[value="Damsari"]'),
            'profile_dob': 'input[type="date"]',
            'profile_gender_radio': 'input[name="gender"]',
            'profile_career_status': 'select',
            'profile_email': 'input[type="email"]',
            'profile_phone': 'input[type="text"]',
            'profile_address1': 'input',
            'profile_address2': 'input',
            'profile_city': 'input',
            'profile_country': 'select'
        };

        var firstName = document.querySelector('input[value="Nisagi"]');
        var middleName = document.querySelector('input[placeholder="Ex: Ahamed"]');
        var lastName = document.querySelector('input[value="Damsari"]');
        var genderRadios = document.querySelectorAll('input[name="gender"]');
        var careerStatus = document.querySelector('select');
        var inputs = document.querySelectorAll('.profile-card input.form-control, .profile-card input[type="email"]');
        var selects = document.querySelectorAll('.profile-card select');

		if (localStorage.getItem('profile_first_name')) firstName.value = localStorage.getItem('profile_first_name');
        if (localStorage.getItem('profile_middle_name')) middleName.value = localStorage.getItem('profile_middle_name');
        if (localStorage.getItem('profile_last_name')) lastName.value = localStorage.getItem('profile_last_name');
		if (localStorage.getItem('profile_dob')) document.querySelector('input[type="date"]').value = localStorage.getItem('profile_dob');
		
        if (localStorage.getItem('profile_gender')) {
            var savedGender = localStorage.getItem('profile_gender');
            genderRadios.forEach(function(r) {
                if (r.nextElementSibling.textContent.trim() === savedGender) r.checked = true;
			});
        }

		if (localStorage.getItem('profile_career_status')) {
            var savedCs = localStorage.getItem('profile_career_status');
            for (var i = 0; i < careerStatus.options.length; i++) {
                if (careerStatus.options[i].text === savedCs) careerStatus.selectedIndex = i;
            }
		}

		if (localStorage.getItem('profile_email')) document.querySelector('input[type="email"]').value = localStorage.getItem('profile_email');
        if (localStorage.getItem('profile_phone')) phoneInput();
		if (localStorage.getItem('profile_address1')) address1Input();
        if (localStorage.getItem('profile_address2')) address2Input();
        if (localStorage.getItem('profile_city')) cityInput();
        if (localStorage.getItem('profile_country')) countrySelect();

        function phoneInput() {
            var els = document.querySelectorAll('.profile-card input.form-control');
			for (var i = 0; i < els.length; i++) {
                if (els[i].type === 'text' && !els[i].value && localStorage.getItem('profile_phone')) {
                    els[i].value = localStorage.getItem('profile_phone');
                    break;
                }
            }
        }
        
        // TODO: refactor these 3 functions into one with a parameter lmao
        function address1Input() {
            var count = 0;
			var els = document.querySelectorAll('.profile-card input.form-control');
            for (var i = 0; i < els.length; i++) {
                if (els[i].type === 'text' && !els[i].placeholder) {
                    count++;
                    if (count === 2) { els[i].value = localStorage.getItem('profile_address1'); break; }
                }
            }
        }

        function address2Input() {
            var count = 0;
			var els = document.querySelectorAll('.profile-card input.form-control');
            for (var i = 0; i < els.length; i++) {
                if (els[i].type === 'text' && !els[i].placeholder) {
                    count++;
                    if (count === 3) { els[i].value = localStorage.getItem('profile_address2'); break; }
                }
            }
        }

        function cityInput() {
            var count = 0;
			var els = document.querySelectorAll('.profile-card input.form-control');
            for (var i = 0; i < els.length; i++) {
                if (els[i].type === 'text' && !els[i].placeholder) {
                    count++;
                    if (count === 4) { els[i].value = localStorage.getItem('profile_city'); break; }
                }
            }
        }

        function countrySelect() {
            var savedCountry = localStorage.getItem('profile_country');
			var sel = document.querySelectorAll('.profile-card select');
            var countrySel = sel[sel.length - 1];
            for (var i = 0; i < countrySel.options.length; i++) {
                if (countrySel.options[i].text === savedCountry) countrySel.selectedIndex = i;
            }
        }
    }

    function saveProfile() {
        var firstName = document.querySelector('input[value="Nisagi"]');
        var middleName = document.querySelector('input[placeholder="Ex: Ahamed"]');
        var lastName = document.querySelector('input[value="Damsari"]');
        var dob = document.querySelector('input[type="date"]');
        var genderRadios = document.querySelectorAll('input[name="gender"]');
        var careerStatus = document.querySelector('select');

		localStorage.setItem('profile_first_name', firstName ? firstName.value : '');
        localStorage.setItem('profile_middle_name', middleName ? middleName.value : '');
        localStorage.setItem('profile_last_name', lastName ? lastName.value : '');
        localStorage.setItem('profile_dob', dob ? dob.value : '');
        
		genderRadios.forEach(function(r) {
            if (r.checked) localStorage.setItem('profile_gender', r.nextElementSibling.textContent.trim());
        });
        if (careerStatus) localStorage.setItem('profile_career_status', careerStatus.value);

        var email = document.querySelector('input[type="email"]');
		if (email) localStorage.setItem('profile_email', email.value);

		var textInputs = document.querySelectorAll('.profile-card input.form-control[type="text"]');
        var phoneIdx = -1;
        var addr1Idx = -1;
        var addr2Idx = -1;
		var cityIdx = -1;
		var idx = 0;
        
		for (var i = 0; i < textInputs.length; i++) {
            if (!textInputs[i].placeholder) {
                if (idx === 0) phoneIdx = i;
                else if (idx === 1) addr1Idx = i;
                else if (idx === 2) addr2Idx = i;
                else if (idx === 3) cityIdx = i;
                idx++;
            }
        }
        if (phoneIdx !== -1) localStorage.setItem('profile_phone', textInputs[phoneIdx].value);
        if (addr1Idx !== -1) localStorage.setItem('profile_address1', textInputs[addr1Idx].value);
        if (addr2Idx !== -1) localStorage.setItem('profile_address2', textInputs[addr2Idx].value);
        if (cityIdx !== -1) localStorage.setItem('profile_city', textInputs[cityIdx].value);

        var countrySelect = document.querySelectorAll('.profile-card select');
        if (countrySelect.length > 0) localStorage.setItem('profile_country', countrySelect[countrySelect.length - 1].value);

		updateNav();
        alert('Profile saved successfully!');
    }

    function updateNav() {
        var name = localStorage.getItem('profile_first_name') || localStorage.getItem('user_name');
		if (name) {
            var els = document.querySelectorAll('.profile-name-display');
			for (var i = 0; i < els.length; i++) els[i].textContent = name;
        }
        var photo = localStorage.getItem('profile_photo');
		if (photo) {
            var imgs = document.querySelectorAll('.avatar');
			for (var i = 0; i < imgs.length; i++) imgs[i].src = photo;
        }
	}

    loadProfile();

    var saveBtn = document.querySelector('.custom-btn');
    if (saveBtn) saveBtn.addEventListener('click', saveProfile);

    var photoInput = document.getElementById('photoInput');
    var profileImg = document.getElementById('profileImage');
    
    if (photoInput && profileImg) {
        if (localStorage.getItem('profile_photo')) profileImg.src = localStorage.getItem('profile_photo');
        
        photoInput.addEventListener('change', function(e) {
            var file = e.target.files[0];
            if (!file) return;
			var reader = new FileReader();
			reader.onload = function(ev) {
                var dataUrl = ev.target.result;
                profileImg.src = dataUrl;
                localStorage.setItem('profile_photo', dataUrl);
                updateNav();
            };
            reader.readAsDataURL(file);
        });
    }

    updateNav();
});
