import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Extend the Express Request interface to include the user object
export interface AuthRequest extends Request {
    user?: IUser;
}

// Middleware to protect routes
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    // Check if the authorization header is present and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

            // Get the user from the database and attach it to the request object
            // Exclude the password from the user object
            req.user = (await User.findById(decoded.id).select('-password')) as IUser;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
