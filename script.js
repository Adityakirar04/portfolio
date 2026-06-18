 // ========================================
// 1. PRELOADER (Fix: Safety timeout add kiya hai)
// ========================================
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        preloader.classList.add("hidden");
        setTimeout(() => { preloader.style.display = "none"; }, 600);
    }
});
// Fallback: Agar load event miss ho jaye, toh 3 second mein preloader hata dega
setTimeout(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) preloader.style.display = "none";
}, 3000);

// ========================================
// 2. HERO TYPING EFFECT
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const words = ["Full-Stack Developer", "Problem Solver", "CS Undergrad", "Tech Enthusiast"];
    let wordIndex = 0, letterIndex = 0, currentText = "", isDeleting = false;
    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {
        const typeEffect = () => {
            const currentWord = words[wordIndex % words.length];
            currentText = isDeleting ? currentWord.substring(0, letterIndex - 1) : currentWord.substring(0, letterIndex + 1);
            typingElement.textContent = currentText;
            letterIndex = isDeleting ? letterIndex - 1 : letterIndex + 1;

            let delay = 100;
            if (!isDeleting && letterIndex === currentWord.length) { delay = 1500; isDeleting = true; }
            else if (isDeleting && letterIndex === 0) { isDeleting = false; wordIndex++; delay = 500; }
            setTimeout(typeEffect, delay);
        };
        typeEffect();
    }
});

// ========================================
// 3. CONTACT FORM HANDLING (FIXED)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded successfully!");
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector(".submit-btn");
        const originalText = btn.innerText;
        btn.innerText = "Sending...";
        btn.disabled = true;

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await fetch("https://portfolio-jphq.onrender.com/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Message Sent Successfully!");
                contactForm.reset();
            } else {
                alert("Server error! Please try again later.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Request failed! Check your internet or server status.");
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
});