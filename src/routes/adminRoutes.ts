import express from 'express';
import { protect } from '../middlewares/auth';
import { authorizeRole } from '../middlewares/role';
import {
    addStudent,
    getAllStudents,
    assignTask,
    getAllTasks,
} from '../controllers/adminController';

const router = express.Router();

// All routes are protected and restricted to Admin
router.use(protect); // 1. Must be logged in
router.use(authorizeRole('admin')); // 2. Must be an admin

router.post('/add-student', addStudent);
router.get('/students', getAllStudents);
router.post('/assign-task', assignTask);
router.get('/tasks', getAllTasks);

export default router;
