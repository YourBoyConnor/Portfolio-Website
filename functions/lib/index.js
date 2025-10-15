"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactForm = void 0;
const https_1 = require("firebase-functions/v2/https");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const nodemailer = require("nodemailer");
const cors = require("cors");
const params_1 = require("firebase-functions/params");
const axios_1 = require("axios");
// Define secrets
const gmailUser = (0, params_1.defineSecret)('GMAIL_USER');
const gmailPassword = (0, params_1.defineSecret)('GMAIL_APP_PASSWORD');
const recaptchaSecret = (0, params_1.defineSecret)('RECAPTCHA_SECRET_KEY');
// Initialize Firebase Admin
(0, app_1.initializeApp)();
// CORS middleware
const corsHandler = cors({ origin: true });
// Function to verify reCAPTCHA token
async function verifyRecaptcha(token, secretKey) {
    try {
        const response = await axios_1.default.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: secretKey,
                response: token
            }
        });
        return response.data.success === true;
    }
    catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return false;
    }
}
// Contact form handler
exports.contactForm = (0, https_1.onRequest)({
    memory: '256MiB',
    timeoutSeconds: 60,
    cors: true,
    secrets: [gmailUser, gmailPassword, recaptchaSecret]
}, async (req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
        return;
    }
    return corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }
        try {
            const { name, email, subject, message, recaptchaToken } = req.body;
            // Validate required fields
            if (!name || !email || !subject || !message) {
                return res.status(400).json({
                    error: 'Missing required fields',
                    required: ['name', 'email', 'subject', 'message']
                });
            }
            // Validate reCAPTCHA token
            if (!recaptchaToken) {
                return res.status(400).json({ error: 'reCAPTCHA verification required' });
            }
            // Verify reCAPTCHA token
            const isRecaptchaValid = await verifyRecaptcha(recaptchaToken, recaptchaSecret.value());
            if (!isRecaptchaValid) {
                return res.status(400).json({ error: 'reCAPTCHA verification failed' });
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }
            // Email configuration
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: gmailUser.value(),
                    pass: gmailPassword.value()
                }
            });
            // Email content
            const mailOptions = {
                from: gmailUser.value(),
                to: 'connor.pymm@gmail.com',
                subject: `Portfolio Contact: ${subject}`,
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Sent from your portfolio website</em></p>
        `,
                replyTo: email
            };
            // Send email
            await transporter.sendMail(mailOptions);
            // Log to Firestore (optional - don't let it break the response)
            try {
                const db = (0, firestore_1.getFirestore)();
                await db.collection('contact-submissions').add({
                    name,
                    email,
                    subject,
                    message,
                    timestamp: new Date(),
                    ip: req.ip || req.connection.remoteAddress
                });
            }
            catch (firestoreError) {
                // Log the error but don't fail the request
                console.log('Firestore logging failed (optional):', firestoreError instanceof Error ? firestoreError.message : 'Unknown error');
            }
            return res.status(200).json({
                success: true,
                message: 'Message sent successfully!'
            });
        }
        catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({
                error: 'Failed to send message. Please try again later.'
            });
        }
    });
});
//# sourceMappingURL=index.js.map