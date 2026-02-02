const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    total_emails: {
        type: Number,
        required: true
    },
    sent_count: {
        type: Number,
        default: 0
    },
    failed_count: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'completed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completed_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
