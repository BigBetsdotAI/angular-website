import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

import contactRoutes from './src/routes/contactRoutes.js';
import careersRoutes from './src/routes/careersRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/careers', careersRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
