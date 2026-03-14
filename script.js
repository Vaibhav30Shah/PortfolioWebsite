/* ============================================
   VAIBHAV SHAH PORTFOLIO — MAIN SCRIPT
   ============================================ */

(function () { emailjs.init("9bMm2wB1e7ybPEclK"); })();

document.addEventListener("DOMContentLoaded", () => {

  /* AOS */
  AOS.init({ duration: 700, easing: "ease-out-cubic", once: false, offset: 60 });

  /* Typed.js */
  new Typed("#typed-text", {
    strings: ["Full Stack Developer","Reactive Systems Engineer","Mobile App Developer","Backend Architect"],
    typeSpeed: 60, backSpeed: 35, backDelay: 2000, loop: true, cursorChar: "|",
  });

  /* Particles.js */
  particlesJS("particles-js", {
    particles: {
      number:   { value: 60, density: { enable: true, value_area: 900 } },
      color:    { value: ["#6366f1", "#06b6d4", "#818cf8"] },
      shape:    { type: "circle" },
      opacity:  { value: 0.35, random: true, anim: { enable: true, speed: .6, opacity_min: .1, sync: false } },
      size:     { value: 2.5, random: true },
      line_linked: { enable: true, distance: 140, color: "#6366f1", opacity: .15, width: 1 },
      move:     { enable: true, speed: 1.2, direction: "none", random: true, out_mode: "out" },
    },
    interactivity: {
      detect_on: "canvas",
      events:  { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes:   { grab: { distance: 160, line_linked: { opacity: .4 } }, push: { particles_nb: 3 } },
    },
    retina_detect: true,
  });

  /* Sticky navbar + active links */
  const header   = document.getElementById("header");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 60);
    let current = "";
    sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 180) current = sec.getAttribute("id"); });
    navLinks.forEach(a => { a.classList.toggle("active", a.getAttribute("href") === "#" + current); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const menuBtn    = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon   = menuBtn.querySelector("i");
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuIcon.className = isOpen ? "bx bx-x" : "bx bx-menu";
  });
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => { mobileMenu.classList.remove("open"); menuIcon.className = "bx bx-menu"; });
  });

  /* Dark/Light toggle */
  const dmToggle = document.getElementById("darkModeToggle");
  const dmIcon   = dmToggle.querySelector("i");
  if (localStorage.getItem("theme") === "light") { document.body.classList.add("light-mode"); dmIcon.className = "bx bx-sun"; }
  dmToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    dmIcon.className = isLight ? "bx bx-sun" : "bx bx-moon";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  /* Footer year */
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  /* Contact form — EmailJS */
  const form       = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn  = form.querySelector("button[type=submit]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const templateParams = {
      from_name:  document.getElementById("from_name").value.trim(),
      from_email: document.getElementById("from_email").value.trim(),
      from_phone: document.getElementById("from_phone").value.trim(),
      subject:    document.getElementById("subject").value.trim(),
      message:    document.getElementById("message").value.trim(),
    };
    submitBtn.disabled  = true;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin mr-2"></i>Sending…';
    formStatus.className = "text-center text-sm hidden";
    try {
      await emailjs.send("service_osi9mjb", "template_q62ydmp", templateParams);
      formStatus.textContent = "✅ Message sent! I'll get back to you soon.";
      formStatus.className   = "text-center text-sm text-green-400 block mt-2";
      form.reset();
    } catch (err) {
      formStatus.textContent = "❌ Failed to send. Please email me directly.";
      formStatus.className   = "text-center text-sm text-red-400 block mt-2";
    } finally {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = '<i class="bx bx-send mr-2"></i>Send Message';
      setTimeout(() => { formStatus.className = "text-center text-sm hidden"; }, 6000);
    }
  });

  /* 3D card tilt on projects */
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x*8}deg) rotateX(${-y*6}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });

  /* Back-to-top button */
  const btt = document.createElement("button");
  btt.innerHTML = '<i class="bx bx-up-arrow-alt text-xl"></i>';
  btt.className = "fixed bottom-8 right-6 z-50 w-11 h-11 rounded-xl bg-[#6366f1] text-white flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 pointer-events-none";
  document.body.appendChild(btt);
  window.addEventListener("scroll", () => {
    const show = window.scrollY > 500;
    btt.style.opacity       = show ? "1" : "0";
    btt.style.pointerEvents = show ? "auto" : "none";
    btt.style.transform     = show ? "translateY(0)" : "translateY(12px)";
  }, { passive: true });
  btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

});
