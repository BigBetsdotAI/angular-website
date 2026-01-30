import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class EmailService {
    constructor() {
        this.transporter = null;
        this.initializeTransporter();
    }

    initializeTransporter() {
        try {
            console.log('🔧 Initializing email transporter...');
            // console.log('📧 SMTP User:', process.env.SMTP_USER); 
            // Avoid logging sensitive info in production logs, but ok for debugging if careful

            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            this.transporter.verify((error, success) => {
                if (error) {
                    console.error('❌ Email service configuration error:', error.message);
                } else {
                    console.log('✅ Email service is ready to send messages');
                }
            });

        } catch (error) {
            console.error('⚠️ Warning: Failed to initialize email service (Emails will not be sent):', error.message);
            // Do not throw error here, let the app continue running
        }
    }

    async sendContactEmail(data) {
        try {
            if (!this.transporter) {
                throw new Error('Email service not initialized');
            }

            // Email to Admin
            const adminMailOptions = {
                from: `"${data.quickName}" <${process.env.SMTP_USER}>`,
                to: process.env.SMTP_USER, // Send to self/admin
                replyTo: data.quickEmail,
                subject: `🔔 New Contact: ${data.quickName}`,
                html: this.generateAdminEmailHTML(data)
            };

            // Email to User (Confirmation)
            const userMailOptions = {
                from: `"BigBets. AI Team" <${process.env.SMTP_USER}>`,
                to: data.quickEmail,
                subject: '✅ We received your message!',
                html: this.generateUserConfirmationHTML(data)
            };

            const [adminResult, userResult] = await Promise.allSettled([
                this.transporter.sendMail(adminMailOptions),
                this.transporter.sendMail(userMailOptions)
            ]);

            console.log('📧 Emails sent. Admin:', adminResult.status, 'User:', userResult.status);

            return {
                success: true,
                message: 'Emails sent successfully'
            };

        } catch (error) {
            console.error('Email sending error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    generateAdminEmailHTML(data) {
        return `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.quickName}</p>
      <p><strong>Email:</strong> ${data.quickEmail}</p>
      <p><strong>Phone:</strong> ${data.quickPhone}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
        ${data.quickMessage.replace(/\n/g, '<br>')}
      </blockquote>
    `;
    }

    generateUserConfirmationHTML(data) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Contacting Us</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <div style="background-color: #ef4444; color: white; padding: 40px 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        ✅ Thank You for Contacting Us!
                    </h1>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px; color: #374151; line-height: 1.6;">
                    <p style="margin-bottom: 20px; font-size: 16px;">
                        Hi <span style="color: #ef4444; font-weight: bold;">${data.quickName}</span>,
                    </p>

                    <p style="margin-bottom: 25px; font-size: 16px;">
                        Thank you for reaching out to <strong>BigBets.ai</strong>! We have successfully received your message and appreciate you taking the time to contact us.
                    </p>

                    <h3 style="color: #111827; font-size: 18px; margin-bottom: 15px; font-weight: bold;">What happens next?</h3>

                    <ul style="list-style-type: none; padding: 0; margin-bottom: 30px;">
                        <li style="margin-bottom: 10px; display: flex; align-items: start;">
                            <span style="margin-right: 10px;">📧</span> We'll review your message carefully
                        </li>
                        <li style="margin-bottom: 10px; display: flex; align-items: start;">
                            <span style="margin-right: 10px;">🚀</span> Our team will respond within 24 hours
                        </li>
                        <li style="margin-bottom: 10px; display: flex; align-items: start;">
                            <span style="margin-right: 10px;">💡</span> We'll provide you with the best solution for your needs
                        </li>
                    </ul>

                    <p style="margin-bottom: 30px; font-size: 14px; color: #4b5563;">
                        If you have any urgent questions, feel free to call us at <a href="tel:+918368871848" style="color: #3b82f6; text-decoration: underline;">+91 836 887 1848</a>.
                    </p>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; font-weight: bold; color: #111827;">Best regards,</p>
                        <p style="margin: 5px 0 0; font-weight: bold; color: #111827;">The BigBets.ai Team</p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 12px; color: #6b7280;">
                        This email was sent from BigBets.ai in response to your contact form submission.
                    </p>
                    <p style="margin: 10px 0 0; font-size: 12px; color: #6b7280;">
                        📍 Crossing Republik, Ghaziabad, India | 📧 <a href="mailto:contact@bigbets.ai" style="color: #3b82f6; text-decoration: none;">contact@bigbets.ai</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    async sendApplicationEmail(data, file) {
        try {
            if (!this.transporter) {
                throw new Error('Email service not initialized');
            }

            // Email to Admin (HR)
            const adminMailOptions = {
                from: `"${data.quickName}" <${process.env.SMTP_USER}>`,
                to: process.env.SMTP_USER, // Or a dedicated HR email
                replyTo: data.quickEmail,
                subject: `📄 New Job Application: ${data.quickName}`,
                html: this.generateAdminApplicationHTML(data),
                attachments: file ? [{
                    filename: file.originalname,
                    content: file.buffer
                }] : []
            };

            // Email to User (Confirmation)
            const userMailOptions = {
                from: `"BigBets.AI Careers" <${process.env.SMTP_USER}>`,
                to: data.quickEmail,
                subject: '✅ Application Received - BigBets.AI',
                html: this.generateUserApplicationHTML(data)
            };

            const [adminResult, userResult] = await Promise.allSettled([
                this.transporter.sendMail(adminMailOptions),
                this.transporter.sendMail(userMailOptions)
            ]);

            console.log('📧 Application Emails sent. Admin:', adminResult.status, 'User:', userResult.status);

            return { success: true };

        } catch (error) {
            console.error('Email sending error:', error);
            return { success: false, error: error.message };
        }
    }

    generateAdminApplicationHTML(data) {
        return `
            <h2>New Job Application</h2>
            <p><strong>Name:</strong> ${data.quickName}</p>
            <p><strong>Email:</strong> ${data.quickEmail}</p>
            <p><strong>Phone:</strong> ${data.quickPhone}</p>
            <hr>
            <h3>Application Details:</h3>
            <pre style="font-family: sans-serif; background: #f4f4f4; padding: 10px;">${data.quickMessage}</pre>
            <p><em>Cover letter attached.</em></p>
        `;
    }

    generateUserApplicationHTML(data) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background: #2563eb; color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; color: #374151; }
                .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Application Received! 🚀</h1>
                </div>
                <div class="content">
                    <p>Hi <strong>${data.quickName}</strong>,</p>
                    <p>Thanks for applying to BigBets.AI! We've received your application and are excited to review it.</p>
                    <p>Our hiring team will review your details and get back to you if your profile matches our requirements.</p>
                    <br>
                    <p>Good luck!</p>
                    <p><strong>BigBets.AI Talent Acquisition Team</strong></p>
                </div>
                <div class="footer">
                    <p>BigBets.AI | Innovate. Connect. Inspire.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}

export default new EmailService();
