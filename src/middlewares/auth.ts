import { Request, Response, NextFunction } from 'express';
import { ResponseStatus } from './../utils/response-status';

const authMW = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.query.token as string;
    if (token && token === '123') {
        console.log('Auth Passed!');
        next();
    } else {
        res.sendStatus(ResponseStatus.UNAUTHENTICATED);
    }
};

export default authMW;
