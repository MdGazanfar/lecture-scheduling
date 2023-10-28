import express from 'express';
import connectDB from './models/index.js';
import routes from './routes/index.js'

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, This is my backend for lecture schedule portal!');
});

app.use(express.json())

app.use('/api', routes)

const PORT = 3001;

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
});
