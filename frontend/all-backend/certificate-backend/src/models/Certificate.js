import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    certificateId: {
        type: String,
        required: true,
        unique: true,
    },
    "Student Name": {
        type: String,
        required: true,
    },
    Domain: {
        type: String,
        required: true,
    },
    issueDate: {
        type: String, // Stored as string in screenshot "2025-01-10"
    },
    expiryDate: {
        type: String,
    },
    certificateUrl: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
