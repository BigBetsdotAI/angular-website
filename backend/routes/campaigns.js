const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// @route   GET api/campaigns
// @desc    Get all users campaigns
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const campaigns = await Campaign.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/campaigns
// @desc    Save new campaign
// @access  Private
router.post('/', auth, async (req, res) => {
    const { subject, content, total_emails, sent_count, failed_count, status } = req.body;

    try {
        const newCampaign = new Campaign({
            subject,
            content,
            total_emails,
            sent_count,
            failed_count,
            status,
            user: req.user.id
        });

        const campaign = await newCampaign.save();
        res.json(campaign);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
