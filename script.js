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
// CONTACT FORM HANDLING
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const contactForm =
        document.getElementById("contact-form");

    if (!contactForm) return;

    contactForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const btn =
                contactForm.querySelector(".submit-btn");

            const originalContent =
                btn.innerHTML;

            btn.innerHTML =
                '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

            btn.disabled = true;

            const data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            try {

                const response =
                    await fetch(
                        "http://localhost:5000/contact",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        }
                    );

                const result = await response.json();

                if (result.success) {

                    btn.innerHTML =
                        '<span>Message Sent!</span> <i class="fas fa-check"></i>';

                    contactForm.reset();

                } else {

                    btn.innerHTML =
                        '<span>Failed!</span> <i class="fas fa-times"></i>';
                }

            } catch (error) {

                console.error(error);

                btn.innerHTML =
                    '<span>Error!</span> <i class="fas fa-times"></i>';
            }

            setTimeout(() => {

                btn.innerHTML = originalContent;
                btn.disabled = false;

            }, 3000);
        }
    );

});