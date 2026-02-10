import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import Task from '../models/Task';

// @desc    Get logged in student's tasks
// @route   GET /api/student/tasks
// @access  Private (Student only)
export const getMyTasks = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        const tasks = await Task.find({ assignedTo: req.user._id });

        // Check for overdue tasks and update them locally for response if needed, 
        // or we can rely on a background job. For simplicity, we just return them.
        // Ideally, we check date and update status if it's past due.

        // Simple Overdue check on fetch
        const now = new Date();
        const tasksWithStatus = await Promise.all(tasks.map(async (task) => {
            if (task.status === 'pending' && new Date(task.dueDate) < now) {
                task.status = 'overdue';
                await task.save();
            }
            return task;
        }));

        res.json(tasksWithStatus);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task status to completed
// @route   PUT /api/student/tasks/:id/complete
// @access  Private (Student only)
export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ _id: id, assignedTo: req.user!._id });

        if (task) {
            task.status = 'completed';
            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found or not assigned to you' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
