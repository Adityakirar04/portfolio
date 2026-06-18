 document.addEventListener("DOMContentLoaded", () => {
    console.log("Script load ho gayi!");

    const contactForm = document.querySelector("#contact-form");

    if (!contactForm) {
        console.error("Error: Form nahi mila! ID check karo.");
        return;
    }

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Button click hua!");

        const btn = contactForm.querySelector(".submit-btn");
        const originalText = btn.innerText;
        btn.innerText = "Sending...";
        btn.disabled = true;

        const data = {
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            message: document.querySelector("#message").value
        };

        try {
            console.log("Request bhej rahe hain...", data);
            
            const response = await fetch("https://portfolio-jphq.onrender.com/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (response.ok) {
                alert("Message Sent Successfully!");
                contactForm.reset();
            } else {
                alert("Server Error: " + (result.message || "Something went wrong"));
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Request fail ho gayi! Check network.");
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
});