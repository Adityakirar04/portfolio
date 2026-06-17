const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact From ${name}`,
            html: `
                <h2>New Portfolio Message</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `
        });

        res.status(200).json({
            success: true,
            message: "Message Sent Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed To Send Message"
        });
    }
});

app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});