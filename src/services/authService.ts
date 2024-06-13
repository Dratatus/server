import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User, IUser } from '../models/users.js';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import generateUniqueId from 'generate-unique-id';

const JWT_SECRET = 'your_jwt_secret_key';
const JWT_EXPIRATION = '1h';

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ 'passwords.email': email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const isMatch = await bcrypt.compare(password, user.passwords.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user: Express.User, done) => {
    done(null, (user as IUser).id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

const generateToken = (user: IUser) => {
    return jwt.sign(
        { id: user.id, email: user.passwords.email, firstName: user.firstName, role: user.role, avatar: user.avatar },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, role, avatar } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            id: generateUniqueId({ length: 10, useLetters: false, useNumbers: true }),
            firstName,
            lastName,
            role: 'Developer',
            passwords: { email, password: hashedPassword },
            avatar: 'https://gravatar.com/avatar/31aa3a13224e06f57b3319762e61037a?s=400&d=monsterid&r=x'
        });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err: Error | null, user: IUser | false, info: { message: string }) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.json({ token });
    })(req, res, next);
};

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;
    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET) as IUser;
        const newToken = generateToken(decoded);
        res.json({ token: newToken });
    } catch (err) {
        res.status(401).send('Invalid refresh token');
    }
};
