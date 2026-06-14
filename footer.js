// Dulina's footer - shared across all pages via document.write
//easiest way to share the footer
let prefix = window.location.pathname.includes("docs/process") ? "../../" : "";

document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">');

document.write(`

    <footer class="pt-5 text-light" style="background-color: #0059C6;">
        <div class="container pb-4">
            <div class="row">
                
                <div class="col-md-4 mb-4">
                    <h5 class="fw-bold mb-4 text-white">Quick Links</h5>
                    <ul class="list-unstyled">
                        <li class="mb-3"><a href="${prefix}dashboard.html" class="text-light text-decoration-none">Home</a></li>
                        <li class="mb-3"><a href="${prefix}jobsearch.html" class="text-light text-decoration-none">Jobs</a></li>
                        <li class="mb-3"><a href="${prefix}profile.html" class="text-light text-decoration-none">Profile</a></li>
                    </ul>
                </div>






                <div class="col-md-4 mb-4">
                    <h5 class="fw-bold mb-4 text-white">Contact Us</h5>
                    <ul class="list-unstyled">
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-envelope-fill text-white me-3 fs-5"></i>
                            <a href="mailto:inseek@gmail.com" class="text-light text-decoration-none">inseek@gmail.com</a>
                        </li>
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-telephone-fill text-white me-3 fs-5"></i>
                            <a href="tel:+94771234567" class="text-light text-decoration-none">+94 77 123 4567</a>
                        </li>
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-telephone-fill text-white me-3 fs-5"></i>
                            <a href="tel:+94112345678" class="text-light text-decoration-none">+94 11 234 5678</a>
                        </li>
                    </ul>
                </div>







                  <div class="col-md-4 mb-4">
                      <h5 class="fw-bold mb-4 text-white">Follow Us</h5>
                      <div class="d-flex mb-4">
                          <a href="#" class="d-flex justify-content-center align-items-center rounded-circle border border-secondary text-light me-3 transition-style" style="width: 45px; height: 45px; text-decoration: none;">
                            <i class="bi bi-facebook fs-5"></i>
                          </a>
                          <a href="#" class="d-flex justify-content-center align-items-center rounded-circle border border-secondary text-light me-3 transition-style" style="width: 45px; height: 45px; text-decoration: none;">
                               <i class="bi bi-instagram fs-5"></i>
                          </a>
                          <a href="#" class="d-flex justify-content-center align-items-center rounded-circle border border-secondary text-light" style="width: 45px; height: 45px; text-decoration: none;">
                              <i class="bi bi-whatsapp fs-5"></i>
                          </a>
                      </div>
                      <div class="mt-2">
                          <a href="${prefix}dashboard.html">
                              <img src="${prefix}assets/images/logo-transparent-white.png" class="img-fluid" style="max-width: 140px; height: auto;">
                          </a>
                      </div>
                  </div>






                  
                
            </div>
        </div>

        <div class="text-center py-3" style="background-color: #444444;">
            <p class="mb-0 text-white fw-medium">© 2026 Inseek All Rights Reserved. <span id="footerClock" class="ms-3" style="font-weight:400;opacity:0.8;"></span></p>
        </div>

    </footer>

`);




//clock ekak penna damma
document.write('<script>function updateClock(){var d=new Date();var h=String(d.getHours()).padStart(2,"0");var m=String(d.getMinutes()).padStart(2,"0");var s=String(d.getSeconds()).padStart(2,"0");var el=document.getElementById("footerClock");if(el)el.textContent=h+":"+m+":"+s;}updateClock();setInterval(updateClock,1000);<\/script>');
