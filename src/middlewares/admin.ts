import { Request, Response, NextFunction } from 'express';
import { ResponseStatus } from './../utils/response-status';
import jwt from 'jsonwebtoken';

const adminMW = (req: Request, res: Response, next: NextFunction) => {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.sendStatus(ResponseStatus.UNAUTHENTICATED); // No token provided, send 401 Unauthorized
    }

    // Verify JWT token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(ResponseStatus.FORBIDDEN); // Invalid token, send 403 Forbidden
        }

        // Extract role from decoded token payload
        const { role } = decoded as { role: string };

        // Check if the role is 'admin'
        if (role === 'admin') {
            console.log('Admin Passed!');
            next(); // Role is admin, proceed to the next middleware
        } else {
            res.sendStatus(ResponseStatus.UNAUTHENTICATED); // Role is not admin, send 401 Unauthorized
        }
    });
};

export default adminMW;
