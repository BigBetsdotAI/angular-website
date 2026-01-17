require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Testing Email Configuration...\n');

// Check if environment variables are set
console.log('📧 SMTP User:', process.env.SMTP_USER || '❌ NOT SET');
console.log('🔐 SMTP Pass:', process.env.SMTP_PASS ? '✅ SET' : '❌ NOT SET');
console.log('');

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error('❌ Error: Email credentials not configured in .env file');
  console.log('\n📝 To fix this:');
  console.log('1. Open backend/.env file');
  console.log('2. Set SMTP_USER and SMTP_PASS with your email credentials');
  console.log('3. For Gmail, use an App Password (not your regular password)');
  console.log('4. See CONTACT_FORM_SETUP.md for detailed instructions');
  process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify connection
console.log('🔄 Verifying email connection...\n');

transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ Email connection failed!');
    console.error('Error:', error.message);
    console.error('');
    console.error('Common fixes:');
    console.error('1. Make sure you are using an App Password, not your regular password');
    console.error('2. Enable 2-Factor Authentication in your email account');
    console.error('3. Generate a new App Password specifically for this application');
    console.error('4. For Gmail: https://myaccount.google.com/apppasswords');
    console.error('5. Make sure the email address is correct');
    process.exit(1);
  } else {
    console.log('✅ Email connection successful!');
    console.log('✅ Server is ready to send emails\n');
    
    // Send test email
    const testMailOptions = {
      from: `"BigBets.ai Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: '✅ Test Email - Contact Form Working!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #f82d19;">✅ Success!</h2>
          <p>Your email service is configured correctly and ready to send emails.</p>
          <p><strong>Your contact form is now fully functional!</strong></p>
          <hr>
          <p style="color: #666; font-size: 14px;">
            This is a test email sent from your BigBets.ai contact form backend.
          </p>
        </div>
      `
    };
    
    console.log('📤 Sending test email to verify everything works...\n');
    
    transporter.sendMail(testMailOptions, (err, info) => {
      if (err) {
        console.error('❌ Failed to send test email:', err.message);
      } else {
        console.log('✅ Test email sent successfully!');
        console.log('📧 Check your inbox:', process.env.SMTP_USER);
        console.log('');
        console.log('🎉 Your contact form is ready to use!');
        console.log('');
        console.log('Next steps:');
        console.log('1. Start the backend server: npm start');
        console.log('2. Start your Angular app: ng serve');
        console.log('3. Test the contact form at: http://localhost:4200/contact');
      }
      process.exit(0);
    });
  }
});
