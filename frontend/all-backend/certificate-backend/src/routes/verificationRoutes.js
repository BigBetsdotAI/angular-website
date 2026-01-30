import express from 'express';
import { verifyCertificate } from '../controllers/verificationController.js';

const router = express.Router();

router.get('/verify/:id', verifyCertificate);

export default router;
