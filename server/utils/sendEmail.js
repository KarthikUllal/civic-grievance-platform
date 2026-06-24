const nodemailer = require("nodemailer")
require("dotenv").config()
const sendEmail = async ({ to, subject, text, html }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
        }
    })

    const mailOptions = {
        from: `"Smart Civic Connect" <${process.env.USER_EMAIL}>`,
        to,
        subject,
        text,
        html,
    }

    await transporter.sendMail(mailOptions)


}

module.exports = sendEmail