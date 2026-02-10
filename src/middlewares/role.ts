import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

// Middleware to check for specific roles
export const authorizeRole = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        // Check if the user is attached to the request (ensures protect middleware was run)
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role '${req.user.role}' is not authorized to access this route`
            });
        }

        next();
    };
};
