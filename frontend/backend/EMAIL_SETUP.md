# Contact Form Email Setup Guide

## 🎯 Overview
This guide will help you set up the contact form to send emails to both the user (confirmation) and to contact@bigbets.ai (notification).

## 📋 Prerequisites
- Node.js installed
- Access to contact@bigbets.ai email account
- Email provider that supports SMTP (Gmail, Outlook, etc.)

## 🔧 Setup Instructions

### Step 1: Configure Email Credentials

1. Open `backend/.env` file
2. Update the following fields:

```env
SMTP_USER=contact@bigbets.ai
SMTP_PASS=your_actual_app_password
```

### Step 2: Get Email App Password

#### For Gmail:
1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication if not enabled
3. Click on "App passwords" (you may need to search for it)
4. Select "Mail" and generate a new app password
5. Copy the 16-character password (remove spaces)
6. Paste it in the `.env` file as `SMTP_PASS`

#### For Outlook/Hotmail:
1. Go to https://account.microsoft.com/security
2. Go to "Advanced security options"
3. Under "App passwords", create a new app password
4. Use this password in your `.env` file

#### For Custom Email Provider:
If using a custom email server, you may need to update the emailService.js file:

```javascript
this.transporter = nodemailer.createTransport({
  host: 'your-smtp-server.com',
  port: 587, // or 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

### Step 3: Install Backend Dependencies

Open terminal in the `backend` folder and run:

```bash
cd backend
npm install
```

### Step 4: Start the Backend Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

The server should start on port 3001.

### Step 5: Test the Contact Form

1. Start your Angular app (in a separate terminal):
   ```bash
   cd ..
   ng serve
   ```

2. Open http://localhost:4200 in your browser
3. Navigate to the contact page
4. Fill out and submit the form
5. Check both:
   - User's email (should receive confirmation)
   - contact@bigbets.ai (should receive notification)

## 📧 Email Flow

When a user submits the contact form:

1. **User receives** a confirmation email with:
   - Thank you message
   - "We will respond within 24 hours" notice
   - Company contact information

2. **contact@bigbets.ai receives** a notification with:
   - User's name
   - User's email (with reply-to functionality)
   - User's phone number
   - User's message
   - Timestamp

## 🐛 Troubleshooting

### Backend not connecting to email:
- Check if `.env` file exists in the `backend` folder
- Verify SMTP credentials are correct
- Check if 2FA is enabled and app password is generated
- Try enabling "Less secure app access" (for Gmail)

### Emails not being sent:
- Check backend console for error messages
- Verify the backend server is running on port 3001
- Check if CORS is properly configured
- Test email credentials with a simple nodemailer test

### Frontend not connecting to backend:
- Ensure backend is running on http://localhost:3001
- Check browser console for CORS errors
- Verify the API URL in `contact.service.ts`

## 🔒 Security Notes

- Never commit the `.env` file to Git
- Use environment variables for production
- Enable rate limiting to prevent spam
- Use helmet for security headers
- Validate all input fields

## 📝 What Emails Will Be Sent?

### To User (Confirmation):
```
Subject: ✅ Thank you for contacting BigBets.ai

Hi [User Name],

Thank you for reaching out to BigBets.ai! We have successfully received 
your message and appreciate you taking the time to contact us.

What happens next?
- We'll review your message carefully
- Our team will respond within 24 hours
- We'll provide you with the best solution for your needs

If you have any urgent questions, feel free to call us at +91 836 887 1848.

Best regards,
The BigBets.ai Team
```

### To contact@bigbets.ai (Notification):
```
Subject: 🔔 New Contact Form Submission from [User Name]

You have received a new message through your website contact form.

Name: [User Name]
Email: [User Email]
Phone: [User Phone]
Received: [Timestamp]
Message: [User Message]
```

## 🚀 Production Deployment

For production, update:
1. `FRONTEND_URL` in `.env` to your production URL
2. `NODE_ENV=production`
3. Use proper email service credentials
4. Consider using services like SendGrid, AWS SES, or Mailgun for better deliverability

## 📞 Support

If you encounter any issues:
1. Check the backend console logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Test email credentials separately

---

**Note:** Make sure to keep your `.env` file secure and never share your email credentials publicly!
