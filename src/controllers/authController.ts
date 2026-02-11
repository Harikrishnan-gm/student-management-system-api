import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Helper function to generate JWT token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user (Student) - Admin only functionality normally, but for basic setup we might need an initial admin seeder or a public register if required. 
// However, requirements say "Allow the admin to add students", so this might be used by Admin Controller. 
// But let's keep a generic register for now or just Login. 
// Requirements: "Admin should be able to log in", "Students should be able to log in". "Admin adds students".
// So Auth Controller strictly handles Login. 
// "Admin adds students" will be in Admin Controller. 

// @desc    Auth Admin & get token
// @route   POST /api/auth/admin/login
// @access  Public
export const adminLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            if (user.role !== 'admin') {
                res.status(401).json({ message: 'Not authorized as admin' });
                return;
            }
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Student Login
export const studentLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            // Strict check: make sure this isn't an admin trying to login here
            if (user.role !== 'student') {
                res.status(401).json({ message: 'Not authorized as student' });
                return;
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                department: user.department,
                role: user.role,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
