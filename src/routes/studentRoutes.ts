import express from 'express';
import { protect } from '../middlewares/auth';
import { authorizeRole } from '../middlewares/role';
import { getMyTasks, updateTaskStatus } from '../controllers/studentController';

const router = express.Router();

// All routes are protected and restricted to Student
router.use(protect);
router.use(authorizeRole('student'));

router.get('/tasks', getMyTasks);
router.put('/tasks/:id/complete', updateTaskStatus);

export default router;
