const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
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

// @route   GET api/templates
// @desc    Get all users templates
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const templates = await Template.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(templates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/templates
// @desc    Add new template
// @access  Private
router.post('/', auth, async (req, res) => {
    const { name, subject, content } = req.body;

    try {
        const newTemplate = new Template({
            name,
            subject,
            content,
            user: req.user.id
        });

        const template = await newTemplate.save();
        res.json(template);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/templates/:id
// @desc    Update template
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, subject, content } = req.body;

    // Build object
    const templateFields = {};
    if (name) templateFields.name = name;
    if (subject) templateFields.subject = subject;
    if (content) templateFields.content = content;
    templateFields.updatedAt = Date.now();

    try {
        let template = await Template.findById(req.params.id);

        if (!template) return res.status(404).json({ msg: 'Template not found' });

        // Make sure user owns template
        if (template.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        template = await Template.findByIdAndUpdate(
            req.params.id,
            { $set: templateFields },
            { new: true }
        );

        res.json(template);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/templates/:id
// @desc    Delete template
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let template = await Template.findById(req.params.id);

        if (!template) return res.status(404).json({ msg: 'Template not found' });

        // Make sure user owns template
        if (template.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Template.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Template removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
