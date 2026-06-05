 /* ========================================
   ADITYA KIRAR PORTFOLIO - ENHANCED JS
   Particle System | Typing Effect | Scroll Animations
   ======================================== */

// ========================================
// PRELOADER
// ========================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 800);
});

// ========================================
// PARTICLE BACKGROUND SYSTEM
// ========================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(155, 81, 224, ';
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    const maxDistance = 150;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.15;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    animationId = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ========================================
// TYPING ANIMATION
// ========================================
const typingText = document.querySelector('.typing-text');
const roles = [
    'Frontend Developer',
    'React.js Enthusiast',
    'Problem Solver',
    'DSA Grinder',
    'Full-Stack Learner'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500;
    }

    setTimeout(typeEffect, typingDelay);
}

typeEffect();

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========================================
// COUNTER ANIMATION
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ========================================
// SKILL BAR ANIMATION
// ========================================
const skillProgressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => skillObserver.observe(bar));

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileMenu = document.querySelector('#mobile-menu');
const navMenuLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenuLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenuLinks.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAVIGATION HIGHLIGHT
// ========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// HEADER SCROLL EFFECT
// ========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    const originalContent = btn.innerHTML;

    btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
            btn.style.background = '';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ========================================
// MOUSE INTERACTION WITH PARTICLES
// ========================================
let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Add subtle mouse repulsion to particles
function updateParticlesWithMouse() {
    if (mouse.x !== null && mouse.y !== null) {
        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;

            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                particle.vx -= (dx / distance) * force * 0.5;
                particle.vy -= (dy / distance) * force * 0.5;
            }
        });
    }
}

// Hook into animation loop
const originalAnimate = animateParticles;
function enhancedAnimate() {
    updateParticlesWithMouse();
    originalAnimate();
}

// Replace the animation function
window.cancelAnimationFrame(animationId);
function newAnimate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticlesWithMouse();
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    animationId = requestAnimationFrame(newAnimate);
}
window.cancelAnimationFrame(animationId);
newAnimate();