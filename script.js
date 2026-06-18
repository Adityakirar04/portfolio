 // ========================================
// PRELOADER
// ========================================
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        preloader.classList.add("hidden");
        setTimeout(() => {
            preloader.style.display = "none";
        }, 600);
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links li a");

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when clicking a link
        navLinksItems.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }
});

// ========================================
// HEADER SCROLL EFFECT (Sticky + Shadow)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
});

// ========================================
// SMOOTH SCROLLING FOR NAV LINKS
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const offset = 70; // Header height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(element => {
        revealObserver.observe(element);
    });
});

// ========================================
// HERO TYPING EFFECT
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const words = ["Full-Stack Developer", "Problem Solver", "CS Undergrad", "Tech Enthusiast"];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentText = "";
    let isDeleting = false;
    const typingSpeed = 100;

    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {
        const typeEffect = () => {
            const currentWord = words[wordIndex % words.length];

            if (isDeleting) {
                currentText = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                currentText = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
            }

            typingElement.textContent = currentText;

            let delay = typingSpeed;

            if (!isDeleting && letterIndex === currentWord.length) {
                delay = 1500;
                isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex++;
                delay = 500;
            } else if (isDeleting) {
                delay = 50;
            }

            setTimeout(typeEffect, delay);
        };

        // Start typing after preloader
        setTimeout(typeEffect, 800);
    }
});

// ========================================
// NUMBER COUNTER ANIMATION
// ========================================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 50;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        const updateCount = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + inc);
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
};

// ========================================
// SKILL BAR ANIMATION
// ========================================
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth + '%';
    });
};

// ========================================
// SCROLL OBSERVERS FOR STATS & SKILLS
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.3
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const aboutSection = document.querySelector('.about-section');
    const skillsSection = document.querySelector('.skills-section');

    if (aboutSection) statsObserver.observe(aboutSection);
    if (skillsSection) skillsObserver.observe(skillsSection);
});

// ========================================
// CONTACT FORM - FORMSPREE INTEGRATION (100% WORKING)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector(".submit-btn");
        const originalContent = btn.innerHTML;

        // Loading state
        btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        // Get form data
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                // Success
                btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                btn.style.background = "#00f2fe";
                btn.style.color = "#0a0a0a";
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = "";
                    btn.style.color = "";
                    btn.disabled = false;
                }, 3000);
            } else {
                // Error from Formspree
                const data = await response.json();
                if (data.errors) {
                    btn.innerHTML = `<span>${data.errors[0].message}</span> <i class="fas fa-times"></i>`;
                } else {
                    btn.innerHTML = '<span>Failed!</span> <i class="fas fa-times"></i>';
                }
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                }, 3000);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            btn.innerHTML = '<span>Error!</span> <i class="fas fa-times"></i>';
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }, 3000);
        }
    });
});

// ========================================
// PARTICLE BACKGROUND ANIMATION
// ========================================
const canvas = document.getElementById("particle-canvas");

if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    let animationId;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const particleCount = window.innerWidth < 768 ? 60 : 120;
        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        animationId = requestAnimationFrame(animateParticles);
    }

    // Handle resize properly
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();
}

// ========================================
// SCROLL INDICATOR HIDE ON SCROLL
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = "0";
                scrollIndicator.style.pointerEvents = "none";
            } else {
                scrollIndicator.style.opacity = "1";
                scrollIndicator.style.pointerEvents = "auto";
            }
        });
    }
});

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrollY / 700);
            }
        });
    }
});