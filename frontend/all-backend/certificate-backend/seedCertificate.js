import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Certificate from './src/models/Certificate.js';
import connectDB from './src/config/db.js';

dotenv.config();

const seedCertificate = async () => {
    await connectDB();

    try {
        // Clear existing certificates
        await Certificate.deleteMany();

        await Certificate.create({
            certificateId: "HX15SE11211",
            "Student Name": "Rahul Sharma",
            Domain: "Full Stack Web Development",
            issueDate: "2025-01-10",
            certificateUrl: "https://certificates-bigbets.s3.eu-north-1.amazonaws.com/HX15SE11211.pdf",
            isActive: true
        });
        console.log("Certificate seeded successfully");
        process.exit();
    } catch (error) {
        console.error("Error seeding certificate:", error);
        process.exit(1);
    }
};

seedCertificate();
