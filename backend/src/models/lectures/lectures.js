import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    courseId: { type: mongoose.Types.ObjectId, required: true },
    lecturerId: { type: mongoose.Types.ObjectId, required: true },
    lecturerDate: { type: Date, required: true },
},
    {
        versionKey: false,
        collection: "lectures",
    }
);

const Lecture = mongoose.model('Lectures', lectureSchema);

export default Lecture;
