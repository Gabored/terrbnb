import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseStatus } from './../utils/response-status';

// Define a new interface extending Express's Request interface
interface RequestWithUser extends ExpressRequest {
    user?: any; // You can define the user property as any type or a specific type based on your application's needs
}

const authMW = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token: string | undefined = req.query.token as string;
    
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
