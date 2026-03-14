/* ============================================
   VAIBHAV SHAH PORTFOLIO — script.js
   ============================================ */

/* ---- EmailJS Init ---- */
(function () { emailjs.init("9bMm2wB1e7ybPEclK"); })();

document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     AOS
  ============================== */
  AOS.init({ duration: 750, easing: "ease-out-cubic", once: false, offset: 50 });

  /* ==============================
     TYPED.JS
  ============================== */
  new Typed("#typed-text", {
    strings: [
      "Full Stack Developer",
      "Reactive Systems Engineer",
      "Mobile App Developer",
      "Backend Architect",
    ],
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 2000,
    loop: true,
    cursorChar: "|",
  });

  /* ==============================
     PARTICLES.JS
  ============================== */
  particlesJS("particles-js", {
    particles: {
      number:      { value: 55, density: { enable: true, value_area: 900 } },
      color:       { value: ["#6366f1", "#06b6d4", "#818cf8"] },
      shape:       { type: "circle" },
      opacity:     { value: 0.3, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.05, sync: false } },
      size:        { value: 2.5, random: true },
      line_linked: { enable: true, distance: 130, color: "#6366f1", opacity: 0.12, width: 1 },
      move:        { enable: true, speed: 1.1, direction: "none", random: true, out_mode: "out" },
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes:  { grab: { distance: 160, line_linked: { opacity: 0.35 } }, push: { particles_nb: 3 } },
    },
    retina_detect: true,
  });

  /* ==============================
     STICKY HEADER + ACTIVE NAV
  ============================== */
  const header   = document.getElementById("header");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateScroll() {
    header.classList.toggle("scrolled", window.scrollY > 60);
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute("id");
    });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  }
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  /* ==============================
     MOBILE MENU
  ============================== */
  const menuBtn    = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon   = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", e => {
    e.stopPropagation();
    const open = mobileMenu.classList.toggle("open");
    menuIcon.className = open ? "bx bx-x" : "bx bx-menu";
  });

  document.querySelectorAll(".mob-link").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuIcon.className = "bx bx-menu";
    });
  });

  document.addEventListener("click", e => {
    if (!header.contains(e.target)) {
      mobileMenu.classList.remove("open");
      menuIcon.className = "bx bx-menu";
    }
  });

  /* ==============================
     DARK / LIGHT MODE TOGGLE
  ============================== */
  const dmBtn  = document.getElementById("darkModeToggle");
  const dmIcon = dmBtn.querySelector("i");

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      dmIcon.className = "bx bx-sun";
    } else {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      dmIcon.className = "bx bx-moon";
    }
  }

  applyTheme(localStorage.getItem("theme") || "dark");

  dmBtn.addEventListener("click", () => {
    const next = document.body.classList.contains("light-mode") ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  /* ==============================
     FOOTER YEAR
  ============================== */
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  /* ==============================
     CONTACT FORM — EmailJS
  ============================== */
  const form       = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn  = form.querySelector("button[type=submit]");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const params = {
      from_name:  document.getElementById("from_name").value.trim(),
      from_email: document.getElementById("from_email").value.trim(),
      from_phone: document.getElementById("from_phone").value.trim(),
      subject:    document.getElementById("subject").value.trim(),
      message:    document.getElementById("message").value.trim(),
    };

    submitBtn.disabled  = true;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending…';
    formStatus.className = "form-status hidden";

    try {
      await emailjs.send('service_osi9mjb', 'template_q62ydmp', templateParams);
      formStatus.textContent = "✅ Message sent! I'll get back to you soon.";
      formStatus.className   = "form-status success";
      form.reset();
    } catch {
      formStatus.textContent = "❌ Failed to send. Please email me directly at director@vsoftxpert.in";
      formStatus.className   = "form-status error";
    } finally {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = '<i class="bx bx-send"></i> Send Message';
      setTimeout(() => { formStatus.className = "form-status hidden"; }, 6000);
    }
  });

  /* ==============================
     PROJECT CARD 3D TILT
  ============================== */
  document.querySelectorAll(".proj-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });

  /* ==============================
     BACK-TO-TOP BUTTON
  ============================== */
  const btt = document.createElement("button");
  btt.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
  btt.setAttribute("aria-label", "Back to top");
  btt.style.cssText = [
    "position:fixed", "bottom:2rem", "right:1.5rem", "z-index:200",
    "width:44px", "height:44px", "border-radius:12px",
    "background:var(--primary)", "color:#fff", "border:none",
    "cursor:pointer", "font-size:1.4rem",
    "display:flex", "align-items:center", "justify-content:center",
    "box-shadow:0 4px 18px rgba(99,102,241,.4)",
    "opacity:0", "pointer-events:none",
    "transition:opacity .3s, transform .3s",
  ].join(";");
  document.body.appendChild(btt);

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 500;
    btt.style.opacity       = show ? "1" : "0";
    btt.style.pointerEvents = show ? "auto" : "none";
    btt.style.transform     = show ? "translateY(0)" : "translateY(12px)";
  }, { passive: true });

  btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

});
