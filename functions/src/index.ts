import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as nodemailer from 'nodemailer';
import * as cors from 'cors';
import { defineSecret } from 'firebase-functions/params';

// Define secrets
const gmailUser = defineSecret('GMAIL_USER');
const gmailPassword = defineSecret('GMAIL_APP_PASSWORD');

// Initialize Firebase Admin
initializeApp();

// CORS middleware
const corsHandler = cors({ origin: true });

// Contact form handler
export const contactForm = onRequest({
  memory: '256MiB',
  timeoutSeconds: 60,
  cors: true,
  secrets: [gmailUser, gmailPassword]
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
      const { name, email, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          error: 'Missing required fields',
          required: ['name', 'email', 'subject', 'message']
        });
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
        to: 'connor.pymm@gmail.com', // Your email address
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
        const db = getFirestore();
        await db.collection('contact-submissions').add({
          name,
          email,
          subject,
          message,
          timestamp: new Date(),
          ip: req.ip || req.connection.remoteAddress
        });
      } catch (firestoreError) {
        // Log the error but don't fail the request
        console.log('Firestore logging failed (optional):', firestoreError instanceof Error ? firestoreError.message : 'Unknown error');
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });

    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({
        error: 'Failed to send message. Please try again later.'
      });
    }
  });
});
