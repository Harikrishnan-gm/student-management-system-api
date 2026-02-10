import { Request, Response } from 'express';
import User from '../models/User';
import Task from '../models/Task';

// @desc    Add a new student
// @route   POST /api/admin/add-student
// @access  Private (Admin only)
export const addStudent = async (req: Request, res: Response) => {
    try {
        const { name, email, password, department } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
            department,
            role: 'student',
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                department: user.department,
                role: user.role,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private (Admin only)
export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password');
        res.json(students);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Assign a task to a student
// @route   POST /api/admin/assign-task
// @access  Private (Admin only)
export const assignTask = async (req: Request, res: Response) => {
    try {
        const { title, description, dueDate, assignedTo } = req.body;

        // Verify student exists
        const student = await User.findById(assignedTo);
        if (!student || student.role !== 'student') {
            res.status(404).json({ message: 'Student not found' });
            return;
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            assignedTo,
            status: 'pending'
        });

        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all tasks
// @route   GET /api/admin/tasks
// @access  Private (Admin only)
export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({}).populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
