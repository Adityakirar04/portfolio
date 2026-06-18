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
// REVEAL ALL SECTIONS
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((element) => {
        element.classList.add("active");
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
                delay = 1500; // Pause at the end of the word
                isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex++;
                delay = 500; // Pause before starting next word
            } else if (isDeleting) {
                delay = 50; // Faster deletion speed
            }

            setTimeout(typeEffect, delay);
        };
        
        typeEffect();
    }
});

// ========================================
// NUMBER COUNTER ANIMATION
// ========================================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 100; 

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20); 
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
// SCROLL OBSERVERS (Triggers animations only on scroll)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.3 // Triggers when 30% of the section is visible
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Prevents re-running
            }
        });
    }, observerOptions);

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target); // Prevents re-running
            }
        });
    }, observerOptions);

    const aboutSection = document.querySelector('.about-section');
    const skillsSection = document.querySelector('.skills-section');

    if (aboutSection) statsObserver.observe(aboutSection);
    if (skillsSection) skillsObserver.observe(skillsSection);
});

// ========================================
// CONTACT FORM HANDLING
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

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                contactForm.reset();
            } else {
                btn.innerHTML = '<span>Failed!</span> <i class="fas fa-times"></i>';
            }
        } catch (error) {
            console.error(error);
            btn.innerHTML = '<span>Error!</span> <i class="fas fa-times"></i>';
        }

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }, 3000);
    });
});