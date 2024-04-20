import { Request, Response, NextFunction } from 'express';
import { ResponseStatus } from './../utils/response-status';

const adminMW = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query.role);
    const { role } = req.query;

    if (role && role === 'admin') {
        console.log('Admin Passed!');
        next();
    } else {
        res.sendStatus(ResponseStatus.UNAUTHENTICATED);
    }
};

export default adminMW;
