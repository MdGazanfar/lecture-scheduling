import express from 'express';
import cors from 'cors';
import connectDB from './models/index.js';
import routes from './routes/index.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, This is my backend for lecture schedule portal!');
});

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json())

app.use('/api', routes)

const PORT = 3001;

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
});
