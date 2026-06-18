 // ========================================
// 1. PRELOADER
// ========================================
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        preloader.classList.add("hidden");
        setTimeout(() => { preloader.style.display = "none"; }, 600);
    }
});
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