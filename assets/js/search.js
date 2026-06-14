
// Nimeth's part - search filtering + job dataset


// TODO: fix the save button handler leak, it stacks listeners on re-render
$(document).ready(function()  {

    var fallbackJobs = [
		{ title: "Software Engineer",   company: "TechCorp Lanka", location: "Colombo", category: "IT", type: "Full Time", salary: "150,000", postedDate: "2026-06-08", description: "Design, build and maintain web applications using HTML, CSS and JavaScript. 2+ years of experience preferred." },
	   { title: "Front-End Developer", company: "Bright Web",  location: "Kandy", category: "IT", type: "Full Time", salary: "120,000", postedDate: "2026-06-10", description: "Build responsive, user-friendly interfaces with HTML, CSS, JavaScript and jQuery." },
		{ title: "Accountant", company: "FinTrust", location: "Colombo", category: "Finance", type: "Full Time", salary:  "95,000", postedDate: "2026-06-02", description: "Manage company accounts, prepare monthly financial reports and handle payroll." },
		{ title: "Marketing Executive", company: "AdVision", location: "Galle", category: "Marketing", type: "Full Time", salary: "80,000", postedDate: "2026-06-11", description: "Plan and run digital marketing campaigns and manage social media channels." },
		{ title: "Nursing Officer", company: "City Hospital", location: "Kandy", category: "Health", type: "Full Time", salary: "90,000", postedDate: "2026-06-05", description: "Provide quality patient care and assist doctors in the medical ward." },
		{ title: "Data Entry Assistant", company: "QuickData", location: "Colombo", category: "IT", type: "Part Time", salary: "45,000", postedDate: "2026-06-12", description: "Enter and verify data accurately. Basic computer knowledge is required." },
		{ title: "Sales Representative", company: "MegaMart", location: "Galle", category: "Marketing", type: "Full Time", salary: "70,000", postedDate: "2026-05-30", description: "Promote products to customers and achieve monthly sales targets." },
		{ title: "Lab Technician", company: "MediLab", location: "Kandy", category: "Health", type: "Part Time", salary: "65,000", postedDate: "2026-06-09", description: "Collect samples and perform laboratory tests under supervision." },
		{ title: "Finance Manager", company: "FinTrust", location: "Colombo", category: "Finance", type: "Full Time", salary: "200,000", postedDate: "2026-06-07", description: "Lead the finance team, manage budgets and oversee financial planning." },
		{ title: "QA Engineer", company: "TechCorp Lanka", location: "Colombo", category: "IT", type: "Full Time", salary: "110,000", postedDate: "2026-06-12", description: "Test web applications, write test cases and report bugs with clear steps." },
		{ title: "UI/UX Designer", company: "PixelStudio", location: "Colombo", category: "IT", type: "Full Time", salary: "100,000", postedDate: "2026-06-11", description: "Design clean, modern interfaces and improve the overall user experience." },
		{ title: "Bank Teller", company: "Lanka Bank", location: "Galle", category: "Finance", type: "Full Time", salary: "60,000", postedDate: "2026-06-06", description: "Handle customer transactions and provide friendly front-desk banking service." },
		{ title: "Content Writer", company: "AdVision", location: "Kandy", category: "Marketing", type: "Part Time", salary: "50,000", postedDate: "2026-06-12", description: "Write clear, engaging articles and marketing copy for the web." },
		{ title: "Pharmacist", company: "City Hospital", location: "Colombo", category: "Health", type: "Full Time", salary: "85,000", postedDate: "2026-06-04", description: "Dispense medicines accurately and advise patients on safe usage." },
		{ title: "Network Engineer", company: "TechCorp Lanka", location: "Kandy", category: "IT", type: "Full Time", salary: "130,000", postedDate: "2026-06-10", description: "Set up and maintain company networks and resolve connectivity issues." },
		{ title: "Mobile App Developer", company: "Nexgen Solutions", location: "Colombo", category: "IT", type: "Full Time", salary: "140,000", postedDate: "2026-06-13", description: "Develop and maintain Android and iOS applications using React Native. 2+ years of mobile development experience required." },
		{ title: "DevOps Engineer", company: "CloudBase Lanka", location: "Colombo", category: "IT", type: "Full Time", salary: "160,000", postedDate: "2026-06-12", description: "Manage CI/CD pipelines, automate infrastructure with Terraform and support cloud deployments on AWS." },
		{ title: "Cybersecurity Analyst", company: "SecureNet", location: "Colombo", category: "IT", type: "Full Time", salary: "145,000", postedDate: "2026-06-11", description: "Monitor systems for threats, conduct vulnerability assessments and implement security policies." },
		{ title: "Database Administrator", company: "DataSystems Lanka", location: "Kandy", category: "IT", type: "Full Time", salary: "125,000", postedDate: "2026-06-10", description: "Administer, tune and back up MySQL and PostgreSQL databases for enterprise applications." },
		{ title: "Full Stack Developer", company: "Bright Web", location: "Galle", category: "IT", type: "Full Time", salary: "135,000", postedDate: "2026-06-09", description: "Build end-to-end web applications using Node.js, React and MongoDB in an agile team." },
		{ title: "Systems Analyst", company: "TechCorp Lanka", location: "Colombo", category: "IT", type: "Full Time", salary: "118,000", postedDate: "2026-06-08", description: "Analyse business requirements and translate them into technical specifications for development teams." },
		{ title: "IT Support Specialist", company: "HelpDesk Pro", location: "Kandy", category: "IT", type: "Full Time", salary: "65,000", postedDate: "2026-06-07", description: "Provide first-line technical support to staff, troubleshoot hardware and software issues." },
		{ title: "Cloud Architect", company: "CloudBase Lanka", location: "Colombo", category: "IT", type: "Full Time", salary: "220,000", postedDate: "2026-06-06", description: "Design scalable cloud architectures on AWS and Azure, and guide teams through cloud migration." },
		{ title: "AI/ML Engineer", company: "Nexgen Solutions", location: "Colombo", category: "IT", type: "Full Time", salary: "185,000", postedDate: "2026-06-05", description: "Build and deploy machine learning models using Python, TensorFlow and scikit-learn for business use cases." },
		{ title: "WordPress Developer", company: "PixelStudio", location: "Galle", category: "IT", type: "Part Time", salary: "55,000", postedDate: "2026-06-13", description: "Build and customise WordPress websites and plugins for small and medium businesses." },
		{ title: "Investment Analyst", company: "Lanka Capital", location: "Colombo", category: "Finance", type: "Full Time", salary: "175,000", postedDate: "2026-06-12", description: "Conduct market research, build financial models and support investment decision-making." },
		{ title: "Audit Associate", company: "FinTrust", location: "Colombo", category: "Finance", type: "Full Time", salary: "85,000", postedDate: "2026-06-11", description: "Assist in statutory audits, review financial statements and prepare working papers." },
		{ title: "Tax Consultant", company: "Lanka Tax Advisory", location: "Colombo", category: "Finance", type: "Full Time", salary: "110,000", postedDate: "2026-06-10", description: "Advise clients on corporate and personal tax compliance, and prepare tax returns." },
		{ title: "Credit Analyst", company: "Lanka Bank", location: "Kandy", category: "Finance", type: "Full Time", salary: "95,000", postedDate: "2026-06-09", description: "Assess creditworthiness of loan applicants and prepare credit appraisal reports." },
		{ title: "Financial Controller", company: "MegaMart", location: "Colombo", category: "Finance", type: "Full Time", salary: "230,000", postedDate: "2026-06-08", description: "Oversee accounting operations, produce management accounts and ensure regulatory compliance." },
		{ title: "Payroll Officer", company: "PeopleFirst HR", location: "Galle", category: "Finance", type: "Full Time", salary: "72,000", postedDate: "2026-06-07", description: "Process monthly payroll, manage EPF/ETF contributions and resolve salary-related queries." },
		{ title: "Treasury Analyst", company: "Lanka Capital", location: "Colombo", category: "Finance", type: "Full Time", salary: "130,000", postedDate: "2026-06-06", description: "Manage daily cash positions, monitor foreign exchange exposure and support funding activities." },
		{ title: "Insurance Underwriter", company: "Guardian Insurance", location: "Colombo", category: "Finance", type: "Full Time", salary: "100,000", postedDate: "2026-06-05", description: "Evaluate insurance proposals, assess risk and determine appropriate policy terms and premiums." },
		{ title: "Microfinance Officer", company: "Community Finance", location: "Kandy", category: "Finance", type: "Full Time", salary: "68,000", postedDate: "2026-06-04", description: "Appraise micro-loan applications, disburse funds and monitor repayments in rural communities." },
		{ title: "Accounts Payable Clerk", company: "MegaMart", location: "Galle", category: "Finance", type: "Part Time", salary: "42,000", postedDate: "2026-06-13", description: "Process supplier invoices, reconcile accounts and assist with month-end closing." },
		{ title: "Brand Manager", company: "AdVision", location: "Colombo", category: "Marketing", type: "Full Time", salary: "155,000", postedDate: "2026-06-13", description: "Develop and execute brand strategies, manage agencies and track campaign performance metrics." },
		{ title: "SEO Specialist", company: "Bright Web", location: "Colombo", category: "Marketing", type: "Full Time", salary: "85,000", postedDate: "2026-06-12", description: "Optimise website content for search engines, conduct keyword research and build backlinks." },
		{ title: "Social Media Manager", company: "PixelStudio", location: "Kandy", category: "Marketing", type: "Full Time", salary: "78,000", postedDate: "2026-06-11", description: "Manage company social media channels, create engaging content and grow the online audience." },
		{ title: "Market Research Analyst", company: "InsightSL", location: "Colombo", category: "Marketing", type: "Full Time", salary: "92,000", postedDate: "2026-06-10", description: "Design surveys, analyse consumer data and present actionable insights to clients." },
		{ title: "Public Relations Officer", company: "AdVision", location: "Galle", category: "Marketing", type: "Full Time", salary: "75,000", postedDate: "2026-06-09", description: "Build media relationships, draft press releases and manage the company's public image." },
		{ title: "Event Coordinator", company: "Eventive Lanka", location: "Colombo", category: "Marketing", type: "Full Time", salary: "65,000", postedDate: "2026-06-08", description: "Plan and execute corporate events, product launches and promotions from concept to completion." },
		{ title: "Graphic Designer", company: "PixelStudio", location: "Kandy", category: "Marketing", type: "Full Time", salary: "70,000", postedDate: "2026-06-07", description: "Create visual assets for print and digital campaigns using Adobe Illustrator and Photoshop." },
		{ title: "E-Commerce Executive", company: "MegaMart", location: "Colombo", category: "Marketing", type: "Full Time", salary: "82,000", postedDate: "2026-06-06", description: "Manage product listings, run paid ads and improve conversion rates on the online store." },
		{ title: "Telemarketing Agent", company: "CallPoint Lanka", location: "Galle", category: "Marketing", type: "Part Time", salary: "38,000", postedDate: "2026-06-13", description: "Contact potential customers by phone, present products and record leads accurately." },
		{ title: "Video Editor", company: "AdVision", location: "Colombo", category: "Marketing", type: "Part Time", salary: "52,000", postedDate: "2026-06-05", description: "Edit promotional videos and reels using Premiere Pro and After Effects for social media channels." },
		{ title: "Physiotherapist", company: "City Hospital", location: "Colombo", category: "Health", type: "Full Time", salary: "95,000", postedDate: "2026-06-13", description: "Assess and treat patients with musculoskeletal conditions and develop rehabilitation programmes." },
		{ title: "Medical Laboratory Scientist", company: "MediLab", location: "Colombo", category: "Health", type: "Full Time", salary: "88,000", postedDate: "2026-06-12", description: "Perform complex diagnostic tests including haematology, biochemistry and microbiology panels." },
		{ title: "Radiographer", company: "National Hospital", location: "Colombo", category: "Health", type: "Full Time", salary: "80,000", postedDate: "2026-06-11", description: "Operate imaging equipment including X-ray and CT scanners and produce diagnostic images." },
		{ title: "Hospital Administrator", company: "City Hospital", location: "Kandy", category: "Health", type: "Full Time", salary: "120,000", postedDate: "2026-06-10", description: "Oversee daily hospital operations, manage budgets and coordinate between clinical and admin teams." },
		{ title: "Dental Surgeon", company: "SmileCare Clinic", location: "Galle", category: "Health", type: "Full Time", salary: "160,000", postedDate: "2026-06-09", description: "Provide comprehensive dental care including examinations, fillings, extractions and root canals." },
		{ title: "Dietitian", company: "NutriLife Lanka", location: "Colombo", category: "Health", type: "Full Time", salary: "75,000", postedDate: "2026-06-08", description: "Assess patients' nutritional needs and create personalised meal plans for clinical and community settings." },
		{ title: "Occupational Therapist", company: "RehabCare Lanka", location: "Kandy", category: "Health", type: "Full Time", salary: "85,000", postedDate: "2026-06-07", description: "Help patients with disabilities regain independence in daily activities through tailored therapy programmes." },
		{ title: "Paramedic", company: "National Ambulance", location: "Galle", category: "Health", type: "Full Time", salary: "70,000", postedDate: "2026-06-06", description: "Respond to emergency calls, provide pre-hospital care and safely transport patients to hospital." },
		{ title: "Health & Safety Officer", company: "MegaMart", location: "Colombo", category: "Health", type: "Full Time", salary: "78,000", postedDate: "2026-06-05", description: "Conduct risk assessments, ensure regulatory compliance and promote workplace safety culture." },
		{ title: "Medical Receptionist", company: "SmileCare Clinic", location: "Kandy", category: "Health", type: "Part Time", salary: "40,000", postedDate: "2026-06-13", description: "Greet patients, schedule appointments and manage front-desk administration at a busy clinic." },
		{ title: "HR Manager", company: "PeopleFirst HR", location: "Colombo", category: "HR", type: "Full Time", salary: "145,000", postedDate: "2026-06-13", description: "Lead the HR function including recruitment, performance management, employee relations and L&D." },
		{ title: "Recruitment Consultant", company: "TalentBridge Lanka", location: "Colombo", category: "HR", type: "Full Time", salary: "90,000", postedDate: "2026-06-12", description: "Source, screen and place candidates across multiple industries and build strong client relationships." },
		{ title: "Training & Development Officer", company: "PeopleFirst HR", location: "Kandy", category: "HR", type: "Full Time", salary: "82,000", postedDate: "2026-06-11", description: "Design and deliver training programmes to upskill employees and support the performance review cycle." },
		{ title: "Operations Manager", company: "MegaMart", location: "Colombo", category: "Operations", type: "Full Time", salary: "180,000", postedDate: "2026-06-10", description: "Oversee supply chain, logistics and store operations to ensure efficiency and customer satisfaction." },
		{ title: "Logistics Coordinator", company: "SwiftLog Lanka", location: "Galle", category: "Operations", type: "Full Time", salary: "72,000", postedDate: "2026-06-09", description: "Coordinate inbound and outbound shipments, liaise with freight partners and maintain delivery records." },
		 { title: "Legal Officer", company: "Lanka Law Associates", location: "Colombo", category: "Legal", type: "Full Time", salary: "115,000", postedDate: "2026-06-14", description: "Draft and review contracts, provide legal advice to management and ensure company-wide regulatory compliance." }
	]; //passe json karamuuu

	function getRelativeDate(dateStr) {
		let posted = new Date(dateStr);
		 let now = new Date('2026-06-14');
		let diffMs = now - posted;
		let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return '1 day ago';
		if (diffDays < 7) return diffDays + ' days ago';
		if (diffDays < 14) return '1 week ago';
		if (diffDays < 30) return Math.floor(diffDays / 7) + ' weeks ago';
		return Math.floor(diffDays / 30) + ' months ago';
	}

	function processJobs(jobs) {
		return jobs.map(function(job) {
			return {
				title: job.title,
				company: job.company,
				location: job.location,
				category: job.category,
				type: job.type,
				salary: 'LKR ' + job.salary,
				posted: getRelativeDate(job.postedDate),
				description: job.description
			};
		});
	}

	let allJobs = processJobs(fallbackJobs);

	function getSavedJobs() {
	    var stored = localStorage.getItem('inseek_saved_jobs');
		return stored ? JSON.parse(stored) : [];
	}

	function setSavedJobs(jobs) {
		 localStorage.setItem('inseek_saved_jobs', JSON.stringify(jobs));
	}

	function isSaved(job) {
		return getSavedJobs().some(function(s) { return s.title === job.title && s.company === job.company; });
	}

	function toggleSave(btn, job) {
		var saved = getSavedJobs();
		var idx = -1;
		for (var i = 0; i < saved.length; i++) {
			if (saved[i].title === job.title && saved[i].company === job.company) { idx = i; break; }
		}
		if (idx === -1) {
			saved.push({ title: job.title, company: job.company, location: job.location, category: job.category, type: job.type, salary: job.salary, posted: job.posted });
			btn.html('<i class="bi bi-bookmark-fill"></i>').removeClass('btn-outline-warning').addClass('btn-warning');
		} else {
			saved.splice(idx, 1);
			btn.html('<i class="bi bi-bookmark"></i>').removeClass('btn-warning').addClass('btn-outline-warning');
		}
		setSavedJobs(saved);
	}

	renderJobs(allJobs);

	$('#searchForm').on('submit', function(e) {
		e.preventDefault();
		filterJobs();
	});

	$('#resetBtn').on('click', function() {
		$('#searchForm')[0].reset();
		renderJobs(allJobs);
	});

	$('#keyword').on('keyup', function() {
		filterJobs();
	});

	$('#location, #category').on('change', function() {
		filterJobs();
	});

	function filterJobs() {
		var keyword = $('#keyword').val().toLowerCase();
		var location = $('#location').val();
		var category = $('#category').val();

		var filtered = allJobs.filter(function(job) {
			var matchKeyword = job.title.toLowerCase().includes(keyword) || job.company.toLowerCase().includes(keyword);
			var matchLocation = location === 'All' || job.location.includes(location);
			var matchCategory = category === 'All' || job.category === category;
			return matchKeyword && matchLocation && matchCategory;
		});

		renderJobs(filtered);
	}

	function renderJobs(jobs) {
		var $tbody = $('#jobsBody');
		$tbody.empty();

		$('#resultCount').text(jobs.length + ' Jobs Found');

		if (jobs.length === 0) {
			$tbody.append('<tr><td colspan="9" class="text-center py-4 text-muted">No jobs found matching your criteria.</td></tr>');
			return;
		}

		jobs.forEach(function(job) {
			var saved = isSaved(job);
			var saveBtnClass = saved ? 'btn-warning' : 'btn-outline-warning';
			var saveIcon = saved ? '<i class="bi bi-bookmark-fill"></i>' : '<i class="bi bi-bookmark"></i>';
			var tr = '<tr>' +
				'<td class="fw-semibold text-dark">' + job.title + '</td>' +
				'<td>' + job.company + '</td>' +
				'<td class="text-secondary"><small>' + job.location + '</small></td>' +
				'<td><span class="badge bg-light text-dark border">' + job.category + '</span></td>' +
				'<td>' + job.type + '</td>' +
				'<td class="text-success fw-medium"><small>' + job.salary + '</small></td>' +
				'<td class="text-secondary"><small>' + job.posted + '</small></td>' +
				'<td>' +
					'<button class="btn btn-sm btn-brand view-job-button"' +
					' data-title="' + job.title + '"' +
					' data-company="' + job.company + '"' +
					' data-location="' + job.location + '"' +
					' data-category="' + job.category + '"' +
					' data-type="' + job.type + '"' +
					' data-salary="' + job.salary + '"' +
					' data-posted="' + job.posted + '"' +
					' data-description="' + job.description.replace(/"/g, '&quot;') + '"' +
					' data-bs-toggle="modal"' +
					' data-bs-target="#jobModal">' +
					'View</button>' +
				'</td>' +
				'<td class="text-center">' +
					'<button class="btn btn-sm save-btn ' + saveBtnClass + '">' + saveIcon + '</button>' +
				'</td>' +
			'</tr>';
			$tbody.append(tr);
		});

		$('.view-job-button').on('click', function() {
			$('#jmTitle').text($(this).data('title'));
			$('#jmCompany').text($(this).data('company'));
			$('#jmLocation').text($(this).data('location'));
			$('#jmCategory').text($(this).data('category'));
			$('#jmType').text($(this).data('type'));
			$('#jmSalary').text($(this).data('salary'));
			$('#jmPosted').text($(this).data('posted'));
			$('#jmDescription').text($(this).data('description'));
		});

		$('.save-btn').on('click', function() {
			var $btn = $(this);
			var $row = $btn.closest('tr');
			var cells = $row.find('td');
			var job = {
				title: $(cells[0]).text(),
				company: $(cells[1]).text(),
				location: $(cells[2]).text(),
				category: $(cells[3]).text(),
				type: $(cells[4]).text(),
				salary: $(cells[5]).text(),
				posted: $(cells[6]).text()
			};
			toggleSave($btn, job);
		});
	}

});
