import express from 'express';
import { adminLogin, studentLogin } from '../controllers/authController';

const router = express.Router();

// Public Auth Routes
router.post('/admin/login', adminLogin);
router.post('/student/login', studentLogin);

export default router;
