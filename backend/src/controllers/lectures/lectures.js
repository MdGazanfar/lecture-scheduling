import mongoose from 'mongoose';
import Lecture from '../../models/lectures/lectures.js';

const addLecture = async (req, res) => {
    try {
        const { name, courseId, lecturerId, lecturerDate } = req.body;

        if (!name || !courseId || !lecturerId || !lecturerDate) {
            return res.status(400).json({ message: 'Name, Course, Lecturer and Lecture Date are required' });
        }

        const existingLecture = await Lecture.findOne({
            lecturerDate, lecturerId
        });

        if (existingLecture) {
            return res.status(409).json({ message: 'Lecturer is busy on this date' });
        }

        else {
            const lecture = new Lecture({ name, courseId, lecturerId, lecturerDate });
            await lecture.save();
            res.status(201).json({ message: 'Lecture added successfully' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const lectureList = async (req, res) => {
    try {
        const { userId, userType } = req.decoded
        if (userType === 'lecturer') {
            const data = await Lecture.aggregate([
                {
                    $match: {
                        lecturerId: new mongoose.Types.ObjectId(userId)
                    },
                },
                {
                    $lookup: {
                        from: 'courses',
                        localField: 'courseId',
                        foreignField: '_id',
                        as: 'course'
                    }
                },
                { $unwind: '$course' },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'lecturerId',
                        foreignField: '_id',
                        as: 'lecture'
                    }
                },
                { $unwind: '$lecture' },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        'course.name': 1,
                        'lecture.name': 1,
                    }
                }
            ]);
            res.status(200).json(data);
        }
        else {
            const data = await Lecture.aggregate([
                {
                    $lookup: {
                        from: 'courses',
                        localField: 'courseId',
                        foreignField: '_id',
                        as: 'course'
                    }
                },
                { $unwind: '$course' },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'lecturerId',
                        foreignField: '_id',
                        as: 'lecture'
                    }
                },
                { $unwind: '$lecture' },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        'course.name': 1,
                        'lecture.name': 1,
                    }
                }
            ]);
            res.status(200).json(data);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default {
    addLecture,
    lectureList
}