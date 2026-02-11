import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Extend the Express Request interface to include the user object
export interface AuthRequest extends Request {
    user?: IUser;
}

// Protect routes - ensure user is logged in
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    // 1. Look for token in Authorization header (Bearer schema)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify token validity
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

            // 3. Attach user to request (exclude sensitive password)
            req.user = (await User.findById(decoded.id).select('-password')) as IUser;

            next(); // Move to the next middleware/controller
        } catch (error) {
            console.error('Auth Failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
