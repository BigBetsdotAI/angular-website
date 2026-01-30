import emailService from '../services/emailService.js';

export const applyForJob = async (req, res) => {
    try {
        const { quickName, quickEmail, quickPhone, quickMessage } = req.body;
        const coverLetter = req.file;

        // Basic Validation
        if (!quickName || !quickEmail || !coverLetter) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, and cover letter.' });
        }

        console.log('--- New Job Application ---');
        console.log('Name:', quickName);
        console.log('Email:', quickEmail);
        console.log('File:', coverLetter.originalname);
        console.log('---------------------------');

        // Send Email with Attachment
        const emailResult = await emailService.sendApplicationEmail({
            quickName,
            quickEmail,
            quickPhone,
            quickMessage
        }, coverLetter);

        if (emailResult.success) {
            res.status(200).json({ success: true, message: 'Application submitted successfully!' });
        } else {
            console.error("Email failed:", emailResult.error);
            // Return success to UI but log error (or handle as 500 if critical)
            res.status(200).json({ success: true, message: 'Application received (Email delivery pending).' });
        }

    } catch (error) {
        console.error('Error in applyForJob:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
