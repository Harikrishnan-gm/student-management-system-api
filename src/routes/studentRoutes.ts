import express from 'express';
import { protect } from '../middlewares/auth';
import { authorizeRole } from '../middlewares/role';
import { getMyTasks, updateTaskStatus } from '../controllers/studentController';

const router = express.Router();

// All routes are protected and restricted to Student
router.use(protect); // 1. Must be logged in
router.use(authorizeRole('student')); // 2. Must be a student

router.get('/tasks', getMyTasks);
router.put('/tasks/:id/complete', updateTaskStatus);

export default router;
