import mongoose from "mongoose";

const connectDB = async () => {
    
    const dbName = 'lectureSchedule';
    // const url = `mongodb://0.0.0.0:27017/${dbName}`
    const url = `mongodb+srv://ansarigazanfar679:fO5BPkFGwFaeqEGu@cluster0.81yrwgd.mongodb.net/?retryWrites=true&w=majority/${dbName}`
    
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