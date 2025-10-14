# 🚀 Quick Start Guide - Contact Form Email Setup

## Current Status
✅ Backend server is running on port 3001
❌ Email credentials need to be configured

## 🔑 TO MAKE THE CONTACT FORM WORK:

### Step 1: Configure Email Credentials (REQUIRED)

Open the file: `backend/.env`

Replace these values with your actual email credentials:

```env
SMTP_USER=contact@bigbets.ai
SMTP_PASS=your_actual_app_password_here
```

### Step 2: Get Your Email App Password

#### If using Gmail for contact@bigbets.ai:

1. Go to: https://myaccount.google.com/security
2. Turn on **2-Step Verification** (if not already on)
3. Search for "App passwords" or go to: https://myaccount.google.com/apppasswords
4. Create a new app password:
   - Select app: **Mail**
   - Select device: **Other** (Custom name: "Website Contact Form")
5. Google will generate a 16-character password
6. **Copy this password** (remove spaces)
7. Paste it in `backend/.env` as `SMTP_PASS`

#### If using Microsoft 365/Outlook for contact@bigbets.ai:

1. Go to: https://account.microsoft.com/security
2. Go to "Advanced security options"
3. Under "App passwords", create a new app password
4. Use this password in your `.env` file

#### If using a custom email server:

You'll need to configure SMTP settings in `backend/services/emailService.js`:

```javascript
this.transporter = nodemailer.createTransport({
  host: 'mail.bigbets.ai', // Your SMTP server
  port: 587, // SMTP port (usually 587 or 465)
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

### Step 3: Restart the Backend Server

After updating `.env`, restart the server:

1. Stop the current server (Ctrl+C in the terminal)
2. Start it again:
   ```bash
   cd backend
   npm start
   ```

### Step 4: Test the Form

1. Make sure Angular app is running: `ng serve`
2. Go to: http://localhost:4200/contact
3. Click "Contact Us" button
4. Fill out the form
5. Submit

**You should see:**
- ✅ Success message in the browser
- ✅ Confirmation email sent to the user
- ✅ Notification email sent to contact@bigbets.ai

## 📧 What Will Happen?

### When someone fills the contact form:

1. **User gets an email** saying:
   - "Thank you for contacting us"
   - "We will respond within 24 hours"

2. **contact@bigbets.ai gets an email** with:
   - User's name
   - User's email
   - User's phone
   - User's message

## 🐛 Troubleshooting

### Error: "Username and Password not accepted"
- Make sure you're using an **App Password**, not your regular email password
- Verify 2-Factor Authentication is enabled
- Check if the email address is correct in `.env`

### Error: "Email service not initialized"
- Make sure `.env` file exists in the `backend` folder
- Check that `SMTP_USER` and `SMTP_PASS` are set correctly

### Backend not starting
- Run: `cd backend && npm install`
- Check if port 3001 is already in use

### Form submits but no email
- Check backend console for error messages
- Verify email credentials are correct
- Test with a simple email first

## 🔒 Security Reminder

⚠️ **NEVER commit the `.env` file to Git!**

The `.env` file contains sensitive credentials. Make sure it's listed in `.gitignore`.

---

## 📞 Need Help?

Check the detailed guide in `backend/EMAIL_SETUP.md` for more information.
