import mongoose from 'mongoose';

const coursesSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    batches: { type: String, required: true },

},
    {
        versionKey: false,
        collection: "courses",
    }
);

const Course = mongoose.model('Courses', coursesSchema);

export default Course;
