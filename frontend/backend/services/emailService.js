const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      console.log('🔧 Initializing email transporter...');
      console.log('📧 SMTP User:', process.env.SMTP_USER);
      console.log('🔐 SMTP Pass configured:', process.env.SMTP_PASS ? 'Yes' : 'No');

      this.transporter = nodemailer.createTransport({
        service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
        auth: {
          user: process.env.SMTP_USER, // Your email address
          pass: process.env.SMTP_PASS  // Your app password (not regular password)
        }
      });

      // Verify connection
      this.transporter.verify((error, success) => {
        if (error) {
          console.error('❌ Email service configuration error:', error.message);
          console.error('❌ Error code:', error.code);
          console.error('❌ Error response:', error.response);
        } else {
          console.log('✅ Email service is ready to send messages');
        }
      });

    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
    }
  }

  async sendContactEmail(data, file) {
    try {
      if (!this.transporter) {
        throw new Error('Email service not initialized');
      }

      // Email to you (the admin)
      const adminMailOptions = {
        from: `"${data.name}" <${process.env.SMTP_USER}>`,
        to: 'contact@bigbets.ai',
        subject: `🔔 New Contact Form Submission from ${data.name}`,
        html: this.generateAdminEmailHTML(data),
        replyTo: data.email,
        attachments: file ? [{
          filename: file.originalname,
          content: file.buffer
        }] : []
      };

      // Email to the user (confirmation)
      const userMailOptions = {
        from: `"BigBets.ai Team" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: '✅ Thank you for contacting BigBets.ai',
        html: this.generateUserConfirmationHTML(data)
      };

      // Send both emails
      const [adminResult, userResult] = await Promise.allSettled([
        this.transporter.sendMail(adminMailOptions),
        this.transporter.sendMail(userMailOptions)
      ]);

      console.log('📧 Admin email result:', adminResult.status);
      console.log('📧 User confirmation result:', userResult.status);

      return {
        success: true,
        message: 'Emails sent successfully',
        details: {
          adminEmail: adminResult.status,
          userConfirmation: userResult.status
        }
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
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f82d19; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #f82d19; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 3px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #f82d19; margin-top: 15px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>🔔 New Contact Form Submission</h2>
                <p>You have received a new message through your website contact form.</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">👤 Name:</div>
                    <div class="value">${data.name}</div>
                </div>
                
                <div class="field">
                    <div class="label">📧 Email:</div>
                    <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>
                
                <div class="field">
                    <div class="label">📞 Phone:</div>
                    <div class="value">${data.phone}</div>
                </div>
                
                <div class="field">
                    <div class="label">🕒 Received:</div>
                    <div class="value">${data.timestamp}</div>
                </div>
                
                <div class="field">
                    <div class="label">💬 Message:</div>
                    <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  generateUserConfirmationHTML(data) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f82d19; color: white; padding: 20px; border-radius: 5px 5px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
            .highlight { color: #f82d19; font-weight: bold; }
            .footer { margin-top: 30px; padding: 20px; background: white; border-radius: 5px; text-align: center; font-size: 14px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>✅ Thank You for Contacting Us!</h2>
            </div>
            <div class="content">
                <p>Hi <span class="highlight">${data.name}</span>,</p>
                
                <p>Thank you for reaching out to <strong>BigBets.ai</strong>! We have successfully received your message and appreciate you taking the time to contact us.</p>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                    <li>📧 We'll review your message carefully</li>
                    <li>🚀 Our team will respond within 24 hours</li>
                    <li>💡 We'll provide you with the best solution for your needs</li>
                </ul>
                
                <p>If you have any urgent questions, feel free to call us at <a href="tel:+918368871848">+91 836 887 1848</a>.</p>
                
                <p>Best regards,<br>
                <strong>The BigBets.ai Team</strong></p>
            </div>
            <div class="footer">
                <p>This email was sent from BigBets.ai in response to your contact form submission.</p>
                <p>📍 Crossing Republik, Ghaziabad, India | 📧 contact@bigbets.ai</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }
}

module.exports = new EmailService();
