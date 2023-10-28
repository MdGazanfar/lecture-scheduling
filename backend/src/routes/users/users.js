import { Router } from 'express';
import users from '../../controllers/users/users.js';
import verifyToken from '../../middleware/verifyToken.js';

const router = Router();

router.post(
    '/sign-up',
    users.signUp,
);

router.post(
    '/login',
    users.login,
);

router.get(
    '/list',
    verifyToken,
    users.userList,
);

export default router;
