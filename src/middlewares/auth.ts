import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseStatus } from './../utils/response-status';

// Define a new interface extending Express's Request interface
interface RequestWithUser extends ExpressRequest {
    user?: any; 
}

const authMW = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header
    
    if (!token) {
        return res.sendStatus(ResponseStatus.UNAUTHENTICATED);
    }

    // Verify JWT token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(ResponseStatus.UNAUTHENTICATED);
        } else {
            // If token is valid, you can access decoded data
            // For example, you might set it to req.user for further middleware to access
            req.user = decoded;
            next();
        }
    });
};

export default authMW;
