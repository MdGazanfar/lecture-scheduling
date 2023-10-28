import Course from '../../models/courses/courses.js';

const addCourse = async (req, res) => {
    try {
        const { name, level, description, batches } = req.body;

        if (!name || !level || !description || !batches) {
            return res.status(400).json({ message: 'Name, Level, Description and Batches are required' });
        }

        const course = await Course.findOne({
            $and: [{ name }],
        });

        if (course) {
            return res.status(409).json({ message: 'Course already added' });
        }

        else {
            const course = new Course({ name, level, description, batches });
            await course.save();
            res.status(201).json({ message: 'Course added successfully' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const courseList = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default {
    addCourse,
    courseList
}