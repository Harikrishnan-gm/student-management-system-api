import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

// Role Guard: Block access if user doesn't have the required role
export const authorizeRole = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        // Sanity check: ensure user is authenticated first
        if (!req.user) {
            return res.status(401).json({ message: 'User context missing' });
        }

        // Check against allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access Denied: Requires '${roles.join(' or ')}' role`
            });
        }

        next();
    };
};
