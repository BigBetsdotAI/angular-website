const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

// Endpoint to send a single email
router.post('/send-one', async (req, res) => {
    const { to, subject, html, name } = req.body;

    if (!to || !subject || !html) {
        return res.status(400).json({ msg: 'Missing fields' });
    }

    try {
        // Personalize content if needed (simple Replace)
        const personalize = (text, name) => {
            return text.replace(/{{name}}/g, name || 'there');
        };

        const personalizedHtml = personalize(html, name);
        const personalizedSubject = personalize(subject, name);

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: to,
            subject: personalizedSubject,
            html: personalizedHtml
        };

        await transporter.sendMail(mailOptions);
        res.json({ msg: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ msg: 'Failed to send email', error: error.message });
    }
});

module.exports = router;
