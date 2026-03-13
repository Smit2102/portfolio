document.addEventListener('DOMContentLoaded', () => {
    
    // --- Intro Loader ---
    const introLoader = document.getElementById('intro-loader');
    if (introLoader) {
        // Slide up after 2.2 seconds (giving just enough time to read)
        setTimeout(() => {
            introLoader.classList.add('slide-up');
            document.body.classList.remove('loading');
        }, 2200); 
        
        // Remove from DOM completely to clean up
        setTimeout(() => {
            introLoader.remove();
        }, 3000);
    }

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navbar Blur/Glass on Scroll ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.8)';
            navbar.style.background = 'rgba(5, 8, 20, 0.85)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(5, 8, 20, 0.4)';
        }
    });

    // --- Complex Scroll Reveal ---
    const appearElements = document.querySelectorAll('.appear');
    
    const appearOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    appearElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // --- Custom Cursor Interaction ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    // Follow mouse
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly
        if(cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    // Outline follows with slight delay for smooth trailing effect
    const animateCursor = () => {
        let dx = mouseX - outlineX;
        let dy = mouseY - outlineY;
        
        outlineX += dx * 0.15;
        outlineY += dy * 0.15;
        
        if(cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover state for cursor (enlarge on links)
    const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, .project-card, .exp-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursorOutline) cursorOutline.classList.add('cursor-hover');
            if(cursorDot) cursorDot.style.opacity = '0'; // Hide dot when hovering to let outline shine
        });
        
        el.addEventListener('mouseleave', () => {
            if(cursorOutline) cursorOutline.classList.remove('cursor-hover');
            if(cursorDot) cursorDot.style.opacity = '1';
        });
    });

    // --- Initialize Particles.js ---
    // A delicate, constellation-like network of data points
    if(typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 40,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#00e5ff" },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.4,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00e5ff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": { "enable": false }
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }

    // --- Magnetic Buttons Effect ---
    // Buttons subtly pull toward the cursor when hovered
    const magnets = document.querySelectorAll('.magnetic-btn');
    
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            const span = btn.querySelector('span');
            if(span) span.style.transform = `translate(${x * 0.1}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseout', function() {
            btn.style.transform = 'translate(0px, 0px)';
            const span = btn.querySelector('span');
            if(span) span.style.transform = 'translate(0px, 0px)';
        });
    });
});
