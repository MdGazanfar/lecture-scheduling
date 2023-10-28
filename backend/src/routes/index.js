import express from "express";
import user from './users/users.js'
import courses from './courses/courses.js'
import lectures from './lectures/lectures.js'
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.use("/user", user);
router.use("/course", verifyToken, courses);
router.use("/lecture", verifyToken, lectures);

export default router;