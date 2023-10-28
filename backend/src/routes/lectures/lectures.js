import { Router } from 'express';
import lectures from '../../controllers/lectures/lectures.js';

const router = Router();

router.post(
    '/add',
    lectures.addLecture,
);

router.get(
    '/list',
    lectures.lectureList,
);

export default router;
