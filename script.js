 document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = document.querySelector(".submit-btn");
        
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
                alert("Message Sent!");
                contactForm.reset();
            } else {
                alert("Server error! Please check Render logs.");
            }
        } catch (error) {
            alert("Network error. Check connection.");
        } finally {
            btn.innerText = "Send Message";
            btn.disabled = false;
        }
    });
});