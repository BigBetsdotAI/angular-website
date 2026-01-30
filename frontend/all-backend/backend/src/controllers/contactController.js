import emailService from '../services/emailService.js';

export const submitContact = async (req, res) => {
    try {
        const { quickName, quickEmail, quickPhone, quickMessage } = req.body;

        // Validation (Basic)
        if (!quickName || !quickEmail || !quickMessage) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
        }

        console.log('--- New Contact Form Submission ---');
        console.log('Name:', quickName);
        console.log('Email:', quickEmail);
        console.log('Phone:', quickPhone);
        console.log('Message:', quickMessage);
        console.log('-----------------------------------');

        // Send Emails
        const emailResult = await emailService.sendContactEmail({ quickName, quickEmail, quickPhone, quickMessage });

        if (emailResult.success) {
            return res.status(200).json({ success: true, message: 'Message sent successfully!' });
        } else {
            console.error("Email failed:", emailResult.error);
            // Return success to UI so user experience isn't broken, but log the error.
            // Alternatively, could return error if email is critical.
            return res.status(200).json({ success: true, message: 'Message received (Email delivery pending).' });
        }

    } catch (error) {
        console.error('Error in submitContact:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
