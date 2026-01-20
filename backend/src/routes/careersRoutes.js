import express from 'express';
import multer from 'multer';
import { applyForJob } from '../controllers/careersController.js';

const router = express.Router();

// Configure Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/apply', upload.single('coverLetter'), applyForJob);

export default router;
