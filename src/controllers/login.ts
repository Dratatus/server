import { NextFunction, Request, Response } from 'express';
import { User } from '../models/users.js';

export const logout = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

export const login = (req: Request, res: Response, next: (err?: any) => void) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};
