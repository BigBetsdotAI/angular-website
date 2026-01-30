import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import verificationRoutes from './src/routes/verificationRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', verificationRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Certificate Verification Service running on port ${PORT}`));
