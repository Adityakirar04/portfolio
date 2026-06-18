 document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded. Looking for form...");
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
        console.error("CRITICAL ERROR: No form found with id 'contact-form'");
        return;
    }

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Submit button clicked!");

        const btn = contactForm.querySelector(".submit-btn");
        btn.innerText = "Sending...";
        btn.disabled = true;

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        console.log("Attempting to fetch with data:", data);

        try {
            const response = await fetch("https://portfolio-jphq.onrender.com/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            console.log("Fetch finished. Status:", response.status);
            
            const result = await response.json();
            alert("Success! Server said: " + JSON.stringify(result));
            contactForm.reset();

        } catch (error) {
            console.error("FATAL FETCH ERROR:", error);
            alert("The code crashed at fetch. Check the console logs.");
        } finally {
            btn.innerText = "Send Message";
            btn.disabled = false;
        }
    });
});