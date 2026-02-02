const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Template = require('../models/Template');

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, fullName } = req.body;

        // Check user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password: hashedPassword,
            fullName
        });

        await user.save();

        // Create Default Templates
        const defaultTemplates = [
            {
                name: "Welcome Email",
                subject: "Welcome to Our Platform, {{name}}!",
                content: `Hello {{name}},

Welcome aboard! We're thrilled to have you join our community.

Here's what you can do next:
• Complete your profile
• Explore our features
• Connect with other members

If you have any questions, feel free to reach out to our support team.

Best regards,
The Team`
            },
            {
                name: "Newsletter Announcement",
                subject: "Big News: Exciting Updates Coming Your Way!",
                content: `Hi {{name}},

We have some exciting news to share with you!

This month, we're launching several new features that will make your experience even better. Stay tuned for:
• Enhanced dashboard
• New reporting tools
• Improved performance

Thank you for being part of our journey.

Cheers,
The Team`
            },
            {
                name: "Event Invitation",
                subject: "You're Invited: Exclusive Webinar for {{name}}",
                content: `Dear {{name}},

You're cordially invited to our exclusive webinar happening next week!

📅 Date: Next Thursday
⏰ Time: 2:00 PM EST
📍 Location: Online (link will be sent via {{email}})

Topics we'll cover:
• Industry trends and insights
• Best practices and tips
• Live Q&A session

Don't miss this opportunity to learn and connect!`
            }
        ];

        // Bulk insert default templates linked to the new user
        await Template.insertMany(
            defaultTemplates.map(t => ({ ...t, user: user.id }))
        );

        // Create Token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create Token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get User (Protected Route Middleware could be added here, for now just basic id check or relying on client to store user)
// But to match `getCurrentUser` behavior properly, we might want a route that takes the token and validates it
router.get('/me', async (req, res) => {
    // This expects a header x-auth-token usually
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id).select('-password');
        res.json(user);
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
});

module.exports = router;
