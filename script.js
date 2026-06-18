 const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector(".submit-btn");
    btn.innerText = "Sending...";
    
    try {
        const response = await fetch("https://portfolio-jphq.onrender.com/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            })
        });
        
        if (response.ok) {
            alert("Sent!");
            contactForm.reset();
        } else {
            alert("Error in Backend");
        }
    } catch (err) {
        alert("Server Unreachable");
    }
    btn.innerText = "Send Message";
});