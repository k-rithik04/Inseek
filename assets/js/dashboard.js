
// Rithika's dashboard slider + featured jobs




//Danneth naa bn z-index 
$(document).ready(function () {

	let jobs = [

		{
			title: "Senior Frontend Developer",
			company: 'Dialog',
			location: "Colombo, Sri Lanka",
			posted: "2 days ago"
		},

		{
			title: "UI / UX Designer",
			company: "WSO2",
			location: "Kandy, Sri Lanka",
			posted: "5 days ago"
		},

		{
			title: "Full Stack Engineer",
			company: 'Sumloop',
			location: "Colombo, Sri Lanka",
			posted: "1 week ago"
		}

	];

	let grid = $('#latest-jobs').empty();

	$.each(jobs, (i, job) => {

		let logo = `assets/images/company icons/${job.company}.jpg`;

		grid.append(`

      <div class="col">

        <div class="card h-100 p-4 border-0 shadow-sm">

          <div class="text-end mb-2">
            
		  <span class="text-muted small fw-medium opacity-75">
			
				${job.posted}
				
			</span>

          </div>

          <img src="${logo}" class="mb-3 rounded-3" style="width:50px; height:50px; object-fit:cover; ">

          <h5 class="fw-bold mb-1 text-dark">

		  	${job.title}

		  </h5>
	

          <p class="text-muted small mb-4">

		    ${job.company} <br>
			${job.location}

		  </p>

          <a href="apply.html" class="btn btn-primary rounded-pill w-100 py-2 mt-auto">

		  	Apply Now
			
		  </a>

        </div>

      </div>

    `);
	});





	let current_Banner = 1;
	let totalBanners = 6;
	let hero = $('.hero_section');
	let slideCurrent = $('.slide-current');
	let slideNext = $('.slide-next');
	let isSliding = false;

	function getBannerUrl(n) {
		return 'assets/images/slide banner/' + n + '.jpeg';
	}

	function setBannerBg(el, n) {
	   el.css('background',
			'linear-gradient(135deg, rgba(0, 123, 255, 0.71), rgba(0, 89, 198, 0.62)), url("' + getBannerUrl(n) + '")');
		  el.css('background-size', 'cover');
		 el.css('background-position', 'center');
	}

   function preloadNextBanner(n) {
		var img = new Image();
		img.src = getBannerUrl(n);
	}

	setBannerBg(slideCurrent, 1);

	setInterval(function() {
		if (isSliding) return;
		isSliding = true;

		var next = current_Banner >= totalBanners ? 1 : current_Banner + 1;
		preloadNextBanner(next);

		setBannerBg(slideNext, next);

		slideCurrent.css('transition', 'transform 0.8s ease-in-out');
		slideNext.css('transition', 'transform 0.8s ease-in-out, z-index 0s');
		slideNext.css('z-index', '3');

		slideCurrent.css('transform', 'translateX(-100%)');
		slideNext.css('transform', 'translateX(0)');

		setTimeout(function() {
			slideCurrent.css('transition', 'none');
			slideNext.css('transition', 'none');

			setBannerBg(slideCurrent, next);
			slideCurrent.css('transform', 'translateX(0)');
			slideNext.css('transform', 'translateX(100%)');
			slideCurrent.css('z-index', '2');
			slideNext.css('z-index', '1');

			current_Banner = next;
			isSliding = false;
		}, 800);
	}, 4500);

	// meka harida danna - slider eka weda karanna me line eka wenas karanna epa
	$(document).ready(function () {

		let logos = $(".company-logo");

		let time = 250;

		logos.each(function (index) {

			$(this).delay(time * index).fadeIn(800);

		});

	});




});