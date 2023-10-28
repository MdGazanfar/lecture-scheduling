import mongoose from "mongoose";

const connectDB = async () => {
    
    const dbName = 'lectureSchedule';
    const url = `mongodb://0.0.0.0:27017/${dbName}`

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

export default connectDB;