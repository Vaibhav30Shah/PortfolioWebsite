//menu icon navbar
let menuIcon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');

menuIcon.onclick=()=>
{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll Sections active links
let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a');

window.onscroll=()=>
{
    sections.forEach(sec=>
        {
        let top=window.scrollY;
        let offset=sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');

        if(top>=offset && top<offset+height)
        {
            navLinks.forEach(links=>
            {
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+id+']').classList.add('active');
            })
        }
    });

    // Sticky Navbar
    let header=document.querySelector('.header');

    header.classList.toggle('sticky',window.scrollY>100);

    // remove menu icon navbar when scroll or click navbar link
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();



// Dark Mode
let darkModeIcon=document.querySelector('#darkMode-icon');

darkModeIcon.onclick=()=>
{
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

//Scroll reveal
ScrollReveal({
    reset:true,
    distance:'80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home.content, .heading',{origin:'top'});
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .contact form',{origin:'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img img',{origin:'left'});
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content',{origin:'right'});


// Popup functionality
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupText = document.getElementById('popup-text');
const closeBtn = document.querySelector('.close');

// Content for popups
const popupContent = {
    about: {
        title: "More About Me",
        text: "As a budding software engineer, I've had the opportunity to work on diverse projects that have honed my skills in various technologies. My experience ranges from creating a reactive Network Monitoring System that improved performance by 40%, to developing a Flutter-based live cricket score application.\n\nI'm proficient in languages such as Java, Go, Python, and Dart, and have hands-on experience with frameworks like Vert.X and Flutter. My technical toolkit also includes expertise in multithreading, ZeroMQ, RESTful APIs, and database technologies like MySQL and MongoDB.\n\nBeyond technical skills, I value community engagement and leadership. As the Club Service Director for the Rotaract Club, I led initiatives that made tangible differences in people's lives, from providing shelter to homeless individuals to distributing sanitary kits to schoolgirls.\n\nI'm constantly seeking to expand my knowledge and skills. My certifications in AWS Machine Learning for NLP and Cryptography showcase my commitment to staying at the forefront of technology trends.\n\nAs I approach the completion of my degree, I'm excited about the prospect of applying my skills and passion to real-world challenges, contributing to innovative solutions that make a difference."
    },
    service1: {
        title: "Software Development",
        text: "As a backend developer, I specialize in creating high-performance, scalable server-side applications. My expertise includes:\n\n" +
              "• Developing in Java 17 and Go 1.21.9, with a focus on creating efficient, concurrent systems\n" +
              "• Utilizing Vert.x 4.5.7 for building reactive applications that can handle high loads with minimal resource usage\n" +
              "• Implementing multithreading techniques to optimize performance and resource utilization\n" +
              "• Designing and integrating RESTful APIs for seamless front-end and back-end communication\n" +
              "• Working with messaging systems like ZeroMQ 4.5 for building distributed systems\n" +
              "• Database design and management using MySQL and MongoDB\n\n" +
              "Whether it's creating a new system from scratch or optimizing existing backends, I'm committed to delivering robust, efficient solutions that meet your business needs."
    },
    service2: {
        title: "Mobile App Development",
        text: "I offer comprehensive mobile application development services, focusing on creating engaging, user-friendly apps. My services include:\n\n" +
              "• Developing cross-platform mobile applications using Flutter 3.10 and Dart 3.22.2\n" +
              "• Creating responsive and intuitive user interfaces for optimal user experience\n" +
              "• Integrating RESTful APIs and real-time data handling for dynamic content\n" +
              "• Implementing secure authentication and data storage using Firebase\n" +
              "• Integrating payment gateways like RazorPay for e-commerce functionality\n" +
              "• Optimizing app performance for smooth operation on various devices\n\n" +
              "From concept to deployment, I can help bring your mobile app ideas to life with efficient, scalable, and maintainable code."
    },
    service3: {
        title: "Network Solutions",
        text: "I specialize in creating efficient network monitoring and management solutions. My services in this area include:\n\n" +
              "• Designing and implementing lightweight Network Monitoring Systems (NMS)\n" +
              "• Developing custom plugins for retrieving system and interface OIDs from SNMP devices\n" +
              "• Integrating messaging services like ZeroMQ for efficient inter-process communication\n" +
              "• Implementing Vert.x Eventbus architecture for reactive, event-driven systems\n" +
              "• Creating robust logging functionalities for effective debugging and system monitoring\n" +
              "• Optimizing network architectures to reduce latency and improve overall performance\n\n" +
              "Whether you need to monitor a small network or manage a large, complex system, I can provide tailored solutions to meet your specific requirements and improve your network's efficiency."
    }
};

// Open popup
document.querySelectorAll('[data-popup]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const content = popupContent[button.dataset.popup];
        popupTitle.textContent = content.title;
        popupText.textContent = content.text;
        popup.style.display = 'block';
    });
});

// Close popup
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close popup when clicking outside
window.addEventListener('click', (e) => {
    if (e.target == popup) {
        popup.style.display = 'none';
    }
});


// form submit functionality
// Initialize EmailJS
(function() {
    emailjs.init("9bMm2wB1e7ybPEclK");
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    var templateParams = {
        from_name: document.getElementById('from_name').value,
        from_email: document.getElementById('from_email').value,
        from_phone: document.getElementById('from_phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    emailjs.send('service_osi9mjb', 'template_q62ydmp', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your message has been sent successfully!');
            document.getElementById('contact-form').reset(); // Reset form after successful submission
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send the message. Please try again later.');
        });
});

// Page views
const pageviewsEl = document.getElementById('pageviews');
updatePageViews();

function updatePageViews() {
  fetch('https://api.countapi.xyz/hit/127.0.0.1/pageviews')
  .then(response => response.json())
  .then(data => {
    pageviewsEl.innerHTML = data.value;
  })
  .catch(error => console.error('Error:', error));
}