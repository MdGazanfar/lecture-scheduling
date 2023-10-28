import { Router } from 'express';
import courses from '../../controllers/courses/courses.js';

const router = Router();

router.post(
    '/add',
    courses.addCourse,
);

router.get(
    '/list',
    courses.courseList,
);

export default router;
