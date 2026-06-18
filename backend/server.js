 const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// 1. CORS Configuration (Fixes Connection Refused/Block Errors)
app.use(cors({
    origin: "*", // Yahan aap apni Vercel URL 'https://portfolio-synx.vercel.app' bhi likh sakte hain
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 2. Health check route (Keep-alive for Render free tier)
app.get("/", (req, res) => {
    res.status(200).send("Backend is active and running!");
});

// 3. Contact Form Route
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation: Check if fields are empty
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // Yeh wahi 16-digit app password hai
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact From ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>New Portfolio Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: #f4f4f4; padding: 10px;">${message}</p>
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: "Message Sent Successfully"
        });

    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed To Send Message"
        });
    }
});

// 4. Dynamic Port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});