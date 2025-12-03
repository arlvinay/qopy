import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/payment';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', paymentRoutes);

app.get('/', (req, res) => {
    res.send('Qopy API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
