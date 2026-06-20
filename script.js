 // ========================================
// PRELOADER WITH PERCENTAGE
// ========================================
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const bar = document.getElementById("preloader-bar");
    const percent = document.getElementById("preloader-percent");
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add("hidden");
                setTimeout(() => preloader.remove(), 800);
            }, 400);
        }
        bar.style.width = progress + "%";
        percent.textContent = Math.floor(progress) + "%";
    }, 80);
});

// ========================================
// CUSTOM CURSOR
// ========================================
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
    });
    
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = outlineX + "px";
        cursorOutline.style.top = outlineY + "px";
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effect
    document.querySelectorAll("a, button, .magnetic-btn").forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
}

// ========================================
// MAGNETIC BUTTONS
// ========================================
document.querySelectorAll(".magnetic-btn").forEach(btn => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
    });
});

// ========================================
// 3D TILT CARDS
// ========================================
document.querySelectorAll(".tilt-card").forEach(card => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
});

// ========================================
// TEXT SCRAMBLE EFFECT
// ========================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || "";
            const to = newText[i] || "";
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span style="color:var(--accent-purple)">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

document.querySelectorAll(".scramble-text").forEach(el => {
    const fx = new TextScramble(el);
    const original = el.dataset.value;
    let counter = 0;
    
    const next = () => {
        fx.setText(original).then(() => {
            setTimeout(next, 3000);
        });
    };
    setTimeout(next, 1000);
    
    el.addEventListener("mouseenter", () => fx.setText(original));
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

        navLinksItems.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }
});

// ========================================
// THEME TOGGLE
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 50);
        });
    }
});

// ========================================
// SMOOTH SCROLLING
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const offset = 80;
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
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 250) {
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
// SCROLL REVEAL WITH STAGGER
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
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

            let delay = isDeleting ? 40 : 100;

            if (!isDeleting && letterIndex === currentWord.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex++;
                delay = 600;
            }

            setTimeout(typeEffect, delay);
        };

        setTimeout(typeEffect, 1200);
    }
});

// ========================================
// NUMBER COUNTER ANIMATION
// ========================================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 40;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        const updateCount = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + inc);
                setTimeout(updateCount, 30);
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
    const observerOptions = { threshold: 0.3 };

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
// CONTACT FORM - FORMSPREE
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector(".submit-btn");
        const originalContent = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                btn.style.background = "var(--accent-green)";
                btn.style.color = "#0a0a0a";
                contactForm.reset();
                showToast("Message sent successfully!", "success");
            } else {
                throw new Error("Failed");
            }
        } catch (error) {
            btn.innerHTML = '<span>Error!</span> <i class="fas fa-times"></i>';
            btn.style.background = "var(--accent-pink)";
            showToast("Failed to send message. Please try again.", "error");
        }

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = "";
            btn.style.color = "";
            btn.disabled = false;
        }, 3000);
    });
});

// ========================================
// TOAST NOTIFICATION
// ========================================
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ========================================
// PARTICLE BACKGROUND WITH MOUSE INTERACTION
// ========================================
const canvas = document.getElementById("particle-canvas");

if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.speedY = Math.random() * 1.5 - 0.75;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;

            // Mouse interaction
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = forceDirectionX * force * 2;
                    const directionY = forceDirectionY * force * 2;
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }
        draw() {
            ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const count = window.innerWidth < 768 ? 60 : 140;
        for (let i = 0; i < count; i++) particlesArray.push(new Particle());
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });

        // Connect nearby particles
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particles[j].x;
                const dy = particlesArray[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ========================================
// MOUSE-FOLLOWING ORBS
// ========================================
document.addEventListener("mousemove", (e) => {
    const orb1 = document.getElementById("orb-1");
    const orb2 = document.getElementById("orb-2");
    const orb3 = document.getElementById("orb-3");
    
    if (orb1) {
        orb1.style.transform = `translate(${e.clientX * 0.02}px, ${e.clientY * 0.02}px)`;
    }
    if (orb2) {
        orb2.style.transform = `translate(${-e.clientX * 0.015}px, ${-e.clientY * 0.015}px)`;
    }
    if (orb3) {
        orb3.style.transform = `translate(${e.clientX * 0.01}px, ${-e.clientY * 0.01}px)`;
    }
});

// ========================================
// SCROLL INDICATOR HIDE
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
                heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
                heroContent.style.opacity = 1 - (scrollY / 600);
            }
        });
    }
});

// ========================================
// PROGRESS BAR
// ========================================
const progressBar = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = (winScroll / height) * 100 + "%";
});

// ========================================
// BACK TO TOP
// ========================================
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========================================
// DYNAMIC YEAR
// ========================================
document.getElementById("year").textContent = new Date().getFullYear();

// ========================================
// VELOCITY SKEW ON SCROLL
// ========================================
let lastScrollTop = 0;
let ticking = false;

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const velocity = st - lastScrollTop;
            const skew = Math.max(-3, Math.min(3, velocity * 0.05));
            
            document.querySelectorAll("section").forEach(section => {
                section.style.transform = `skewY(${skew}deg)`;
            });
            
            setTimeout(() => {
                document.querySelectorAll("section").forEach(section => {
                    section.style.transform = "skewY(0deg)";
                });
            }, 100);
            
            lastScrollTop = st <= 0 ? 0 : st;
            ticking = false;
        });
        ticking = true;
    }
});